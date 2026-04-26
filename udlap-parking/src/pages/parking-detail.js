import { subscribeToSpots } from '../services/realtime.js';
import { reserveSpot } from '../services/reservations.js';
export function ParkingDetailPage(params = {}) {
  const parkingId = params.id;

  return {
    title: `Estacionamiento ${parkingId}`,
    subtitle: 'Disponibilidad en tiempo real',
    navActive: 'parking',
    showNav: true,

    content: `
      <section class="stack">
        <a class="btn btn-ghost" data-link href="/parking">Volver</a>

        <section class="card">
          <div id="grid" class="parking-grid"></div>
        </section>
      </section>
    `,

    onMount: () => {
      const grid = document.getElementById('grid');

      subscribeToSpots(parkingId, (spots) => {
        renderGrid(grid, spots);
      });
    }
  };
}

function renderGrid(container, spots) {
  // Ordenar por ID (E2-001, E2-002...)
  spots.sort((a, b) => a.id.localeCompare(b.id));

  container.innerHTML = spots.map(spot => {
    return `
      <div 
        class="spot ${getClass(spot.status)}" 
        data-id="${spot.id}">
        ${spot.id.split('-')[1]}
      </div>
    `;
  }).join('');
  
  container.querySelectorAll('.spot').forEach(el => {
    el.addEventListener('click', async () => {
      const id = el.dataset.id;
      // Evitar clicks en ocupados
      if (el.classList.contains('spot-busy') || el.classList.contains('spot-reserved')) {
        return;
      }
      try {
        await reserveSpot(id, parkingId);
        console.log('Reservado:', id);
      } catch (err) {
        alert(err.message);
      }
    });
  });
}

function getClass(status) {
  switch (status) {
    case 'free': return 'spot-free';
    case 'occupied': return 'spot-busy';
    case 'reserved': return 'spot-reserved';
    default: return '';
  }
}