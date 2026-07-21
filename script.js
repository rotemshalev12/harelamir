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

  // ---- Testimonials rotation ----
  const TESTIMONIALS = [
    { quote: '"הראל יא מלך! היה פשוט חלום. תודה על הכל!! היה מדהים ואנשים התלהבו בטירוף. סחתיין עליך!! אנחנו עוד מתאוששים כאן ומנסים לארגן את המילים, אבל רצינו להגיד תודה מכל הלב. היה לנו אירוע באמת חלומי ואנחנו מקבלים כל כך הרבה מחמאות. הניהול שלך לאורך כל היום נתן לנו שקט נפשי ואפשר לנו פשוט ליהנות מכל רגע. תודה על הכל!"', name: 'שחר ודנה', date: '24.07' },
    { quote: '"אחרי שקצת התאוששנו רצינו להגיד תודה ענקית!! האירוע תקתק ולהרגשת האורחים ולנו לא היה בלאגנים בכלל והכל היה מושלם מושלם מושלם. ממש מעריכים, תודה רבה על הניהול המושלם של האירוע, היה מעל ומעבר!"', name: 'אן וגור', date: '14.12' },
    { quote: '"הראלוסס איך מסכמים? תודה על הכל יא מלך! אין עליך ואני מאושרת שבחרתי בך! הקור רוח והכיף של לעבוד איתך לאורך הדרך היה מושלם, באמת תודה על אירוע מושלם. לא התעסקנו בכלום חוץ מלהנות באירוע שלנו."', name: 'ספיר ועמית', date: '30.07' },
    { quote: '"הראללל, היה מטורף איזה אירוע! הכל היה מתוקתק עד הפרט האחרון, היית מדהים והכלת את הלחץ שלי בחתונה וטיפלת בכל הבלאגנים באירוע בלי לערב אותנו ובלי שהרגשנו. אתה פשוט אלוף."', name: 'פז ועידן', date: '27.10' },
    { quote: '"הראל התותח, תודה רבה על אירוע מדהים. הכל רץ ותקתק כמו שצריך, כל דבר שהיינו צריכים עזרת לנו וייעצת לנו. הרגשנו שאנחנו בידיים הכי טובות ומקצועיות שיש. היה אירוע מדהים, תודה שהפכת את היום המיוחד שלנו למוצלח. שמחים שהיית איתנו ביום הזה!"', name: 'מיכל ורועי', date: '29.10' },
    { quote: '"הראלוש, אחרי שלקחנו כמה ימים להתאושש מהטירוף שהיה רצינו לומר לך תודה ענקית. בזכות המקצועיות והקלילות שיש לך האירוע התנהל מעולה ואנחנו לא מפסיקים לקבל מחמאות. אין עליך!"', name: 'עדי ומשה', date: '09.12' },
    { quote: '"ואוו ואוו הראל, איזה כיף היה לנו! תודה ענקית על ההשקעה שלך ושל כל הצוות. היה מטורף ואנחנו ממש שמחים שאתה היית מנהל האירוע שלנו."', name: 'גאיה ואיתי', date: '13.08' },
    { quote: '"הראל, תודה רבה על זה שהיית איתנו, דאגת לנו עם חיוך מלא סבלנות הכלה ואווירה טובה. תודה ענקית, אוהבים אותך!"', name: 'שקד ואלעד', date: '19.11' },
    { quote: '"הראלל, איך היה לי כיף אתמול, כמה דאגת לנו ולכל פרט ופרט מהשגעונות שלי. זכינו בך, כל כך הרגעת אותי והיית שם לכל דבר. היה פשוט מושלם."', name: 'צליל ודניאל', date: '09.07' },
    { quote: '"הראל היקר, היה מדהים תודה רבה אין עליך. היה קצב מושלם לאירוע, תודה שהיית בשבילנו כל פעם כשהיינו צריכים. יש לך חלק גדול בהצלחה של האירוע. אוהבים!"', name: 'רחלי ורותם', date: '17.12' },
    { quote: '"הראל וואו אתה תותח ברמות! נתחיל בזה שצדקת בכל מה שאמרת, תיקתקת את החתונה הזאת בצורה הכי מקצועית שיש. אתה חד משמעית מעל הסטנדרטים שציפינו, תודה רבה רבה על הכל."', name: 'עמית ועידו', date: '27.11' },
    ];

  const testimonialQuote = document.getElementById('testimonial-quote');
  const testimonialName = document.getElementById('testimonial-name');
  const testimonialDate = document.getElementById('testimonial-date');
  const testimonialDots = document.querySelectorAll('.testimonial-dot');
  const testimonialsSingle = document.querySelector('.testimonials-single');

  if (testimonialQuote && testimonialDots.length) {
    let currentTestimonial = 0;

    const showTestimonial = (index) => {
      const t = TESTIMONIALS[index];
      if (!t) return;
      currentTestimonial = index;

      testimonialDots.forEach((d) => d.classList.toggle('is-active', Number(d.dataset.index) === index));

      testimonialQuote.style.opacity = '0';
      window.setTimeout(() => {
        testimonialQuote.textContent = t.quote;
        testimonialName.textContent = t.name;
        testimonialDate.textContent = t.date;
        testimonialQuote.style.opacity = '1';
      }, prefersReducedMotion ? 0 : 200);
    };

    testimonialDots.forEach((dot) => {
      dot.addEventListener('click', () => showTestimonial(Number(dot.dataset.index)));
    });

    // ---- Swipe to navigate (mobile) ----
    if (testimonialsSingle) {
      let touchStartX = 0;
      let touchStartY = 0;

      testimonialsSingle.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
      }, { passive: true });

      testimonialsSingle.addEventListener('touchend', (e) => {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;

        if (Math.abs(deltaX) < 40 || Math.abs(deltaX) < Math.abs(deltaY)) return;

        const count = TESTIMONIALS.length;
        // RTL reading order: swipe left (finger moves left) -> next, swipe right -> previous
        const next = deltaX < 0
          ? (currentTestimonial + 1) % count
          : (currentTestimonial - 1 + count) % count;
        showTestimonial(next);
      }, { passive: true });
    }
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
