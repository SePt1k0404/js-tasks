const myCacheName = "cache-v2";
const cachedFiles = ["./task-8.html", "./task-8.js", "../../css/reset.css"];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches.open(myCacheName).then((cache) => {
      return cache.addAll(cachedFiles);
    })
  );
});

self.addEventListener("activate", (event) => {
  console.log("SW activated");
  const cacheWhitelist = [myCacheName];
  event.waitUntil(cleanOldCaches(cacheWhitelist));
});

self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheResponse) => {
      if (cacheResponse) {
        return cacheResponse;
      }
      return timeOut(
        fetch(evt.request)
          .then((networkResponse) => {
            if (!networkResponse || networkResponse.status !== 200) {
              throw new Error("Failed to fetch from network");
            }
            return caches.open(myCacheName).then((cache) => {
              cache.put(evt.request, networkResponse.clone());
              return networkResponse;
            });
          })
          .catch((error) => {
            console.log("Fetch error:", error.message);
            return new Response("Oops! Something went wrong.", {
              status: 408,
              statusText: "Request Timeout",
            });
          }),
        3000
      ).catch((error) => {
        console.log("Oops! Something went wrong." + error.message);
        return new Response("Oops! Something went wrong.", {
          status: 408,
          statusText: "Request Timeout",
        });
      });
    })
  );
});

function timeOut(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);
}

function cleanOldCaches(whitelist) {
  return caches.keys().then((cacheNames) =>
    Promise.all(
      cacheNames.map((cacheName) => {
        if (!whitelist.includes(cacheName)) {
          console.log(`Deleting old cache: ${cacheName}`);
          return caches.delete(cacheName);
        }
      })
    )
  );
}
