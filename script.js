// Version 2.0.0
document.addEventListener('DOMContentLoaded', () => {

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Sticky header shadow on scroll ----
  const header = document.getElementById('site-header');
  const toggleHeaderShadow = () => {
    header.classList.toggle('scrolled', window.scrollY > 12);
  };
  toggleHeaderShadow();
  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });

  // ---- Mobile nav toggle ----
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');

  const setNavOpen = (isOpen) => {
    mainNav.classList.toggle('open', isOpen);
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('nav-open', isOpen);
  };

  navToggle.addEventListener('click', () => {
    setNavOpen(!mainNav.classList.contains('open'));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mainNav.classList.contains('open')) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  // ---- Scroll-spy nav + progress bar ----
  const navLinks = Array.from(mainNav.querySelectorAll('.nav-link'));
  const navSections = navLinks
    .map((link) => ({ link, id: link.dataset.nav, el: document.getElementById(link.dataset.nav) }))
    .filter((s) => s.el);
  const progressFill = document.getElementById('nav-progress-fill');

  let scrollSpyTicking = false;

  const updateScrollSpy = () => {
    scrollSpyTicking = false;

    let activeId = navSections[0]?.id;
    navSections.forEach((s) => {
      const rect = s.el.getBoundingClientRect();
      if (rect.top <= 140) activeId = s.id;
    });

    navSections.forEach((s) => {
      s.link.classList.toggle('is-active', s.id === activeId);
    });

    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const progress = scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0;
    if (progressFill) progressFill.style.width = (progress * 100) + '%';
  };

  window.addEventListener('scroll', () => {
    if (!scrollSpyTicking) {
      scrollSpyTicking = true;
      requestAnimationFrame(updateScrollSpy);
    }
  }, { passive: true });

  updateScrollSpy();

  // ---- Hero photo click "pop" ----
  const heroPhoto = document.getElementById('hero-photo');
  if (heroPhoto && !prefersReducedMotion) {
    heroPhoto.addEventListener('click', () => {
      heroPhoto.classList.remove('pop');
      // Force reflow so the animation can restart
      void heroPhoto.offsetWidth;
      heroPhoto.classList.add('pop');
    });
  }

  // ---- Cursor-follow glow (hero + about region) ----
  const glowRegion = document.getElementById('glow-region');
  const cursorGlow = document.getElementById('cursor-glow');
  const supportsHover = window.matchMedia('(hover: hover)').matches;

  if (glowRegion && cursorGlow && supportsHover && !prefersReducedMotion) {
    glowRegion.addEventListener('mousemove', (e) => {
      const rect = glowRegion.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      cursorGlow.style.left = x + '%';
      cursorGlow.style.top = y + '%';
    });
  }

  // ---- Gallery fluid hover ----
  const galleryFluid = document.getElementById('gallery-fluid');
  if (galleryFluid) {
    const items = Array.from(galleryFluid.querySelectorAll('.gallery-fluid-item'));

    const setHovered = (index) => {
      items.forEach((item, i) => {
        item.classList.toggle('is-hovered', i === index);
        item.classList.toggle('is-dimmed', index !== null && i !== index);
      });
    };

    items.forEach((item, i) => {
      item.addEventListener('mouseenter', () => setHovered(i));
      item.addEventListener('mouseleave', () => setHovered(null));
      item.addEventListener('click', () => {
        const isHovered = item.classList.contains('is-hovered');
        setHovered(isHovered ? null : i);
      });
    });
  }

  // ---- Testimonials rotation ----
  const TESTIMONIALS = [
    { quote: '"הראל היה שם בשבילנו מהרגע הראשון ועד השנייה האחרונה של החתונה. הרגשנו שיש לנו מישהו שבאמת דואג לנו, לא רק \'מנהל אירוע\'. יכולנו פשוט להיות נוכחים ביום שלנו."', name: 'דנה ושחר', date: 'מאי 2025' },
    { quote: '"מה שהכי אהבנו זה הזמינות והקרבה - כל שאלה קטנה קיבלה מענה מהיר, וביום עצמו הרגשנו רגועים לגמרי. הראל ניהל הכל מאחורי הקלעים בלי שנרגיש בכלל."', name: 'נאור ואיתי', date: 'אוגוסט 2025' },
    { quote: '"ליווי צמוד, מקצועי וחם מהיום הראשון. הראל הכיר את כל הספקים, חסך לנו כסף וזמן יקר, ובעיקר גרם לנו להרגיש שאנחנו לא לבד בתהליך. ממליצים בלב שלם."', name: 'צליל ודניאל', date: 'נובמבר 2025' },
  ];

  const testimonialQuote = document.getElementById('testimonial-quote');
  const testimonialName = document.getElementById('testimonial-name');
  const testimonialDate = document.getElementById('testimonial-date');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');

  if (testimonialQuote && testimonialDots.length) {
    testimonialDots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const index = Number(dot.dataset.index);
        const t = TESTIMONIALS[index];
        if (!t) return;

        testimonialDots.forEach((d) => d.classList.remove('is-active'));
        dot.classList.add('is-active');

        testimonialQuote.style.opacity = '0';
        window.setTimeout(() => {
          testimonialQuote.textContent = t.quote;
          testimonialName.textContent = t.name;
          testimonialDate.textContent = t.date;
          testimonialQuote.style.opacity = '1';
        }, prefersReducedMotion ? 0 : 200);
      });
    });
  }

  // ---- Scroll reveal animations ----
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // ---- Footer year ----
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ---- Contact form -> WhatsApp handoff ----
  const form = document.getElementById('contact-form');
  if (form) {
    const nameRow = document.getElementById('name-row');
    const phoneRow = document.getElementById('phone-row');
    const nameError = document.getElementById('name-error');
    const phoneError = document.getElementById('phone-error');
    const formStatus = document.getElementById('form-status');

    const setFieldError = (row, errorEl, message) => {
      row.classList.toggle('has-error', Boolean(message));
      errorEl.textContent = message || '';
      form.elements[row.querySelector('input').name].setAttribute('aria-invalid', String(Boolean(message)));
    };

    const isValidPhone = (value) => {
      const cleaned = value.replace(/[\s-]/g, '');
      return /^(\+972|0)\d{8,9}$/.test(cleaned);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formStatus.textContent = '';

      const name = form.name.value.trim();
      const phone = form.phone.value.trim();

      let hasError = false;

      if (!name) {
        setFieldError(nameRow, nameError, 'נא למלא שם מלא');
        hasError = true;
      } else {
        setFieldError(nameRow, nameError, '');
      }

      if (!phone) {
        setFieldError(phoneRow, phoneError, 'נא למלא מספר טלפון');
        hasError = true;
      } else if (!isValidPhone(phone)) {
        setFieldError(phoneRow, phoneError, 'מספר טלפון לא תקין');
        hasError = true;
      } else {
        setFieldError(phoneRow, phoneError, '');
      }

      if (hasError) {
        form.querySelector('.has-error input')?.focus();
        return;
      }

      const eventType = form['event-type'].options[form['event-type'].selectedIndex]?.text || '';
      const date = form.date.value.trim();

      const lines = [
        `היי, אנחנו רוצים לתכנן אירוע איתכם.`,
        `שם: ${name}`,
        `טלפון: ${phone}`,
        eventType && form['event-type'].value ? `סוג אירוע: ${eventType}` : null,
        date ? `תאריך משוער: ${date}` : null,
      ].filter(Boolean);

      const message = encodeURIComponent(lines.join('\n'));
      formStatus.textContent = 'פותחים עבורכם וואטסאפ...';
      window.open(`https://wa.me/972549509195?text=${message}`, '_blank', 'noopener');
    });
  }

});
