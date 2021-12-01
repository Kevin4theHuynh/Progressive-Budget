console.log("This is service worker")

const cacheName = 'js13kPWA-v1';
const  cacheFiles = [
    '/index.html',
    '/index.js',
    '/styles.css',
    '/transaction.js',
    '/api.js',
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
  });