// Theme Toggle Logic
const root = document.documentElement;
const themeToggleBtn = document.getElementById('theme-toggle');

// Check saved theme or system preference
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else if (systemPrefersDark) {
  root.setAttribute('data-theme', 'dark');
} else {
  root.setAttribute('data-theme', 'light');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
  });
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    siteNav.classList.toggle('open');
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteNav.classList.remove('open');
    });
  });
}

// Year in Footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Toast notification helper
const toastEl = document.getElementById('toast');
let toastTimer = null;

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastEl.classList.remove('show');
  }, 2500);
}

// Copy to Clipboard buttons
const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach((btn) => {
  btn.addEventListener('click', async () => {
    const textToCopy = btn.getAttribute('data-copy');
    if (!textToCopy) return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      showToast(`Copied to clipboard: ${textToCopy}`);
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      showToast('Could not copy automatically');
    }
  });
});
