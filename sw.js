// sw.js — caches only the static app shell (HTML/CSS/JS/icons)
// so the app opens instantly and works offline. Your actual
// task data always goes straight to the network (the Google
// Sheet backend) and is never cached here.

const CACHE_NAME = 'command-board-v1';
const SHELL_FILES = [
  './reminder_app.html',
  './config.js',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never intercept cross-origin calls (the Apps Script / Google Sheet API) —
  // those must always hit the network live so sync stays real-time.
  if (url.origin !== self.location.origin) return;

  // App shell: network-first, so pushing an update to GitHub Pages is
  // picked up right away, falling back to cache when offline.
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request))
  );
});
