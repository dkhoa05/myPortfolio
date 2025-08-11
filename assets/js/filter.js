// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(btn => btn.addEventListener('click', () => {
  const filter = btn.getAttribute('data-filter');

  // Toggle active styles
  filterButtons.forEach(b => {
    b.classList.remove('active','bg-primary','text-white');
    b.classList.add('bg-gray-200','dark:bg-gray-700','text-text','dark:text-gray-300');
  });

  btn.classList.add('active','bg-primary','text-white');
  btn.classList.remove('bg-gray-200','dark:bg-gray-700','text-text','dark:text-gray-300');

  // Show/hide cards
  projectCards.forEach(card => {
    const tags = (card.getAttribute('data-category') || '').split(' ');
    if (filter === 'all' || tags.includes(filter)) {
      card.style.display='block';
      card.classList.add('animate-fade-in');
    } else {
      card.style.display='none';
      card.classList.remove('animate-fade-in');
    }
  });
}));