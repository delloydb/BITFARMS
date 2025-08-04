document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    themeToggle.addEventListener('click', function() {
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
    
    // Collapsible Sections
    const sectionToggles = document.querySelectorAll('.section-toggle');
    
    sectionToggles.forEach(toggle => {
        const sectionContent = toggle.closest('.section-header').nextElementSibling;
        
        // Set initial state
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        sectionContent.style.display = isExpanded ? 'block' : 'none';
        
        toggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            sectionContent.style.display = expanded ? 'none' : 'block';
        });
    });
    
    // Tabbed Interface for Tables
    const tableTabs = document.querySelectorAll('.table-tab');
    
    tableTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tableTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tables
            document.querySelectorAll('.table-container').forEach(table => {
                table.classList.remove('active');
            });
            
            // Show corresponding table
            const tableId = this.getAttribute('data-tab') + '-table';
            document.getElementById(tableId).classList.add('active');
        });
    });
    
    // Form Submission
    const budgetForm = document.getElementById('budgetEntryForm');
    
    if (budgetForm) {
        budgetForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const entries = Object.fromEntries(formData.entries());
            
            // In a real app, you would send this to a server
            console.log('Form submitted:', entries);
            
            // Show success message
            alert('Budget entry added successfully!');
            
            // Reset form
            this.reset();
        });
    }
    
    // Update year in footer
    const yearElement = document.querySelector('.year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Tooltip initialization
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            // Tooltip is styled with CSS
        });
    });
    
    // Currency symbol update
    const currencySelect = document.getElementById('currency');
    const currencySymbol = document.querySelector('.currency-symbol');
    
    if (currencySelect && currencySymbol) {
        currencySelect.addEventListener('change', function() {
            const symbolMap = {
                'USD': '$',
                'EUR': '€',
                'GBP': '£',
                'KES': 'KSh',
                'NGN': '₦',
                'ZAR': 'R'
            };
            
            currencySymbol.textContent = symbolMap[this.value] || '$';
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
