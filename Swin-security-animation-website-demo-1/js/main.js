document.addEventListener("DOMContentLoaded", function () {
  // Universal code (runs on all pages)
  document
    .querySelector(".hamburger-icon")
    .addEventListener("click", function () {
      document.querySelector(".right-nav").classList.toggle("active");
    });

  // Service Page Animations (only runs if elements exist)
  if (document.querySelector(".why-security-item")) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all service items
    document.querySelectorAll(".why-security-item").forEach((item) => {
      observer.observe(item);
    });
  }

  if (document.querySelector(".hero-section")) {
    const slider = document.querySelector(".brands-slider");
    const prevBtn = document.querySelector(".prev-btn");
    const nextBtn = document.querySelector(".next-btn");
    let currentPosition = 0;
    const slideWidth = 150 + 40; // width + gap
    if(slider.children.length==currentPosition){
        console.log("hi")
    }
    nextBtn.addEventListener("click", () => {
      currentPosition = (currentPosition + 1) % slider.children.length;
      updateSlider();
    });

    prevBtn.addEventListener("click", () => {
      currentPosition =
        (currentPosition - 1 + slider.children.length) % slider.children.length;
      updateSlider();
    });

    function updateSlider() {
      const offset = -currentPosition * slideWidth;
      slider.style.transform = `translateX(${offset}px)`;
    }

    // Auto-advance every 5 seconds
    let autoSlide = setInterval(() => nextBtn.click(), 1500);

    // Pause on hover
    slider.parentElement.addEventListener("mouseenter", () =>
      clearInterval(autoSlide)
    );
    slider.parentElement.addEventListener("mouseleave", () => {
      autoSlide = setInterval(() => nextBtn.click(), 1000);
    });
  }
});
