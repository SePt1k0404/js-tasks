"use strict";

if (!localStorage.getItem("contacts")) {
  localStorage.setItem("contacts", JSON.stringify([]));
}

const getAllContactsList = () => JSON.parse(localStorage.getItem("contacts"));
const setNewContactsList = (newContacts) =>
  localStorage.setItem("contacts", JSON.stringify(newContacts));

const refs = {
  searchInput: document.querySelector(".search__input"),
  contactForm: document.querySelector(".contact-form"),
  contactsList: document.querySelector(".contact-list"),
};

const addContactMarkup = (contact) =>
  refs.contactsList.insertAdjacentHTML(
    "beforeend",
    `<li class="contact-list__item" data-id=${contact.id} data-name="${contact.name}">
      <div class="contact-list__wrapper">
      <span>${contact.name} - ${contact.phone}</span>
      <button class="change-btn">Change</button>
      <button class="delete-btn">Delete</button>
      </div>
    </li>`
  );

const removeContact = (id) => {
  const oldContactsList = getAllContactsList("contacts");
  const newContactsList = oldContactsList.filter(
    (contact) => contact.id !== id
  );
  setNewContactsList(newContactsList);
};

const changeContact = (newContact, id) => {
  const oldContactsList = getAllContactsList();
  const updatedContactsList = oldContactsList.map((contact) =>
    contact.id === id ? newContact : contact
  );
  setNewContactsList(updatedContactsList);
};

const filterContactList = (contactsList, evt) =>
  contactsList.filter((contact) => {
    return contact.dataset.name
      .toLowerCase()
      .includes(evt.target.value.trim().toLowerCase());
  });

const handleFilter = (evt) => {
  const contactsList = [...refs.contactsList.children];
  const filteredContactsList = filterContactList(contactsList, evt);
  contactsList.forEach((contact) => {
    contact.classList.add("displayNone");
  });
  filteredContactsList.forEach((contact) => {
    contact.classList.remove("displayNone");
  });
};

const createNewContactObj = (name, phone, id) => ({
  name,
  phone,
  id,
});

window.addEventListener("load", () => {
  const contactsList = getAllContactsList("contacts");
  if (!contactsList.length) return;
  contactsList.forEach((contact) => addContactMarkup(contact));
});

refs.contactForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const [contactName, contactPhone] = evt.currentTarget.elements;
  if (!contactName.value.trim() || !contactPhone.value.trim()) return;
  const newContact = createNewContactObj(
    contactName.value.trim(),
    contactPhone.value.trim(),
    crypto.randomUUID()
  );
  const oldContactsList = getAllContactsList("contacts");
  setNewContactsList([...oldContactsList, newContact]);
  addContactMarkup(newContact);
  evt.currentTarget.reset();
});

refs.searchInput.addEventListener("input", handleFilter);
refs.searchInput.addEventListener("focus", handleFilter);

refs.contactsList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("delete-btn")) {
    const contact = evt.target.closest(".contact-list__item");
    contact.remove();
    removeContact(contact.dataset.id);
  }
  if (evt.target.classList.contains("change-btn")) {
    const contact = evt.target.closest(".contact-list__item");
    const changeBtn = evt.target;
    changeBtn.classList.add("displayNone");
    contact.insertAdjacentHTML(
      "beforeend",
      `
     <div class="form-container" id="edit-form-container">
      <form class="edit-contact-form" id="edit-contact-form">
        <input
          class="contact__name"
          name="contactName"
          type="text"
          placeholder="Edit Name"
          required
        />
        <input
          class="contact__phone"
          name="contactTel"
          type="tel"
          title="Please enter a valid phone number"
          placeholder="Edit Phone Number"
          required
          maxlength="13"
          pattern="^\\+?[0-9]{1,4}[0-9]{7,15}$"
        />
        <button type="submit">Save Changes</button>
        <button id="cancel-edit-btn" type="button">Cancel</button>
      </form>
    </div>`
    );
    const editForm = contact.querySelector(".edit-contact-form");

    editForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const [newContactName, newContactPhone] = evt.currentTarget.elements;
      if (!newContactName.value.trim() || !newContactPhone.value.trim()) return;
      const changedContact = createNewContactObj(
        newContactName.value.trim(),
        newContactPhone.value.trim(),
        contact.dataset.id
      );
      contact.dataset.name = changedContact.name;
      contact.querySelector(
        "span"
      ).textContent = `${changedContact.name} - ${changedContact.phone}`;
      changeContact(changedContact, changedContact.id);
      contact.querySelector("#edit-form-container").remove();
      changeBtn.classList.remove("displayNone");
    });

    contact.querySelector("#cancel-edit-btn").addEventListener("click", () => {
      contact.querySelector("#edit-form-container").remove();
      changeBtn.classList.remove("displayNone");
    });
  }
});
