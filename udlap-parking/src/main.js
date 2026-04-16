import './styles/index.css';
import { renderApp } from './app.js';
console.log("MAIN OK");

window.addEventListener('DOMContentLoaded', () => {
  const root = document.querySelector('#app');
  renderApp(root);
});