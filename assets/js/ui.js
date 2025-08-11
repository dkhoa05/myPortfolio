// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';
html.classList.toggle('dark', savedTheme === 'dark');

themeToggle?.addEventListener('click', () => {
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuToggle?.addEventListener('click', () => mobileMenu?.classList.toggle('hidden'));
mobileMenu?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.add('hidden')));

// Smooth anchor scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});