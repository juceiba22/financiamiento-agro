<<<<<<< HEAD
# Financiamiento Agro

Landing de instrumentos financieros digitales (warrants en el MAV) y formulario de documentación para
calificar como Persona Jurídica.

- `/` — landing con el contenido de "AgroTabaco — Instrumentos Financieros Digitales".
- `/financiamiento` — formulario de documentación.
- `api/upload.js` — genera una URL firmada para que el navegador suba cada archivo directo al bucket
  privado de Supabase (proyecto AgroTabaco), en `<id-solicitud>/<documento>/`, igual que agrotabaco.com.
- `api/solicitud.js` — valida la solicitud, la registra en las tablas del portal
  (`documentation_submissions`, con status `nuevo` y la nota "[Enviado desde Financiamiento Agro]", y
  `documentation_files`), descarga los archivos y los envía por email con Resend (si superan ~25 MB se
  reparten en varios emails). Si el registro en las tablas falla, queda en los logs de Vercel y el email se
  envía igual.

## Configuración en Vercel (una sola vez)

1. **Supabase:** se usa el bucket privado `documentacion` del proyecto AgroTabaco (límite 10 MB y
   PDF/JPG/PNG/WebP). En *Project Settings → API* copiar la **Project URL** y la clave **service_role**
   (o *secret key*).
2. **Resend:** crear una cuenta en [resend.com](https://resend.com), generar una API key y, si se quiere
   enviar desde un dominio propio, verificarlo en *Domains*.
3. **Variables de entorno** (*Settings → Environment Variables*), ver `.env.example`:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` — secreta, solo va en Vercel.
   - `SUPABASE_BUCKET` — opcional, por defecto `documentacion`.
   - `RESEND_API_KEY`
   - `SOLICITUDES_EMAIL_TO` — quién recibe las solicitudes.
   - `SOLICITUDES_EMAIL_FROM` — opcional. Sin dominio verificado se usa `onboarding@resend.dev`, que solo
     puede enviar al email con el que se creó la cuenta de Resend.
4. Volver a desplegar.

## Desarrollo

```bash
npm install
npm run dev
```

`npm run dev` sirve solo el frontend. Para probar el envío del formulario en local hace falta
`vercel dev` (Vercel CLI) con las variables de entorno cargadas (`vercel env pull`).
=======
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
>>>>>>> 918a8b4cb729dc29fcb882af5a2ed04ff1ab91e9
