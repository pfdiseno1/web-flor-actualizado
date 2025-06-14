function loadSectionFromHash() {
    const hash = window.location.hash.replace('#', '') || 'inicio';
    fetch(`sections/${hash}.html`)
        .then(res => res.ok ? res.text() : '<p>Sección no encontrada.</p>')
        .then(html => {
            document.getElementById('content').innerHTML = html;
        });
}

window.addEventListener('hashchange', loadSectionFromHash);
window.addEventListener('DOMContentLoaded', loadSectionFromHash);
