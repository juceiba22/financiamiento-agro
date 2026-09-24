// Genera una URL firmada para que el navegador suba un archivo directo al bucket privado de Supabase
// (evita el límite de 4.5 MB por request de las funciones de Vercel).
import { randomUUID } from 'node:crypto';
import { ALLOWED_TYPES, DOCS, MAX_FILE_BYTES } from '../src/documentacion.js';
import { BUCKET, getSupabase, UUID_RE, safeName } from './_lib/storage.js';

const DOC_KEYS = new Set(DOCS.map((d) => d.key));

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const supabase = getSupabase();
  if (!supabase) {
    console.error('Faltan SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY');
    return res.status(500).json({ error: 'El servicio de archivos no está configurado.' });
  }

  const { id, doc, name, type, size } = req.body || {};
  if (typeof id !== 'string' || !UUID_RE.test(id) || !DOC_KEYS.has(doc)) {
    return res.status(400).json({ error: 'Solicitud inválida.' });
  }
  if (!ALLOWED_TYPES.includes(type)) return res.status(400).json({ error: 'Formato no admitido.' });
  if (!(size > 0 && size <= MAX_FILE_BYTES)) return res.status(400).json({ error: 'El archivo supera los 10 MB.' });

  // No permitir subir archivos a la carpeta de una solicitud que ya existe (p. ej. de agrotabaco.com)
  const { data: existing } = await supabase.from('documentation_submissions').select('id').eq('id', id).maybeSingle();
  if (existing) return res.status(409).json({ error: 'Solicitud inválida.' });

  const path = `${id}/${doc}/${randomUUID().slice(0, 8)}-${safeName(name)}`;
  const { data, error } = await supabase.storage.from(BUCKET).createSignedUploadUrl(path);
  if (error) {
    console.error('upload', error);
    return res.status(502).json({ error: 'No pudimos preparar la subida del archivo.' });
  }

  return res.status(200).json({ path: data.path, signedUrl: data.signedUrl });
}
