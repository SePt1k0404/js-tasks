"use strict";

const storageKey = "contentElements";

const storage = {
  get() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
  },
  set(newElement) {
    localStorage.setItem(
      storageKey,
      JSON.stringify([...this.get(), newElement])
    );
  },
  init() {
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify([]));
    }
  },
};

storage.init();

const refs = {
  controlsButtons: document.querySelector(".controls"),
  contentList: document.querySelector(".content-list"),
  formWrapper: document.querySelector(".form-wrapper"),
};

const createNewElement = (element, style) => {
  const newElement = document.createElement(element);
  newElement.textContent = style.content || "Default Text";
  newElement.style.color = style.color;
  newElement.style.fontSize = style.size + "px";
  if (style.styleBold) {
    newElement.style.fontWeight = "bold";
  }
  if (style.styleItalic) {
    newElement.style.fontStyle = "italic";
  }
  const listItem = document.createElement("li");
  listItem.classList.add("content-list__item");
  listItem.appendChild(newElement);
  refs.contentList.insertAdjacentElement("afterbegin", listItem);
};

const createContentForm = (evt) => {
  if (refs.formWrapper.querySelector(".text-form")) return;
  const buttonType = evt.target.value;
  const textForm = document.createElement("form");
  textForm.classList.add("text-form");
  textForm.innerHTML = `
    <h2 class="text-form__title">Create custom element: ${buttonType}</h2>
    <label>
      Text:
      <input type="text" name="content" id="textContent" placeholder="Enter your text" required>
    </label>
    <label>
      Font Size:
      <input type="number" name="size" id="fontSize" min="10" max="72" value="16">
    </label>
    <label>
      Color:
      <input type="color" name="color" id="textColor" value="#000000">
    </label>
    <label>
      Bold:
      <input type="checkbox" value="bold" name="styleBold" id="isBold">
    </label>
    <label>
      Italic:
      <input type="checkbox" value="italic" name="styleItalic" id="isItalic">
    </label>
    <button type="submit">Add Text</button>
  `;
  textForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const textObj = {
      contentType: buttonType,
    };
    formData.forEach((value, key) => {
      textObj[key] = value;
    });
    storage.set(textObj);
    createNewElement(buttonType, textObj);
    textForm.remove();
    evt.target.reset();
  });
  refs.formWrapper.appendChild(textForm);
};

window.addEventListener("load", () => {
  const storedElements = storage.get();
  if (storedElements.length > 0) {
    storedElements.forEach((element) => {
      createNewElement(element.contentType, element);
    });
  }
});

refs.controlsButtons.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("controls__button")) {
    createContentForm(evt);
  }
});
