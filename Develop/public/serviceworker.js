
const PRECACHE = 'js13kPWA-v1';
const RUNTIME = 'runtime';
// varible for storing all the files 
const FILES_TO_CACHE = [
    '/',
    '/index.html',
    '/index.js',
    '/styles.css',
    './icons/icon-192x192.png',
    './icons/icon-512x512.png',
    'https://cdn.jsdelivr.net/npm/chart.js@2.8.0'
]

// Installer event
self.addEventListener('install', (e) => {
    e.waitUntil(
      caches
      .open(PRECACHE)
      .then((cache) => cache.addAll(FILES_TO_CACHE))
      .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter((cacheName) => !currentCaches.includes(cacheName));
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (!event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.open(RUNTIME).then(cache => {
        return fetch(event.request)
        .then(response => {
          cache.put(event.request, response.clone());
          return response;
        })
        .catch(() => caches.match(event.request));
      })
    )
    return;
}

event.respondWith(
  caches.match(event.request).then(cachedResponse => {
    if (cachedResponse) {
      return cachedResponse
    }
    return fetch(event.request).then(response => {
      return cache.put(event.request, response.clone()).then(() => {
        return response
      })
    })
  })
)
})