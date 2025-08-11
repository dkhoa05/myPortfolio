// Simple analytics logging — tracking user interactions
function logEvent(type, detail){
  console.log(`[Analytics] Event: ${type}`, detail || '');
  // Có thể gửi lên server/Plausible/GA:
  // fetch('/log', { method: 'POST', body: JSON.stringify({type, detail}) });
}

// Track clicks on mailto: and tel: links
document.querySelectorAll('a[href^="mailto:"],a[href^="tel:"]').forEach(link => {
  link.addEventListener('click', () => logEvent('contact_click', link.getAttribute('href')));
});

// Track clicks on GitHub/Demo links trong modal
document.addEventListener('click', (e) => {
  if (!e.target.closest) return;

  const githubBtn = e.target.closest('a[href*="github.com"]');
  if (githubBtn) return logEvent('project_link_click', 'GitHub');

  const demoBtn = e.target.closest('a[href^="http"]:not([href*="github.com"])');
  if (demoBtn && demoBtn.innerText.includes('Live Demo')) return logEvent('project_link_click', 'Live Demo');
});

// Update footer year (nếu muốn thao tác JS thay vì inline)
const yearSpan = document.getElementById('y');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();