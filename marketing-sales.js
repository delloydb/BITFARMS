document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply the saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'dark';
    
    // Theme toggle event listener
    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update the theme label
        const themeLabel = document.querySelector('.theme-label');
        themeLabel.textContent = newTheme === 'dark' ? 'Dark Mode' : 'Light Mode';
    });
    
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    menuToggle.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mainNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            }
        });
    });
    
    // Product Modal Functionality
    const productModal = document.getElementById('product-modal');
    const modalClose = document.querySelector('.modal-close');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    // Sample product data (in a real app, this would come from an API)
    const products = {
        bananas: {
            name: 'Bananas',
            price: 'KSh 50 per bunch',
            location: 'Kiambu, Kenya',
            availability: 'In Season',
            description: 'Fresh, naturally ripened bananas from small-scale farms in Kiambu. Grown without synthetic pesticides, these bananas are rich in potassium and perfect for healthy snacks or cooking.',
            image: 'placeholder.jpg'
        },
        tomatoes: {
            name: 'Tomatoes',
            price: 'KSh 80 per kg',
            location: 'Nairobi',
            availability: 'Available',
            description: 'Juicy, vine-ripened tomatoes with excellent flavor. Grown in greenhouses near Nairobi for consistent quality year-round. Perfect for salads, sauces, and cooking.',
            image: 'placeholder.jpg'
        },
        avocados: {
            name: 'Avocados',
            price: 'KSh 70 each',
            location: "Murang'a, Kenya",
            availability: 'Limited',
            description: 'Creamy Hass avocados from the fertile highlands of Murang\'a. These nutrient-dense fruits are hand-picked at peak ripeness for optimal flavor and texture.',
            image: 'placeholder.jpg'
        },
        onions: {
            name: 'Onions',
            price: 'KSh 120 per kg',
            location: 'Eldoret',
            availability: 'In Season',
            description: 'Red onions with strong flavor and long shelf life. Grown in the sunny fields of Eldoret, these onions are perfect for cooking and have excellent storage qualities.',
            image: 'placeholder.jpg'
        },
        strawberries: {
            name: 'Strawberries',
            price: 'KSh 200 per punnet',
            location: 'Nyeri, Kenya',
            availability: 'Available',
            description: 'Sweet, juicy strawberries grown in the cool highlands of Nyeri. These berries are hand-picked daily and packed carefully to maintain freshness and quality.',
            image: 'placeholder.jpg'
        },
        maize: {
            name: 'Maize',
            price: 'KSh 3000 per bag',
            location: 'Nakuru',
            availability: 'In Season',
            description: 'High-quality maize from the fertile Rift Valley region. This staple crop is grown using sustainable methods and is perfect for flour production or boiling.',
            image: 'placeholder.jpg'
        }
    };
    
    // Open modal with product details
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.getAttribute('data-product');
            const product = products[productId];
            
            if (product) {
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div class="modal-product">
                        <div class="modal-product-image">
                            <img src="${product.image}" alt="${product.name}" loading="lazy">
                            <span class="availability-badge ${product.availability.toLowerCase().replace(' ', '-')}">${product.availability}</span>
                        </div>
                        <div class="modal-product-details">
                            <h2>${product.name}</h2>
                            <p class="modal-price">${product.price}</p>
                            <p class="modal-location"><i class="icon-location"></i> ${product.location}</p>
                            <div class="modal-description">
                                <h4>Product Details</h4>
                                <p>${product.description}</p>
                            </div>
                            <div class="modal-actions">
                                <button class="btn btn-primary">Contact Farmer</button>
                                <button class="btn btn-outline">Save for Later</button>
                            </div>
                        </div>
                    </div>
                `;
                
                productModal.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', () => {
        productModal.classList.remove('active');
        document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close modal when clicking outside content
    productModal.addEventListener('click', (e) => {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.style.overflow = ''; // Re-enable scrolling
        }
    });
    
    // Accordion Functionality
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const isExpanded = header.getAttribute('aria-expanded') === 'true';
            header.setAttribute('aria-expanded', !isExpanded);
        });
    });
    
    // Form Submission Handling
    const productForm = document.getElementById('product-form');
    const buyerForm = document.getElementById('buyer-form');
    
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would send this data to a server
            alert('Your product listing has been submitted successfully!');
            this.reset();
        });
    }
    
    if (buyerForm) {
        buyerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would send this data to a server
            alert('Your enquiry has been sent to the farmers. You will hear back soon!');
            this.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            alert(`Thank you for subscribing with ${emailInput.value}! You'll receive our next newsletter.`);
            emailInput.value = '';
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
    
    // Lazy loading for images
    if ('loading' in HTMLImageElement.prototype) {
        // Native lazy loading is supported
        const lazyImages = document.querySelectorAll('img[loading="lazy"]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
        });
    } else {
        // Fallback for browsers without native lazy loading
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    lazyLoadObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
            lazyLoadObserver.observe(img);
        });
    }
});
