// Version 1.0.1
document.addEventListener('DOMContentLoaded', () => {

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
