"use strict";

const toggleInputFocus = (input) => {
  input.classList.toggle("focused");
};

const refs = {
  form: document.querySelector(".reg-form"),
  submitButton: document.querySelector(".reg-form__submit"),
  inputName: document.querySelector(".reg-form__input.name"),
  inputEmail: document.querySelector(".reg-form__input.email"),
  inputPassword: document.querySelector(".reg-form__input.password"),
  input: document.querySelectorAll(".reg-form__input"),
  inputNameErrorHint: document.getElementById("errorNameHint"),
  inputEmailErrorHint: document.getElementById("errorEmailHint"),
};

refs.form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputName = refs.inputName.value;
  const inputEmail = refs.inputEmail.value;
  const inputPassword = refs.inputPassword.value;
  let inputsValid = false;
  if (!inputName) {
    refs.inputName.classList.add("error-input");
  }
  if (!inputEmail) {
    refs.inputEmail.classList.add("error-input");
  }
  if (!inputPassword) {
    refs.inputPassword.classList.add("error-input");
  }
  if (
    !refs.inputName.classList.contains("error-input") &&
    !refs.inputEmail.classList.contains("error-input") &&
    !refs.inputPassword.classList.contains("error-input")
  ) {
    inputsValid = true;
  }
  if (inputsValid) {
    refs.input.forEach((input) =>
      input.classList.remove("correct-input", "focused")
    );
    evt.currentTarget.reset();
  }
});

refs.inputName.addEventListener("input", (evt) => {
  const name = evt.target.value;
  const isOnlyLetters = name
    .split("")
    .every((el) => /^[a-zA-Zа-яА-ЯёЁіІїЇєЄҐґ']$/.test(el) || el === " ");
  if (!isOnlyLetters) {
    evt.target.style.borderColor = "red";
    refs.inputName.classList.add("error-input");
    refs.inputNameErrorHint.classList.remove("hidden");
    evt.target.nextElementSibling.classList.add("hidden");
  } else {
    evt.target.style.borderColor = "";
    refs.inputName.classList.remove("error-input");
    refs.inputNameErrorHint.classList.add("hidden");
    evt.target.nextElementSibling.classList.remove("hidden");
  }
  if (name.length !== 0) {
    evt.target.classList.add("correct-input");
  }
});

refs.inputEmail.addEventListener("blur", (evt) => {
  const email = evt.target.value;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (emailRegex.test(email)) {
    evt.target.classList.add("correct-input");
    evt.target.classList.remove("error-input");
    refs.inputEmailErrorHint.classList.add("hidden");
    evt.target.nextElementSibling.classList.remove("hidden");
  } else {
    evt.target.classList.add("error-input");
    evt.target.classList.remove("correct-input");
    refs.inputEmailErrorHint.classList.remove("hidden");
    evt.target.nextElementSibling.classList.add("hidden");
  }
});

refs.inputEmail.addEventListener("focus", (evt) => {
  refs.inputEmailErrorHint.classList.add("hidden");
});

refs.inputPassword.addEventListener("input", (evt) => {
  const password = evt.target.value;
  refs.inputPassword.classList.remove("correct-input");
  const passMinLength = password.length >= 6;
  let passHasNum = false;
  for (let i = 0; i <= password.length; i++) {
    if (!isNaN(password[i]) && password[i] !== " ") {
      passHasNum = true;
      break;
    }
  }

  if (passHasNum && passMinLength) {
    refs.inputPassword.classList.add("correct-input");
    evt.target.nextElementSibling.classList.add("hidden");
  } else {
    refs.inputPassword.classList.add("error-input");
    evt.target.nextElementSibling.classList.remove("hidden");
  }
});

refs.input.forEach((input) => {
  input.addEventListener("focus", (evt) => {
    evt.target.classList.remove("error-input");
    evt.target.nextElementSibling.classList.remove("hidden");
    toggleInputFocus(evt.target);
  });

  input.addEventListener("blur", (evt) => {
    evt.target.nextElementSibling.classList.add("hidden");
    if (evt.target.value === "") {
      evt.target.classList.remove("correct-input", "error-input");
    }
    toggleInputFocus(evt.target);
  });
});
