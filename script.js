/* ============================================
   Portfolio — Interactive Scripts
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initDarkMode();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCountUp();
  initSmoothScroll();
});

/* --- Navbar scroll effect --- */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        navbar.classList.toggle("scrolled", window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* --- Mobile hamburger menu --- */
function initMobileMenu() {
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    links.classList.toggle("open");
  });

  // Close menu when a link is clicked
  links.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.classList.remove("active");
      links.classList.remove("open");
    });
  });
}

/* --- Scroll-reveal animation --- */
function initScrollReveal() {
  // Add .reveal class to elements that should animate in
  const selectors = [
    ".about-content",
    ".about-highlights",
    ".highlight-card",
    ".skill-category",
    ".cert-card",
    ".project-card",
    ".contact-card",
    ".section-header",
  ];

  document.querySelectorAll(selectors.join(", ")).forEach((el) => {
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Stagger children
          const parent = entry.target.closest(".section-container") || entry.target.parentElement;
          const siblings = parent
            ? Array.from(parent.querySelectorAll(".reveal:not(.visible)"))
            : [];
          const index = siblings.indexOf(entry.target);
          const delay = Math.max(0, index) * 80;

          setTimeout(() => {
            entry.target.classList.add("visible");
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

/* --- Count-up animation for hero stats --- */
function initCountUp() {
  const counters = document.querySelectorAll(".stat-number[data-target]");
  let counted = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !counted) {
          counted = true;
          counters.forEach((counter) => animateCounter(counter));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".hero-stats");
  if (statsSection) observer.observe(statsSection);
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-target"), 10);
  const duration = 1200;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/* --- Dark Mode toggle with localStorage --- */
function initDarkMode() {
  const toggle = document.getElementById("theme-toggle");
  const saved = localStorage.getItem("theme");

  // Apply saved preference or system preference
  if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.setAttribute("data-theme", "dark");
  }

  // Enable CSS transition on body after initial load to prevent flash
  requestAnimationFrame(() => {
    document.body.style.transition = "background-color 0.4s cubic-bezier(0.4,0,0.2,1), color 0.4s cubic-bezier(0.4,0,0.2,1)";
  });

  toggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    }
  });
}

/* --- Smooth scroll for anchor links --- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}
