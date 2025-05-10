document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Elements
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");

  // Toggle Mobile Menu
  hamburger.addEventListener("click", (e) => {
    e.stopPropagation();
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("fa-times");
    hamburger.classList.toggle("fa-bars");
  });

  // Mobile Dropdown Handling
  dropdownToggles.forEach(toggle => {
    toggle.addEventListener("click", function(e) {
      if (window.matchMedia("(hover: none)").matches || window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        
        const parentDropdown = this.closest(".dropdown");
        const wasActive = parentDropdown.classList.contains("active");
        
        // Close all dropdowns
        dropdowns.forEach(d => {
          d.classList.remove("active");
          d.querySelector(".dropdown-menu").style.maxHeight = "0";
        });
        
        // Toggle current dropdown
        if (!wasActive) {
          parentDropdown.classList.add("active");
          parentDropdown.querySelector(".dropdown-menu").style.maxHeight = 
            parentDropdown.querySelector(".dropdown-menu").scrollHeight + "px";
        }
      }
    });
  });

  // Click Outside Handler
  document.addEventListener("click", (e) => {
    // Close mobile menu
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("fa-times");
      hamburger.classList.add("fa-bars");
    }
    
    // Close dropdowns
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach(d => {
        d.classList.remove("active");
        d.querySelector(".dropdown-menu").style.maxHeight = "0";
      });
    }
  });

  // Touch Device Support
  document.addEventListener("touchend", (e) => {
    if (window.innerWidth <= 768) {
      if (!e.target.closest(".dropdown")) {
        dropdowns.forEach(d => d.classList.remove("active"));
      }
    }
  });

  // Animation Handlers
  const initAnimations = (selector, options = { threshold: 0.1 }) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach(element => observer.observe(element));
  };

  // Access Control Animations
  if (document.getElementById("access-control")) {
    initAnimations(".access-control h2, .access-control .intro, .feature-row, .cta-button");
  }

  // Services Section Animations
  if (document.querySelector(".our-services-section")) {
    initAnimations(".our-services-card", { threshold: 0.05 });
  }

  // Logo Slider
  if (document.querySelector(".partners-section")) {
    const logosContainer = document.querySelector(".partners-logos");
    const logos = document.querySelectorAll(".partner-logo");
    let position = 0;
    const speed = 1;
    const logoWidth = 200 + 40; // Width + margins

    // Clone logos
    logos.forEach(logo => logosContainer.appendChild(logo.cloneNode(true)));

    const animateLogos = () => {
      if (position <= -logoWidth) {
        position += logoWidth;
        logosContainer.appendChild(logosContainer.firstElementChild);
      }
      position -= speed;
      logosContainer.style.transform = `translateX(${position}px)`;
      requestAnimationFrame(animateLogos);
    };

    requestAnimationFrame(animateLogos);
  }
});