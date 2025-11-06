// Smooth scroll animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
}); 


// Create the hamburger button dynamically
const menuToggle = document.createElement('button');
menuToggle.classList.add('menu-toggle');
menuToggle.innerHTML = '☰';

// Append it inside the header
document.querySelector('header').appendChild(menuToggle);

// Add click event to toggle nav visibility
menuToggle.addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('show');
});
// ===== Close menu after clicking a link =====
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('nav ul').classList.remove('show');
  });
});

// ===== Contact Form Behavior =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute('action');

    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      alert(' Message sent successfully!');
      contactForm.reset();
    } else {
      alert(' Something went wrong. Please try again later.');
    }
  });
}
