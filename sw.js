// Service Worker — A King's Lifestyle v0.0.11
// Network-first strategy: always try fresh content, fall back to cache offline
const CACHE_NAME = 'kings-lifestyle-v8';
const URLS_TO_CACHE = [
  '/',
  '/dashboard',
  '/onboarding',
  '/nourishment',
  '/attire',
  '/mentality',
  '/treasury',
  '/templecare',
  '/presence',
  '/speech',
  '/legacy',
  '/library',
  '/journal',
  '/settings',
  '/shared.js',
  '/pillar-template.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
