/* ==========================================================================
   SCRIPT.JS — Cleaned & Restructured

   TABLE OF CONTENTS
   ─────────────────────────────────────────────────────────────────────────
   01. Navbar — Active Link, Mobile Toggle, Sticky + Hide on Scroll
   02. Smooth Scroll — Hero Button
   03. Benefit Section — Intersection Observer + Toggle
   04. Service Cards — Fade-in + Toggle
   05. Testimonial Slider
   06. Review Slider
   07. WhatsApp Form
   08. About Section — Scroll Trigger Animation
   09. Testimonial Section — Scroll Trigger Animation
   10. Scroll-to-Top Button
   11. Instagram Embed Loader
   ========================================================================== */


/* ==========================================================================
   01. NAVBAR
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Active link berdasarkan URL ---
  const currentLocation = location.href;
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.href === currentLocation);
  });

  // --- Mobile toggle ---
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinksMenu = document.querySelector('.nav-links');

  if (mobileToggle && navLinksMenu) {
    mobileToggle.addEventListener('click', () => {
      navLinksMenu.classList.toggle('mobile-active');
    });
  }

});

// --- Sticky + hide/show navbar saat scroll ---
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-links a');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Tambah class scrolled
  navbar.classList.toggle('scrolled', scrollTop > 100);

  // Sembunyikan saat scroll ke bawah, tampilkan saat ke atas
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    navbar.style.transform = 'translateY(-100%)';
  } else {
    navbar.style.transform = 'translateY(0)';
  }

  lastScrollTop = scrollTop;

  // Update active nav link berdasarkan section yang terlihat
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = scrollTop + 100;

  sections.forEach(section => {
    const sectionTop    = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId     = section.getAttribute('id');

    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
      });
    }
  });
});


/* ==========================================================================
   02. SMOOTH SCROLL — HERO BUTTON
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const heroBtn = document.querySelector('.hero .btn-primary');
  if (!heroBtn) return;

  heroBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(heroBtn.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


/* ==========================================================================
   03. BENEFIT SECTION — OBSERVER + TOGGLE BOX
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const benefitSection = document.getElementById('benefit');
  const benefitBoxes   = document.querySelectorAll('.benefit-box');
  const btnBenefit     = document.getElementById('btnBenefit');

  // Intersection Observer — animasi kotak masuk
  if (benefitSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        benefitBoxes.forEach((box, i) => {
          setTimeout(() => box.classList.add('appear'), i * 200);
        });
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.2 });

    observer.observe(benefitSection);
  }

  // Klik tombol hero → scroll ke benefit
  if (btnBenefit && benefitSection) {
    btnBenefit.addEventListener('click', (e) => {
      e.preventDefault();
      benefitSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      benefitBoxes.forEach(box => box.classList.remove('appear'));
    });
  }

  // Toggle expand/collapse tiap box
  benefitBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const isActive = box.classList.contains('active');

      benefitBoxes.forEach(b => {
        b.classList.remove('active');
        const icon = b.querySelector('.toggle-icon');
        if (icon) icon.textContent = '+';
      });

      if (!isActive) {
        box.classList.add('active');
        const icon = box.querySelector('.toggle-icon');
        if (icon) icon.textContent = '−';
      }
    });
  });
});


/* ==========================================================================
   04. SERVICE CARDS — FADE-IN + TOGGLE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const serviceCards = document.querySelectorAll('.service-card');
  if (!serviceCards.length) return;

  // Tambah class fade-in & observasi
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('appear');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  serviceCards.forEach(card => {
    card.classList.add('fade-in');
    observer.observe(card);
  });

  // Toggle expand/collapse tiap card
  serviceCards.forEach(card => {
    const btn = card.querySelector('.toggle-btn');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();

      // Tutup semua card lain
      serviceCards.forEach(c => {
        if (c !== card) {
          c.classList.remove('active');
          const otherBtn = c.querySelector('.toggle-btn');
          if (otherBtn) otherBtn.textContent = '+';
        }
      });

      card.classList.toggle('active');
      btn.textContent = card.classList.contains('active') ? '−' : '+';
    });
  });
});


/* ==========================================================================
   05. TESTIMONIAL SLIDER
   ========================================================================== */

let testimonialIndex = 0;

function slideTestimonial(direction) {
  const track = document.getElementById('sliderTrack');
  const cards = document.querySelectorAll('.testimonial-card');
  const dots  = document.querySelectorAll('.dot');

  if (!track || !cards.length) return;

  testimonialIndex += direction;
  if (testimonialIndex < 0)            testimonialIndex = cards.length - 1;
  if (testimonialIndex >= cards.length) testimonialIndex = 0;

  const cardWidth = cards[0].offsetWidth + 25;
  track.style.transform = `translateX(-${testimonialIndex * cardWidth}px)`;

  cards.forEach((card, i) => card.classList.toggle('active', i === testimonialIndex));
  dots.forEach((dot, i)  => dot.classList.toggle('active',  i === testimonialIndex));
}

window.addEventListener('load', () => slideTestimonial(0));


/* ==========================================================================
   06. REVIEW SLIDER
   ========================================================================== */

function scrollReview(direction) {
  const scrollContainer = document.getElementById('reviewScroll');
  if (!scrollContainer) return;

  const card    = scrollContainer.querySelector('.review-card');
  if (!card) return;

  const gap       = parseInt(window.getComputedStyle(scrollContainer).columnGap) || 0;
  const cardWidth = card.offsetWidth + gap;

  scrollContainer.scrollTo({
    left: scrollContainer.scrollLeft + direction * cardWidth,
    behavior: 'smooth'
  });
}


/* ==========================================================================
   07. WHATSAPP FORM
   ========================================================================== */

const waForm = document.getElementById('waForm');
if (waForm) {
  waForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = document.getElementById('name')?.value.trim();
    const message = document.getElementById('message')?.value.trim();

    if (name && message) {
      const waUrl = `https://wa.me/6285640621068?text=Halo%2C+saya+${encodeURIComponent(name)}.+%0A${encodeURIComponent(message)}`;
      window.open(waUrl, '_blank');
    } else {
      alert('Mohon isi semua field sebelum mengirim pesan.');
    }
  });
}


/* ==========================================================================
   08. ABOUT SECTION — SCROLL TRIGGER ANIMATION
   ========================================================================== */

const aboutObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el = entry.target;
    el.classList.add('visible');

    // Trigger feature cards di dalam about-text
    el.querySelectorAll('.feature-card').forEach(card => {
      card.classList.add('visible');
    });

    aboutObserver.unobserve(el);
  });
}, { threshold: 0.2 });

document.querySelectorAll('.about-image, .about-text').forEach(el => {
  aboutObserver.observe(el);
});


/* ==========================================================================
   09. TESTIMONIAL SECTION — SCROLL TRIGGER ANIMATION
   ========================================================================== */

const testimonialObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const section = entry.target;

    section.querySelector('.badge')?.classList.add('visible');
    section.querySelector('.section-title')?.classList.add('visible');
    section.querySelector('.section-subtitle')?.classList.add('visible');
    section.querySelector('.testimonial-slider')?.classList.add('visible');
    section.querySelector('.dots')?.classList.add('visible');

    section.querySelectorAll('.testimonial-card').forEach(card => {
      card.classList.add('visible');
    });

    section.querySelectorAll('.stat').forEach(stat => {
      stat.classList.add('visible');
    });

    testimonialObserver.unobserve(section);
  });
}, { threshold: 0.15 });

const testimonialSection = document.querySelector('.testimonial-section');
if (testimonialSection) {
  testimonialObserver.observe(testimonialSection);
}


/* ==========================================================================
   10. SCROLL-TO-TOP BUTTON
   ========================================================================== */

const scrollBtn = document.getElementById('scrollTopBtn');

if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 300);
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ==========================================================================
   11. INSTAGRAM EMBED LOADER
   ========================================================================== */

(function () {
  const script    = document.createElement('script');
  script.src      = '//www.instagram.com/embed.js';
  script.async    = true;
  document.body.appendChild(script);
})();
