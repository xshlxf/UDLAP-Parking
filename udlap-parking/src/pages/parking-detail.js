import { PARKINGS } from '../data/parking.js';

export function ParkingDetailPage(params = {}) {
  const parking = PARKINGS.find((item) => item.id === params.id) || PARKINGS[0];

  return {
    title: parking.name,
    subtitle: `Vista detalle de ${parking.id}`,
    navActive: 'parking',
    showNav: true,
    content: `
      <section class="stack">
        <a class="btn btn-ghost" data-link href="/parking">Volver</a>

        <section class="card">
          <img src="${parking.image}" alt="${parking.name}" class="detail-photo" />
          <div class="card-head">
            <div>
              <h2>${parking.name}</h2>
              <p class="muted">${parking.subtitle}</p>
            </div>
            <span class="status">Fase 1</span>
          </div>
        </section>

        <section class="card">
          <div class="card-head">
            <div>
              <h3>Vista previa del grid</h3>
              <p class="muted">Esto después se reemplaza por el layout real de cajones.</p>
            </div>
            <span class="chip">Mock</span>
          </div>

          <div class="parking-grid">
            ${Array.from({ length: 24 }, (_, index) => {
              const busy = index % 5 === 0 || index % 9 === 0;
              return `<div class="spot ${busy ? 'spot-busy' : 'spot-free'}">${index + 1}</div>`;
            }).join('')}
          </div>
        </section>
      </section>
    `,
  };
}