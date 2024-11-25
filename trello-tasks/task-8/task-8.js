window.addEventListener("load", () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("../../sw.js")
      .then((registration) => {
        console.log(
          "Service Worker registered with scope:",
          registration.scope
        );
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  }
});

const postFeed = document.querySelector("#postFeed");

const createArticleElement = (title, body) => `
    <article class='article card'>
      <h2 class='title'>${title}</h2>
      <p class='text'>${body}</p>
    </article>
  `;

const addToFeed = (data) => {
  if (postFeed) {
    data.forEach(({ title, body }) => {
      postFeed.innerHTML += createArticleElement(title, body);
    });
  }
};

if (postFeed) {
  fetch("https://jsonplaceholder.typicode.com/posts").then(async (res) => {
    const data = await res.json();

    addToFeed(data);
  });
}
