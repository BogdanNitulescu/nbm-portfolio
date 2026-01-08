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

  async function pickExistingVideo(list){
    for (const src of list.sort(() => 0.5 - Math.random())) {
      try {
        const res = await fetch(src, { method: 'HEAD' });
        if (res.ok) return src;
      } catch (e) {}
    }
    return null;
  }

  (async () => {
    const pick = await pickExistingVideo(featuredPool);
    if (!pick) return;

    featuredVideo.src = pick;
    featuredVideo.load();

    // retry autoplay (GitHub Pages safe)
    setTimeout(() => {
      featuredVideo.play().catch(()=>{});
    }, 300);

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
  })();

  // sound toggle ONLY by click (policy-safe)
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

}
