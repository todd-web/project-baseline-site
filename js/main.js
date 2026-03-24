/* ===== PROJECT BASELINE - Interactive Engine ===== */

(function() {
  'use strict';

  // ===== SCROLL-TRIGGERED REVEALS =====
  function initReveals() {
    var revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    if (!revealElements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ===== COUNTER ANIMATION =====
  function initCounters() {
    var counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(function(el) {
      observer.observe(el);
    });
  }

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var startTime = null;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease-out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = prefix + current.toLocaleString() + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target.toLocaleString() + suffix;
      }
    }

    requestAnimationFrame(step);
  }

  // ===== SCROLL-DRIVEN METHODOLOGY =====
  function initMethodology() {
    var section = document.querySelector('.methodology-scroll');
    if (!section) return;
    if (window.innerWidth <= 768) return; // mobile uses stacked layout

    var dots = section.querySelectorAll('.timeline-dot');
    var panels = section.querySelectorAll('.step-panel');
    var progressBar = section.querySelector('.timeline-progress');
    var totalSteps = panels.length;

    function update() {
      var rect = section.getBoundingClientRect();
      var sectionHeight = section.offsetHeight;
      var scrolled = -rect.top;
      var progress = Math.max(0, Math.min(1, scrolled / (sectionHeight - window.innerHeight)));

      // Update progress bar
      if (progressBar) {
        progressBar.style.height = (progress * 100) + '%';
      }

      // Determine active step
      var activeStep = Math.min(Math.floor(progress * totalSteps), totalSteps - 1);

      // Update dots
      dots.forEach(function(dot, i) {
        if (i <= activeStep) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });

      // Update panels
      panels.forEach(function(panel, i) {
        if (i === activeStep) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    }

    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // ===== MOBILE NAV TOGGLE =====
  function initNav() {
    var toggle = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (toggle && links) {
      toggle.addEventListener('click', function() {
        links.classList.toggle('open');
        toggle.classList.toggle('active');
      });
    }
  }

  // ===== ACTIVE NAV LINK =====
  function initActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    var navLinks = document.querySelectorAll('.nav-links > a:not(.nav-cta), .nav-dropdown > a');
    navLinks.forEach(function(link) {
      var href = link.getAttribute('href');
      if (!href) return;
      var linkPage = href.split('/').pop();
      if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ===== NAV SHRINK ON SCROLL =====
  function initNavShrink() {
    var nav = document.querySelector('.nav');
    if (!nav) return;
    var scrolled = false;

    window.addEventListener('scroll', function() {
      if (window.scrollY > 80 && !scrolled) {
        nav.style.height = '60px';
        scrolled = true;
      } else if (window.scrollY <= 80 && scrolled) {
        nav.style.height = '70px';
        scrolled = false;
      }
    }, { passive: true });
  }

  // ===== INIT ALL =====
  document.addEventListener('DOMContentLoaded', function() {
    initNav();
    initActiveNav();
    initReveals();
    initCounters();
    initMethodology();
    initSmoothScroll();
    initNavShrink();
  });

})();

// ===== CASE STUDY FILTERING =====
document.addEventListener('DOMContentLoaded', function() {
  var filterBtns = document.querySelectorAll('.filter-btn');
  var cards = document.querySelectorAll('.work-card[data-category]');

  filterBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      filterBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var filter = btn.getAttribute('data-filter');

      cards.forEach(function(card) {
        if (filter === 'all' || card.getAttribute('data-category').indexOf(filter) !== -1) {
          card.classList.remove('filter-hidden');
        } else {
          card.classList.add('filter-hidden');
        }
      });
    });
  });
});
