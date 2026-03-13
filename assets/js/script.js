document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  /* =========================
     MENU MOBILE
  ========================= */
  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      nav.classList.add("open");
      toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", function () {
      const isOpen = nav.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", function () {
        closeMenu();
      });
    });

    document.addEventListener("click", function (event) {
      const clickedInsideMenu = nav.contains(event.target);
      const clickedToggle = toggle.contains(event.target);

      if (!clickedInsideMenu && !clickedToggle && nav.classList.contains("open")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("open")) {
        closeMenu();
      }
    });
  }

  /* =========================
     CARROSSEL HERO
  ========================= */
  const carousel = document.querySelector(".hero-carousel");

  if (carousel) {
    const images = carousel.querySelectorAll(".carousel-image");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const dots = carousel.querySelectorAll(".carousel-dot");

    if (images.length > 0) {
      let current = 0;
      let intervalId = null;
      const autoSlideTime = 4500;

      function updateDots(index) {
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
          dot.setAttribute("aria-current", i === index ? "true" : "false");
        });
      }

      function showSlide(index) {
        images.forEach((img, i) => {
          img.classList.toggle("active", i === index);
          img.setAttribute("aria-hidden", i === index ? "false" : "true");
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
        if (images.length <= 1) return;
        stopAutoSlide();
        intervalId = window.setInterval(nextSlide, autoSlideTime);
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
      carousel.addEventListener("focusin", stopAutoSlide);
      carousel.addEventListener("focusout", startAutoSlide);

      document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
          stopAutoSlide();
        } else {
          startAutoSlide();
        }
      });

      document.addEventListener("keydown", function (event) {
        if (!carousel.contains(document.activeElement) && !carousel.matches(":hover")) return;

        if (event.key === "ArrowRight") {
          nextSlide();
          startAutoSlide();
        }

        if (event.key === "ArrowLeft") {
          prevSlide();
          startAutoSlide();
        }
      });

      showSlide(current);
      startAutoSlide();
    }
  }

  /* =========================
     ANIMAÇÃO FADE-UP
  ========================= */
  const animatedElements = document.querySelectorAll(".fade-up");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (animatedElements.length) {
    if (prefersReducedMotion) {
      animatedElements.forEach((element) => {
        element.classList.add("visible");
      });
    } else if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.15
        }
      );

      animatedElements.forEach((element) => {
        observer.observe(element);
      });
    } else {
      animatedElements.forEach((element) => {
        element.classList.add("visible");
      });
    }
  }
});
