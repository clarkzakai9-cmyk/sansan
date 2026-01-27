const CACHE_NAME = 'subway-surfers-barcelona-v1';

// List of files to cache immediately
const ASSETS_TO_CACHE = [
    './',
    './index.html', // Assuming your HTML file is named index.html
    './4399.ss.js',
    './master-loader.js',
    './Barcelona.json',
    './Barcelona.wasm.framework.unityweb',
    './img/FirstAvatar.png',
    // The split files required by the specific loader in your HTML
    './Barcelona.wasm.code.unityweb.part1',
    './Barcelona.wasm.code.unityweb.part2',
    './Barcelona.data.unityweb.part1',
    './Barcelona.data.unityweb.part2'
];

// Install Event: Cache all assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[Service Worker] Caching all assets');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    // Force the waiting service worker to become the active service worker
    self.skipWaiting();
});

// Activate Event: Clean up old caches if necessary
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[Service Worker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

// Fetch Event: Serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Return cached response if found
            if (response) {
                return response;
            }
            // Otherwise, fetch from network
            return fetch(event.request);
        })
    );
});
