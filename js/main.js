function loadSectionFromHash() {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    fetch(`sections/${hash}.html`)
        .then(res => res.ok ? res.text() : '<p>Sección no encontrada.</p>')
        .then(html => {
            document.getElementById('content').innerHTML = html;
            loadSectionCSS(hash);
        });
}

function loadSectionCSS(section) {
    // Elimina el CSS de sección anterior si existe
    const oldLink = document.getElementById('section-css');
    if (oldLink) oldLink.remove();

    // Si existe un CSS para la sección, lo carga
    const cssPath = `css/${section}.css`;
    fetch(cssPath).then(res => {
        if (res.ok) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = cssPath;
            link.id = 'section-css';
            document.head.appendChild(link);
        }
    });
}

window.addEventListener('hashchange', loadSectionFromHash);
window.addEventListener('DOMContentLoaded', loadSectionFromHash);
