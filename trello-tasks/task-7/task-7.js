"use strict";

const toggleErrorState = (input, showError, hint) => {
  if (showError) {
    input.classList.add("error-input");
    input.classList.remove("correct-input");
    hint && hint.classList.remove("hidden");
  } else {
    input.classList.remove("error-input");
    input.classList.add("correct-input");
    hint && hint.classList.add("hidden");
  }
};

const validateName = (name) => {
  const isOnlyLetters = [...name].every(
    (char) => /^[a-zA-Zа-яА-ЯёЁіІїЇєЄҐґ']$/.test(char) || char === " "
  );
  return isOnlyLetters;
};

const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passMinLength = password.length >= 6;
  const passHasNum = /\d/.test(password);
  return passMinLength && passHasNum;
};

const refs = {
  form: document.querySelector(".reg-form"),
  submitButton: document.querySelector(".reg-form__submit"),
  inputs: document.querySelectorAll(".reg-form__input"),
  inputName: document.querySelector(".reg-form__input.name"),
  inputEmail: document.querySelector(".reg-form__input.email"),
  inputPassword: document.querySelector(".reg-form__input.password"),
  inputNameErrorHint: document.getElementById("errorNameHint"),
  inputEmailErrorHint: document.getElementById("errorEmailHint"),
};

const handleInputFocus = (evt) => {
  const input = evt.target;
  input.classList.remove("error-input");
  input.nextElementSibling?.classList.add("hidden");
  toggleInputFocus(input);
};

const handleInputBlur = (evt) => {
  const input = evt.target;
  input.nextElementSibling?.classList.add("hidden");
  if (input.value === "") {
    input.classList.remove("correct-input", "error-input");
  }
  toggleInputFocus(input);
};

const handleNameInput = (evt) => {
  const input = evt.target;
  const isValid = validateName(input.value);
  toggleErrorState(input, !isValid, refs.inputNameErrorHint);
};

const handleEmailInput = (evt) => {
  const input = evt.target;
  const isValid = validateEmail(input.value);
  toggleErrorState(input, !isValid, refs.inputEmailErrorHint);
};

const handlePasswordInput = (evt) => {
  const input = evt.target;
  const isValid = validatePassword(input.value);
  toggleErrorState(input, !isValid);
};

refs.form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  let isValid = true;

  const validations = [
    { input: refs.inputName, isValid: validateName(refs.inputName.value) },
    { input: refs.inputEmail, isValid: validateEmail(refs.inputEmail.value) },
    {
      input: refs.inputPassword,
      isValid: validatePassword(refs.inputPassword.value),
    },
  ];

  validations.forEach(({ input, isValid: valid }, index) => {
    toggleErrorState(
      input,
      !valid,
      refs[`input${input.classList[1]}ErrorHint`]
    );
    if (!valid) isValid = false;
  });

  if (isValid) {
    refs.inputs.forEach((input) =>
      input.classList.remove("correct-input", "focused")
    );
    refs.form.reset();
  }
});

refs.inputName.addEventListener("input", handleNameInput);
refs.inputEmail.addEventListener("blur", handleEmailInput);
refs.inputPassword.addEventListener("input", handlePasswordInput);

refs.inputs.forEach((input) => {
  input.addEventListener("focus", handleInputFocus);
  input.addEventListener("blur", handleInputBlur);
});
