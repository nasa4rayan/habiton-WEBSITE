import './style.css'

// --- Interactive Background Glow ---
const interactive = document.querySelector('.interactive');

document.addEventListener('mousemove', (e) => {
  const x = e.clientX;
  const y = e.clientY;
  
  // Center the glow on cursor
  interactive.style.transform = `translate(${x}px, ${y}px)`;
});

// --- Scroll Reveal Animation ---
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // Check if we want valid re-trigger or once
    }
  });
}, observerOptions);

document.querySelectorAll('.card, .hero-visual, .download-section').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// Add class for visible state
const style = document.createElement('style');
style.textContent = `
  .visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;
document.head.appendChild(style);

// --- 3D Tilt Effect for Hero Phone ---
const heroSection = document.querySelector('.hero');
const phone = document.querySelector('.phone-mockup');

if (heroSection && phone) {
  heroSection.addEventListener('mousemove', (e) => {
    const { offsetWidth: width, offsetHeight: height } = heroSection;
    const { clientX: x, clientY: y } = e;
    
    // Calculate rotation based on cursor position relative to center
    const xRotation = ((y / height) - 0.5) * 20; // -10 to 10 deg
    const yRotation = ((x / width) - 0.5) * -20; // -10 to 10 deg
    
    phone.style.transform = `rotateX(${xRotation + 10}deg) rotateY(${yRotation - 15}deg)`;
  });
  
  heroSection.addEventListener('mouseleave', () => {
    phone.style.transform = `rotateX(10deg) rotateY(-15deg)`; // specific return to base
  });
}
