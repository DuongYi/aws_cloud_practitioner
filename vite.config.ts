import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'node:fs';
import {defineConfig} from 'vite';

// Lists every built asset so the service worker can cache the whole app up front (offline use),
// and stamps the build id into sw.js so each deploy triggers a service worker update.
const pwaPrecache = () => {
  let outDir = 'dist';
  let files: string[] = [];
  return {
    name: 'pwa-precache',
    apply: 'build' as const,
    configResolved(cfg: { build: { outDir: string } }) { outDir = cfg.build.outDir; },
    writeBundle(_: unknown, bundle: Record<string, unknown>) {
      files = Object.keys(bundle)
        .filter((f) => f.startsWith('assets/') && !/(cyrillic|greek|symbols)/.test(f))
        .map((f) => '/' + f);
    },
    closeBundle() {
      const build = String(Date.now());
      fs.writeFileSync(path.join(outDir, 'precache-manifest.json'), JSON.stringify({ build, files }));
      const swPath = path.join(outDir, 'sw.js');
      if (fs.existsSync(swPath)) fs.writeFileSync(swPath, fs.readFileSync(swPath, 'utf8').replace('__BUILD__', build));
    },
  };
};

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), pwaPrecache()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
