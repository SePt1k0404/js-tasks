"use strict";

const refs = {
  entryForm: document.querySelector(".entry-form"),
  balanceField: document.getElementById("balance"),
  entryList: document.getElementById("entry-list"),
};

const EntryObj = {
  id: "",
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
          <span>${data.type === "income" ? "+" : "-"}${data.amount} UAH</span>
          <button class="edit-amount-btn">Edit</button>
          <button class="save-amount-btn is-hidden">Save</button>
          <input type="number" class="edit-amount-input is-hidden" value="${
            data.amount
          }"/>
        </p>
      </div>
    </li>
  `
  );
};

const newBalance = (entry, newAmount = null) => {
  const balanceElement = refs.balanceField;
  let currentBalance = Number(balanceElement.innerText);
  let adjustment = 0;
  if (newAmount === null) {
    adjustment =
      entry.type === "income" ? Number(entry.amount) : -Number(entry.amount);
  } else {
    const oldAmount = Number(entry.amount);
    adjustment =
      entry.type === "income"
        ? Number(newAmount) - oldAmount
        : oldAmount - Number(newAmount);
  }
  if (currentBalance + adjustment < 0) {
    alert("Error: The balance cannot be negative.");
    return false;
  }
  currentBalance += adjustment;
  balanceElement.innerText = currentBalance.toString();
  if (newAmount !== null) {
    entry.updateAmount(newAmount);
  }

  return true;
};

refs.entryList.addEventListener("click", (evt) => {
  const target = evt.target;
  const currentEntry = target.closest(".entry-item");
  if (!currentEntry) return;

  if (target.classList.contains("edit-category-btn")) {
    const categoryField = currentEntry.querySelector(".entry-category span");
    const categorySaveBtn = currentEntry.querySelector(".save-category-btn");
    const editCategoryField = currentEntry.querySelector(
      ".edit-category-input"
    );
    target.classList.toggle("is-hidden");
    categoryField.classList.toggle("is-hidden");
    categorySaveBtn.classList.toggle("is-hidden");
    editCategoryField.classList.toggle("is-hidden");
  }

  if (target.classList.contains("save-category-btn")) {
    const categoryField = currentEntry.querySelector(".entry-category span");
    const editCategoryField = currentEntry.querySelector(
      ".edit-category-input"
    );
    const newCategory = editCategoryField.value;
    categoryField.innerText = newCategory;
    categoryField.classList.toggle("is-hidden");
    editCategoryField.classList.toggle("is-hidden");
    target.classList.toggle("is-hidden");
    currentEntry
      .querySelector(".edit-category-btn")
      .classList.toggle("is-hidden");

    const entryId = currentEntry.dataset.id;
    const entry = findEntry(entryId);
    entry.updateCategory(newCategory);
  }

  if (target.classList.contains("edit-amount-btn")) {
    const amountField = currentEntry.querySelector(".entry-amount span");
    const amountSaveBtn = currentEntry.querySelector(".save-amount-btn");
    const editAmountField = currentEntry.querySelector(".edit-amount-input");
    target.classList.toggle("is-hidden");
    amountField.classList.toggle("is-hidden");
    amountSaveBtn.classList.toggle("is-hidden");
    editAmountField.classList.toggle("is-hidden");
  }

  if (target.classList.contains("save-amount-btn")) {
    const amountField = currentEntry.querySelector(".entry-amount span");
    const editAmountField = currentEntry.querySelector(".edit-amount-input");
    const newAmount = editAmountField.value;
    const entryId = currentEntry.dataset.id;
    const entry = findEntry(entryId);

    if (!newBalance(entry, newAmount)) return;

    amountField.innerText = `${
      entry.type === "income" ? "+" : "-"
    }${newAmount} UAH`;
    amountField.classList.toggle("is-hidden");
    editAmountField.classList.toggle("is-hidden");
    target.classList.toggle("is-hidden");
    currentEntry
      .querySelector(".edit-amount-btn")
      .classList.toggle("is-hidden");
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

  if (!newBalance(newEntry)) return;

  createNewEntryCard(newEntry);
  entries.push(newEntry);
  evt.target.reset();
});
