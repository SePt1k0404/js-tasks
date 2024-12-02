"use strict";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => console.log("Service Worker registered"))
    .catch((error) =>
      console.error("Service Worker registration failed:", error)
    );
}

const refs = {
  status: document.querySelector(".status"),
  dataList: document.querySelector("#data-list"),
  syncButton: document.querySelector(".sync-button"),
  addDataButton: document.querySelector("#add-data-button"),
};

const checkNetworkStatus = () => {
  if (navigator.onLine) {
    refs.status.textContent = "Network is available!";
    refs.status.style.color = "green";
    refs.syncButton.disabled = false;
  } else {
    refs.status.textContent = "Network is unavailable!";
    refs.status.style.color = "red";
    refs.syncButton.disabled = true;
  }
};

const syncData = () => {
  const dataToSync = JSON.parse(localStorage.getItem("offlineData")) || [];

  if (dataToSync.length > 0) {
    const syncPromises = dataToSync.map((data) =>
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("Data synced: ", result);
        })
        .catch((error) => console.error("Sync error: ", error))
    );

    Promise.all(syncPromises).then(() => {
      localStorage.removeItem("offlineData");
    });
  }
};

const fetchData = () => {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      refs.dataList.innerHTML = "";
      data.slice(0, 15).forEach((item) => {
        const li = document.createElement("li");
        li.classList.add("data-list__item");
        li.textContent = item.title;
        li.dataset.id = item.id;
        li.addEventListener("click", editItem);
        refs.dataList.appendChild(li);
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
};

const editItem = (evt) => {
  const li = evt.target;
  const oldText = li.textContent;

  const input = document.createElement("input");
  input.type = "text";
  input.value = oldText;
  li.innerHTML = "";
  li.appendChild(input);
  input.focus();

  input.addEventListener("blur", () => {
    const newText = input.value.trim();
    if (newText && newText !== oldText) {
      li.textContent = newText;
      updatePost(li.dataset.id, newText);
    } else {
      li.textContent = oldText;
    }
  });
};

const updatePost = (id, newTitle) => {
  if (navigator.onLine) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Post updated: ", result);
      })
      .catch((error) => console.error("Error updating post:", error));
  } else {
    console.log("No internet, saving changes locally.");
    saveDataToLocalStorage({ id, title: newTitle });
  }
};

const saveDataToLocalStorage = (data) => {
  let offlineData = JSON.parse(localStorage.getItem("offlineData")) || [];
  offlineData.push(data);
  localStorage.setItem("offlineData", JSON.stringify(offlineData));
};

window.addEventListener("online", checkNetworkStatus);
window.addEventListener("offline", checkNetworkStatus);
window.addEventListener("load", () => {
  fetchData();
  checkNetworkStatus();
});

refs.syncButton.addEventListener("click", syncData);
