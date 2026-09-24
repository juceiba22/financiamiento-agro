// Recibe la solicitud, la registra en las tablas del portal AgroTabaco (documentation_submissions /
// documentation_files), descarga los archivos del bucket privado de Supabase y los envía por email con Resend.
import { Resend } from 'resend';
import { ALLOWED_TYPES, DOCS, MAX_FILE_BYTES, MAX_FILES_PER_DOC } from '../src/documentacion.js';
import { BUCKET, getSupabase, UUID_RE } from './_lib/storage.js';

const ORIGEN = '[Enviado desde Financiamiento Agro]';

export const config = { maxDuration: 60 };

// Resend admite hasta 40 MB por email (con base64). Se reparte en varios emails si hace falta.
const MAX_BATCH_BYTES = 25 * 1024 * 1024;
const DOC_LABELS = Object.fromEntries(DOCS.map((d) => [d.key, d.label]));

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const str = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function validate(body) {
  const e = body?.empresa || {};
  const l = body?.lineas || {};
  const empresa = {
    razonSocial: str(e.razonSocial, 200),
    cuit: str(e.cuit, 20),
    contacto: str(e.contacto, 200),
    email: str(e.email, 200),
    telefono: str(e.telefono, 50),
    esSA: e.esSA === true,
  };
  const lineas = { monto: str(l.monto, 100), plazo: str(l.plazo, 100), destino: str(l.destino, 2000) };
  const comentarios = str(body?.comentarios, 3000);
  const id = str(body?.id, 36);

  if (!UUID_RE.test(id)) return { error: 'Solicitud inválida.' };
  if (!empresa.razonSocial || !empresa.contacto) return { error: 'Faltan datos de la empresa.' };
  const cuitDigits = empresa.cuit.replace(/\D/g, '');
  if (cuitDigits.length !== 11) return { error: 'CUIT inválido.' };
  empresa.cuit = `${cuitDigits.slice(0, 2)}-${cuitDigits.slice(2, 10)}-${cuitDigits.slice(10)}`;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(empresa.email)) return { error: 'Email inválido.' };
  if (!lineas.monto || !lineas.plazo || !lineas.destino) return { error: 'Completá las líneas solicitadas.' };

  const archivos = Array.isArray(body?.archivos) ? body.archivos : [];
  const prefix = `${id}/`;
  const clean = [];
  for (const a of archivos) {
    const pathname = str(a?.pathname, 300);
    const doc = str(a?.doc, 40);
    // Solo se aceptan archivos subidos a esta misma solicitud
    if (!pathname.startsWith(prefix) || !DOC_LABELS[doc] || !pathname.startsWith(`${prefix}${doc}/`)) {
      return { error: 'Archivo inválido.' };
    }
    const contentType = ALLOWED_TYPES.includes(a?.contentType) ? a.contentType : 'application/pdf';
    clean.push({ doc, pathname, contentType, name: str(a?.name, 200) || pathname.split('/').pop() });
  }

  const required = DOCS.filter((d) => d.key !== 'lineas_solicitadas' && (!d.onlySA || empresa.esSA));
  for (const d of required) {
    const n = clean.filter((a) => a.doc === d.key).length;
    if (n === 0) return { error: `Falta adjuntar: ${d.label}` };
    if (n > MAX_FILES_PER_DOC) return { error: 'Demasiados archivos en un documento.' };
  }

  return { id, empresa, lineas, comentarios, archivos: clean };
}

async function download(bucket, pathname) {
  const { data, error } = await bucket.download(pathname);
  if (error || !data) throw new Error(`No se encontró ${pathname}: ${error?.message}`);
  const buf = Buffer.from(await data.arrayBuffer());
  if (buf.length > MAX_FILE_BYTES) throw new Error('Archivo demasiado grande.');
  return buf;
}

// Registra la solicitud en las tablas del portal. No bloquea el envío: si falla, queda en los logs
// y el email sale igual. Los archivos solo se registran si la solicitud se creó (nunca se agregan
// archivos a una solicitud existente).
async function registrar(supabase, data, files) {
  const { id, empresa, lineas, comentarios } = data;
  const notes = [ORIGEN, comentarios].filter(Boolean).join('\n').slice(0, 2000);

  const { error } = await supabase.from('documentation_submissions').insert({
    id,
    company_name: empresa.razonSocial,
    cuit: empresa.cuit,
    contact_name: empresa.contacto,
    email: empresa.email,
    phone: empresa.telefono || null,
    is_sa: empresa.esSA,
    notes,
    requested_amount: lineas.monto,
    requested_term: lineas.plazo,
    requested_purpose: lineas.destino,
    status: 'nuevo',
  });
  if (error) {
    console.error('registrar documentation_submissions', error);
    return;
  }

  const { error: filesError } = await supabase.from('documentation_files').insert(
    files.map((f) => ({
      submission_id: id,
      document_key: f.doc,
      storage_path: f.pathname,
      file_name: f.name.slice(0, 300),
      mime_type: f.contentType,
      size_bytes: f.size,
    }))
  );
  if (filesError) console.error('registrar documentation_files', filesError);
}

function buildHtml({ id, empresa, lineas, comentarios, archivos }, part, total) {
  const row = (k, v) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#55635b;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 0;color:#151e17">${v}</td></tr>`;
  const byDoc = DOCS.filter((d) => d.key !== 'lineas_solicitadas' || archivos.some((a) => a.doc === 'lineas_solicitadas'))
    .filter((d) => !d.onlySA || empresa.esSA)
    .map((d) => {
      const files = archivos.filter((a) => a.doc === d.key).map((a) => `<li>${esc(a.name)}</li>`).join('');
      return `<li style="margin-bottom:8px"><strong>${esc(d.label)}</strong><ul>${files || '<li>—</li>'}</ul></li>`;
    })
    .join('');

  return `<div style="font-family:Arial,sans-serif;max-width:640px">
  <h2 style="color:#132a1e;margin:0 0 4px">Nueva solicitud de financiamiento</h2>
  <p style="color:#727973;margin:0 0 16px;font-size:12px">ID ${esc(id)}${total > 1 ? ` · Email ${part} de ${total}` : ''}</p>
  <h3 style="color:#132a1e">Datos de la empresa</h3>
  <table style="border-collapse:collapse;font-size:14px">
    ${row('Razón social', esc(empresa.razonSocial))}
    ${row('CUIT', esc(empresa.cuit))}
    ${row('Contacto', esc(empresa.contacto))}
    ${row('Email', esc(empresa.email))}
    ${row('Teléfono', esc(empresa.telefono) || '—')}
    ${row('Es S.A.', empresa.esSA ? 'Sí' : 'No')}
  </table>
  <h3 style="color:#132a1e">Líneas solicitadas</h3>
  <table style="border-collapse:collapse;font-size:14px">
    ${row('Monto', esc(lineas.monto))}
    ${row('Plazo', esc(lineas.plazo))}
    ${row('Destino', esc(lineas.destino).replace(/\n/g, '<br>'))}
  </table>
  ${comentarios ? `<h3 style="color:#132a1e">Comentarios</h3><p style="font-size:14px">${esc(comentarios).replace(/\n/g, '<br>')}</p>` : ''}
  <h3 style="color:#132a1e">Documentación</h3>
  <ul style="font-size:14px;padding-left:18px">${byDoc}</ul>
</div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { RESEND_API_KEY, SOLICITUDES_EMAIL_TO, SOLICITUDES_EMAIL_FROM } = process.env;
  const supabase = getSupabase();
  if (!RESEND_API_KEY || !SOLICITUDES_EMAIL_TO || !supabase) {
    console.error('Faltan RESEND_API_KEY, SOLICITUDES_EMAIL_TO, SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    return res.status(500).json({ error: 'El servicio de envío no está configurado.' });
  }

  const data = validate(req.body);
  if (data.error) return res.status(400).json({ error: data.error });

  try {
    // Descarga y arma los adjuntos, repartidos en tandas de hasta MAX_BATCH_BYTES
    const bucket = supabase.storage.from(BUCKET);
    const batches = [[]];
    const registrados = [];
    let batchSize = 0;
    for (const a of data.archivos) {
      const content = await download(bucket, a.pathname);
      registrados.push({ ...a, size: content.length });
      if (batchSize + content.length > MAX_BATCH_BYTES && batches[batches.length - 1].length) {
        batches.push([]);
        batchSize = 0;
      }
      const prefix = a.doc.toUpperCase();
      batches[batches.length - 1].push({ filename: `${prefix}_${a.name}`, content });
      batchSize += content.length;
    }

    await registrar(supabase, data, registrados).catch((err) => console.error('registrar', err));

    const resend = new Resend(RESEND_API_KEY);
    const to = SOLICITUDES_EMAIL_TO.split(',').map((s) => s.trim()).filter(Boolean);
    const from = SOLICITUDES_EMAIL_FROM || 'Financiamiento Agro <onboarding@resend.dev>';

    for (let i = 0; i < batches.length; i++) {
      const suffix = batches.length > 1 ? ` (${i + 1}/${batches.length})` : '';
      const { error } = await resend.emails.send({
        from,
        to,
        replyTo: data.empresa.email,
        subject: `Solicitud de financiamiento · ${data.empresa.razonSocial}${suffix}`,
        html: buildHtml(data, i + 1, batches.length),
        attachments: batches[i],
      });
      if (error) throw new Error(error.message || 'Error de Resend');
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('solicitud', err);
    return res.status(502).json({ error: 'No pudimos enviar la documentación. Intentá nuevamente en unos minutos.' });
  }
}
