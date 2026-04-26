export function LoginPage() {
  return {
    title: 'Iniciar sesión',
    subtitle: 'Acceso temporal para la base de la app.',
    showNav: false,
    navActive: 'home',
    content: `
      <section class="card stack">
        <div>
          <h2>Bienvenido</h2>
          <p class="muted">Esta pantalla ya está lista para cambiarse después a Firebase Auth.</p>
        </div>

        <form class="stack" data-login-form>
          <label class="field">
            <span>Correo institucional</span>
            <input type="email" placeholder="nombre@udlap.mx" required />
          </label>

          <label class="field">
            <span>Contraseña</span>
            <input type="password" placeholder="••••••••" required />
          </label>

          <button class="btn btn-primary" type="submit">Entrar</button>
        </form>

        <div class="row">
          <a class="btn btn-ghost" data-link href="/contact">Contacto</a>
          <a class="btn btn-ghost" data-link href="/home">Demo</a>
        </div>
      </section>
    `
  };
}