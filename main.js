// Reveal on scroll: one observer, and nothing at all when reduced motion is asked for.
(function () {
  var items = document.querySelectorAll('.rise');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e, i) {
      if (!e.isIntersecting) return;
      // A short stagger so a row of cards arrives as a row, not all at once.
      setTimeout(function () { e.target.classList.add('in'); }, i * 70);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();


// Room carousel: crossfade through the rooms, pause when it is not being watched.
(function () {
  var root = document.querySelector('[data-rooms]');
  if (!root) return;

  var slides = root.querySelectorAll('.roomshot');
  var dots   = root.querySelectorAll('.rooms-dots button');
  var i = 0, timer = null;
  var DWELL = 5000;

  function show(n) {
    i = (n + slides.length) % slides.length;
    slides.forEach(function (el, k) { el.classList.toggle('is-on', k === i); });
    dots.forEach(function (el, k) { el.classList.toggle('is-on', k === i); });
  }
  function start() { stop(); timer = setInterval(function () { show(i + 1); }, DWELL); }
  function stop()  { if (timer) { clearInterval(timer); timer = null; } }

  dots.forEach(function (dot, k) {
    // A click is a deliberate choice, so restart the clock rather than cutting the room short.
    dot.addEventListener('click', function () { show(k); if (timer) start(); });
  });

  // Hovering or tabbing in usually means someone is looking at a particular room.
  root.addEventListener('mouseenter', stop);
  root.addEventListener('mouseleave', function () { if (allowed()) start(); });
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', function () { if (allowed()) start(); });
  // A background tab should not be burning through slides.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else if (allowed()) start();
  });

  function allowed() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  // Reduced motion leaves the first room up; the dots still work for anyone who wants the rest.
  if (allowed()) start();
})();