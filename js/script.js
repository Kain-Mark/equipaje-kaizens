/* ============================================================
   TuEquipaje.com - JavaScript principal
   ============================================================ */

// --- Menú hamburguesa móvil ---
const menuToggle = document.getElementById('menuToggle');
const mobileNav  = document.getElementById('mobileNav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);

    // Animación de las 3 líneas → X
    const spans = menuToggle.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    }
  });

  // Cerrar menú al hacer clic en un enlace
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '1';
      spans[2].style.transform = '';
    });
  });
}

// --- Newsletter (placeholder) ---
function handleNewsletter(e) {
  e.preventDefault();
  const input  = e.target.querySelector('input[type="email"]');
  const button = e.target.querySelector('button');
  const email  = input.value.trim();

  if (!email) return;

  // Simula envío (aquí conectarás tu servicio de email en el futuro)
  button.textContent = '✓ ¡Suscrito!';
  button.style.background = '#38a169';
  input.value = '';
  input.disabled = true;
  button.disabled = true;

  setTimeout(() => {
    button.textContent = 'Suscribirme →';
    button.style.background = '';
    input.disabled = false;
    button.disabled = false;
  }, 4000);
}

// --- Scroll suave para anclas internas ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const headerHeight = document.querySelector('header')?.offsetHeight || 70;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Destacar nav activo al hacer scroll ---
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('nav a[href^="#"]');

const observerOptions = {
  root: null,
  rootMargin: '-80px 0px -60% 0px',
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.fontWeight = '';
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.fontWeight = '700';
          link.style.color = 'var(--primary)';
        }
      });
    }
  });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// --- Lazy loading básico para imágenes (por si el navegador no lo soporta) ---
if ('IntersectionObserver' in window) {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  const imgObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        obs.unobserve(img);
      }
    });
  });
  lazyImages.forEach(img => imgObserver.observe(img));
}

// --- Tracking de clics en botones de Amazon (para analytics futuros) ---
document.querySelectorAll('.btn-amazon').forEach(btn => {
  btn.addEventListener('click', function() {
    const productName = this.closest('.product-card, .featured-month-content')
      ?.querySelector('h2, h3')?.textContent?.trim() || 'Producto desconocido';
    // Aquí conectarás Google Analytics / evento en el futuro:
    // gtag('event', 'click_amazon', { product: productName });
    console.log('[TuEquipaje] Click Amazon:', productName);
  });
});

console.log('🧳 TuEquipaje.com cargado correctamente');
