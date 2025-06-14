const sections = [
  'inicio',
  'flor',
  'capacitaciones',
  'entrenamientos',
  'libros',
  'reseñas',
  'contacto'
];

window.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('all-sections');
  sections.forEach(section => {
    fetch(`sections/${section}.html`)
      .then(res => res.ok ? res.text() : `<section><h2>${section}</h2><p>No se pudo cargar la sección.</p></section>`)
      .then(html => {
        main.insertAdjacentHTML('beforeend', html);
      });
  });
});