export function StaticPage({ title, subtitle, copy, navActive = 'home' }) {
  return {
    title,
    subtitle,
    navActive,
    showNav: true,
    content: `
      <section class="card">
        <h2>${title}</h2>
        <p class="muted">${copy}</p>
      </section>
    `,
  };
}