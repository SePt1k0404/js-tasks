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
};

refs.form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const inputName = refs.inputName.value;
  const inputEmail = refs.inputEmail.value;
  const inputPassword = refs.inputPassword.value;
  if (!inputName) {
  }
  refs.form.reset();
});

refs.input.forEach((input) => {
  input.addEventListener("focus", (evt) => {
    toggleInputFocus(evt.target);
  });

  input.addEventListener("blur", (evt) => {
    toggleInputFocus(evt.target);
  });
});
