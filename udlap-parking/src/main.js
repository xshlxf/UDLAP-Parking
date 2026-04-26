import './styles/index.css';
import { renderApp } from './app.js';

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  renderApp(root);
});