self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open("my-cache").then((cache) => {
      return cache.addAll([
        "./trello-tasks-html/task-8.html",
        "./trello-tasks/task-8/task-8.js",
        "./css/reset.css",
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = ["my-cache"];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
