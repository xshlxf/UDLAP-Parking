import { subscribeToSpots } from '../services/realtime.js';
import { calculateAvailability } from '../utils/availability.js';

export function HomePage() {
  return {
    title: 'Home',
    subtitle: 'Mapa en tiempo real',
    navActive: 'home',
    showNav: true,

    content: `
      <section class="card">
        <div class="map-stage">
          <img src="/assets/mapaUDLAP.png" />

          <a id="pin-E2" class="map-pin" data-link href="/parking/E2">E2</a>
          <a id="pin-E5" class="map-pin" data-link href="/parking/E5">E5</a>
        </div>
      </section>
    `,

    onMount: () => {
      const pinE2 = document.getElementById('pin-E2');
      const pinE5 = document.getElementById('pin-E5');

      // Posiciones (ajustables)
      pinE2.style.left = '18%';
      pinE2.style.top = '49%';

      pinE5.style.left = '49%';
      pinE5.style.top = '25%';

      // Suscripciones en tiempo real
      subscribeToSpots('E2', (spots) => {
        const color = calculateAvailability(spots);
        pinE2.style.background = getColor(color);
      });

      subscribeToSpots('E5', (spots) => {
        const color = calculateAvailability(spots);
        pinE5.style.background = getColor(color);
      });
    }
  };
}

function getColor(state) {
  switch (state) {
    case 'green': return '#22C55E';
    case 'yellow': return '#F59E0B';
    case 'orange': return '#FB923C';
    case 'red': return '#EF4444';
    default: return '#999';
  }
}