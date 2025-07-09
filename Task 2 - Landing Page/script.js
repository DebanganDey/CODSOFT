// Modern Tech Company Landing Page JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionality
  initNavigation();
  initHeroAnimations();
  initScrollAnimations();
  initPortfolioFilters();
  initContactForm();
  initCounterAnimations();
  initTypingEffect();
  initParticleAnimation();
});

// Navigation functionality
function initNavigation() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu a");

  // Mobile menu toggle
  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    navToggle.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navMenu.classList.remove("active");
      navToggle.classList.remove("active");
    });
  });

  // Navbar scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Hero buttons smooth scrolling
  const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// Hero section animations
function initHeroAnimations() {
  // Parallax effect for hero background
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallax = scrolled * 0.5;
    const heroBackground = document.querySelector(".hero-background");

    if (heroBackground) {
      heroBackground.style.transform = `translateY(${parallax}px)`;
    }
  });

  // Hero stats animation on scroll
  const heroStats = document.querySelectorAll(".hero-stats .stat h3");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  heroStats.forEach((stat) => observer.observe(stat));
}

// Scroll animations
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".service-card, .portfolio-item, .team-member, .about-features .feature"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          entry.target.classList.add("fade-in-up");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  animatedElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
    observer.observe(element);
  });
}

// Portfolio filters
function initPortfolioFilters() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      this.classList.add("active");

      // Filter portfolio items
      portfolioItems.forEach((item) => {
        const category = item.getAttribute("data-category");

        if (filter === "all" || category === filter) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "scale(0.8)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Initialize portfolio items
  portfolioItems.forEach((item) => {
    item.style.transition = "all 0.3s ease";
  });
}

// Contact form functionality
function initContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const firstName = formData.get("firstName");
      const lastName = formData.get("lastName");
      const email = formData.get("email");
      const service = formData.get("service");
      const message = formData.get("message");

      // Basic validation
      if (!firstName || !lastName || !email || !service || !message) {
        showNotification("Please fill in all required fields.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Please enter a valid email address.", "error");
        return;
      }

      // Simulate form submission
      const submitButton = this.querySelector('button[type="submit"]');
      const originalText = submitButton.innerHTML;

      submitButton.innerHTML =
        '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitButton.disabled = true;

      // Simulate API call
      setTimeout(() => {
        showNotification(
          `Thank you, ${firstName}! We'll contact you soon about ${getServiceName(
            service
          )} services.`,
          "success"
        );
        this.reset();
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }
}

// Counter animations
function initCounterAnimations() {
  const counters = document.querySelectorAll(".stat h3, .metric h4");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

// Typing effect for hero title
function initTypingEffect() {
  const typingElement = document.querySelector(".typing-text");
  if (!typingElement) return;

  const texts = [
    "Innovative Technology",
    "Digital Transformation",
    "Smart Solutions",
    "Future-Ready Apps",
    "AI-Powered Systems",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeText() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typingElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at the end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before starting new word
    }

    setTimeout(typeText, typeSpeed);
  }

  // Start typing effect after page load
  setTimeout(typeText, 1000);
}

// Particle animation
function initParticleAnimation() {
  const heroParticles = document.querySelector(".hero-particles");
  if (!heroParticles) return;

  // Create floating particles
  for (let i = 0; i < 20; i++) {
    const particle = document.createElement("div");
    particle.style.position = "absolute";
    particle.style.width = Math.random() * 4 + 1 + "px";
    particle.style.height = particle.style.width;
    particle.style.background = "rgba(255, 255, 255, 0.5)";
    particle.style.borderRadius = "50%";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animation = `float ${
      Math.random() * 3 + 2
    }s ease-in-out infinite`;
    particle.style.animationDelay = Math.random() * 2 + "s";

    heroParticles.appendChild(particle);
  }
}

// Service card interactions
document.addEventListener("DOMContentLoaded", function () {
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-12px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
});

// Utility functions
function animateCounter(element) {
  const text = element.textContent;
  const hasPlus = text.includes("+");
  const hasPercent = text.includes("%");
  const numericValue = parseInt(text.replace(/[^\d]/g, ""));

  if (isNaN(numericValue)) return;

  let start = 0;
  const duration = 2000;
  const increment = numericValue / (duration / 16);

  const timer = setInterval(() => {
    start += increment;

    if (start >= numericValue) {
      element.textContent =
        numericValue + (hasPlus ? "+" : "") + (hasPercent ? "%" : "");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(start) + (hasPlus ? "+" : "") + (hasPercent ? "%" : "");
    }
  }, 16);
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getServiceName(serviceValue) {
  const serviceNames = {
    web: "Web Development",
    mobile: "Mobile App Development",
    cloud: "Cloud Solutions",
    ai: "AI & Machine Learning",
    blockchain: "Blockchain Development",
    iot: "IoT Solutions",
    consulting: "Technology Consulting",
  };
  return serviceNames[serviceValue] || "our";
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${
          type === "success"
            ? "#10b981"
            : type === "error"
            ? "#ef4444"
            : "#6366f1"
        };
        color: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        font-weight: 500;
        animation: slideInRight 0.3s ease;
    `;

  notification.textContent = message;
  document.body.appendChild(notification);

  // Remove notification after 5 seconds
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Add animation keyframes for notifications
const style = document.createElement("style");
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize AOS (Animate On Scroll) alternative
function initCustomAOS() {
  const elements = document.querySelectorAll("[data-aos]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;
          const animation = element.getAttribute("data-aos");
          element.classList.add("aos-animate");
          observer.unobserve(element);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Initialize custom AOS
document.addEventListener("DOMContentLoaded", initCustomAOS);

// Add loading animation
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // Stagger animation for hero elements
  const heroElements = document.querySelectorAll(
    ".hero-title, .hero-subtitle, .hero-buttons"
  );
  heroElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    setTimeout(() => {
      element.style.transition = "all 0.8s ease";
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, 200 * (index + 1));
  });
});

// Performance optimization: Debounced scroll handler
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounced scroll handler
const debouncedScrollHandler = debounce(function () {
  // Additional scroll-based animations can be added here
}, 10);

window.addEventListener("scroll", debouncedScrollHandler);
