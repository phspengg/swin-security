// const hamburger = document.querySelector('.hamburger');
// const navLinks = document.querySelector('.nav-links');
// const dropdowns = document.querySelectorAll('.dropdown');

// hamburger.addEventListener('click', () => {
//     navLinks.classList.toggle('active');
// });

// dropdowns.forEach(dropdown => {
//     dropdown.addEventListener('click', (e) => {
//         if (window.innerWidth <= 768) {
//             dropdown.classList.toggle('active');
//             e.preventDefault();
//         }
//     });
// });

// // Close mobile menu when clicking outside
// document.addEventListener('click', (e) => {
//     if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
//         navLinks.classList.remove('active');
//         dropdowns.forEach(dropdown => dropdown.classList.remove('active'));
//     }
// });
// script.js
// script.js

document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".dropdown");

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("fa-times");
    hamburger.classList.toggle("fa-bars");
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("fa-times");
      hamburger.classList.add("fa-bars");
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });
  // Dropdown functionality

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".dropdown")) {
      dropdowns.forEach((dropdown) => dropdown.classList.remove("active"));
    }
  });

  // Toggle dropdown on click for touch devices
  dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector(".dropdown-toggle");

    toggle.addEventListener("click", function (e) {
      if (window.matchMedia("(hover: none)").matches) {
        e.preventDefault();
        dropdown.classList.toggle("active");

        // Close other dropdowns
        dropdowns.forEach((other) => {
          if (other !== dropdown) other.classList.remove("active");
        });
      }
    });
  });
});

if (document.getElementById("access-control")) {
  document.addEventListener("DOMContentLoaded", () => {
    // Select all elements to animate
    const elements = document.querySelectorAll(
      ".access-control h2, .access-control .intro, .feature-row, .cta-button"
    );

    // Create Intersection Observer
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add is-visible class when element is in view
            entry.target.classList.add("is-visible");
            // Optional: Stop observing after animation triggers
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px", // Margin around the viewport
      }
    );

    // Observe each element
    elements.forEach((element) => {
      observer.observe(element);
    });
  });
}

// Check if the solutions section exists
if (document.querySelector(".our-solutions-section")) {
  // Wait for the page to load
  document.addEventListener("DOMContentLoaded", () => {
    // Select all solution cards to animate
    const cards = document.querySelectorAll(".our-solutions-card");

    // Create Intersection Observer to watch for visibility
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add is-visible class to trigger animation
            entry.target.classList.add("is-visible");
            // Stop watching this card to save resources
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of card is visible
        rootMargin: "0px", // No extra margin around viewport
      }
    );

    // Watch each card
    cards.forEach((card) => {
      observer.observe(card);
    });
  });
}

// Auto-sliding logos
if (document.querySelector(".partners-section")) {
  const logosContainer = document.querySelector(".partners-logos");
  const logos = document.querySelectorAll(".partner-logo");
  let position = 0; // Current position of logos
  const speed = 1; // Pixels per frame (adjust for faster/slower)
  const pauseOnHover = true; // Set to false to disable pause-on-hover
  let isPaused = false;

  // Calculate logo width (including margin)
  const logoWidth = 200 + 40; // Logo width (200px) + margin (20px + 20px)

  // Clone logos dynamically for seamless loop
  logos.forEach((logo) => {
    const clone = logo.cloneNode(true); // Create a copy of the logo
    logosContainer.appendChild(clone); // Add to the end
  });

  // Function to slide logos
  function slideLogos() {
    if (!isPaused) {
      position -= speed; // Move left
      logosContainer.style.transform = `translateX(${position}px)`; // Apply position

      // Check if the first logo is out of view
      if (position <= -logoWidth) {
        const firstLogo = logosContainer.firstElementChild; // Get first logo
        logosContainer.appendChild(firstLogo); // Move it to the end
        position += logoWidth; // Adjust position to avoid jump
      }
    }
    requestAnimationFrame(slideLogos); // Continue animation
  }

  // Start sliding
  requestAnimationFrame(slideLogos);

  // Pause on hover (if enabled)
  if (pauseOnHover) {
    logosContainer.addEventListener("mouseenter", () => {
      isPaused = true; // Pause sliding
    });
    logosContainer.addEventListener("mouseleave", () => {
      isPaused = false; // Resume sliding
    });
  }
}
