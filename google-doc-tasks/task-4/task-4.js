"use strict";

const refs = {
  entryForm: document.querySelector(".entry-form"),
  balanceField: document.getElementById("balance"),
  entryList: document.getElementById("entry-list"),
};

const EntryObj = {
  amount: 0,
  date: "",
  category: "",
  type: "",

  updateAmount(newAmount) {
    this.amount = newAmount;
  },

  updateCategory(newCategory) {
    this.category = newCategory;
  },
};

const entries = [];

const findEntry = (id) => {
  return entries.find((entry) => entry.id === id);
};

const createNewEntryCard = (data) => {
  refs.entryList.insertAdjacentHTML(
    "afterbegin",
    `
    <li class="entry-item ${data.type}" data-id="${data.id}">
      <div class="entry-info">
        <p class="entry-type ${data.type}">${data.type}</p>
        <p class="entry-category">
          <span>${data.category}</span>
          <button class="edit-category-btn">Edit</button>
          <button class="save-category-btn is-hidden">Save</button>
          <input type="text" class="edit-category-input is-hidden" value="${
            data.category
          }"/>
        </p>
        <p class="entry-date">${data.date}</p>
      </div>
      <div class="entry-amount">
        <p>
          ${data.type === "income" ? "+" : "-"}${data.amount} UAH
          <button class="edit-amount-btn">Edit</button>
          <input type="number" class="edit-amount-input" value="${
            data.amount
          }" style="display:none"/>
        </p>
      </div>
    </li>
  `
  );
};

refs.entryList.addEventListener("click", (evt) => {
  const target = evt.target;
  const currentEntry = target.closest(".entry-item");
  if (!currentEntry) return;
  if (target.classList.contains("edit-category-btn")) {
    const categoryFiled = currentEntry.querySelector(".entry-category span");
    const categorySaveBtn = currentEntry.querySelector(".save-category-btn");
    const editCategoryFiled = currentEntry.querySelector(
      ".edit-category-input"
    );
    target.classList.toggle("is-hidden");
    categoryFiled.classList.toggle("is-hidden");
    categorySaveBtn.classList.toggle("is-hidden");
    editCategoryFiled.classList.toggle("is-hidden");
  }
  if (target.classList.contains("save-category-btn")) {
    const categoryFiled = currentEntry.querySelector(".entry-category span");
    const editCategoryFiled = currentEntry.querySelector(
      ".edit-category-input"
    );
    const newCategory = editCategoryFiled.value;
    categoryFiled.innerText = newCategory;
    categoryFiled.classList.toggle("is-hidden");
    editCategoryFiled.classList.toggle("is-hidden");
    target.classList.toggle("is-hidden");
    currentEntry
      .querySelector(".edit-category-btn")
      .classList.toggle("is-hidden");

    const entryId = currentEntry.dataset.id;
    const entry = findEntry(entryId);
    entry.updateCategory(newCategory);
  }
});

refs.entryForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  const newEntry = Object.assign({}, EntryObj);
  newEntry.id = crypto.randomUUID();
  for (const [key, value] of formData.entries()) {
    newEntry[key] = value;
  }
  createNewEntryCard(newEntry);
  let balance = Number(refs.balanceField.innerText);
  refs.balanceField.innerText =
    newEntry.type === "income"
      ? (balance += Number(newEntry.amount))
      : (balance -= Number(newEntry.amount));
  entries.push(newEntry);
  evt.target.reset();
});
