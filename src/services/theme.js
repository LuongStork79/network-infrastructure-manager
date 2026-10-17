// src/services/theme.js

export function isDarkMode() {
  const saved = localStorage.getItem('nim_theme');
  if (saved === 'dark') return true;
  if (saved === 'light') return false;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function updateThemeUI(isDark) {
  const btns = document.querySelectorAll('.nim-theme-toggle-btn');
  btns.forEach(btn => {
    btn.setAttribute(
      'title',
      isDark ? 'Chế độ Sáng (Nhấp để chuyển sang Sáng)' : 'Chế độ Tối (Nhấp để chuyển sang Tối)'
    );
    const icon = btn.querySelector('i');
    if (icon) {
      if (isDark) {
        icon.className = 'fas fa-sun text-amber-400 text-sm';
      } else {
        icon.className = 'fas fa-moon text-slate-500 text-sm';
      }
    }
  });
}

export function applyTheme(isDark) {
  if (isDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  updateThemeUI(isDark);
}

export function setTheme(theme) {
  const isDark = theme === 'dark';
  localStorage.setItem('nim_theme', theme);
  applyTheme(isDark);
}

export function toggleTheme() {
  const currentIsDark = document.documentElement.classList.contains('dark');
  setTheme(currentIsDark ? 'light' : 'dark');
}

export function initTheme() {
  const dark = isDarkMode();
  applyTheme(dark);

  if (typeof window !== 'undefined') {
    window.nimToggleTheme = toggleTheme;
    window.nimSetTheme = setTheme;
    window.nimIsDarkMode = () => document.documentElement.classList.contains('dark');

    // Periodically sync UI icons during initial rendering
    const syncInterval = setInterval(() => {
      updateThemeUI(document.documentElement.classList.contains('dark'));
    }, 300);
    setTimeout(() => clearInterval(syncInterval), 5000);
  }
}
