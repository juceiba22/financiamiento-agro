// Documentación para calificar como Persona Jurídica. Compartido entre el formulario y /api.

export const DOCS = [
  { key: 'estatuto_acta', label: 'Estatuto de la sociedad + Última acta de Directorio con distribución de cargos.' },
  { key: 'ddjj_bienes', label: 'Última DDJJ de Bs. Personales de los socios, con presentación y apertura de Bs. o MMBB firmada por Contador.' },
  { key: 'estados_contables', label: 'Copia simple de los últimos 2 estados contables certificados por Consejo Profesional de Ciencias Económicas.' },
  { key: 'ventas_post_balance', label: 'Ventas Post-Balance.' },
  { key: 'deudas_post_balance', label: 'Deudas Post-Balance.' },
  { key: 'dni_socios', label: 'Copia DNI de los socios.', hint: 'Frente y dorso de cada socio.' },
  { key: 'certificado_mipyme', label: 'Certificado MiPyME.' },
  { key: 'libro_accionistas', label: 'Última hoja de libro de accionistas (en caso de ser S.A.).', onlySA: true },
  { key: 'lineas_solicitadas', label: 'Líneas solicitadas (detalle de monto, plazo y destino del financiamiento).' },
];

export const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
export const ACCEPT = '.pdf,.jpg,.jpeg,.png,.webp,' + ALLOWED_TYPES.join(',');
export const MAX_FILE_BYTES = 10 * 1024 * 1024;
export const MAX_FILES_PER_DOC = 10;
