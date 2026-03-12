document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  const carousel = document.querySelector(".hero-carousel");
  if (!carousel) return;

  const images = carousel.querySelectorAll(".carousel-image");
  const prevBtn = carousel.querySelector(".carousel-btn.prev");
  const nextBtn = carousel.querySelector(".carousel-btn.next");

  let current = 0;
  let intervalId;

  function showSlide(index) {
    images.forEach((img, i) => {
      img.classList.toggle("active", i === index);
    });
  }

  function nextSlide() {
    current = (current + 1) % images.length;
    showSlide(current);
  }

  function prevSlide() {
    current = (current - 1 + images.length) % images.length;
    showSlide(current);
  }

  function startAutoSlide() {
    intervalId = setInterval(nextSlide, 4000);
  }

  function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      nextSlide();
      resetAutoSlide();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      prevSlide();
      resetAutoSlide();
    });
  }

  showSlide(current);
  startAutoSlide();
});
