export function getTheme() {
  const saved = localStorage.getItem('udlap.theme');
  if (saved === 'dark' || saved === 'light') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('udlap.theme', theme);
}

export function toggleTheme() {
  const current = getTheme();
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

function bottomNav(active) {
  return `
    <nav class="bottom-nav" aria-label="Navegación principal">
      <a data-link href="/home" class="${active === 'home' ? 'is-active' : ''}">Inicio</a>
      <a data-link href="/parking" class="${active === 'parking' ? 'is-active' : ''}">Parking</a>
      <a data-link href="/notifications" class="${active === 'notifications' ? 'is-active' : ''}">Alertas</a>
      <a data-link href="/profile" class="${active === 'profile' ? 'is-active' : ''}">Perfil</a>
    </nav>
  `;
}

export function renderLayout({ title, subtitle = '', content = '', showNav = true, navActive = 'home' }) {
  return `
    <div class="app-shell">
      <header class="topbar">
        <div>
          <p class="eyebrow">UDLAP Parking</p>
          <h1>${title}</h1>
          ${subtitle ? `<p class="subtitle">${subtitle}</p>` : ''}
        </div>

        <button class="icon-btn" type="button" data-theme-toggle aria-label="Cambiar tema">
          Tema
        </button>
      </header>

      <main class="screen">${content}</main>

      ${showNav ? bottomNav(navActive) : ''}
    </div>
  `;
}