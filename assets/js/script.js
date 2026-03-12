document.addEventListener("DOMContentLoaded", function () {
  /* MENU MOBILE */
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

  /* CARROSSEL HOME */
  const carousel = document.querySelector(".hero-carousel");

  if (carousel) {
    const images = carousel.querySelectorAll(".carousel-image");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");

    let current = 0;
    let intervalId = null;
    const autoSlideTime = 4000;

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
      stopAutoSlide();
      intervalId = setInterval(nextSlide, autoSlideTime);
    }

    function stopAutoSlide() {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    }

    function resetAutoSlide() {
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

    carousel.addEventListener("mouseenter", stopAutoSlide);
    carousel.addEventListener("mouseleave", startAutoSlide);
    carousel.addEventListener("touchstart", stopAutoSlide, { passive: true });
    carousel.addEventListener("touchend", startAutoSlide, { passive: true });

    showSlide(current);
    startAutoSlide();
  }

  /* ANIMAÇÃO SUAVE DAS SEÇÕES */
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

/* ===== ANIMAÇÃO SCROLL FADE UP ===== */

document.addEventListener("DOMContentLoaded", function(){

const fadeElements = document.querySelectorAll(".fade-up");

const observer = new IntersectionObserver(function(entries){

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("visible");

}

});

},{
threshold:0.2
});

fadeElements.forEach(el => {

observer.observe(el);

});

});
