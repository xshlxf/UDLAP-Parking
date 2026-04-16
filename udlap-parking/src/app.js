import { navigate, resolveRoute } from './router.js';
import { renderLayout, getTheme, applyTheme, toggleTheme } from './ui/layout.js';
console.log("APP OK");

let rootEl = null;
let renderFn = null;
let listenersBound = false;

export function renderApp(root) {
  rootEl = root;
  applyTheme(getTheme());

  renderFn = () => {
    const route = resolveRoute(window.location.pathname);

    if (route.redirectTo) {
      navigate(route.redirectTo, true);
      return;
    }

    const page = route.component(route.params || {});
    document.title = `${page.title} | UDLAP Parking`;

    rootEl.innerHTML = renderLayout({
      title: page.title,
      subtitle: page.subtitle,
      content: page.content,
      showNav: page.showNav !== false,
      navActive: page.navActive || route.navActive || 'home',
    });
  };

  if (!listenersBound) {
    window.addEventListener('popstate', renderFn);

    document.addEventListener('click', (event) => {
      const link = event.target.closest('a[data-link]');
      if (link) {
        const href = link.getAttribute('href');
        if (href && !href.startsWith('http')) {
          event.preventDefault();
          navigate(href);
        }
      }

      const themeBtn = event.target.closest('[data-theme-toggle]');
      if (themeBtn) {
        toggleTheme();
        renderFn();
      }

      const logoutBtn = event.target.closest('[data-logout]');
      if (logoutBtn) {
        localStorage.removeItem('udlap.auth');
        navigate('/login', true);
      }
    });

    document.addEventListener('submit', (event) => {
      const form = event.target;
      if (!form.matches('[data-login-form]')) return;

      event.preventDefault();
      localStorage.setItem('udlap.auth', '1');
      navigate('/home', true);
    });

    listenersBound = true;
  }

  renderFn();
}