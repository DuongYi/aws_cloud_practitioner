/* Service worker: lets the app open offline and load fast.
 * - Hashed build files (/assets/*) never change, so they are cached on first use and served from cache.
 * - Page navigations try the network first (so updates arrive) and fall back to the cached shell offline.
 * - Cross-origin requests (Supabase API) are never touched: progress sync always goes to the network.
 * The build step stamps BUILD so every deploy installs a fresh worker that precaches the new files.
 */
const BUILD = '__BUILD__'; // replaced at build time
const SHELL = 'shell';
const ASSETS = 'assets';

async function precache() {
  const shell = await caches.open(SHELL);
  await shell.addAll(['/', '/manifest.webmanifest', '/icons/icon-192.png']);
  try {
    const res = await fetch('/precache-manifest.json', { cache: 'no-store' });
    if (!res.ok) return;
    const { files } = await res.json();
    const assets = await caches.open(ASSETS);
    await assets.addAll(files);
    // Drop files from older builds
    const keep = new Set(files);
    for (const req of await assets.keys()) {
      const p = new URL(req.url).pathname;
      if (p.startsWith('/assets/') && !keep.has(p)) await assets.delete(req);
    }
  } catch (e) {
    // Offline precache is best effort; the app still works online.
  }
}

self.addEventListener('install', (event) => {
  event.waitUntil(precache().then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => ![SHELL, ASSETS].includes(k)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Page loads: network first, cached shell when offline (the app is a single page, "/" serves every route).
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(SHELL).then((c) => c.put('/', copy));
          return res;
        })
        .catch(() => caches.match('/').then((r) => r || Response.error()))
    );
    return;
  }

  // Build output, fonts and icons: cache first.
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/icons/')) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(ASSETS).then((c) => c.put(req, copy));
            }
            return res;
          })
      )
    );
  }
});
