document.addEventListener('DOMContentLoaded', function() {
    const burgerBtn = document.getElementById('burger-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    burgerBtn.addEventListener('click', function() {
      // Toggle mobile menu visibility
      mobileMenu.classList.toggle('hidden');
      
      // Toggle aria-expanded attribute for accessibility
      const isExpanded = burgerBtn.getAttribute('aria-expanded') === 'true';
      burgerBtn.setAttribute('aria-expanded', !isExpanded);
      
      // Animate burger to X when open
      const burgerLines = burgerBtn.querySelectorAll('div');
      if (mobileMenu.classList.contains('hidden')) {
        // Menu is now hidden, revert to burger icon
        burgerLines[0].classList.remove('rotate-45', 'translate-y-2');
        burgerLines[1].classList.remove('opacity-0');
        burgerLines[2].classList.remove('-rotate-45', '-translate-y-2');
      } else {
        // Menu is now visible, show X icon
        burgerLines[0].classList.add('rotate-45', 'translate-y-2');
        burgerLines[1].classList.add('opacity-0');
        burgerLines[2].classList.add('-rotate-45', '-translate-y-2');
      }
    });
    
    // Close mobile menu when window is resized to desktop size
    window.addEventListener('resize', function() {
      if (window.innerWidth >= 768) { // md breakpoint is 768px
        mobileMenu.classList.add('hidden');
        burgerBtn.setAttribute('aria-expanded', 'false');
        const burgerLines = burgerBtn.querySelectorAll('div');
        burgerLines[0].classList.remove('rotate-45', 'translate-y-2');
        burgerLines[1].classList.remove('opacity-0');
        burgerLines[2].classList.remove('-rotate-45', '-translate-y-2');
      }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      if (!mobileMenu.classList.contains('hidden') && 
          !mobileMenu.contains(event.target) && 
          !burgerBtn.contains(event.target)) {
        mobileMenu.classList.add('hidden');
        burgerBtn.setAttribute('aria-expanded', 'false');
        const burgerLines = burgerBtn.querySelectorAll('div');
        burgerLines[0].classList.remove('rotate-45', 'translate-y-2');
        burgerLines[1].classList.remove('opacity-0');
        burgerLines[2].classList.remove('-rotate-45', '-translate-y-2');
      }
    });
}); 