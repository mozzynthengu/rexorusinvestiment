document.addEventListener('DOMContentLoaded', () => {

  /* ================= HERO SLIDER ================= */
  const slides = document.querySelectorAll('.slide');
  const prev = document.querySelector('.prev');
  const next = document.querySelector('.next');
  const heroSlider = document.querySelector('.hero-slider');

  if (slides.length && prev && next && heroSlider) {
    let current = 0;
    let slideInterval;

    // Create slide indicators
    const indicators = document.createElement('div');
    indicators.className = 'slide-indicators';
    slides.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'dot';
      dot.addEventListener('click', () => {
        current = i;
        showSlide(current);
        resetAutoSlide();
      });
      indicators.appendChild(dot);
    });
    heroSlider.appendChild(indicators);

    const dots = document.querySelectorAll('.dot');

    const showSlide = (index) => {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    };

    const nextSlide = () => {
      current = (current + 1) % slides.length;
      showSlide(current);
    };

    const prevSlide = () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
    };

    const startAutoSlide = () => {
      slideInterval = setInterval(nextSlide, 5000);
    };

    const resetAutoSlide = () => {
      clearInterval(slideInterval);
      startAutoSlide();
    };

    // Event listeners
    next.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
    prev.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
    heroSlider.addEventListener('mouseleave', startAutoSlide);

    // Swipe support for mobile
    let startX = 0;
    let endX = 0;
    heroSlider.addEventListener('touchstart', e => startX = e.touches[0].clientX);
    heroSlider.addEventListener('touchmove', e => endX = e.touches[0].clientX);
    heroSlider.addEventListener('touchend', () => {
      if (startX - endX > 50) nextSlide(); // swipe left
      if (endX - startX > 50) prevSlide(); // swipe right
      resetAutoSlide();
    });

    // Initialize
    showSlide(current);
    startAutoSlide();
  }

  /* ================= NAVIGATION ================= */
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {

    const toggleMenu = () => {
      navMenu.classList.toggle('nav-menu-active');
      navToggle.classList.toggle('open');

      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });

    // Close menu if click happens outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('nav-menu-active')) {
        toggleMenu();
      }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === "Escape" && navMenu.classList.contains('nav-menu-active')) {
        toggleMenu();
      }
    });
  }

  /* ================= NAVBAR SCROLL EFFECT ================= */
  if (navbar) {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

});
