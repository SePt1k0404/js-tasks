self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  // event.waitUntil(
  //   caches.open("my-cache-v1").then((cache) => {
  //     return cache.addAll(["./task-8.html", "./task-8.js"]);
  //   })
  // );
});

self.addEventListener("activate", (event) => {
  console.log("SW activated");
  // const cacheWhitelist = ["my-cache-v1"];
  // event.waitUntil(
  //   caches.keys().then((cacheNames) => {
  //     return Promise.all(
  //       cacheNames.map((cacheName) => {
  //         if (!cacheWhitelist.includes(cacheName)) {
  //           return caches.delete(cacheName);
  //         }
  //       })
  //     );
  //   })
  // );
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     fetch(event.request)
//       .then((networkResponse) => {
//         const networkResponseClone = networkResponse.clone();
//         caches.open("my-cache-v1").then((cache) => {
//           cache.put(event.request, networkResponseClone);
//         });
//         return networkResponse;
//       })
//       .catch(() => {
//         return caches.match(event.request).then((res) => res);
//       })
//   );
// });
