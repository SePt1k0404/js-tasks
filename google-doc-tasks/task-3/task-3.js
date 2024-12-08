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

const taskStatusText = {
  1: "High",
  2: "Medium",
  3: "Low",
};

const createTaskCard = (data) => {
  const taskPriority = taskStatusText[data.prior] || "Low";
  return `
    <article class="task-item" data-id="${data.id}" data-prior="${data.prior}">
      <header class="task-header">Task Title: ${data.task}</header>
      <p class="task-priority">Priority: ${taskPriority}</p>
      <p class="task-status">Status: ${capitalize(data.progress)}</p>
      <footer class="task-actions">
        <button class="in-prog">In progress</button>
        <button class="complete">Complete</button>
        <button class="delete">Delete</button>
      </footer>
    </article>
  `;
};

const updateTaskInList = (id, status) => {
  const localStorageList = storage.get();
  const task = localStorageList.find((task) => task.id === id);
  if (task) task.progress = status;
  storage.set(localStorageList);
};

const filterByStatus = (status) => {
  [...refs.taskList.children].forEach((task) => {
    const taskStatus = task.querySelector(".task-status").innerText;
    task.classList.toggle(
      "hidden",
      status && taskStatus !== `Status: ${status}`
    );
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

const handleTaskFormSubmit = (evt) => {
  evt.preventDefault();
  const formData = new FormData(refs.taskForm);
  const taskData = {
    id: crypto.randomUUID(),
    progress: "New",
  };
  formData.forEach((value, key) => {
    taskData[key] = value;
  });
  const localStorageList = storage.get();
  localStorageList.push(taskData);
  storage.set(localStorageList);
  refs.taskList.insertAdjacentHTML("afterbegin", createTaskCard(taskData));
  evt.target.reset();
};

const handleTaskClick = (evt) => {
  const currentCard = evt.target.closest(".task-item");
  const taskId = currentCard.dataset.id;
  const localStorageList = storage.get();

  if (evt.target.classList.contains("delete")) {
    currentCard.remove();
    const taskIndex = localStorageList.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) localStorageList.splice(taskIndex, 1);
    storage.set(localStorageList);
  }

  if (evt.target.classList.contains("complete")) {
    currentCard.classList.add("completed");
    currentCard.classList.remove("progressed");
    currentCard.querySelector(".task-status").innerText = "Status: Completed";
    updateTaskInList(taskId, "Completed");
  }

  if (evt.target.classList.contains("in-prog")) {
    currentCard.classList.add("progressed");
    currentCard.classList.remove("completed");
    currentCard.querySelector(".task-status").innerText = "Status: In progress";
    updateTaskInList(taskId, "In progress");
  }
};

const handleFilterClick = (evt) => {
  const filter = evt.target.classList.contains("all")
    ? undefined
    : evt.target.classList.contains("priority")
    ? "priority"
    : evt.target.classList.contains("new")
    ? "new"
    : evt.target.classList.contains("progress")
    ? "progress"
    : evt.target.classList.contains("completed")
    ? "completed"
    : undefined;

  filterCards(filter);
};

const handlePageLoad = () => {
  const localStorageList = storage.get();
  if (localStorageList.length > 0) {
    localStorageList.forEach((task) => {
      refs.taskList.insertAdjacentHTML("afterbegin", createTaskCard(task));
    });
    [...refs.taskList.children].forEach((task) => {
      const taskStatus = task.querySelector(".task-status").innerText;
      if (taskStatus === "Status: In progress")
        task.classList.add("progressed");
      if (taskStatus === "Status: Completed") task.classList.add("completed");
    });
  }
};

refs.taskForm.addEventListener("submit", handleTaskFormSubmit);
refs.taskList.addEventListener("click", handleTaskClick);
refs.buttonsContainer.addEventListener("click", handleFilterClick);
window.addEventListener("load", handlePageLoad);
