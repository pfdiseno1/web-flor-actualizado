let carrito = [];
let ultimoPedido = null; // Guarda el último detalle de compra

function mostrarCarrito() {
    document.getElementById('carrito-cantidad').textContent = carrito.length;
    const lista = document.getElementById('carrito-lista');
    if (!lista) return;
    lista.innerHTML = '';
    let total = 0;
    carrito.forEach((prod, idx) => {
        total += prod.precio;
        const li = document.createElement('li');
        li.textContent = prod.nombre + ' - $' + prod.precio;
        // Botón para devolver producto
        const btn = document.createElement('button');
        btn.textContent = 'Devolver';
        btn.onclick = () => {
            carrito.splice(idx, 1);
            mostrarCarrito();
        };
        li.appendChild(btn);
        lista.appendChild(li);
    });
    const totalSpan = document.getElementById('carrito-total');
    if (totalSpan) totalSpan.textContent = total;

    // WhatsApp
    const numeroWhatsApp = "5492984248439"; // Cambia por tu número real
    const linkCompra = document.getElementById('whatsapp-link');
    if (linkCompra) {
        // Usa el carrito si hay productos, si no, usa el último pedido
        const productosParaEnviar = carrito.length > 0 ? carrito : (ultimoPedido || []);
        if (productosParaEnviar.length > 0) {
            let mensaje = "¡Hola! Quiero comprar:\n";
            productosParaEnviar.forEach(prod => {
                mensaje += `- ${prod.nombre} ($${prod.precio})\n`;
            });
            const totalPedido = productosParaEnviar.reduce((sum, prod) => sum + prod.precio, 0);
            mensaje += `Total: $${totalPedido}`;
            const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
            linkCompra.href = url;
            linkCompra.style.display = "inline-block";
        } else {
            linkCompra.style.display = "none";
        }
    }
}

function vaciarCarrito() {
    carrito = [];
    mostrarCarrito();
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
    }
    // Guarda el detalle antes de vaciar
    ultimoPedido = [...carrito];
    alert('¡Gracias por tu compra! Ahora puedes avisar por WhatsApp.');
    vaciarCarrito();
    document.getElementById('carrito-modal').style.display = 'flex'; // Mantén abierto el modal
    mostrarCarrito();
}

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar y cerrar carrito
    document.getElementById('abrir-carrito').onclick = function(e) {
        e.preventDefault();
        document.getElementById('carrito-modal').style.display = 'flex';
        mostrarCarrito();
    };
    document.getElementById('cerrar-carrito').onclick = function() {
        document.getElementById('carrito-modal').style.display = 'none';
    };

    // Agregar productos al carrito
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.onclick = function() {
            const nombre = this.dataset.nombre;
            const precio = Number(this.dataset.precio);
            carrito.push({ nombre, precio });
            mostrarCarrito();
        };
    });
});