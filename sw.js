// Service Worker — A King's Lifestyle
const CACHE_NAME = 'kings-lifestyle-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/onboarding.html',
  '/nourishment.html',
  '/attire.html',
  '/mentality.html',
  '/treasury.html',
  '/body.html',
  '/presence.html',
  '/speech.html',
  '/legacy.html',
  '/journal.html',
  '/settings.html',
  '/shared.js',
  '/pillar-template.js',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) => {
      return Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});
