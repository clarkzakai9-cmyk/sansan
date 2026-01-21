const CACHE_NAME = 'ai-game-bundle-v1';
const ASSETS = [
  './',
  './index.html',
  './master-loader.js',
  './4399.ss.js',
  './Barcelona.json',
  './Barcelona.data.unityweb',
  './Barcelona.wasm.code.unityweb',
  './Barcelona.wasm.framework.unityweb'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => response || fetch(event.request))
  );
});
