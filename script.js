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

// Reveal on scroll
const revealEls = document.querySelectorAll('.section, .card, .page-hero, .videos-grid, .featured-card');
revealEls.forEach(el => el.classList.add('reveal'));

const revealIO = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealIO.observe(el));

/* ---------- Featured random video (only existing files) ---------- */
/* ---------- Featured random video (mobile-safe fallback) ---------- */
const featuredCard = document.getElementById('featuredCard');
const featuredVideo = document.getElementById('featuredVideo');

if (featuredCard && featuredVideo) {
  const featuredPool = [
    'assets/realestate1.mp4',
    'assets/realestate2.mp4',
    'assets/influencer1.mp4',
    'assets/biz1.mp4',
    'assets/author1.mp4'
  ];

  // shuffle
  const queue = [...featuredPool].sort(() => 0.5 - Math.random());
  let currentIndex = 0;

  function trySetVideo(i) {
    if (i >= queue.length) return;
    currentIndex = i;

    // lazy-ish: set src only when we decide to load
    featuredVideo.src = queue[i];
    featuredVideo.load();
  }

  // if a file fails (missing / unsupported), try next
  featuredVideo.addEventListener('error', () => {
    trySetVideo(currentIndex + 1);
  });

  // autoplay only in viewport (but ALWAYS set a src when it becomes visible)
  const videoIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!featuredVideo.src) {
          trySetVideo(0);
        }
        featuredVideo.play().catch(()=>{});
      } else {
        featuredVideo.pause();
      }
    });
  }, { threshold: 0.25 });

  videoIO.observe(featuredVideo);

  // sound toggle only on click (policy-safe)
  featuredVideo.addEventListener('click', () => {
    featuredVideo.muted = !featuredVideo.muted;
    featuredVideo.volume = 0.8;
  });
}


  // Autoplay ONLY when visible
  const videoIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        featuredVideo.play().catch(()=>{});
      } else {
        featuredVideo.pause();
      }
    });
  }, { threshold: 0.35 });

  videoIO.observe(featuredVideo);

    // Hover sound (desktop)
  const isTouch = window.matchMedia('(hover: none)').matches;

  if (!isTouch) {
      // Sound toggle only on click (safe with autoplay policies)
  featuredVideo.addEventListener('click', () => {
    featuredVideo.muted = !featuredVideo.muted;
    featuredVideo.volume = 0.8;
  });

  } else {
    // Tap to toggle sound (mobile)
    featuredVideo.addEventListener('click', () => {
      featuredVideo.muted = !featuredVideo.muted;
      featuredVideo.volume = 0.8;
    });
  }


