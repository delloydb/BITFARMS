// script.js
/**
 * BitAgric Main Script
 * Handles all interactive functionality for the homepage
 */

document.addEventListener('DOMContentLoaded', function() {
  // Sticky Header
  const header = document.querySelector('.main-header');
  const heroSection = document.querySelector('.hero-section');
  const heroHeight = heroSection.offsetHeight;
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > heroHeight) {
      header.classList.add('sticky');
    } else {
      header.classList.remove('sticky');
    }
  });

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Reveal Animations
  const animateOnScroll = function() {
    const elements = document.querySelectorAll('.feature-card, .insight-card, .benefit-card, .testimonial-card');
    
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (elementPosition < windowHeight - 100) {
        element.classList.add('slide-up');
      }
    });
  };
  
  // Initial check on load
  animateOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', animateOnScroll);

  // Newsletter Form Validation
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!isValidEmail(email)) {
        showFormError(emailInput, 'Please enter a valid email address');
        return;
      }
      
      // Simulate successful submission
      showFormSuccess(emailInput, 'Thank you for subscribing!');
      emailInput.value = '';
      
      // In a real implementation, you would send the data to your server here
      // Example: fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
    });
  }
  
  // Footer Newsletter Form
  const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
  if (footerNewsletterForm) {
    footerNewsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (!isValidEmail(email)) {
        showFormError(emailInput, 'Please enter a valid email address');
        return;
      }
      
      // Simulate successful submission
      showFormSuccess(emailInput, 'Thank you!');
      emailInput.value = '';
    });
  }
  
  // Update Copyright Year
  const yearElement = document.querySelector('.year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});

// Helper Functions
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function showFormError(inputElement, message) {
  // Remove any existing error messages
  const existingError = inputElement.parentElement.querySelector('.error-message');
  if (existingError) existingError.remove();
  
  // Add error class to input
  inputElement.classList.add('error');
  
  // Create and display error message
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.textContent = message;
  errorElement.style.color = '#ff4444';
  errorElement.style.marginTop = '5px';
  errorElement.style.fontSize = '0.8rem';
  
  inputElement.parentElement.appendChild(errorElement);
  
  // Focus the input
  inputElement.focus();
}

function showFormSuccess(inputElement, message) {
  // Remove any existing messages
  const existingMessage = inputElement.parentElement.querySelector('.success-message');
  if (existingMessage) existingMessage.remove();
  
  // Remove error class if present
  inputElement.classList.remove('error');
  
  // Create and display success message
  const successElement = document.createElement('div');
  successElement.className = 'success-message';
  successElement.textContent = message;
  successElement.style.color = '#00C851';
  successElement.style.marginTop = '5px';
  successElement.style.fontSize = '0.9rem';
  
  inputElement.parentElement.appendChild(successElement);
  
  // Remove message after 3 seconds
  setTimeout(() => {
    successElement.remove();
  }, 3000);
}