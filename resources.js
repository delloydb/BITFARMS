/**
 * BitAgric Resources Page JavaScript
 * Handles theme switching, mobile navigation, and interactive elements
 */

document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleFooter = document.getElementById('theme-toggle-footer');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        htmlElement.setAttribute('data-theme', 'dark');
    }
    
    // Theme toggle button event listeners
    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (themeToggleFooter) {
        themeToggleFooter.addEventListener('click', toggleTheme);
    }
    
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            
            // Update ARIA attributes
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
        });
    }
    
    // Collapsible Tool Sections
    const toolToggles = document.querySelectorAll('.tool-toggle');
    
    toolToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const toolContent = document.getElementById(this.getAttribute('aria-controls'));
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            
            // Toggle visibility
            toolContent.hidden = isExpanded;
            this.setAttribute('aria-expanded', !isExpanded);
            
            // Animate the content
            if (!isExpanded) {
                toolContent.style.display = 'block';
                const height = toolContent.scrollHeight;
                toolContent.style.height = '0';
                toolContent.style.overflow = 'hidden';
                toolContent.style.transition = 'height 0.3s ease';
                
                setTimeout(() => {
                    toolContent.style.height = height + 'px';
                }, 10);
                
                // After transition completes
                setTimeout(() => {
                    toolContent.style.height = '';
                    toolContent.style.overflow = '';
                }, 300);
            } else {
                toolContent.style.height = toolContent.scrollHeight + 'px';
                toolContent.style.overflow = 'hidden';
                
                setTimeout(() => {
                    toolContent.style.height = '0';
                }, 10);
                
                // After transition completes
                setTimeout(() => {
                    toolContent.style.display = 'none';
                    toolContent.style.height = '';
                    toolContent.style.overflow = '';
                }, 300);
            }
        });
    });
    
    // File Input Display
    const fileInputs = document.querySelectorAll('input[type="file"]');
    
    fileInputs.forEach(input => {
        const fileNameDisplay = input.nextElementSibling.nextElementSibling;
        
        input.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileNameDisplay.textContent = this.files[0].name;
            } else {
                fileNameDisplay.textContent = 'No file chosen';
            }
        });
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.site-header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    location.hash = targetId;
                }
            }
        });
    });
    
    // Close mobile menu when clicking a link
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
    
    // Form Submission Handling (placeholder)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would handle form submission here
            console.log('Form submitted:', this);
            
            // Show a success message (placeholder)
            if (this.classList.contains('contribute-form')) {
                alert('Thank you for your submission! We will review your resource and add it to our collection if approved.');
                this.reset();
                const fileNameDisplay = this.querySelector('.file-name');
                if (fileNameDisplay) {
                    fileNameDisplay.textContent = 'No file chosen';
                }
            } else if (this.classList.contains('newsletter-signup')) {
                alert('Thank you for subscribing to our newsletter!');
                this.reset();
            }
        });
    });
    
    // Resource Filtering (placeholder functionality)
    const resourceSearch = document.getElementById('resource-search');
    const categoryFilter = document.getElementById('category-filter');
    const formatFilter = document.getElementById('format-filter');
    const sortSelect = document.getElementById('sort-resources');
    
    if (resourceSearch) {
        resourceSearch.addEventListener('input', filterResources);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', filterResources);
    }
    
    if (formatFilter) {
        formatFilter.addEventListener('change', filterResources);
    }
    
    if (sortSelect) {
        sortSelect.addEventListener('change', sortResources);
    }
    
    function filterResources() {
        // In a real implementation, this would filter the resources
        console.log('Filtering resources based on:', {
            search: resourceSearch.value,
            category: categoryFilter.value,
            format: formatFilter.value
        });
    }
    
    function sortResources() {
        // In a real implementation, this would sort the resources
        console.log('Sorting resources by:', sortSelect.value);
    }
});
