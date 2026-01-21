const CACHE_NAME = 'subway-surfers-v1';
const ASSETS = [
  './',
  './index.html',
  './master-loader.js',
  './4399.ss.js',
  './Barcelona.json',
  './Barcelona.data.unityweb',
  './Barcelona.wasm.code.unityweb',
  './Barcelona.wasm.framework.unityweb',
  './img/FirstAvatar.png'
];

// Install: Save game files to browser storage
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch: Intercept requests to allow offline play
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
