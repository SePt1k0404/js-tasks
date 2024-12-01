"use strict";

const localKeyUncompleted = "tasksUncompleted",
  localKeyCompleted = "tasksCompleted";

if (!localStorage.getItem(localKeyCompleted)) {
  localStorage.setItem(localKeyCompleted, JSON.stringify([]));
}
if (!localStorage.getItem(localKeyUncompleted)) {
  localStorage.setItem(localKeyUncompleted, JSON.stringify([]));
}

const refs = {
  taskForm: document.getElementById("task-form"),
  taskList: document.querySelector(".task-list"),
  tasksFilters: document.querySelector(".button-list"),
};

const getAllTasks = (tasksType) => JSON.parse(localStorage.getItem(tasksType));
const setAllTasks = (tasksType, tasksArr) =>
  localStorage.setItem(tasksType, JSON.stringify(tasksArr));

const addTasksMarkup = (task) => {
  const { id, text, completed } = task;
  const isCompleted = completed ? "completed" : "";
  const isDisplayNone = completed ? "displayNone" : "";
  refs.taskList.insertAdjacentHTML(
    "beforeend",
    `
    <li class="task-list__item ${isCompleted}" data-id="${id}">
      <span class="task-text">${text}</span>
      <div class="task-actions">
        <button class="complete-btn ${isDisplayNone}">Complete</button>
        <button class="delete-btn">Delete</button>
      </div>
    </li>
  `
  );
};

window.addEventListener("load", () => {
  const tasksUncompleted = getAllTasks(localKeyUncompleted) || [];
  const tasksCompleted = getAllTasks(localKeyCompleted) || [];

  tasksUncompleted.forEach((task) => addTasksMarkup(task));
  tasksCompleted.forEach((task) => addTasksMarkup(task));
});

refs.taskForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const taskText = evt.currentTarget.task.value.trim();
  if (!taskText) return;
  const task = {
    id: self.crypto.randomUUID(),
    text: taskText,
    completed: false,
  };
  addTasksMarkup(task);
  const tasksUncompleted = getAllTasks(localKeyUncompleted) || [];
  tasksUncompleted.push(task);
  setAllTasks(localKeyUncompleted, tasksUncompleted);
  evt.target.reset();
});

refs.taskList.addEventListener("click", (evt) => {
  const tasksUncompleted = getAllTasks(localKeyUncompleted) || [];
  const tasksCompleted = getAllTasks(localKeyCompleted) || [];
  const card = evt.target.closest(".task-list__item");
  if (!card) return;
  const taskId = card.dataset.id;
  if (evt.target.classList.contains("complete-btn")) {
    card.classList.add("completed");
    evt.target.classList.add("displayNone");
    const task = tasksUncompleted.find((item) => item.id === taskId);
    if (task) {
      task.completed = true;
      tasksCompleted.push(task);
      setAllTasks(
        localKeyUncompleted,
        tasksUncompleted.filter((item) => item.id !== taskId)
      );
      setAllTasks(localKeyCompleted, tasksCompleted);
    }
  }
  if (evt.target.classList.contains("delete-btn")) {
    setAllTasks(
      localKeyUncompleted,
      tasksUncompleted.filter((item) => item.id !== taskId)
    );
    setAllTasks(
      localKeyCompleted,
      tasksCompleted.filter((item) => item.id !== taskId)
    );
    card.remove();
  }
});

refs.tasksFilters.addEventListener("click", (evt) => {
  const tasksUncompleted = getAllTasks(localKeyUncompleted) || [];
  const tasksCompleted = getAllTasks(localKeyCompleted) || [];
  if (evt.target.classList.contains("button-list__filter")) {
    const tasksType = evt.target.dataset.type;
    [...evt.currentTarget.children].map((item) =>
      item.children[0].classList.remove("active")
    );
    evt.target.classList.add("active");
    refs.taskList.innerHTML = "";
    if (tasksType === "completed") {
      tasksCompleted.forEach((task) => addTasksMarkup(task));
    } else if (tasksType === "uncompleted") {
      tasksUncompleted.forEach((task) => addTasksMarkup(task));
    } else {
      tasksUncompleted.forEach((task) => addTasksMarkup(task));
      tasksCompleted.forEach((task) => addTasksMarkup(task));
    }
  }
});
