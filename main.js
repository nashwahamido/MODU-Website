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


// Back to top: shown once the hero is well out of the way, hidden again near the top.
(function () {
  var btn = document.querySelector('.totop');
  if (!btn) return;

  // One viewport and a half. Below that the header is still close enough to scroll back to.
  function threshold() { return window.innerHeight * 1.5; }
  var on = false;

  function sync() {
    var want = window.scrollY > threshold();
    if (want === on) return;
    on = want;
    btn.classList.toggle('is-on', on);
    // Hidden means hidden: no tabbing to a control that is not on screen.
    btn.setAttribute('tabindex', on ? '0' : '-1');
    btn.setAttribute('aria-hidden', on ? 'false' : 'true');
  }

  sync();
  // The scroll position is only read here, never written, so this listener never blocks.
  window.addEventListener('scroll', sync, { passive: true });
  window.addEventListener('resize', sync);
})();


// Room carousel: crossfade through the rooms, pause when it is not being watched.
(function () {
  var root = document.querySelector('[data-rooms]');
  if (!root) return;

  var slides = root.querySelectorAll('.roomshot');
  var dots   = root.querySelectorAll('.rooms-dots button');
  var i = 0, timer = null;
  var DWELL = 3000;

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
  root.addEventListener('mouseleave', start);
  root.addEventListener('focusin', stop);
  root.addEventListener('focusout', start);
  // A background tab should not be burning through slides.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });

  // The carousel advances for everyone, including under reduced motion. A crossfade between
  // two still images is not the kind of movement that setting is there to suppress, and the
  // rooms are the point of this section. Reduced motion gets a hard cut instead of a fade,
  // which the stylesheet handles, so nothing animates but the rooms still take their turn.
  start();
})();