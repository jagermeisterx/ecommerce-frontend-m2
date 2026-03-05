// 1. Datos de los productos (Simulación)
const mangas = [
    { id: 1, titulo: "One Piece Vol. 100", precio: 12.50, img: "https://via.placeholder.com/300x400?text=One+Piece", stock: 10 },
    { id: 2, titulo: "Chainsaw Man Vol. 1", precio: 10.00, img: "https://via.placeholder.com/300x400?text=Chainsaw+Man", stock: 5 },
    { id: 3, titulo: "Berserk Deluxe Edition", precio: 45.00, img: "https://via.placeholder.com/300x400?text=Berserk", stock: 2 }
];

// 2. Estado del carrito
let carrito = JSON.parse(localStorage.getItem('cart')) || [];

// 3. Referencias al DOM
const grid = document.getElementById('product-grid');
const cartBadge = document.getElementById('cart-count');

// 4. Funciones
const renderProducts = () => {
    grid.innerHTML = '';
    mangas.forEach(manga => {
        const article = document.createElement('article');
        article.classList.add('col');
        article.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${manga.img}" class="card-img-top" alt="${manga.titulo}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${manga.titulo}</h5>
                    <p class="card-text text-muted">Precio: $${manga.precio.toFixed(2)}</p>
                    <div class="mt-auto">
                        <button class="btn btn-primary w-100 mb-2" onclick="addToCart(${manga.id})">Agregar</button>
                        <a href="#" class="btn btn-outline-secondary btn-sm w-100">Ver detalle</a>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(article);
    });
};

const addToCart = (id) => {
    const item = mangas.find(m => m.id === id);
    if (item) {
        carrito.push(item);
        updateCartUI();
        // Guardar en localStorage para persistencia básica
        localStorage.setItem('cart', JSON.stringify(carrito));
    }
};

const updateCartUI = () => {
    cartBadge.innerText = carrito.length;
};

// 5. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});