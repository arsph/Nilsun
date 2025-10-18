// Tailwind configuration
tailwind.config = window.tailwindConfig;

// Contact Page JavaScript
// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const closeBtn = document.getElementById('closeBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMenu() {
    mobileMenu.classList.add('open');
    menuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    menuOverlay.classList.remove('open');
    document.body.style.overflow = 'auto';
  }

  hamburgerBtn.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });

  // Animate contact header
  setTimeout(() => {
    document.getElementById('contactHeader').style.opacity = '1';
  }, 500);

  // Back to top button
  const btn = document.getElementById("backToTopBtn");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 200) btn.classList.remove("hidden");
    else btn.classList.add("hidden");
  });

  function smoothScrollToTop(duration = 2000) {
    const start = window.pageYOffset;
    const startTime = performance.now();

    function scrollStep(timestamp) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      window.scrollTo(0, start * (1 - easeOut));
      if (progress < 1) {
        window.requestAnimationFrame(scrollStep);
      }
    }
    window.requestAnimationFrame(scrollStep);
  }

  btn.addEventListener("click", () => {
    smoothScrollToTop(2500);
  });
});

// Contact Form Handling
document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const form = this;
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const submitLoading = document.getElementById('submitLoading');
  const formMessage = document.getElementById('formMessage');
  const successMessage = document.getElementById('successMessage');
  const errorMessage = document.getElementById('errorMessage');
  const errorText = document.getElementById('errorText');
  
  // Clear previous messages
  formMessage.classList.add('hidden');
  successMessage.classList.add('hidden');
  errorMessage.classList.add('hidden');
  
  // Clear previous errors
  document.querySelectorAll('.error-message').forEach(error => {
    error.classList.add('hidden');
    error.textContent = '';
  });
  
  // Validate form
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  let isValid = true;
  
  // Name validation
  if (!data.name || data.name.trim().length < 2) {
    document.getElementById('name-error').textContent = 'نام باید حداقل 2 کاراکتر باشد';
    document.getElementById('name-error').classList.remove('hidden');
    isValid = false;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    document.getElementById('email-error').textContent = 'لطفاً یک ایمیل معتبر وارد کنید';
    document.getElementById('email-error').classList.remove('hidden');
    isValid = false;
  }
  
  
  // Message validation
  if (!data.message || data.message.trim().length < 10) {
    document.getElementById('message-error').textContent = 'پیام باید حداقل 10 کاراکتر باشد';
    document.getElementById('message-error').classList.remove('hidden');
    isValid = false;
  }
  
  if (!isValid) {
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  submitText.classList.add('hidden');
  submitLoading.classList.remove('hidden');
  
  try {
    const response = await fetch('contact-handler.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      formMessage.classList.remove('hidden');
      successMessage.classList.remove('hidden');
      form.reset();
    } else {
      formMessage.classList.remove('hidden');
      errorMessage.classList.remove('hidden');
      errorText.textContent = result.message || 'خطایی در ارسال پیام رخ داد';
    }
  } catch (error) {
    formMessage.classList.remove('hidden');
    errorMessage.classList.remove('hidden');
    errorText.textContent = 'خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.';
  } finally {
    // Hide loading state
    submitBtn.disabled = false;
    submitText.classList.remove('hidden');
    submitLoading.classList.add('hidden');
  }
});
