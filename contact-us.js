// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme') || 
                        (prefersDarkScheme.matches ? 'dark' : 'light');
    document.body.setAttribute('data-theme', currentTheme);
    
    // Update toggle button state
    if (currentTheme === 'dark') {
        themeToggle.setAttribute('aria-pressed', 'true');
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.setAttribute('aria-pressed', newTheme === 'dark');
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
        });
    });
    
    // Authentication Modal
    const authToggle = document.querySelector('.auth-toggle');
    const authModal = document.querySelector('.auth-modal');
    const closeAuth = document.querySelector('.close-auth');
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    const backToLogin = document.querySelector('.auth-back');
    const forgotPassword = document.querySelector('.forgot-password');
    
    // Toggle auth modal
    authToggle.addEventListener('click', () => {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeAuth.addEventListener('click', () => {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close modal when clicking outside
    authModal.addEventListener('click', (e) => {
        if (e.target === authModal) {
            authModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Switch between login and register tabs
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-tab');
            
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            tab.classList.add('active');
            document.getElementById(`${tabName}Form`).classList.add('active');
        });
    });
    
    // Forgot password flow
    forgotPassword.addEventListener('click', (e) => {
        e.preventDefault();
        authForms.forEach(f => f.classList.remove('active'));
        document.getElementById('recoveryForm').classList.add('active');
    });
    
    backToLogin.addEventListener('click', () => {
        authForms.forEach(f => f.classList.remove('active'));
        document.getElementById('loginForm').classList.add('active');
    });
    
    // OTP input handling
    const otpInputs = document.querySelectorAll('.otp-input');
    
    otpInputs.forEach((input, index) => {
        input.addEventListener('input', (e) => {
            if (e.target.value.length === 1) {
                if (index < otpInputs.length - 1) {
                    otpInputs[index + 1].focus();
                }
            }
        });
        
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && e.target.value === '') {
                if (index > 0) {
                    otpInputs[index - 1].focus();
                }
            }
        });
    });
    
    // Form validation
    const contactForm = document.getElementById('messageForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = this.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                const feedback = field.nextElementSibling;
                
                if (!field.value.trim()) {
                    field.style.borderColor = '#e53935';
                    feedback.textContent = 'This field is required';
                    isValid = false;
                } else {
                    field.style.borderColor = '';
                    feedback.textContent = '';
                }
                
                // Email validation
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        field.style.borderColor = '#e53935';
                        feedback.textContent = 'Please enter a valid email address';
                        isValid = false;
                    }
                }
            });
            
            if (isValid) {
                // Form is valid, submit it (in a real app, this would be an AJAX call)
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            }
        });
    }
    
    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            question.setAttribute('aria-expanded', !isExpanded);
            
            // Close other open FAQs
            if (!isExpanded) {
                faqQuestions.forEach(q => {
                    if (q !== question && q.getAttribute('aria-expanded') === 'true') {
                        q.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
    });
    
    // Testimonials Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentIndex = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
        dot.addEventListener('click', () => goToTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.slider-dot');
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
        currentIndex = index;
    }
    
    function goToTestimonial(index) {
        if (index < 0) index = testimonials.length - 1;
        if (index >= testimonials.length) index = 0;
        showTestimonial(index);
    }
    
    prevBtn.addEventListener('click', () => goToTestimonial(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToTestimonial(currentIndex + 1));
    
    // Auto-advance testimonials
    let slideInterval = setInterval(() => goToTestimonial(currentIndex + 1), 5000);
    
    // Pause on hover
    const slider = document.querySelector('.testimonials-slider');
    slider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    slider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => goToTestimonial(currentIndex + 1), 5000);
    });
    
    // Initialize first testimonial
    showTestimonial(0);
    
    // Update copyright year
    document.querySelector('.year').textContent = new Date().getFullYear();
    
    // Contact action buttons
    document.querySelectorAll('.contact-action').forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-contact');
            
            switch(action) {
                case 'email':
                    window.location.href = 'mailto:contact@bitagric.org';
                    break;
                case 'call':
                    window.location.href = 'tel:+254700000000';
                    break;
                case 'chat':
                    alert('Live chat would open here in a real implementation');
                    break;
                case 'visit':
                    window.open('https://maps.google.com/maps?q=Nairobi%2C%20Kenya', '_blank');
                    break;
            }
        });
    });
    
    // Map directions button
    document.querySelector('.map-direction-btn').addEventListener('click', () => {
        window.open('https://maps.google.com/maps?q=Nairobi%2C%20Kenya&dirflg=d', '_blank');
    });
    
    // Social login buttons
    document.querySelector('.google-btn').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Google login would be implemented here');
    });
    
    document.querySelector('.facebook-btn').addEventListener('click', (e) => {
        e.preventDefault();
        alert('Facebook login would be implemented here');
    });
    
    // Form submissions
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would be an AJAX call
        document.getElementById('otpForm').classList.add('active');
        this.classList.remove('active');
    });
    
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would be an AJAX call
        alert('Registration successful! Please check your email for verification.');
        this.reset();
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    document.getElementById('otpForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would verify the OTP
        alert('Login successful!');
        this.reset();
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    document.getElementById('recoveryForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, this would send a recovery email
        alert('Password reset link sent to your email!');
        this.reset();
    });
});
