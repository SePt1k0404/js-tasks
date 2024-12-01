"use strict";

const isHiddenToggle = (element) => {
  element.classList.toggle("is-hidden");
};

const checkElementHidden = (evt, elementClass) =>
  evt.target.classList.contains(elementClass) &&
  !evt.target.classList.contains("is-hidden");

const refs = {
  openModalBtn: document.querySelector(".add-photo"),
  addNewPhotoBtn: document.querySelector(".add-photo-form__submit"),
  modal: document.querySelector(".form-backdrop"),
  galleryList: document.querySelector(".photo-list"),
  galleryForm: document.querySelector(".add-photo-form"),
  lightBoxBackdrop: document.querySelector(".lightbox-backdrop"),
};

refs.openModalBtn.addEventListener("click", () => {
  isHiddenToggle(refs.modal);
});

refs.modal.addEventListener("click", (evt) => {
  if (checkElementHidden(evt, "form-backdrop")) {
    isHiddenToggle(refs.modal);
  }
});

refs.lightBoxBackdrop.addEventListener("click", (evt) => {
  if (checkElementHidden(evt, "lightbox-backdrop")) {
    isHiddenToggle(refs.lightBoxBackdrop);
    refs.lightBoxBackdrop.innerHTML = "";
  }
});

refs.galleryForm.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const urlInput = evt.currentTarget.elements.url.value;
  const descInput = evt.currentTarget.elements.description.value;
  if (!urlInput || !descInput) return;
  const cardMarkup = addCardMarkup(urlInput, descInput);
  refs.galleryList.insertAdjacentHTML("beforeend", cardMarkup);
  evt.currentTarget.reset();
  isHiddenToggle(refs.modal);
});

refs.galleryList.addEventListener("click", (evt) => {
  const cardItem = evt.target.closest(".photo-list__item");
  if (!cardItem) return;

  if (evt.target.classList.contains("photo-list__remove")) {
    const cardItem = evt.target.closest(".photo-list__item");
    cardItem.remove();
  } else if (evt.target.closest(".photo-list__item")) {
    const cardItem = evt.target.closest(".photo-list__item");
    const lightboxCardHTML = addLightBox(
      cardItem.dataset.url,
      cardItem.dataset.desc
    );
    refs.lightBoxBackdrop.innerHTML = lightboxCardHTML;
    isHiddenToggle(refs.lightBoxBackdrop);
    lightBoxNavigation(cardItem);
  }
});

const updateButton = (button, sibling, alignSelf) => {
  if (!sibling) {
    button.style.display = "none";
    button.style.marginRight = alignSelf === "right" ? "0" : "auto";
    button.style.marginLeft = alignSelf === "left" ? "0" : "auto";
  } else {
    button.style.display = "flex";
    button.style.marginRight = alignSelf === "right" ? "auto" : "0";
    button.style.marginLeft = alignSelf === "left" ? "auto" : "0";
    button.addEventListener("click", () => {
      const lightboxCardHTML = addLightBox(
        sibling.dataset.url,
        sibling.dataset.desc
      );
      refs.lightBoxBackdrop.innerHTML = lightboxCardHTML;
      lightBoxNavigation(sibling);
    });
  }
};

const lightBoxNavigation = (card) => {
  const lightBoxPrevious = refs.lightBoxBackdrop.querySelector(
    ".lightbox__previous"
  );
  const lightBoxNext = refs.lightBoxBackdrop.querySelector(".lightbox__next");
  updateButton(lightBoxPrevious, card.previousElementSibling, "right");
  updateButton(lightBoxNext, card.nextElementSibling, "left");
};

const addCardMarkup = (urlInput, descInput) => {
  return `
    <li class="photo-list__item" data-url="${urlInput}" data-desc="${descInput}">
      <img class="photo-list__img" src="${urlInput}" alt="" />
      <p>${descInput}</p>
      <button class="photo-list__remove"></button>
    </li>
  `;
};

const addLightBox = (urlInput, descInput) => {
  return `<div class="lightbox__thumb">
            <img
              class="lightbox__img"
              src="${urlInput}"
              alt
            />
            <p>
              ${descInput}
            </p>
            <div class="lightbox__buttons-wrapper">
            <button class="lightbox__previous button"> ⬅ </button>
            <button class="lightbox__next button"> ⮕ </button>
            </div>
          </div>`;
};
