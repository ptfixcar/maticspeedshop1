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
          }, index * 200); // delay antar box
        });
        observer.unobserve(entry.target); // stop observe biar sekali animasi
      }
    });
  }, { threshold: 0.2 });

  if (benefitSection) observer.observe(benefitSection);

  // --- 2. Klik tombol Hero ---
  if (btnBenefit && benefitSection) {
    btnBenefit.addEventListener("click", (e) => {
      e.preventDefault();
      benefitSection.scrollIntoView({ behavior: "smooth", block: "start" });

      // Reset animasi dulu
      benefitBoxes.forEach(box => box.classList.remove("appear"));

      // Jalankan animasi fade-in berurutan setelah scroll
      setTimeout(() => {
        benefitBoxes.forEach((box, index) => {
          setTimeout(() => {
            box.classList.add("appear");
          }, index * 200);
        });
      }, 600); // tunggu scroll
    });
  }
});




/* =========================================================
   SERVICE PAGE JAVASCRIPT
   ========================================================= */

/* ----------------------------
   1. Fade-in Animasi on Scroll
----------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  /* ----------------------------
     1. Fade-in Animasi on Scroll
  ----------------------------- */
  const elements = document.querySelectorAll(".fade-in, .fade-in-delay, .service-card");

  // pastikan semua service-card dapat class fade-in
  document.querySelectorAll(".service-card").forEach(card => {
    card.classList.add("fade-in");
  });

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("appear");
        obs.unobserve(entry.target); // stop observe setelah muncul
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));

  /* ----------------------------
     2. Toggle Detail Service
     (Hanya 1 card aktif dalam satu waktu)
  ----------------------------- */
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach(card => {
    const btn = card.querySelector(".toggle-btn");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      // Tutup semua card sebelum buka yang dipilih
      serviceCards.forEach(c => {
        if (c !== card) {
          c.classList.remove("active");
          const otherBtn = c.querySelector(".toggle-btn");
          if (otherBtn) otherBtn.textContent = "+";
        }
      });

      // Toggle card yang diklik
      card.classList.toggle("active");
      btn.textContent = card.classList.contains("active") ? "−" : "+";
    });
  });
});


// ===============================
// REVIEW SLIDER FUNCTION
// ===============================
function scrollReview(direction) {
  const container = document.getElementById("reviewScroll");
  const cardWidth = container.querySelector(".review-card").offsetWidth + 20; 
  container.scrollBy({
    left: direction * cardWidth,
    behavior: "smooth"
  });
}
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
      let waNumber = "6285640621068"; // nomor WA tujuan
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
    
    // Navbar scroll effect
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Add scrolled class for styling
        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active navigation
        updateActiveNavigation();
    });
    
    // Active navigation highlighting
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




