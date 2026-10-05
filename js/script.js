/* ==========================================================================
   SOHAM HINGE — PERSONAL DEVELOPER PORTFOLIO
   Core Script: GSAP Animations, Navigation, Interactive Filters, Modals,
                Audio Synth, Copy Clipboard, and Contact Form Handling.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. Toast Notification System
  // ------------------------------------------------------------------------
  const toastEl = document.getElementById('customToast');
  const toastMsg = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message, duration = 3500) {
    if (!toastEl || !toastMsg) return;
    toastMsg.textContent = message;
    toastEl.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  window.showToast = showToast;

  // ------------------------------------------------------------------------
  // 2. Navigation & Mobile Drawer
  // ------------------------------------------------------------------------
  const navbar = document.getElementById('mainNavbar');
  const navHamburger = document.getElementById('navHamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const navLinks = document.querySelectorAll('.nav-link-item, .mobile-nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  function toggleDrawer(open) {
    const shouldOpen = open !== undefined ? open : !mobileDrawer?.classList.contains('open');
    if (shouldOpen) {
      mobileDrawer?.classList.add('open');
      drawerOverlay?.classList.add('active');
      navHamburger?.classList.add('active');
      document.body.style.overflow = 'hidden';
    } else {
      mobileDrawer?.classList.remove('open');
      drawerOverlay?.classList.remove('active');
      navHamburger?.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  navHamburger?.addEventListener('click', () => toggleDrawer());
  drawerOverlay?.addEventListener('click', () => toggleDrawer(false));

  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        e.preventDefault();
        toggleDrawer(false);

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          const navOffset = navbar ? navbar.offsetHeight + 10 : 80;
          const elementPosition = targetEl.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });
        }
      }
    });
  });

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -60% 0px',
    threshold: 0,
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => navObserver.observe(sec));

  const backToTopBtn = document.getElementById('backToTop');
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ------------------------------------------------------------------------
  // 3. GSAP & ScrollTrigger Animations
  // ------------------------------------------------------------------------
  if (typeof gsap !== 'undefined') {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.85 } });

      heroTl
        .from('.hero-badge-clean', { y: -20, opacity: 0, duration: 0.7 })
        .from('.hero-name', { y: 30, opacity: 0, duration: 0.9 }, '-=0.4')
        .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.6')
        .from('.hero-tagline', { y: 20, opacity: 0 }, '-=0.6')
        .from('.hero-cta-group .btn-grand-line', { y: 20, opacity: 0, stagger: 0.12 }, '-=0.5')
        .from('.quick-pill', { y: 15, opacity: 0, stagger: 0.07 }, '-=0.4')
        .from('.scroll-indicator', { opacity: 0, duration: 0.5 }, '-=0.3');

      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 30,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
        });
      });

      const voyageProgress = document.getElementById('voyageProgress');
      const voyageWrapper = document.querySelector('.voyage-timeline-wrapper');

      if (voyageProgress && voyageWrapper && typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.create({
          trigger: voyageWrapper,
          start: 'top 70%',
          end: 'bottom 70%',
          scrub: 0.3,
          onUpdate: (self) => {
            voyageProgress.style.height = `${self.progress * 100}%`;
          },
        });
      }

      gsap.utils.toArray('.voyage-milestone').forEach((node) => {
        const isLeft = node.classList.contains('left-node');
        gsap.from(node, {
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          x: isLeft ? -35 : 35,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      });

      gsap.utils.toArray('.treasure-project-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.75,
          delay: (idx % 2) * 0.12,
          ease: 'power2.out',
        });
      });

      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 25,
        opacity: 1,
        stagger: 0.05,
        duration: 0.55,
        ease: 'power2.out',
      });
    }
  }

  // ------------------------------------------------------------------------
  // 4. Skills Category Filter
  // ------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filterValue = btn.getAttribute('data-filter');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Ensure All Technologies is visible and active on initial page load.
  const allSkillsBtn = document.querySelector('.filter-btn[data-filter="all"]');
  if (allSkillsBtn) {
    allSkillsBtn.classList.add('active');
    allSkillsBtn.setAttribute('aria-selected', 'true');
  }
  filterBtns.forEach((btn) => {
    if (btn !== allSkillsBtn) btn.setAttribute('aria-selected', 'false');
  });
  skillCards.forEach((card) => {
    card.style.display = 'flex';
    card.style.opacity = '1';
    card.style.transform = 'scale(1)';
  });

  // ------------------------------------------------------------------------
  // 5. Python Project Archive Search & Filter
  // ------------------------------------------------------------------------
  const archiveSearchInput = document.getElementById('archiveSearch');
  const archiveCards = document.querySelectorAll('.archive-card');
  const archiveCountBadge = document.getElementById('archiveCount');

  function filterArchiveProjects() {
    if (!archiveSearchInput) return;
    const query = archiveSearchInput.value.toLowerCase().trim();
    let visibleCount = 0;

    archiveCards.forEach((card) => {
      const title = card.querySelector('.archive-title')?.textContent.toLowerCase() || '';
      const desc = card.querySelector('.archive-desc')?.textContent.toLowerCase() || '';
      const tags = Array.from(card.querySelectorAll('.archive-tag'))
        .map((t) => t.textContent.toLowerCase())
        .join(' ');

      if (title.includes(query) || desc.includes(query) || tags.includes(query)) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (archiveCountBadge) {
      archiveCountBadge.textContent = `${visibleCount} PROJECTS`;
    }
  }

  archiveSearchInput?.addEventListener('input', filterArchiveProjects);

  // ------------------------------------------------------------------------
  // 6. Placeholder Link Interceptor & Clipboard Copy
  // ------------------------------------------------------------------------
  const placeholderPatterns = ['YOUR_LINKEDIN_URL', 'YOUR_EMAIL', 'YOUR_DEMO_URL'];

  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;

    const href = targetLink.getAttribute('href') || '';
    const isPlaceholder = placeholderPatterns.some((pattern) => href.includes(pattern));

    if (isPlaceholder) {
      e.preventDefault();
      showToast(`Link Placeholder: Replace "${href}" with your real URL in index.html!`);
    }
  });

  const copyButtons = document.querySelectorAll('[data-copy-target]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-target') || '';

      if (navigator.clipboard && textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast(`Copied "${textToCopy}" to clipboard!`);
          })
          .catch(() => {
            showToast(`Copy text: ${textToCopy}`);
          });
      } else {
        showToast(`Copy text: ${textToCopy}`);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. Contact Form Handling
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    const name = nameInput?.value.trim() || 'Fellow Developer';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (!name || !email || !message) {
      showToast('Please fill in all fields before sending.');
      return;
    }

    showToast(`Thanks for reaching out, ${name}! Preparing email client...`);

    const mailtoSubject = encodeURIComponent(`Portfolio Message from ${name}`);
    const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:YOUR_EMAIL?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 1000);

    contactForm.reset();
  });

  // ------------------------------------------------------------------------
  // 8. Generative Web Audio Synthesizer (Ambient Waves)
  // ------------------------------------------------------------------------
  let audioCtx = null;
  let isAudioPlaying = false;
  let noiseNode = null;
  let filterNode = null;
  let gainNode = null;
  const audioToggleBtn = document.getElementById('audioToggleBtn');

  function initAmbientAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.07;
      b6 = white * 0.115926;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(300, audioCtx.currentTime);

    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.15;
    lfoGain.gain.value = 180;
    lfo.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);
    lfo.start();

    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.18, audioCtx.currentTime + 2);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    isAudioPlaying = true;
    audioToggleBtn?.classList.add('active');
    showToast('Ocean Ambient Sound: Enabled');
  }

  function stopAmbientAudio() {
    if (gainNode && audioCtx) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
      setTimeout(() => {
        noiseNode?.stop();
        isAudioPlaying = false;
        audioToggleBtn?.classList.remove('active');
        showToast('Ocean Ambient Sound: Muted');
      }, 1000);
    }
  }

  audioToggleBtn?.addEventListener('click', () => {
    if (!isAudioPlaying) {
      initAmbientAudio();
    } else {
      stopAmbientAudio();
    }
  });

  // ------------------------------------------------------------------------
  // 9. Project Details Modal Dynamic Populator
  // ------------------------------------------------------------------------
  const projectModalEl = document.getElementById('projectDetailModal');
  const projectDataMap = {
    'hospital-management': {
      title: 'Hospital Management System',
      badge: 'Team Project',
      category: 'Full-Stack Web Development',
      overview:
        'A full-stack web application designed to streamline hospital operations, manage patient medical records, schedule doctor appointments, and maintain administrative oversight.',
      contribution:
        'Team project built with my friend Jayesh. I developed the complete frontend interface and worked on the database/schema side, while also contributing to backend integration and debugging. Jayesh primarily handled and led the core backend implementation.',
      tech: ['HTML', 'CSS', 'JavaScript', 'EJS', 'Node.js', 'Express', 'MySQL'],
      github: 'https://github.com/sohamhinge08/hospital-management-system',
      demo: '#',
    },
    'iss-notifier': {
      title: 'ISS Overhead Notifier',
      badge: 'Python & APIs',
      category: 'Automation & APIs',
      overview:
        'An automated Python program that tracks the real-time position of the International Space Station and sends an email notification when it is overhead in the dark night sky.',
      contribution:
        'Built the REST API integrations with Open Notify and Sunrise-Sunset API, implemented coordinate calculation within ±5° latitude/longitude, and automated email dispatch using Python SMTPLib.',
      tech: ['Python', 'REST APIs', 'Requests', 'SMTPLib', 'Datetime'],
      github: 'https://github.com/sohamhinge08/iss-overhead-notifier',
      demo: '#',
    },
    'snake-game': {
      title: 'Snake Game',
      badge: 'Python OOP',
      category: 'Game Logic & OOP',
      overview:
        'Classic arcade Snake game built from scratch in Python to practice Object-Oriented Programming and game state management.',
      contribution:
        'Engineered decoupled classes for Snake body, Food spawning, and Scoreboard, with wall/tail collision detection algorithms and persistent high score tracking via file I/O.',
      tech: ['Python', 'OOP', 'Turtle Graphics', 'File I/O'],
      github: 'https://github.com/sohamhinge08/python-snake-game',
      demo: '#',
    },
    'password-manager': {
      title: 'Password Manager',
      badge: 'Python GUI',
      category: 'Desktop Application',
      overview:
        'A desktop utility built with Python Tkinter for generating strong random passwords, saving credentials securely to JSON files, and retrieving stored accounts via quick search.',
      contribution:
        'Built the graphical user interface, randomized password generator logic, clipboard auto-copying, and JSON structured storage with duplicate key prevention.',
      tech: ['Python', 'Tkinter', 'JSON', 'Pyperclip'],
      github: 'https://github.com/sohamhinge08/python-password-manager',
      demo: '#',
    },
    'amazon-clone': {
      title: 'Amazon Clone',
      badge: 'Frontend Practice',
      category: 'Responsive Layout',
      overview:
        'A frontend recreation and practice project built to study large-scale e-commerce UI patterns, multi-tier navigation bars, and responsive product grids.',
      contribution:
        'Built pure HTML5 markup and custom CSS3 (Flexbox & CSS Grid) to recreate the Amazon interface from scratch as an intensive study in responsive layouts.',
      tech: ['HTML5', 'CSS3', 'CSS Grid', 'Flexbox', 'Responsive Design'],
      github: 'https://github.com/sohamhinge08/amazon-frontend-clone',
      demo: '#',
    },
  };

  const modalDetailBtns = document.querySelectorAll('[data-project-key]');
  modalDetailBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const key = btn.getAttribute('data-project-key');
      const data = projectDataMap[key];
      if (!data) return;

      const modalTitle = document.getElementById('modalProjectTitle');
      const modalBadge = document.getElementById('modalProjectBadge');
      const modalOverview = document.getElementById('modalProjectOverview');
      const modalContribution = document.getElementById('modalProjectContribution');
      const modalTechList = document.getElementById('modalProjectTech');
      const modalGithubBtn = document.getElementById('modalGithubBtn');
      const modalDemoBtn = document.getElementById('modalDemoBtn');

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalBadge) modalBadge.textContent = data.badge;
      if (modalOverview) modalOverview.textContent = data.overview;
      if (modalContribution) modalContribution.textContent = data.contribution;

      if (modalTechList) {
        modalTechList.innerHTML = data.tech
          .map((t) => `<span class="tech-badge">${t}</span>`)
          .join('');
      }

      if (modalGithubBtn) {
        modalGithubBtn.setAttribute('href', data.github);
      }

      if (modalDemoBtn) {
        if (data.demo && data.demo !== '#') {
          modalDemoBtn.setAttribute('href', data.demo);
          modalDemoBtn.style.display = 'inline-flex';
        } else {
          modalDemoBtn.style.display = 'none';
        }
      }

      if (typeof bootstrap !== 'undefined' && projectModalEl) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(projectModalEl);
        modalInstance.show();
      }
    });
  });
});
