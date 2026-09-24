import { useMemo, useState } from 'react';
import {
  HiOutlineBuildingOffice2,
  HiOutlineSquares2X2,
  HiOutlineDocumentArrowUp,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCloudArrowUp,
  HiOutlineXMark,
  HiCheck,
  HiOutlineCheckCircle,
  HiOutlineExclamationTriangle,
} from 'react-icons/hi2';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappLink } from '../config';
import { DOCS, ACCEPT, ALLOWED_TYPES, MAX_FILE_BYTES, MAX_FILES_PER_DOC } from '../documentacion';
import styles from './Financiamiento.module.css';

const MB = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
const onlyDigits = (s) => s.replace(/\D/g, '');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Sube un archivo a la URL firmada de Supabase Storage (mismo formato que uploadToSignedUrl de supabase-js)
function putFile(signedUrl, file, onProgress) {
  return new Promise((resolve, reject) => {
    const body = new FormData();
    body.append('cacheControl', '3600');
    body.append('', file);
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', signedUrl);
    xhr.setRequestHeader('x-upsert', 'false');
    xhr.upload.onprogress = (e) => onProgress(e.loaded);
    xhr.onload = () =>
      xhr.status >= 200 && xhr.status < 300
        ? resolve()
        : reject(new Error(`Error ${xhr.status} al subir ${file.name}: ${xhr.responseText}`));
    xhr.onerror = () => reject(new Error(`Error de red al subir ${file.name}`));
    xhr.send(body);
  });
}

// Sube de a `limit` archivos en paralelo
async function runPool(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const i = next++;
      results[i] = await fn(items[i], i);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}

/* ---------- Zona para arrastrar archivos ---------- */
const Dropzone = ({ id, files, onChange }) => {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');

  const addFiles = (list) => {
    const incoming = Array.from(list);
    const accepted = [];
    const problems = [];
    for (const f of incoming) {
      if (!ALLOWED_TYPES.includes(f.type)) problems.push(`"${f.name}" no es PDF, JPG, PNG o WebP.`);
      else if (f.size > MAX_FILE_BYTES) problems.push(`"${f.name}" supera los 10 MB.`);
      else if (!files.some((x) => x.name === f.name && x.size === f.size)) accepted.push(f);
    }
    let next = [...files, ...accepted];
    if (next.length > MAX_FILES_PER_DOC) {
      problems.push(`Máximo ${MAX_FILES_PER_DOC} archivos por documento.`);
      next = next.slice(0, MAX_FILES_PER_DOC);
    }
    setError(problems.join(' '));
    onChange(next);
  };

  const remove = (i) => {
    setError('');
    onChange(files.filter((_, idx) => idx !== i));
  };

  return (
    <div>
      <label
        htmlFor={id}
        className={`${styles.dropzone} ${dragging ? styles.dragging : ''}`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
      >
        <HiOutlineCloudArrowUp className={styles.dropIcon} aria-hidden="true" />
        <span>Arrastrá archivos acá o hacé clic para seleccionarlos</span>
        <input
          id={id}
          type="file"
          multiple
          accept={ACCEPT}
          className={styles.fileInput}
          onChange={(e) => {
            addFiles(e.target.files);
            e.target.value = '';
          }}
        />
      </label>
      {error && <p className={styles.fieldError}>{error}</p>}
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((f, i) => (
            <li key={`${f.name}-${f.size}`} className={styles.fileItem}>
              <span className={styles.fileName}>{f.name}</span>
              <span className={styles.fileSize}>{MB(f.size)}</span>
              <button type="button" className={styles.fileRemove} onClick={() => remove(i)} aria-label={`Quitar ${f.name}`}>
                <HiOutlineXMark />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Check = ({ done }) => (
  <span className={`${styles.check} ${done ? styles.checkDone : ''}`} aria-hidden="true">
    {done && <HiCheck />}
  </span>
);

const Choice = ({ active, onClick, Icon, children }) => (
  <button type="button" className={`${styles.choice} ${active ? styles.choiceActive : ''}`} onClick={onClick} aria-pressed={active}>
    <Icon className={styles.choiceIcon} aria-hidden="true" />
    <span>{children}</span>
  </button>
);

/* ---------- Página ---------- */
const EMPTY_EMPRESA = { razonSocial: '', cuit: '', contacto: '', email: '', telefono: '', esSA: false };
const EMPTY_LINEAS = { monto: '', plazo: '', destino: '' };

const Financiamiento = () => {
  const [rubro, setRubro] = useState(null); // 'tabaco' | 'otro'
  const [otroRubro, setOtroRubro] = useState('');
  const [modo, setModo] = useState(null); // 'cargar' | 'representante'

  const [empresa, setEmpresa] = useState(EMPTY_EMPRESA);
  const [files, setFiles] = useState({});
  const [lineas, setLineas] = useState(EMPTY_LINEAS);
  const [comentarios, setComentarios] = useState('');

  const [status, setStatus] = useState('idle'); // idle | uploading | sending | done | error
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState({});

  const docs = useMemo(() => DOCS.filter((d) => !d.onlySA || empresa.esSA), [empresa.esSA]);
  const lineasOk = lineas.monto.trim() && lineas.plazo.trim() && lineas.destino.trim();
  const docsDone = docs.filter((d) => (d.key === 'lineas_solicitadas' ? lineasOk : (files[d.key] || []).length > 0)).length;

  const empresaErrors = {
    razonSocial: !empresa.razonSocial.trim() && 'Completá la razón social.',
    cuit: onlyDigits(empresa.cuit).length !== 11 && 'El CUIT debe tener 11 dígitos.',
    contacto: !empresa.contacto.trim() && 'Completá el nombre de contacto.',
    email: !EMAIL_RE.test(empresa.email.trim()) && 'Ingresá un email válido.',
  };
  const empresaOk = !Object.values(empresaErrors).some(Boolean);
  const complete = empresaOk && docsDone === docs.length;
  const busy = status === 'uploading' || status === 'sending';

  const setEmp = (field) => (e) =>
    setEmpresa((prev) => ({ ...prev, [field]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));
  const setLin = (field) => (e) => setLineas((prev) => ({ ...prev, [field]: e.target.value }));
  const setDocFiles = (key) => (list) => setFiles((prev) => ({ ...prev, [key]: list }));

  const selectRubro = (r) => {
    setRubro(r);
    setModo(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!complete || busy) return;

    setErrorMsg('');
    setStatus('uploading');
    setProgress(0);

    const id = crypto.randomUUID();
    const queue = docs.flatMap((d) => (files[d.key] || []).map((file) => ({ doc: d.key, file })));
    const totalBytes = queue.reduce((acc, q) => acc + q.file.size, 0) || 1;
    const loaded = new Array(queue.length).fill(0);

    try {
      const uploaded = await runPool(queue, 3, async ({ doc, file }, i) => {
        const res = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, doc, name: file.name, type: file.type, size: file.size }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'No se pudo preparar la subida.');

        await putFile(data.signedUrl, file, (l) => {
          loaded[i] = l;
          setProgress(Math.round((loaded.reduce((a, b) => a + b, 0) / totalBytes) * 100));
        });
        return { doc, name: file.name, size: file.size, contentType: file.type, pathname: data.path };
      }).catch((err) => {
        console.error(err);
        throw new Error('No pudimos subir los archivos. Revisá tu conexión e intentá nuevamente.');
      });

      setStatus('sending');
      const res = await fetch('/api/solicitud', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, empresa, lineas, comentarios, archivos: uploaded }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'No pudimos enviar la documentación.');

      setStatus('done');
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || 'Ocurrió un error al enviar. Intentá nuevamente.');
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <section className={styles.page}>
        <div className={styles.container}>
          <div className={`card ${styles.success}`}>
            <HiOutlineCheckCircle className={styles.successIcon} aria-hidden="true" />
            <h1 className={styles.successTitle}>¡Documentación enviada!</h1>
            <p>
              Recibimos la documentación de <strong>{empresa.razonSocial}</strong>. Nuestro equipo la va a
              evaluar y se va a comunicar con vos a <strong>{empresa.email}</strong>.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const showErr = (field) => touched[field] && empresaErrors[field];
  const blur = (field) => () => setTouched((prev) => ({ ...prev, [field]: true }));

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <header className={styles.intro}>
          <span className={styles.eyebrow}>FINANCIAMIENTO EN EL MERCADO DE VALORES</span>
          <h1 className={styles.title}>Conseguí financiamiento por medio del Mercado de Valores</h1>
          <p className={styles.lead}>
            Si sos una empresa o cooperativa del Agro, podés solicitar financiamiento directamente en el
            mercado de valores, sin recurrir a los bancos comerciales. Si querés evaluar y gestionar la
            calificación de tu empresa como Persona Jurídica ante dicho mercado, subí la documentación.
          </p>
          <p className={styles.leadMuted}>
            Le pedimos completar la casilla correspondiente a medida que reúna cada documento y adjuntar la
            totalidad de la documentación en un único envío, a fin de agilizar el proceso de evaluación.
          </p>
        </header>

        <div className="card">
          <h2 className={styles.blockTitle}>Conseguí financiamiento si sos una empresa de Agro</h2>
          <div className={styles.choices}>
            <Choice active={rubro === 'tabaco'} onClick={() => selectRubro('tabaco')} Icon={HiOutlineBuildingOffice2}>
              Soy una cooperativa o empresa tabacalera
            </Choice>
            <Choice active={rubro === 'otro'} onClick={() => selectRubro('otro')} Icon={HiOutlineSquares2X2}>
              Soy de otro rubro
            </Choice>
          </div>

          {rubro === 'otro' && (
            <div className={styles.stepBlock}>
              <label className={styles.label} htmlFor="otroRubro">¿De qué rubro sos?</label>
              <input
                id="otroRubro"
                className={styles.input}
                value={otroRubro}
                onChange={(e) => setOtroRubro(e.target.value)}
                placeholder="Ej.: yerba mate, caña de azúcar, ganadería…"
              />
              {otroRubro.trim() && (
                <a
                  className={`btn btn-primary ${styles.waBtn}`}
                  href={whatsappLink(
                    `¡Hola! Quiero conseguir financiamiento por medio del Mercado de Valores. Mi rubro es: ${otroRubro.trim()}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp aria-hidden="true" />
                  Consultar por WhatsApp
                </a>
              )}
            </div>
          )}

          {rubro === 'tabaco' && (
            <div className={styles.stepBlock}>
              <p className={styles.label}>Para calificar como Persona Jurídica necesitamos la siguiente documentación:</p>
              <ul className={styles.reqList}>
                {DOCS.map((d) => (
                  <li key={d.key}>{d.label}</li>
                ))}
              </ul>
              <div className={styles.choices}>
                <Choice active={modo === 'cargar'} onClick={() => setModo('cargar')} Icon={HiOutlineDocumentArrowUp}>
                  Tengo todos los requisitos, voy a cargar toda la información
                </Choice>
                <Choice active={modo === 'representante'} onClick={() => setModo('representante')} Icon={HiOutlineChatBubbleLeftRight}>
                  Quiero que se contacte un representante de Financiamiento Agro, para terminar la operación
                </Choice>
              </div>

              {modo === 'representante' && (
                <div className={styles.waBox}>
                  <p>Escribinos por WhatsApp y un representante de Financiamiento Agro se va a comunicar con vos.</p>
                  <a
                    className="btn btn-primary"
                    href={whatsappLink(
                      '¡Hola! Soy de una cooperativa o empresa tabacalera y quiero que un representante se contacte conmigo para terminar la operación de financiamiento en el Mercado de Valores.'
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FaWhatsapp aria-hidden="true" />
                    Escribir por WhatsApp
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {rubro === 'tabaco' && modo === 'cargar' && (
          <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className="card">
              <h2 className={styles.blockTitle}>Datos de la empresa</h2>
              <div className={styles.grid}>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="razonSocial">Razón social</label>
                  <input id="razonSocial" className={styles.input} value={empresa.razonSocial} onChange={setEmp('razonSocial')} onBlur={blur('razonSocial')} required aria-invalid={!!showErr('razonSocial')} />
                  {showErr('razonSocial') && <p className={styles.fieldError}>{empresaErrors.razonSocial}</p>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="cuit">CUIT</label>
                  <input id="cuit" className={styles.input} value={empresa.cuit} onChange={setEmp('cuit')} onBlur={blur('cuit')} placeholder="30-12345678-9" inputMode="numeric" required aria-invalid={!!showErr('cuit')} />
                  {showErr('cuit') && <p className={styles.fieldError}>{empresaErrors.cuit}</p>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contacto">Nombre y apellido de contacto</label>
                  <input id="contacto" className={styles.input} value={empresa.contacto} onChange={setEmp('contacto')} onBlur={blur('contacto')} autoComplete="name" required aria-invalid={!!showErr('contacto')} />
                  {showErr('contacto') && <p className={styles.fieldError}>{empresaErrors.contacto}</p>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="email">Email</label>
                  <input id="email" type="email" className={styles.input} value={empresa.email} onChange={setEmp('email')} onBlur={blur('email')} autoComplete="email" required aria-invalid={!!showErr('email')} />
                  {showErr('email') && <p className={styles.fieldError}>{empresaErrors.email}</p>}
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="telefono">Teléfono (opcional)</label>
                  <input id="telefono" type="tel" className={styles.input} value={empresa.telefono} onChange={setEmp('telefono')} autoComplete="tel" />
                </div>
                <label className={styles.checkboxRow}>
                  <input type="checkbox" checked={empresa.esSA} onChange={setEmp('esSA')} />
                  <span>La sociedad es S.A.</span>
                </label>
              </div>
            </div>

            <div className="card">
              <div className={styles.docsHeader}>
                <h2 className={styles.blockTitle}>Documentación requerida</h2>
                <span className={`${styles.counter} ${docsDone === docs.length ? styles.counterDone : ''}`}>
                  {docsDone} de {docs.length} completos
                </span>
              </div>
              <p className={styles.help}>
                Formatos admitidos: PDF, JPG, PNG o WebP. Hasta 10.0 MB por archivo y {MAX_FILES_PER_DOC} archivos
                por documento. La casilla se tilda sola al adjuntar.
              </p>

              <ol className={styles.docList}>
                {docs.map((d) =>
                  d.key === 'lineas_solicitadas' ? (
                    <li key={d.key} className={styles.docItem}>
                      <div className={styles.docHead}>
                        <Check done={!!lineasOk} />
                        <p className={styles.docLabel}>{d.label}</p>
                      </div>
                      <div className={styles.grid}>
                        <div className={styles.field}>
                          <label className={styles.label} htmlFor="monto">Monto</label>
                          <input id="monto" className={styles.input} value={lineas.monto} onChange={setLin('monto')} placeholder="Ej.: USD 200.000" />
                        </div>
                        <div className={styles.field}>
                          <label className={styles.label} htmlFor="plazo">Plazo</label>
                          <input id="plazo" className={styles.input} value={lineas.plazo} onChange={setLin('plazo')} placeholder="Ej.: 180 días" />
                        </div>
                        <div className={`${styles.field} ${styles.full}`}>
                          <label className={styles.label} htmlFor="destino">Destino del financiamiento</label>
                          <textarea id="destino" className={styles.textarea} rows={3} value={lineas.destino} onChange={setLin('destino')} />
                        </div>
                      </div>
                      <p className={styles.help}>Si tenés un documento con el detalle, también podés adjuntarlo (opcional).</p>
                      <Dropzone id="file-lineas_solicitadas" files={files.lineas_solicitadas || []} onChange={setDocFiles('lineas_solicitadas')} />
                    </li>
                  ) : (
                    <li key={d.key} className={styles.docItem}>
                      <div className={styles.docHead}>
                        <Check done={(files[d.key] || []).length > 0} />
                        <div>
                          <p className={styles.docLabel}>{d.label}</p>
                          {d.hint && <p className={styles.docHint}>{d.hint}</p>}
                        </div>
                      </div>
                      <Dropzone id={`file-${d.key}`} files={files[d.key] || []} onChange={setDocFiles(d.key)} />
                    </li>
                  )
                )}
              </ol>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="comentarios">Comentarios (opcional)</label>
                <textarea id="comentarios" className={styles.textarea} rows={3} value={comentarios} onChange={(e) => setComentarios(e.target.value)} />
              </div>
            </div>

            <div className={styles.submitRow}>
              {status === 'error' && (
                <p className={styles.submitError} role="alert">
                  <HiOutlineExclamationTriangle aria-hidden="true" /> {errorMsg}
                </p>
              )}
              <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={!complete || busy}>
                {status === 'uploading' && `Subiendo archivos… ${progress}%`}
                {status === 'sending' && 'Enviando documentación…'}
                {!busy && 'Enviar documentación'}
              </button>
              {busy && (
                <div className={styles.progress} aria-hidden="true">
                  <div className={styles.progressBar} style={{ width: `${status === 'sending' ? 100 : progress}%` }} />
                </div>
              )}
              {!complete && (
                <p className={styles.help}>
                  El envío se habilita cuando la documentación está completa (se envía todo junto, en un único envío).
                </p>
              )}
            </div>
          </form>
        )}

        <p className={styles.closing}>
          Ante cualquier consulta sobre los requisitos, nuestro equipo se encuentra a su disposición.
          <br />
          Atentamente, el equipo de Financiamiento Agro.
        </p>
      </div>
    </section>
  );
};

export default Financiamiento;
