export function HomePage() {
  return {
    title: 'Home',
    subtitle: 'Base visual con mapa y accesos a E2 y E5.',
    navActive: 'home',
    showNav: true,
    content: `
      <section class="stack">
        <section class="card hero">
          <span class="chip">Fase 1</span>
          <h2>Encuentra cajones sin perder tiempo dentro del campus.</h2>
          <p class="muted">
            Esta es la base navegable en JavaScript puro. Después aquí entra Firebase,
            el mapa vivo y la reserva real.
          </p>

          <div class="row">
            <a class="btn btn-primary" data-link href="/parking">Ver estacionamientos</a>
            <a class="btn btn-ghost" data-link href="/settings">Ajustes</a>
          </div>
        </section>

        <section class="card">
          <div class="card-head">
            <div>
              <h3>Mapa del campus</h3>
              <p class="muted">Pines preparados para E2 y E5.</p>
            </div>
            <span class="status">Demo visual</span>
          </div>

          <div class="map-stage">
            <img src="/assets/mapaUDLAP.png" alt="Mapa del campus UDLAP" />
            <a class="map-pin map-pin-e2" data-link href="/parking/E2">E2</a>
            <a class="map-pin map-pin-e5" data-link href="/parking/E5">E5</a>
          </div>
        </section>
      </section>
    `,
  };
}