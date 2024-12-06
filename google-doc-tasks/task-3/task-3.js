"use strict";

const storageKey = "tasks";

const storage = {
  get() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  },
  set(data) {
    localStorage.setItem(storageKey, JSON.stringify(data));
  },
  init() {
    if (!localStorage.getItem(storageKey)) {
      this.set([]);
    }
  },
};

storage.init();

const refs = {
  taskForm: document.querySelector(".task-form"),
  buttonsContainer: document.querySelector(".buttons-container"),
  taskList: document.querySelector(".task-list"),
};

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const createTaskCard = (data) => {
  refs.taskList.insertAdjacentHTML(
    "afterbegin",
    `
    <article class="task-item" data-id=${data.id} data-prior=${Number(
      data.prior
    )}>
      <header class="task-header">Task Title: ${data.task}</header>
      <p class="task-priority">Priority: ${
        Number(data.prior) === 1
          ? "High"
          : Number(data.prior) === 2
          ? "Medium"
          : "Low"
      }</p>
      <p class="task-status">Status: ${capitalize(data.progress)}</p>
      <footer class="task-actions">
        <button class="in-prog">In progress</button>
        <button class="complete">Complete</button>
        <button class="delete">Delete</button>
      </footer>
    </article>
    `
  );
};

const updateTaskInList = (id, status) => {
  const localStorageList = [...storage.get()];
  const taskIndex = localStorageList.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    localStorageList[taskIndex].progress = status;
  }
  storage.set(localStorageList);
};

const filterByStatus = (status) => {
  const taskListHTML = [...refs.taskList.children];
  taskListHTML.forEach((task) => {
    task.classList.remove("hidden");
    const taskStatus = task.querySelector(".task-status").innerText;
    if (status && taskStatus !== `Status: ${status}`) {
      task.classList.add("hidden");
    }
  });
};

const filterCards = (filter) => {
  const taskListHTML = [...refs.taskList.children];
  taskListHTML.forEach((task) => task.classList.remove("hidden"));

  switch (filter) {
    case "priority":
      const sortedList = taskListHTML.sort(
        (a, b) => a.dataset.prior - b.dataset.prior
      );
      sortedList.forEach((task) => refs.taskList.appendChild(task));
      break;
    case "new":
      filterByStatus("New");
      break;
    case "progress":
      filterByStatus("In progress");
      break;
    case "completed":
      filterByStatus("Completed");
      break;
    default:
      filterByStatus();
  }
};

refs.taskForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(refs.taskForm);
  const taskData = {
    id: crypto.randomUUID(),
    progress: "new",
  };
  for (const [key, value] of formData.entries()) {
    taskData[key] = value;
  }
  const localStorageList = [...storage.get()];
  localStorageList.push(taskData);
  storage.set(localStorageList);
  createTaskCard(taskData);
  evt.target.reset();
});

refs.taskList.addEventListener("click", (evt) => {
  const currentCard = evt.target.closest(".task-item");
  const taskId = currentCard.dataset.id;

  if (evt.target.classList.contains("delete")) {
    currentCard.remove();
    const localStorageList = [...storage.get()];
    const taskIndex = localStorageList.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) localStorageList.splice(taskIndex, 1);
    storage.set(localStorageList);
  }

  if (evt.target.classList.contains("complete")) {
    currentCard.classList.add("completed");
    currentCard.classList.remove("progressed");
    currentCard.querySelector(".task-status").innerText = "Status: Completed";
    updateTaskInList(taskId, "completed");
  }

  if (evt.target.classList.contains("in-prog")) {
    currentCard.classList.add("progressed");
    currentCard.classList.remove("completed");
    currentCard.querySelector(".task-status").innerText = "Status: In progress";
    updateTaskInList(taskId, "In progress");
  }
});

refs.buttonsContainer.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("all")) {
    filterCards();
  } else if (evt.target.classList.contains("priority")) {
    filterCards("priority");
  } else if (evt.target.classList.contains("new")) {
    filterCards("new");
  } else if (evt.target.classList.contains("progress")) {
    filterCards("progress");
  } else if (evt.target.classList.contains("completed")) {
    filterCards("completed");
  }
});

window.addEventListener("load", () => {
  const localStorageList = [...storage.get()];
  if (localStorageList.length !== 0) {
    localStorageList.forEach((task) => {
      createTaskCard(task);
    });
    [...refs.taskList.children].forEach((task) => {
      const taskStatus = task.querySelector(".task-status").innerText;
      console.log(taskStatus);
      if (taskStatus === `Status: In progress`) {
        task.classList.add("progressed");
      } else if (taskStatus === `Status: Completed`) {
        task.classList.add("completed");
      }
    });
  }
});
