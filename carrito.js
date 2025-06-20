// Mostrar carrito
document.getElementById('abrir-carrito').onclick = function() {
    document.getElementById('carrito-modal').style.display = 'flex';
}
// Cerrar carrito
document.getElementById('cerrar-carrito').onclick = function() {
    document.getElementById('carrito-modal').style.display = 'none';
}

// Actualizar cantidad:
function mostrarCarrito() {
    // ... tu código de antes ...
    document.getElementById('carrito-cantidad').textContent = carrito.length;
}