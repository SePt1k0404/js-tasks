"use strict";

const stateObj = {
  theme: "dark",
  language: "en",
};

const refs = {
  themeSelector: document.getElementById("theme"),
  languageSelector: document.getElementById("language"),
  textOutput: document.getElementById("output"),
  formContainer: document.getElementById("container"),
};

const fallBackStorage = (() => {
  let memoryStorage = {};

  const isLocalStorageSupported = (() => {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  })();

  const isSessionStorageSupported = (() => {
    try {
      const testKey = "__test__";
      sessionStorage.setItem(testKey, testKey);
      sessionStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  })();

  return {
    setItem(key, value) {
      if (isLocalStorageSupported) {
        localStorage.setItem(key, value);
      } else if (isSessionStorageSupported) {
        sessionStorage.setItem(key, value);
      } else {
        memoryStorage[key] = value;
      }
    },

    getItem(key) {
      if (isLocalStorageSupported) {
        return localStorage.getItem(key);
      } else if (isSessionStorageSupported) {
        return sessionStorage.getItem(key);
      } else {
        return memoryStorage[key];
      }
    },
  };
})();

const updateState = (key, value) => {
  stateObj[key] = value;
  safeSaveItem(key, value);
  if (key === "theme") {
    refs.themeSelector.value = stateObj.theme;
    document.body.className = stateObj.theme;
    refs.formContainer.className = stateObj.theme;
  } else if (key === "language") {
    refs.languageSelector.value = stateObj.language;
    refs.textOutput.textContent =
      stateObj.language === "ua" ? "Привіт, світ!" : "Hello, world!";
  }
};

const safeSaveItem = (key, value) => {
  try {
    fallBackStorage.setItem(key, value);
  } catch (error) {
    if (error.name === "QuotaExceededError") {
      console.error("LocalStorage limit exceeded! Unable to save data.");
    } else {
      console.error("Error accessing LocalStorage:", error);
    }
  }
};

window.addEventListener("load", () => {
  const savedTheme = fallBackStorage.getItem("theme");
  const savedLanguage = fallBackStorage.getItem("language");
  if (savedTheme === "dark" || savedTheme === "light") {
    refs.themeSelector.value = savedTheme;
    updateState("theme", savedTheme);
  } else {
    updateState("theme", refs.themeSelector.value);
  }

  if (savedLanguage === "en" || savedLanguage === "ua") {
    refs.languageSelector.value = savedLanguage;
    updateState("language", savedLanguage);
  } else {
    updateState("language", refs.languageSelector.value);
  }
});

window.addEventListener("storage", (evt) => {
  if (evt.key === "theme" || evt.key === "language") {
    updateState(evt.key, evt.newValue);
  }
});

refs.themeSelector.addEventListener("change", (evt) => {
  updateState("theme", evt.target.value);
});

refs.languageSelector.addEventListener("change", (evt) => {
  refs.textOutput.classList.add("hidden");
  setTimeout(() => {
    updateState("language", evt.target.value);
    refs.textOutput.classList.remove("hidden");
  }, 500);
});
