import { LoginPage } from './pages/login.js';
import { HomePage } from './pages/home.js';
import { ParkingSelectPage } from './pages/parking-select.js';
import { ParkingDetailPage } from './pages/parking-detail.js';
import { StaticPage } from './pages/static-page.js';

const routes = [
  { path: '/', redirectTo: '/home' },

  { path: '/login', component: LoginPage, publicOnly: true, showNav: false },
  { path: '/home', component: HomePage, auth: true, navActive: 'home' },
  { path: '/parking', component: ParkingSelectPage, auth: true, navActive: 'parking' },
  { path: '/parking/:id', component: ParkingDetailPage, auth: true, navActive: 'parking' },

  {
    path: '/notifications',
    component: () =>
      StaticPage({
        title: 'Notificaciones',
        subtitle: 'Pantalla base para Firebase Messaging o alertas internas.',
        copy: 'Aquí después conectamos avisos de disponibilidad, reservas y cambios de estado.',
        navActive: 'notifications',
      }),
    auth: true,
    navActive: 'notifications',
  },
  {
    path: '/profile',
    component: () =>
      StaticPage({
        title: 'Perfil',
        subtitle: 'Pantalla base del usuario.',
        copy: 'Aquí luego vivirán rol, historial, datos y cierre de sesión.',
        navActive: 'profile',
      }),
    auth: true,
    navActive: 'profile',
  },
  {
    path: '/settings',
    component: () =>
      StaticPage({
        title: 'Ajustes',
        subtitle: 'Tema y preferencias.',
        copy: 'Aquí quedarán el tema dark/light y los ajustes persistentes.',
        navActive: 'profile',
      }),
    auth: true,
    navActive: 'profile',
  },
  {
    path: '/qr',
    component: () =>
      StaticPage({
        title: 'QR de reserva',
        subtitle: 'Pantalla base para el código de reserva.',
        copy: 'Más adelante aquí renderizamos el QR único generado por Firestore.',
        navActive: 'parking',
      }),
    auth: true,
    navActive: 'parking',
  },
  {
    path: '/contact',
    component: () =>
      StaticPage({
        title: 'Contacto',
        subtitle: 'Soporte y tickets.',
        copy: 'Después lo conectamos a una colección support_tickets.',
        navActive: 'home',
      }),
    auth: false,
    navActive: 'home',
  },

  { path: '*', component: LoginPage, publicOnly: true, showNav: false },
];

function compilePath(path) {
  const keys = [];
  const pattern = path.replace(/:([^/]+)/g, (_, key) => {
    keys.push(key);
    return '([^/]+)';
  });
  return { regex: new RegExp(`^${pattern}$`), keys };
}

function matchRoute(pathname) {
  for (const route of routes) {
    if (route.path === '*') continue;
    const { regex, keys } = compilePath(route.path);
    const match = pathname.match(regex);
    if (!match) continue;

    const params = {};
    keys.forEach((key, index) => {
      params[key] = decodeURIComponent(match[index + 1]);
    });

    return { ...route, params };
  }

  return routes.find((route) => route.path === '*');
}

export function isAuthenticated() {
  return localStorage.getItem('udlap.auth') === '1';
}

export function navigate(path, replace = false) {
  if (replace) history.replaceState({}, '', path);
  else history.pushState({}, '', path);

  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function resolveRoute(pathname = window.location.pathname) {
  const path = pathname === '/' ? '/home' : pathname;
  const route = matchRoute(path);

  if (!route) {
    return { redirectTo: '/login' };
  }

  if (route.publicOnly && isAuthenticated()) {
    return { redirectTo: '/home' };
  }

  if (route.auth && !isAuthenticated()) {
    return { redirectTo: '/login' };
  }

  return route;
}