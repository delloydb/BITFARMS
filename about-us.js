// Scroll Reveal Animations
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.value-card, .milestone, .team-member, .stat');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  elements.forEach(element => {
    observer.observe(element);
  });
};

// Newsletter Form Handling
const setupNewsletterForm = () => {
  const form = document.querySelector('.newsletter form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if (!email || !isValidEmail(email)) {
      showAlert('Please enter a valid email address', 'error');
      return;
    }

    // Simulate form submission
    showAlert('Thank you for subscribing to our newsletter!', 'success');
    form.reset();
  });
};

const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const showAlert = (message, type) => {
  const alert = document.createElement('div');
  alert.className = `alert ${type}`;
  alert.textContent = message;
  
  const newsletter = document.querySelector('.newsletter');
  newsletter.appendChild(alert);
  
  setTimeout(() => {
    alert.classList.add('fade-out');
    setTimeout(() => alert.remove(), 500);
  }, 3000);
};

// Update Footer Year
const updateFooterYear = () => {
  const yearElement = document.querySelector('.legal-info li:last-child');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} BitAgric`;
  }
};

// Hero Animation
const animateHero = () => {
  const hero = document.getElementById('hero');
  if (hero) {
    hero.style.opacity = '0';
    setTimeout(() => {
      hero.style.transition = 'opacity 1s ease';
      hero.style.opacity = '1';
    }, 100);
  }
};

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  setupNewsletterForm();
  updateFooterYear();
  animateHero();
});

// Fallback for older browsers without IntersectionObserver
if (!('IntersectionObserver' in window)) {
  window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.value-card, .milestone, .team-member, .stat');
    const windowHeight = window.innerHeight;
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      if (elementPosition < windowHeight - 100) {
        element.classList.add('fade-in');
      }
    });
  });
}
