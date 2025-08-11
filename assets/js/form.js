// Contact form validation + UX
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const submitSpinner = document.getElementById('submit-spinner');
const formMessage = document.getElementById('form-message');

function validateForm(fd){
  const errors = {};
  if(!fd.get('name')?.trim()) errors.name = 'Vui lòng nhập họ tên';

  const email = (fd.get('email') || '').trim();
  if(!email) errors.email = 'Vui lòng nhập email';
  else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Email không hợp lệ';

  const msg = (fd.get('message') || '').trim();
  if(!msg) errors.message = 'Vui lòng nhập tin nhắn';
  else if(msg.length < 10) errors.message = 'Tin nhắn tối thiểu 10 ký tự';

  if(fd.get('honeypot')) errors.spam = 'Spam detected';
  return errors;
}

function showFieldError(field, message){
  const err = document.getElementById(`${field}-error`);
  const input = document.getElementById(field);
  if(err && input){
    err.textContent = message;
    err.classList.remove('hidden');
    input.classList.add('border-red-500');
  }
}

function clearFieldErrors(){
  ['name','email','message'].forEach(f=>{
    const err = document.getElementById(`${f}-error`);
    const input = document.getElementById(f);
    if(err) err.classList.add('hidden');
    if(input) input.classList.remove('border-red-500');
  });
}

function showFormMessage(message, isError=false){
  formMessage.textContent = message;
  formMessage.className = `text-center ${isError ? 'text-red-500' : 'text-green-500'}`;
  formMessage.classList.remove('hidden');
  setTimeout(()=>formMessage.classList.add('hidden'), 5000);
}

let lastSubmission = 0;
const RATE_LIMIT = 60000; // 1 minute

form?.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const now = Date.now();
  if(now - lastSubmission < RATE_LIMIT){
    showFormMessage('Vui lòng đợi 1 phút trước khi gửi lại.', true);
    return;
  }

  clearFieldErrors();
  const fd = new FormData(form);
  const errors = validateForm(fd);

  if(Object.keys(errors).length){
    Object.entries(errors).forEach(([k,v])=>{ if(k!=='spam') showFieldError(k,v); });
    if(errors.spam) showFormMessage('Có lỗi xảy ra, vui lòng thử lại.', true);
    return;
  }

  submitBtn.disabled = true;
  submitText.textContent = 'Đang gửi...';
  submitSpinner.classList.remove('hidden');

  try {
    // TODO: Thay bằng endpoint thật (ví dụ: fetch('/api/contact', {...}))
    await new Promise(r=>setTimeout(r,1500));
    lastSubmission = now;
    form.reset();
    showFormMessage('Cảm ơn bạn! Tin nhắn đã được gửi thành công.');
  } catch(err){
    console.error(err);
    showFormMessage('Có lỗi khi gửi tin nhắn. Vui lòng thử lại.', true);
  } finally {
    submitBtn.disabled = false;
    submitText.textContent = 'Gửi tin nhắn';
    submitSpinner.classList.add('hidden');
  }
});