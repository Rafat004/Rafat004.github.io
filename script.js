/* ============================================
   PORTFOLIO — Md. Rafatul Islam
   Interactive Scripts
   ============================================ */

// ============================================
// 1. STARFIELD CANVAS ANIMATION
// ============================================
(function initStarfield() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let stars = [];
  let shootingStars = [];
  const STAR_COUNT = 200;
  const SHOOTING_STAR_INTERVAL = 4000;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.3,
        opacity: Math.random(),
        speed: Math.random() * 0.005 + 0.002,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function createShootingStar() {
    const side = Math.random();
    let x, y, angle;
    if (side < 0.5) {
      x = Math.random() * canvas.width;
      y = -10;
      angle = Math.PI / 4 + Math.random() * (Math.PI / 6);
    } else {
      x = canvas.width + 10;
      y = Math.random() * canvas.height * 0.5;
      angle = Math.PI * 0.6 + Math.random() * (Math.PI / 6);
    }

    shootingStars.push({
      x,
      y,
      length: 80 + Math.random() * 60,
      speed: 8 + Math.random() * 6,
      angle,
      opacity: 1,
      decay: 0.015 + Math.random() * 0.01,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.001;

    // Draw stars
    for (const star of stars) {
      const twinkle = Math.sin(time * star.speed * 200 + star.phase) * 0.4 + 0.6;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 210, 255, ${star.opacity * twinkle})`;
      ctx.fill();
    }

    // Draw shooting stars
    for (let i = shootingStars.length - 1; i >= 0; i--) {
      const s = shootingStars[i];
      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      gradient.addColorStop(0, `rgba(139, 92, 246, ${s.opacity})`);
      gradient.addColorStop(0.3, `rgba(6, 182, 212, ${s.opacity * 0.6})`);
      gradient.addColorStop(1, `rgba(6, 182, 212, 0)`);

      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(tailX, tailY);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Glow at head
      ctx.beginPath();
      ctx.arc(s.x, s.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${s.opacity})`;
      ctx.fill();

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity -= s.decay;

      if (s.opacity <= 0 || s.x > canvas.width + 100 || s.y > canvas.height + 100) {
        shootingStars.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    createStars();
  });

  resize();
  createStars();
  animate();

  // Periodic shooting stars
  setInterval(createShootingStar, SHOOTING_STAR_INTERVAL);
  setTimeout(createShootingStar, 1500);
})();


// ============================================
// 2. TYPEWRITER EFFECT
// ============================================
(function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'CSE Student at IUT, Gazipur 🎓',
    'Full Stack Developer 💻',
    'AI/ML enthusiast 🤖',
    'Hackathon Finalist 🏆',
    'Always Building Something New 🚀',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 60;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 30;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 60;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typeSpeed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // Pause before next phrase
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1200);
})();


// ============================================
// 3. NAVBAR SCROLL EFFECT
// ============================================
(function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  let ticking = false;

  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateNavbar);
      ticking = true;
    }
  });
})();


// ============================================
// 4. ACTIVE NAV LINK ON SCROLL
// ============================================
(function initActiveNav() {
  const sections = document.querySelectorAll('.section, .hero');
  const navLinks = document.querySelectorAll('[data-nav]');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { rootMargin: '-40% 0px -60% 0px' }
  );

  sections.forEach((section) => observer.observe(section));
})();


// ============================================
// 5. SCROLL REVEAL ANIMATIONS
// ============================================
(function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .stagger-children');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));
})();


// ============================================
// 6. MOBILE HAMBURGER MENU
// ============================================
(function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const overlay = document.getElementById('navOverlay');
  const links = document.querySelectorAll('[data-nav]');

  if (!hamburger || !navLinks) return;

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  }

  function closeMenu() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);
  if (overlay) overlay.addEventListener('click', closeMenu);
  links.forEach((link) => link.addEventListener('click', closeMenu));
})();


// ============================================
// 7. SMOOTH SCROLL (FALLBACK)
// ============================================
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
