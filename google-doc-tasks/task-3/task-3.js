"use strict";

const refs = {
  taskForm: document.querySelector(".task-form"),
  buttonsContainer: document.querySelector(".buttons-container"),
  taskList: document.querySelector(".task-list"),
};

const createTaskCard = (data) => {
  refs.taskList.insertAdjacentHTML(
    "afterbegin",
    `
    <article class="task-item">
          <header class="task-header">Task Title: ${data.task}</header>
          <p class="task-priority">Priority: ${data.prior}</p>
          <p class="task-status">Status: New</p>
          <footer class="task-actions">
            <button class="in-prog">In progress</button>
            <button class="complete">Complete</button>
            <button class="delete">Delete</button>
          </footer>
        </article>
    `
  );
};

refs.taskForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(refs.taskForm);
  const taskData = {};
  for (const [key, value] of formData.entries()) {
    taskData[key] = value;
  }
  createTaskCard(taskData);
  evt.target.reset();
});

refs.taskList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete")) {
    const currentCard = evt.target.closest(".task-item");
    currentCard.remove();
  }
  if (evt.target.classList.contains("complete")) {
    const currentCard = evt.target.closest(".task-item");
    currentCard.classList.add("completed");
    currentCard.classList.remove("progressed");
    currentCard.querySelector(".task-status").innerText = "Status: Completed";
  }
  if (evt.target.classList.contains("in-prog")) {
    const currentCard = evt.target.closest(".task-item");
    currentCard.classList.add("progressed");
    currentCard.classList.remove("completed");
    currentCard.querySelector(".task-status").innerText = "Status: In progress";
  }
});
