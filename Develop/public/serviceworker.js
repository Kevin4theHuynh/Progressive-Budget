console.log("This is service worker")


const cacheName = 'js13kPWA-v1';
// varible for storing all the files 
const  cacheFiles = [
    '/index.html',
    '/index.js',
    '/styles.css',
    '/transaction.js',
    '/api.js',
]

// Installer event
self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    
  });


const budgetImages = [];
    for (let i = 0; i < budget.length; i++) {
  budgetImages.push(`data/img/${budget[i].slug}.jpg`);
}
const cacheContent = cacheFiles.concat(budgetImages);