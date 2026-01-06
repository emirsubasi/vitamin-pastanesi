const CACHE_NAME = "vitamin-cache-v1";
const FILES = [
  "./",
  "./index.html",
  "./detail.html",
  "./about.html",
  "./contact.html",
  "./offline.html",
  "./js/employees.js",
  "./js/detail.js",
  "./js/app.js",
  "./data/employees.json"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(FILES)));
});

self.addEventListener("fetch", e => {
  e.respondWith(
    fetch(e.request).catch(() =>
      caches.match(e.request).then(res => res || caches.match("offline.html"))
    )
  );
});
