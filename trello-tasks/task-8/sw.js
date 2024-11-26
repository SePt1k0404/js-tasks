const myCacheName = "cache-v1";
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
  const timeout = new Promise((_, rejected) => {
    setTimeout(() => rejected(new Error("Request timed out")), ms);
  });
  return Promise.race([promise, timeout]);
}
