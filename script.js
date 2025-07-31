/**
 * BitAgric - Modern Farming Website
 * Script for theme toggle, mobile navigation, and other interactivity
 */

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle button state
    if (currentTheme === 'dark') {
        themeToggle.setAttribute('aria-pressed', 'true');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
    });
    
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const primaryNav = document.querySelector('.main-nav');
    
    mobileNavToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        primaryNav.setAttribute('data-visible', !isExpanded);
        
        // Toggle body scroll when nav is open
        document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
    });
    
    // Close mobile nav when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                primaryNav.setAttribute('data-visible', 'false');
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Update copyright year dynamically
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Pricing toggle functionality
    const billingToggle = document.getElementById('billing-toggle');
    if (billingToggle) {
        billingToggle.addEventListener('change', function() {
            const monthlyPrices = document.querySelectorAll('.price-amount');
            monthlyPrices.forEach(price => {
                const currentPrice = parseFloat(price.textContent);
                const newPrice = this.checked ? (currentPrice * 12 * 0.8).toFixed(0) : (currentPrice / 12 / 0.8).toFixed(0);
                price.textContent = newPrice;
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add focus styles for keyboard navigation
    document.addEventListener('keyup', function(e) {
        if (e.key === 'Tab') {
            document.documentElement.classList.add('keyboard-focus');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.documentElement.classList.remove('keyboard-focus');
    });
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers that don't support lazy loading
        const lazyScript = document.createElement('script');
        lazyScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(lazyScript);
    }
    
    // Video play button functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            // In a real implementation, this would open a modal with the video
            alert('Video playback would start here in a real implementation.');
        });
    }
    
    // Form submission handling
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, this would send the form data to a server
            if (this.classList.contains('newsletter-form')) {
                alert('Thanks for subscribing to our newsletter!');
                this.reset();
            } else if (this.classList.contains('footer-newsletter-form')) {
                alert('Thanks for signing up for our newsletter!');
                this.reset();
            }
        });
    });
    
    // Accessibility enhancements
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape key
        if (e.key === 'Escape' && window.innerWidth <= 768) {
            const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true';
            if (isExpanded) {
                mobileNavToggle.click();
            }
        }
    });
    
    // Add focus trapping for mobile menu
    if (primaryNav) {
        primaryNav.addEventListener('keydown', function(e) {
            if (e.key === 'Tab' && window.innerWidth <= 768) {
                const focusableElements = primaryNav.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    lastElement.focus();
                    e.preventDefault();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    firstElement.focus();
                    e.preventDefault();
                }
            }
        });
    }
});
