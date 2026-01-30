// Smooth scroll for same-page anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    if (href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Reveal on scroll (generic)
const baseReveal = document.querySelectorAll('.section, .card, .page-hero, .videos-grid');
baseReveal.forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

baseReveal.forEach(el => io.observe(el));

// Work items: show immediately + allow filter animations
document.querySelectorAll('.work-item').forEach((it, i) => {
  it.classList.add('is-visible');
});


/* ---- WORK FILTERS (only if present on page) ---- */
const btns = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.work-item');

if (btns.length && items.length) {
  const applyFilter = (f) => {
    items.forEach((it) => {
      const cat = it.dataset.cat;
      const show = (f === 'all' || cat === f);

      if (show) {
        it.style.display = '';
        // re-trigger animation
        requestAnimationFrame(() => it.classList.add('is-visible'));
      } else {
        it.classList.remove('is-visible');
        // wait for fade-out then hide
        setTimeout(() => { it.style.display = 'none'; }, 180);
      }
    });
  };

  btns.forEach(b => b.addEventListener('click', () => {
    btns.forEach(x => x.classList.remove('is-active'));
    b.classList.add('is-active');
    applyFilter(b.dataset.filter);
  }));

  // initial
  applyFilter('all');
}

