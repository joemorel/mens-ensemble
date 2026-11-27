// Offline support for the app's own files and the Firebase library.
// Firebase's database traffic is never touched here; Firestore keeps its own offline copy.
const CACHE = 'ensemble-v2';
const ASSETS = ['./', './index.html', './manifest.json', './icon-180.png', './icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  const own = url.origin === self.location.origin && !url.pathname.startsWith('/__/');
  const sdk = url.hostname === 'www.gstatic.com' && url.pathname.startsWith('/firebasejs/');
  if (e.request.method !== 'GET' || !(own || sdk)) return;
  e.respondWith(
    fetch(e.request).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return r; })
      .catch(() => caches.match(e.request, {ignoreSearch: true}).then(r => r || caches.match('./index.html')))
  );
});
