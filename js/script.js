/* ==========================================================================
   SOHAM HINGE — DEVELOPER PORTFOLIO
   Core Script: GSAP Animations, Navigation, Interactive Filters, Modals,
                Audio Synth, Copy Clipboard, and Placeholder Management.
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

  // Scroll listener for sticky navbar transformation
  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Back to top button visibility
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
      if (window.scrollY > 450) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // Mobile Drawer Toggle
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

  // Close mobile drawer on link click and smooth scroll
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

  // Active link highlighter using IntersectionObserver
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

  // Back to Top button click
  const backToTopBtn = document.getElementById('backToTop');
  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ------------------------------------------------------------------------
  // 3. GSAP & ScrollTrigger Animations
  // ------------------------------------------------------------------------
  if (typeof gsap !== 'undefined') {
    // Check for ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reducedMotion) {
      // Hero Entrance Timeline
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.9 } });

      heroTl
        .from('.hero-hud-badge', { y: -25, opacity: 0, duration: 0.8 })
        .from('.hero-name', { y: 35, opacity: 0, duration: 1 }, '-=0.5')
        .from('.hero-subtitle', { y: 20, opacity: 0 }, '-=0.7')
        .from('.hero-tagline', { y: 20, opacity: 0 }, '-=0.7')
        .from('.hero-cta-group .btn-grand-line', { y: 25, opacity: 0, stagger: 0.15 }, '-=0.6')
        .from('.quick-pill', { y: 15, opacity: 0, stagger: 0.08 }, '-=0.5')
        .from('.scroll-indicator', { opacity: 0, duration: 0.6 }, '-=0.4');

      // ScrollTrigger for Section Headers
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 35,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });

      // Voyage Timeline Progress Bar Fill
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

      // Timeline Milestones Stagger
      gsap.utils.toArray('.voyage-milestone').forEach((node, idx) => {
        const isLeft = node.classList.contains('left-node');
        gsap.from(node, {
          scrollTrigger: {
            trigger: node,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          x: isLeft ? -40 : 40,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
        });
      });

      // Featured Project Cards Stagger
      gsap.utils.toArray('.treasure-project-card').forEach((card, idx) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay: (idx % 2) * 0.15,
          ease: 'power2.out',
        });
      });

      // Skills Cards Stagger
      gsap.from('.skill-card', {
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.6,
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
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

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
      archiveCountBadge.textContent = `${visibleCount} DISCOVERIES`;
    }
  }

  archiveSearchInput?.addEventListener('input', filterArchiveProjects);

  // ------------------------------------------------------------------------
  // 6. Placeholder Link Interceptor & Clipboard Copy
  // ------------------------------------------------------------------------
  const placeholderPatterns = [
    'YOUR_GITHUB_URL',
    'YOUR_LINKEDIN_URL',
    'YOUR_EMAIL',
    'YOUR_GITHUB_USERNAME',
    'YOUR_PORTFOLIO_URL',
  ];

  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('a');
    if (!targetLink) return;

    const href = targetLink.getAttribute('href') || '';
    const isPlaceholder = placeholderPatterns.some((pattern) => href.includes(pattern));

    if (isPlaceholder) {
      e.preventDefault();
      showToast(`⚓ Placeholder URL: Please update "${href}" in index.html with your actual link!`);
      console.info(`[Grand Line Portfolio] Clicked placeholder link: ${href}`);
    }
  });

  // Copy Buttons
  const copyButtons = document.querySelectorAll('[data-copy-target]');
  copyButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const textToCopy = btn.getAttribute('data-copy-target') || '';

      if (navigator.clipboard && textToCopy) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            showToast(`💎 Copied "${textToCopy}" to clipboard!`);
          })
          .catch(() => {
            showToast(`📋 Copy target: ${textToCopy}`);
          });
      } else {
        showToast(`📋 Copy target: ${textToCopy}`);
      }
    });
  });

  // ------------------------------------------------------------------------
  // 7. Interactive Contact Dispatcher Form
  // ------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('contactName');
    const emailInput = document.getElementById('contactEmail');
    const messageInput = document.getElementById('contactMessage');

    const name = nameInput?.value.trim() || 'Fellow Explorer';
    const email = emailInput?.value.trim() || '';
    const message = messageInput?.value.trim() || '';

    if (!name || !email || !message) {
      showToast('⚠️ Please fill in all fields before setting sail!');
      return;
    }

    // Simulated dispatch with Mailto option
    showToast(`🗺️ Message dispatched from ${name}! Preparing carrier gull...`);

    // Build mailto fallback link
    const mailtoSubject = encodeURIComponent(`Grand Line Expedition Inquiry from ${name}`);
    const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:YOUR_EMAIL?subject=${mailtoSubject}&body=${mailtoBody}`;

    setTimeout(() => {
      showToast(`✉️ Opening default email client for dispatch...`);
      window.location.href = mailtoUrl;
    }, 1200);

    contactForm.reset();
  });

  // ------------------------------------------------------------------------
  // 8. Generative Web Audio Synthesizer (Ambient Ocean Breeze & Chimes)
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

    // Create pink/brown ocean wave noise buffer
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
      output[i] *= 0.08;
      b6 = white * 0.115926;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    // Filter to simulate deep ocean swells
    filterNode = audioCtx.createBiquadFilter();
    filterNode.type = 'lowpass';
    filterNode.frequency.setValueAtTime(320, audioCtx.currentTime);

    // Dynamic wave modulation
    const lfo = audioCtx.createOscillator();
    const lfoGain = audioCtx.createGain();
    lfo.frequency.value = 0.15; // 0.15 Hz wave cycle
    lfoGain.gain.value = 200;
    lfo.connect(lfoGain);
    lfoGain.connect(filterNode.frequency);
    lfo.start();

    // Master volume gain
    gainNode = audioCtx.createGain();
    gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.2, audioCtx.currentTime + 2);

    noiseNode.connect(filterNode);
    filterNode.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    noiseNode.start();
    isAudioPlaying = true;
    audioToggleBtn?.classList.add('active');
    showToast('🌊 Ocean Ambient Atmosphere: Enabled');
  }

  function stopAmbientAudio() {
    if (gainNode && audioCtx) {
      gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1);
      setTimeout(() => {
        noiseNode?.stop();
        isAudioPlaying = false;
        audioToggleBtn?.classList.remove('active');
        showToast('🔇 Ocean Ambient Atmosphere: Muted');
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
      badge: 'Team Project (Collaborative Engineering)',
      category: 'Full-Stack Web Architecture',
      overview:
        'A comprehensive hospital workflow and patient records management system engineered with role-based access control, appointment schedules, and medical inventory tracking.',
      contribution:
        'Built the entire frontend interface with responsive dashboards, designed database schemas and relational MySQL queries, integrated backend API controllers, and debugged end-to-end user workflows. (Backend architecture was primarily led and developed by teammate Jayesh).',
      tech: ['Node.js', 'Express.js', 'MySQL', 'HTML5', 'CSS3', 'EJS Templates'],
      github: 'https://github.com/YOUR_GITHUB_USERNAME/hospital-management-system',
      demo: 'https://hospital-demo.example.com (YOUR_DEMO_URL)',
    },
    'iss-notifier': {
      title: 'ISS Overhead Notifier',
      badge: 'Python Systems & Automation',
      category: 'API Integration & Geospatial Computation',
      overview:
        'An automated tracking service that monitors the International Space Station coordinates via Open Notify REST API and cross-references them against local sunrise/sunset positions.',
      contribution:
        'Engineered complete Python logic for coordinate matching within ±5 degrees latitude/longitude, twilight detection algorithms, and automated email notifications via SMTPLib.',
      tech: ['Python', 'REST APIs', 'Requests Library', 'SMTPLib', 'Datetime Calculation'],
      github: 'https://github.com/YOUR_GITHUB_USERNAME/iss-overhead-notifier',
      demo: '#',
    },
    'snake-game': {
      title: 'Snake Arcade Engine',
      badge: 'Object-Oriented Programming',
      category: 'Game Engine Architecture',
      overview:
        'A modern recreation of the iconic Snake game built from ground up to master modular OOP design, separation of concerns, and clean inheritance.',
      contribution:
        'Designed decoupled classes for Snake, Food, and Scoreboard, implemented boundary and tail collision algorithms, and persistent high-score tracking via local file I/O.',
      tech: ['Python', 'Object-Oriented Programming', 'Turtle Graphics', 'File I/O'],
      github: 'https://github.com/YOUR_GITHUB_USERNAME/python-snake-game',
      demo: '#',
    },
    'password-manager': {
      title: 'Secure Password Manager',
      badge: 'Desktop Application & Cryptography Logic',
      category: 'GUI & Data Persistence',
      overview:
        'A desktop security utility designed for generating, storing, and retrieving credentials securely with search indexing and automated clipboard synchronization.',
      contribution:
        'Engineered intuitive Tkinter UI, dynamic random password generation with customizable entropy rules, and structured JSON file storage with duplicate key prevention and exception handling.',
      tech: ['Python', 'Tkinter GUI', 'JSON Storage', 'Pyperclip', 'Error Handling'],
      github: 'https://github.com/YOUR_GITHUB_USERNAME/python-password-manager',
      demo: '#',
    },
    'amazon-clone': {
      title: 'Amazon Frontend Recreation',
      badge: 'UI / UX Practice Project',
      category: 'Responsive Frontend Engineering',
      overview:
        'A pixel-precise frontend recreation of the Amazon e-commerce platform built as an intensive study in advanced multi-tiered navigation, flexible grid layouts, and mobile optimization.',
      contribution:
        'Crafted pure semantic HTML5 markup and custom CSS3 without external frameworks, implementing fluid CSS Grid product showcases, responsive mega-menus, and accessible tap targets.',
      tech: ['HTML5', 'CSS3', 'CSS Grid', 'Flexbox', 'Responsive Design'],
      github: 'https://github.com/YOUR_GITHUB_USERNAME/amazon-frontend-clone',
      demo: 'https://amazon-clone.example.com (YOUR_DEMO_URL)',
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

      // Open Bootstrap Modal if available
      if (typeof bootstrap !== 'undefined' && projectModalEl) {
        const modalInstance = bootstrap.Modal.getOrCreateInstance(projectModalEl);
        modalInstance.show();
      }
    });
  });

  console.info(
    '%c⚓ SOHAM HINGE — GRAND LINE DEVELOPER PORTFOLIO INITIALIZED ⚓',
    'color: #facc15; font-size: 14px; font-weight: bold; background: #060b18; padding: 6px 12px; border: 1px solid #eab308; border-radius: 4px;'
  );
});
