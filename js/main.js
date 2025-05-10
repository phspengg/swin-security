document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Toggle mobile menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("fa-times");
  });

  // Dropdown Handling
  dropdowns.forEach(dropdown => {
    const toggle = dropdown.querySelector(".dropdown-toggle");
    
    // Touch device handling
    toggle.addEventListener("click", (e) => {
      if (window.matchMedia("(hover: none)").matches) {
        e.preventDefault();
        e.stopPropagation();
        const wasActive = dropdown.classList.contains("active");
        closeAllDropdowns();
        if (!wasActive) dropdown.classList.add("active");
      }
    });
  });

  // Click-outside handler
  document.addEventListener("click", (e) => {
    // Close mobile menu
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("fa-times");
    }
    
    // Close dropdowns
    if (!e.target.closest(".dropdown")) closeAllDropdowns();
  });

  function closeAllDropdowns() {
    dropdowns.forEach(dropdown => dropdown.classList.remove("active"));
  }

  // Animations for Access Control Page
  if (document.getElementById("access-control")) {
    animateElements(".access-control h2, .access-control .intro, .feature-row, .cta-button");
  }

  // Animations for Services Section
  if (document.querySelector(".our-services-section")) {
    animateElements(".our-services-card", { threshold: 0.05 });
  }

  // Auto-sliding Logos
  if (document.querySelector(".partners-section")) {
    initLogoSlider();
  }
});

// Reusable animation function
function animateElements(selector, options = { threshold: 0.1 }) {
  const elements = document.querySelectorAll(selector);
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  elements.forEach(element => observer.observe(element));
}

// Logo Slider Functionality
function initLogoSlider() {
  const logosContainer = document.querySelector(".partners-logos");
  const logos = document.querySelectorAll(".partner-logo");
  let position = 0;
  const speed = 1;
  const logoWidth = 200 + 40; // Width + margins

  // Clone logos for seamless loop
  logos.forEach(logo => {
    logosContainer.appendChild(logo.cloneNode(true));
  });

  function animate() {
    position -= speed;
    logosContainer.style.transform = `translateX(${position}px)`;

    if (position <= -logoWidth) {
      position += logoWidth;
      logosContainer.appendChild(logosContainer.firstElementChild);
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}