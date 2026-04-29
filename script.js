// ================================
// Navbar Active Link Highlight
// ================================
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const currentLocation = location.href;

  navLinks.forEach(link => {
    if (link.href === currentLocation) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

const mobileToggle = document.querySelector(".mobile-toggle");
const navLinks = document.querySelector(".nav-links");
mobileToggle.addEventListener("click", () => {
  navLinks.classList.toggle("mobile-active");
});

// =============================
// Sticky Navbar + Shadow
// =============================
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
});

// =============================
// Smooth scroll untuk tombol hero
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const heroBtn = document.querySelector(".hero .btn-primary");
  if (heroBtn) {
    heroBtn.addEventListener("click", function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const btnBenefit = document.getElementById("btnBenefit");
  const benefitSection = document.getElementById("benefit");
  const benefitBoxes = document.querySelectorAll(".benefit-box");

  // --- 1. Intersection Observer ---
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        benefitBoxes.forEach((box, index) => {
          setTimeout(() => {
            box.classList.add("appear");
          }, index * 200);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  if (benefitSection) observer.observe(benefitSection);

  // --- 2. Klik tombol Hero ---
  if (btnBenefit && benefitSection) {
    btnBenefit.addEventListener("click", (e) => {
      e.preventDefault();
      benefitSection.scrollIntoView({ behavior: "smooth", block: "start" });

      benefitBoxes.forEach(box => box.classList.remove("appear"));
    });
  }
});

const boxes = document.querySelectorAll(".benefit-box");

boxes.forEach(box => {
  box.addEventListener("click", () => {
    const isActive = box.classList.contains("active");

    boxes.forEach(b => {
      b.classList.remove("active");
      b.querySelector(".toggle-icon").textContent = "+";
    });

    if (!isActive) {
      box.classList.add("active");
      box.querySelector(".toggle-icon").textContent = "−";
    }
  });
});

/* =========================================================
   SERVICE PAGE JAVASCRIPT
========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".fade-in, .fade-in-delay, .service-card");

  document.querySelectorAll(".service-card").forEach(card => {
    card.classList.add("fade-in");
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));

  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach(card => {
    const btn = card.querySelector(".toggle-btn");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      serviceCards.forEach(c => {
        if (c !== card) {
          c.classList.remove("active");
          const otherBtn = c.querySelector(".toggle-btn");
          if (otherBtn) otherBtn.textContent = "+";
        }
      });

      card.classList.toggle("active");
      btn.textContent = card.classList.contains("active") ? "−" : "+";
    });
  });
});

// ===============================
// REVIEW SLIDER FUNCTION
// ===============================
function scrollReview(direction) {
  const scrollContainer = document.getElementById("reviewScroll");
  const card = scrollContainer.querySelector(".review-card");
  if (!card) return;

  const style = window.getComputedStyle(scrollContainer);
  const gap = parseInt(style.columnGap || style.gap) || 0;
  const cardWidth = card.offsetWidth + gap;

  const newScrollLeft = scrollContainer.scrollLeft + direction * cardWidth;

  scrollContainer.scrollTo({
    left: newScrollLeft,
    behavior: "smooth"
  });
}

let index = 0;

function slideTestimonial(direction) {
  const track = document.getElementById("sliderTrack");
  const cards = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");

  index += direction;

  if (index < 0) index = cards.length - 1;
  if (index >= cards.length) index = 0;

  const cardWidth = cards[0].offsetWidth + 25;

  track.style.transform = `translateX(-${index * cardWidth}px)`;

  // ACTIVE 1 CARD
  cards.forEach(card => card.classList.remove("active"));
  cards[index].classList.add("active");

  // DOT
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[index]) dots[index].classList.add("active");
}

// biar langsung aktif saat load
window.onload = () => {
  slideTestimonial(0);
};
// ================================
// WA Form Submit
// ================================
const waForm = document.getElementById("waForm");
if (waForm) {
  waForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name && message) {
      let waNumber = "6285640621068";
      let waMessage = `Halo, saya ${name}. %0A${message}`;
      let waUrl = `https://wa.me/${waNumber}?text=${waMessage}`;

      window.open(waUrl, "_blank");
    } else {
      alert("Mohon isi semua field sebelum mengirim pesan.");
    }
  });
}

// ===========================================
// NAVIGATION FUNCTIONALITY
// ===========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        updateActiveNavigation();
    });

    function updateActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ==========================================
// INSTAGRAM EMBED LOADER
// ==========================================
(function() {
  const script = document.createElement("script");
  script.src = "//www.instagram.com/embed.js";
  script.async = true;
  document.body.appendChild(script);
})();


// ==================================================
// SCROLL-UP BUTTON (DITAMBAHKAN DI SINI)
// ==================================================
const scrollBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.add("show");
  } else {
    scrollBtn.classList.remove("show");
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
