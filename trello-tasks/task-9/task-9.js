refs = {
  themeSelector: document.getElementById("theme"),
  languageSelector: document.getElementById("language"),
  textOutput: document.getElementById("output"),
  formContainer: document.getElementById("container"),
};

refs.themeSelector.addEventListener("change", (evt) => {
  const selectedTheme = evt.target.value;
  document.body.className = selectedTheme;
  localStorage.setItem("theme", selectedTheme);
  refs.formContainer.className = selectedTheme;
});

refs.languageSelector.addEventListener("change", (evt) => {
  const language = evt.target.value;
  refs.textOutput.classList.add("hidden");
  localStorage.setItem("language", language);

  setTimeout(() => {
    refs.textOutput.textContent =
      language === "ua" ? "Привіт, світ!" : "Hello, world!";
    refs.textOutput.classList.remove("hidden");
  }, 500);
});

window.addEventListener("load", () => {
  const language = localStorage.getItem("language");
  const theme = localStorage.getItem("theme");
  if (!language) {
    localStorage.setItem("language", refs.languageSelector.value);
  } else {
    refs.languageSelector.value = language;
    refs.textOutput.textContent =
      language === "ua" ? "Привіт, світ!" : "Hello, world!";
  }
  if (!theme) {
    localStorage.setItem("theme", refs.themeSelector.value);
  } else {
    document.body.className = theme;
    refs.formContainer.className = `container ${theme}`;
  }
});
