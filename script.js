// =====================
// HERO SLIDER
// =====================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;

// Show the specified slide
function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
        dots[i].classList.toggle('active', i === index);
    });
}

// Dot navigation
dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
        currentSlide = i;
        showSlide(currentSlide);
    });
});

// Auto-slide every 5 seconds
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 5000);


// =====================
// SMOOTH SCROLL FOR NAVIGATION
// =====================
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if(target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// =====================
// NEWSLETTER FORM SUBMISSION
// =====================
const newsletterForm = document.querySelector('.newsletter form');

newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const email = emailInput.value.trim();

    if(email === '') {
        alert('Please enter your email.');
    } else if(!/^\S+@\S+\.\S+$/.test(email)) {
        alert('Please enter a valid email address.');
    } else {
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
    }
});
