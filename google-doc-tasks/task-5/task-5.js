"use strict";

const refs = {
  sliderWrapper: document.querySelector(".slider-wrapper"),
  slides: document.querySelectorAll(".slide"),
  prevBtn: document.querySelector(".slider-btn.prev"),
  nextBtn: document.querySelector(".slider-btn.next"),
  dotsContainer: document.querySelector(".slider-dots"),
};

let currentSlideIdx = 0;
const totalSlidesCount = refs.slides.length;
let autoSlideInterval;

const updateSlider = () => {
  refs.sliderWrapper.style.transform = `translateX(-${currentSlideIdx * 100}%)`;
  refs.dotsContainer
    .querySelectorAll("span")
    .forEach((dot) => dot.classList.remove("active"));
  refs.dotsContainer
    .querySelectorAll("span")
    [currentSlideIdx].classList.add("active");
};

const createDots = () => {
  refs.slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.dataset.index = index;
    if (index === 0) dot.classList.add("active");
    refs.dotsContainer.appendChild(dot);
  });
};

refs.dotsContainer.addEventListener("click", (evt) => {
  if (evt.target.tagName === "SPAN") {
    currentSlideIdx = parseInt(evt.target.dataset.index, 10);
    updateSlider();
    startAutoSlide();
  }
});

const startAutoSlide = () => {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(() => {
    currentSlideIdx = (currentSlideIdx + 1) % totalSlidesCount;
    updateSlider();
  }, 5000);
};

refs.nextBtn.addEventListener("click", () => {
  currentSlideIdx = (currentSlideIdx + 1) % totalSlidesCount;
  updateSlider();
  startAutoSlide();
});

refs.prevBtn.addEventListener("click", () => {
  currentSlideIdx = (currentSlideIdx - 1 + totalSlidesCount) % totalSlidesCount;
  updateSlider();
  startAutoSlide();
});

window.addEventListener("load", () => {
  createDots();
  startAutoSlide();
});
