# Deploying

1. Build: `npm run build` (output in `dist/`). Static hosting is enough.
2. Environment variables on the host: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
   Do not set the secret key on the host; it is only for `scripts/seed-explanations.mjs` on your machine.
3. Single-page routing: every path must serve `index.html`.
   `vercel.json` (Vercel) and `public/_redirects` (Netlify, Cloudflare Pages) are included.
4. Supabase dashboard, Authentication, URL Configuration: set the Site URL to the deployed address and add it
   (plus `http://localhost:3000` for development) to Redirect URLs, otherwise email sign-in links will not return to the app.
5. Delete or change the test user (`admin@admin.com`) before going public.
