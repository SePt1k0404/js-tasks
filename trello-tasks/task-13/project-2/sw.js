"use strict";

const CACHE_NAME = "status-cache-v1";
const urlsToCache = [
  "./",
  "./project-2.html",
  "./project-2.css",
  "./project-2.js",
];

self.addEventListener("install", (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (evt) => {
  const cacheWhitelist = [CACHE_NAME];
  evt.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`Deleting outdated cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(evt.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }
        const clonedResponse = response.clone();
        caches
          .open(CACHE_NAME)
          .then((cache) => cache.put(evt.request, clonedResponse));
        return response;
      });
    })
  );
});
