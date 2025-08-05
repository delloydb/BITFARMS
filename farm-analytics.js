// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const footerThemeToggle = document.getElementById('footer-theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const collapseToggle = document.querySelector('.collapse-toggle');
const filterForm = document.getElementById('filter-controls');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const dateRangeSelect = document.getElementById('date-range');
const startDateGroup = document.getElementById('start-date-group');
const endDateGroup = document.getElementById('end-date-group');

// Theme Management
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleButton(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

function updateToggleButton(theme) {
    const label = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    if (footerThemeToggle) {
        footerThemeToggle.querySelector('.toggle-label').textContent = label;
    }
}

// Initialize theme from localStorage or prefer-color-scheme
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
        setTheme(savedTheme);
    } else if (prefersDark) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
}

// Mobile Menu Toggle
function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
}

// Collapse Toggle for Filter Section
function toggleFilterForm() {
    const isExpanded = collapseToggle.getAttribute('aria-expanded') === 'true';
    collapseToggle.setAttribute('aria-expanded', !isExpanded);
    filterForm.classList.toggle('collapsed');
    collapseToggle.textContent = isExpanded ? 'Expand' : 'Collapse';
}

// Tab Switching Functionality
function switchTab(event) {
    const tabId = event.target.getAttribute('data-tab');
    
    // Update tab buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });
    event.target.classList.add('active');
    
    // Update tab contents
    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

// Show/Hide Custom Date Range Fields
function handleDateRangeChange() {
    if (dateRangeSelect.value === 'custom') {
        startDateGroup.style.display = 'flex';
        endDateGroup.style.display = 'flex';
    } else {
        startDateGroup.style.display = 'none';
        endDateGroup.style.display = 'none';
    }
}

// Initialize Date Range Fields
function initDateRangeFields() {
    startDateGroup.style.display = 'none';
    endDateGroup.style.display = 'none';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initDateRangeFields();
    
    // Theme Toggles
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    if (footerThemeToggle) {
        footerThemeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile Menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Filter Section Collapse
    if (collapseToggle) {
        collapseToggle.addEventListener('click', toggleFilterForm);
    }
    
    // Tab Switching
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });
    
    // Date Range Select
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', handleDateRangeChange);
    }
    
    // Generate Report Button
    const generateReportBtn = document.getElementById('generate-report');
    if (generateReportBtn) {
        generateReportBtn.addEventListener('click', () => {
            alert('Report generation feature coming soon!');
        });
    }
    
    // Export Data Button
    const exportDataBtn = document.getElementById('export-data');
    if (exportDataBtn) {
        exportDataBtn.addEventListener('click', () => {
            alert('Data export feature coming soon!');
        });
    }
    
    // Apply Filters Button
    const applyFiltersBtn = document.getElementById('apply-filters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Filters applied! (This is a demo)');
        });
    }
});

// Responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu if resizing to larger screen
    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
    }
});
