const header = document.querySelector('[data-header]');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const navigationLinks = document.querySelectorAll('.primary-nav a');
const revealElements = document.querySelectorAll('.reveal');
const sections = document.querySelectorAll('main section[id]');
const contactForm = document.querySelector('.contact-form');
const year = document.querySelector('[data-year]');

const closeMenu = () => {
  menuButton.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
  document.body.classList.remove('menu-open');
};

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
  document.body.classList.toggle('menu-open', !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

const handleScroll = () => {
  header.classList.toggle('scrolled', window.scrollY > 24);

  let currentSection = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 180) currentSection = section.id;
  });

  navigationLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
  });
};

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  const submitButton = contactForm.querySelector('button[type="submit"]');
  const defaultButtonText = submitButton.innerHTML;

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    status.textContent = '';

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error('Submission failed');

      contactForm.reset();
      status.textContent = 'Thanks — your message is on its way.';
    } catch (error) {
      status.textContent = 'Something went wrong. Please email me directly instead.';
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = defaultButtonText;
    }
  });
}

year.textContent = new Date().getFullYear();
