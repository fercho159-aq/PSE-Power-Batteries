(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.documentElement.classList.add('js');

  function initHeader() {
    var header = document.getElementById('siteHeader');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('scrolled', window.scrollY > 8);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }, { passive: true });
    update();
  }

  function initNav() {
    var toggle = document.getElementById('navToggle');
    var nav = document.getElementById('siteNav');
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
    }
    function open() {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú');
    }

    toggle.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        close();
      } else {
        open();
      }
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        close();
        toggle.focus();
      }
    });
  }

  function reveal(selector, cls, options) {
    var els = document.querySelectorAll(selector);
    if (!els.length) return;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      els.forEach(function (el) { el.classList.add(cls); });
      return;
    }
    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add(cls);
          obs.unobserve(entry.target);
        }
      });
    }, options);
    els.forEach(function (el) { observer.observe(el); });
  }

  function initPulse() {
    var path = document.querySelector('.pulse-path');
    if (!path || typeof path.getTotalLength !== 'function') return;
    var length = path.getTotalLength();
    if (reduceMotion) {
      path.classList.add('drawn');
      return;
    }
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    void path.getBoundingClientRect();
    path.style.strokeDashoffset = '0';
    path.classList.add('drawn');
  }

  // Stagger: retraso escalonado entre hermanos de cada grid
  function initStagger() {
    var groups = document.querySelectorAll('.apps-grid, .marcas-grid, .steps, .pilares, .testimonios-grid');
    groups.forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        child.style.setProperty('--sd', (i * 0.08) + 's');
      });
    });
  }

  // Tilt sutil de la ficha de producto (solo puntero fino, sin reduced motion)
  function initTilt() {
    var card = document.getElementById('heroCard');
    if (!card || reduceMotion || !window.matchMedia('(pointer: fine)').matches) return;
    var wrap = card.parentElement;
    wrap.addEventListener('mousemove', function (e) {
      var r = wrap.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5;
      var y = (e.clientY - r.top) / r.height - 0.5;
      card.style.setProperty('--ry', (x * 5) + 'deg');
      card.style.setProperty('--rx', (y * -5) + 'deg');
    });
    wrap.addEventListener('mouseleave', function () {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  }

  initHeader();
  initNav();
  initStagger();
  initTilt();
  reveal('[data-reveal]', 'revealed', { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  reveal('.step', 'charged', { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  window.addEventListener('load', function () {
    document.body.classList.add('loaded');
    initPulse();
  });
})();
