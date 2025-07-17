// Filter and Search Functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get DOM elements
  const searchForm = document.querySelector('.search-form');
  const searchInput = document.getElementById('crop-search');
  const categoryFilter = document.getElementById('category-filter');
  const regionFilter = document.getElementById('region-filter');
  const climateFilter = document.getElementById('climate-filter');
  const cropCards = document.querySelectorAll('.crop-card');
  
  // Update footer year
  const yearElement = document.querySelector('.year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Filter crops based on search and filters
  function filterCrops() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = categoryFilter.value;
    const selectedRegion = regionFilter.value;
    const selectedClimate = climateFilter.value;
    
    cropCards.forEach(card => {
      const name = card.querySelector('.crop-name').textContent.toLowerCase();
      const category = card.querySelector('.crop-category').textContent.toLowerCase();
      const region = card.querySelector('.crop-region').textContent.toLowerCase();
      
      // Check if card matches all selected filters
      const matchesSearch = name.includes(searchTerm);
      const matchesCategory = !selectedCategory || category === selectedCategory;
      const matchesRegion = !selectedRegion || region === selectedRegion;
      
      // For climate, we would need to add a data attribute to the cards
      // This is a placeholder for that logic
      const matchesClimate = !selectedClimate || true; // Replace with actual climate check
      
      if (matchesSearch && matchesCategory && matchesRegion && matchesClimate) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
  
  // Event listeners for form submission and input changes
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    filterCrops();
  });
  
  searchInput.addEventListener('input', filterCrops);
  categoryFilter.addEventListener('change', filterCrops);
  regionFilter.addEventListener('change', filterCrops);
  climateFilter.addEventListener('change', filterCrops);
  
  // Scroll reveal animation for crop cards
  const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    cropCards.forEach(card => {
      observer.observe(card);
    });
  };
  
  // Fallback for browsers without IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    window.addEventListener('scroll', function() {
      const windowHeight = window.innerHeight;
      
      cropCards.forEach(card => {
        const cardPosition = card.getBoundingClientRect().top;
        if (cardPosition < windowHeight - 100) {
          card.classList.add('visible');
        }
      });
    });
    
    // Trigger initial check
    window.dispatchEvent(new Event('scroll'));
  } else {
    animateOnScroll();
  }
  
  // Focus management for accessibility
  searchInput.addEventListener('focus', function() {
    this.parentElement.classList.add('focused');
  });
  
  searchInput.addEventListener('blur', function() {
    this.parentElement.classList.remove('focused');
  });
  
  // Initialize filter on page load
  filterCrops();
});
