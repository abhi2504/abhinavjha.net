(() => {
  'use strict';

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // On-load reveal
  requestAnimationFrame(() => {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
  });

  // Scroll-triggered reveals
  const scrollEls = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && scrollEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    scrollEls.forEach((el) => io.observe(el));
  } else {
    scrollEls.forEach((el) => el.classList.add('is-in'));
  }

  // Header scroll state
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Cursor-following ambient glow
  const glow = document.querySelector('.cursor-glow');
  if (glow && !prefersReduced && window.matchMedia('(pointer: fine)').matches) {
    let raf = 0;
    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 3;
    const apply = () => {
      glow.style.setProperty('--mx', mx + 'px');
      glow.style.setProperty('--my', my + 'px');
      raf = 0;
    };
    window.addEventListener(
      'pointermove',
      (e) => {
        mx = e.clientX;
        my = e.clientY;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true }
    );
  }
})();
