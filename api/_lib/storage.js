// Acceso a Supabase (proyecto AgroTabaco). Los archivos con "_" no son rutas en Vercel.
// Los archivos van a la raíz del bucket como `<submission_id>/<document_key>/<archivo>`, igual que
// agrotabaco.com: la tabla documentation_files exige que storage_path empiece con el submission_id.
import { createClient } from '@supabase/supabase-js';

export const BUCKET = process.env.SUPABASE_BUCKET || 'documentacion';

export const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

export function getSupabase() {
  const { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export const safeName = (name = '') =>
  String(name)
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '_')
    .slice(-80) || 'archivo';
