document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const carousel = document.querySelector(".hero-carousel");

  if (carousel) {
    const images = carousel.querySelectorAll(".carousel-image");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const dots = carousel.querySelectorAll(".carousel-dot");

    let current = 0;
    let intervalId = null;
    const autoSlideTime = 4500;

    function updateDots(index) {
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    }

    function showSlide(index) {
      images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
      });
      updateDots(index);
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
      stopAutoSlide();
      intervalId = setInterval(nextSlide, autoSlideTime);
    }

    function stopAutoSlide() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        prevSlide();
        startAutoSlide();
      });
    }

    if (dots.length) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
          current = index;
          showSlide(current);
          startAutoSlide();
        });
      });
    }

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);

    showSlide(current);
    startAutoSlide();
  }

  const animatedElements = document.querySelectorAll(".fade-up");

  if (animatedElements.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    animatedElements.forEach((element) => {
      observer.observe(element);
    });
  }
});
