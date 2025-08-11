const projectModal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeModalBtn = document.getElementById('close-modal');

function trapFocus(el){
  const focusable = el.querySelectorAll('button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])');
  const first = focusable[0]; const last = focusable[focusable.length-1];
  el.addEventListener('keydown', (e)=>{
    if(e.key==='Tab'){
      if(e.shiftKey){ if(document.activeElement===first){ last.focus(); e.preventDefault(); } }
      else { if(document.activeElement===last){ first.focus(); e.preventDefault(); } }
    }
  });
}

function openProjectModal(id){
  const p = window.projectData?.[id];
  if(!p) return;
  modalTitle.textContent = p.title;
  modalContent.innerHTML = `
    <div class="space-y-6">
      <p class="text-textSecondary dark:text-gray-300 text-lg">${p.description}</p>
      <div>
        <h4 class="text-xl font-semibold mb-3">Tính năng chính</h4>
        <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
          ${(p.features || []).map(f =>
            `<li class='flex items-center text-textSecondary dark:text-gray-300'><i class="fas fa-check text-accent mr-2"></i>${f}</li>`
          ).join('')}
        </ul>
      </div>
      <div>
        <h4 class="text-xl font-semibold mb-3">Công nghệ</h4>
        <div class="flex flex-wrap gap-2">
          ${(p.technologies || []).map(t =>
            `<span class='px-3 py-1 rounded-full text-accent bg-[rgba(46,139,192,0.12)] text-sm'>${t}</span>`
          ).join('')}
        </div>
      </div>
      <div class="flex gap-4 pt-4">
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="bg-gray-800 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors flex items-center"><i class="fab fa-github mr-2"></i>Mã nguồn</a>
        ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primaryHover transition-colors flex items-center"><i class="fas fa-external-link-alt mr-2"></i>Live Demo</a>` : ''}
      </div>
    </div>
  `;
  projectModal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
  trapFocus(projectModal);
  closeModalBtn.focus();
}

window.openProjectModal = openProjectModal;

closeModalBtn?.addEventListener('click', () => {
  projectModal.classList.add('hidden');
  document.body.style.overflow='auto';
});

projectModal?.addEventListener('click', (e)=>{
  if(e.target === projectModal){
    projectModal.classList.add('hidden');
    document.body.style.overflow='auto';
  }
});

document.addEventListener('keydown', (e)=>{
  if(e.key==='Escape' && !projectModal.classList.contains('hidden')){
    projectModal.classList.add('hidden');
    document.body.style.overflow='auto';
  }
});