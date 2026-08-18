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