# Deploying

1. Build: `npm run build` (output in `dist/`). Static hosting is enough.
2. Environment variables on the host: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
   Do not set the secret key on the host; it is only for `scripts/seed-explanations.mjs` on your machine.
3. Single-page routing: every path must serve `index.html`.
   `vercel.json` (Vercel) and `public/_redirects` (Netlify, Cloudflare Pages) are included.
4. Supabase dashboard, Authentication, URL Configuration: set the Site URL to the deployed address and add it
   (plus `http://localhost:3000` for development) to Redirect URLs, otherwise email sign-in links will not return to the app.
5. Delete or change the test user (`admin@admin.com`) before going public.

## Netlify

`netlify.toml` and `.npmrc` are included (build command, publish folder, SPA redirect, install flag).
Vite bakes `VITE_*` values into the app **at build time**, and `.env.local` is not uploaded, so set them in Netlify:

1. Site configuration, Environment variables, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_PUBLISHABLE_KEY`
2. Deploys, Trigger deploy, **Clear cache and deploy site** (a normal redeploy can reuse the old build).
3. Supabase, Authentication, URL Configuration: add the Netlify address to Site URL / Redirect URLs.
