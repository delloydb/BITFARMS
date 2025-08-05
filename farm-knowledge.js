// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const footerThemeToggle = document.getElementById('footer-theme-toggle');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navList = document.querySelector('.nav-list');
const viewOptions = document.querySelectorAll('.view-option');
const cropContainer = document.getElementById('crop-container');
const saveButtons = document.querySelectorAll('.save-crop');
const currentYear = document.getElementById('current-year');

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
    navList.classList.toggle('active');
}

// View Options (Grid/List)
function changeView(event) {
    const viewType = event.currentTarget.getAttribute('data-view');
    
    // Update active button
    viewOptions.forEach(option => {
        option.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // Change container class
    cropContainer.className = 'crop-' + viewType;
}

// Save Crop to Favorites
function toggleSaveCrop(event) {
    event.currentTarget.classList.toggle('saved');
    
    // In a real app, you would save to localStorage or send to server
    const cropName = event.currentTarget.closest('.crop-card').querySelector('.crop-name').textContent;
    const action = event.currentTarget.classList.contains('saved') ? 'saved' : 'removed';
    console.log(`${cropName} ${action} from favorites`);
}

// Update Copyright Year
function updateCopyrightYear() {
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    updateCopyrightYear();
    
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
    
    // View Options
    viewOptions.forEach(option => {
        option.addEventListener('click', changeView);
    });
    
    // Save Buttons
    saveButtons.forEach(button => {
        button.addEventListener('click', toggleSaveCrop);
    });
    
    // Search Form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchTerm = document.getElementById('crop-search').value;
            const category = document.getElementById('category-filter').value;
            const region = document.getElementById('region-filter').value;
            const climate = document.getElementById('climate-filter').value;
            
            console.log('Search submitted:', { searchTerm, category, region, climate });
            // In a real app, you would filter the crops or fetch new results
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('newsletter-email').value;
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            newsletterForm.reset();
        });
    }
});

// Responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu if resizing to larger screen
    if (window.innerWidth > 768 && navList.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        navList.classList.remove('active');
    }
});
