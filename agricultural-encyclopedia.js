/**
 * BitAgric - Agricultural Encyclopedia
 * Script for encyclopedia page functionality
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
    
    // Filter Accordion Toggle
    const filterToggle = document.querySelector('.filter-toggle');
    if (filterToggle) {
        filterToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
        });
    }
    
    // Search Clear Button
    const searchInput = document.getElementById('crop-search');
    const searchClear = document.querySelector('.search-clear');
    
    if (searchInput && searchClear) {
        searchInput.addEventListener('input', function() {
            searchClear.style.opacity = this.value ? '1' : '0';
        });
        
        searchClear.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            this.style.opacity = '0';
        });
    }
    
    // Bookmark Functionality
    const bookmarkButtons = document.querySelectorAll('.bookmark-btn');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            // In a real implementation, this would save to localStorage or a database
            const cropName = this.closest('.crop-card').querySelector('.crop-name').textContent;
            const action = this.classList.contains('active') ? 'Bookmarked' : 'Removed bookmark';
            console.log(`${action} ${cropName}`);
        });
    });
    
    // Filter Form Submission
    const filterForm = document.getElementById('encyclopedia-filters');
    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            applyFilters();
        });
        
        filterForm.addEventListener('reset', function() {
            setTimeout(() => {
                applyFilters();
            }, 0);
        });
    }
    
    // Apply filters function
    function applyFilters() {
        const searchTerm = document.getElementById('crop-search').value.toLowerCase();
        const category = document.getElementById('category-filter').value;
        const region = document.getElementById('region-filter').value;
        const climate = document.getElementById('climate-filter').value;
        const difficulty = document.getElementById('difficulty-filter').value;
        
        const cropCards = document.querySelectorAll('.crop-card');
        const activeFiltersContainer = document.getElementById('active-filters');
        
        // Clear active filters display
        activeFiltersContainer.innerHTML = '';
        
        // Array to track active filters for display
        const activeFilters = [];
        
        cropCards.forEach(card => {
            const matchesSearch = searchTerm === '' || 
                card.querySelector('.crop-name').textContent.toLowerCase().includes(searchTerm) || 
                card.querySelector('.crop-desc').textContent.toLowerCase().includes(searchTerm);
            
            const matchesCategory = category === '' || card.dataset.category === category;
            const matchesRegion = region === '' || card.dataset.region === region;
            const matchesClimate = climate === '' || card.dataset.climate === climate;
            const matchesDifficulty = difficulty === '' || card.dataset.difficulty === difficulty;
            
            if (matchesSearch && matchesCategory && matchesRegion && matchesClimate && matchesDifficulty) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Display active filters
        if (category) activeFilters.push(`Category: ${category}`);
        if (region) activeFilters.push(`Region: ${region}`);
        if (climate) activeFilters.push(`Climate: ${climate}`);
        if (difficulty) activeFilters.push(`Difficulty: ${difficulty}`);
        
        activeFilters.forEach(filter => {
            const filterTag = document.createElement('div');
            filterTag.className = 'filter-tag';
            filterTag.innerHTML = `
                ${filter}
                <button type="button" aria-label="Remove filter">×</button>
            `;
            activeFiltersContainer.appendChild(filterTag);
            
            // Add click handler to remove filter
            filterTag.querySelector('button').addEventListener('click', function() {
                const filterType = filter.split(':')[0].toLowerCase();
                const selectElement = document.getElementById(`${filterType}-filter`);
                if (selectElement) {
                    selectElement.value = '';
                    applyFilters();
                }
            });
        });
    }
    
    // Pagination Button Click Handlers
    const paginationButtons = document.querySelectorAll('.pagination-btn:not(:disabled)');
    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('active')) {
                // In a real implementation, this would load the appropriate page
                console.log(`Loading page ${this.textContent}`);
                
                // Update active state
                document.querySelector('.pagination-btn.active').classList.remove('active');
                this.classList.add('active');
            }
        });
    });
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real implementation, this would send to a server
            console.log(`Subscribed with email: ${email}`);
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
    
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
    
    // Initialize tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            // Position is handled by CSS
        });
    });
});
