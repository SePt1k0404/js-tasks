"use strict";

const state = {
  theme: "dark",
  language: "en",
};

const refs = {
  themeSelector: document.getElementById("theme"),
  languageSelector: document.getElementById("language"),
  textOutput: document.getElementById("output"),
  formContainer: document.getElementById("container"),
};

const storage = (() => {
  const memoryStorage = {};
  const isStorageSupported = (storageType) => {
    try {
      const testKey = "__test__";
      window[storageType].setItem(testKey, testKey);
      window[storageType].removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  };

  const storageType = isStorageSupported("localStorage")
    ? "localStorage"
    : isStorageSupported("sessionStorage")
    ? "sessionStorage"
    : null;

  return {
    setItem(key, value) {
      if (storageType) {
        window[storageType].setItem(key, value);
      } else {
        memoryStorage[key] = value;
      }
    },
    getItem(key) {
      return storageType
        ? window[storageType].getItem(key)
        : memoryStorage[key];
    },
  };
})();

const updateState = (key, value) => {
  state[key] = value;
  storage.setItem(key, value);
  if (key === "theme") {
    refs.themeSelector.value = value;
    document.body.className = value;
    refs.formContainer.className = value;
  } else if (key === "language") {
    refs.languageSelector.value = value;
    refs.textOutput.textContent =
      value === "ua" ? "Привіт, світ!" : "Hello, world!";
  }
};

window.addEventListener("load", () => {
  ["theme", "language"].forEach((key) => {
    const savedValue = storage.getItem(key);
    if (savedValue) {
      updateState(key, savedValue);
    } else {
      updateState(key, refs[`${key}Selector`].value);
    }
  });
});

window.addEventListener("storage", (evt) => {
  if (evt.key in state) {
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
