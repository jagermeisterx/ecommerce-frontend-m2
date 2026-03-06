//Datos de prueba
const productos = [
    { id: 1, titulo: "One Piece Vol. 100", precio: 6500, descripcion:"Un chico de goma que navega por el mundo para buscar un tesoro que lleva 30 años perdido, mientras derroca dictaduras y recluta a gente más rara que él (incluyendo un reno y un esqueleto) para que lo ayuden a ser el Rey de los Piratas.", img: "https://images.cdn2.buscalibre.com/fit-in/360x360/74/6e/746ef577d082b96e830418dc6de775cd.jpg", stock: 10 },
    { id: 2, titulo: "Detective Conan", descripcion: "Es la historia de un niño que ha estado en el mismo curso escolar durante tres décadas, resolviendo miles de asesinatos mientras el mundo entero ignora que, estadísticamente, la ciudad de Tokio debería estar deshabitada debido a su presencia.", precio: 5000, img: "https://mokuton.com/covers//Detective%20Conan/001.jpg", stock: 5 },
    { id: 3, titulo: "Berserk Vol. 1", precio: 6000, descripcion : "Un simulador de trauma y sufrimiento infinito donde el protagonista sobrevive a base de puro rencor y una espada que parece una viga de construcción." , img: "http://mokuton.com/covers//Berserk/Berserk - 01.jpg", stock: 2 },
    { id: 4, titulo: "Dragon Ball vol. 2", precio: 6000, descripcion:"Un niño con cola que vive en el monte sale de su casa porque una adolescente lo convence de buscar unas bolas mágicas. El niño salvaje le pega a todo lo que se mueve, gana torneos de artes marciales y humilla a ejércitos enteros, todo mientras su maestro (un viejo verde en una tortuga) intenta conseguir revistas prohibidas." , img: "http://mokuton.com/covers//Dragonball/DB_02.jpg", stock: 3 }
];


//Estado del Carrito 
let carrito = JSON.parse(localStorage.getItem('carrito_manga')) || [];

// 3. Selectores
const contenedor = document.getElementById('contenedor-productos');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total-carrito');
const contadorNav = document.getElementById('cart-count');

//Funciones
function renderizarProductos() {
    contenedor.innerHTML = "";    
    productos.forEach(p => {
        // Creacion de la estructura de la card
        // Importante: El id que pasamos en verDetalle(${p.id}) debe ser el del objeto actual
        contenedor.innerHTML += `
            <article class="col">
                <div class="card h-100 shadow-sm">
                    <img src="${p.img}" class="card-img-top" alt="${p.titulo}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${p.titulo}</h5>
                        <p class="fw-bold fs-5 text-primary">$${p.precio.toLocaleString('es-CL')}</p>
                        
                        <div class="mt-auto d-grid gap-2">
                            <button onclick="verDetalle(${p.id})" 
                                    class="btn btn-outline-secondary btn-sm" 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#modalDetalle">
                                Ver detalle
                            </button>
                            
                            <button onclick="agregarAlCarro(${p.id})" 
                                    class="btn btn-primary">
                                Agregar al carro
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        `;
    });
}

// Función que busca el producto específico y llena el modal con el id
function verDetalle(id) {
    const productoSeleccionado = productos.find(item => item.id === id);
    
    if (productoSeleccionado) {
        document.getElementById('detalleTitulo').innerText = productoSeleccionado.titulo;
        document.getElementById('detalleNombre').innerText = productoSeleccionado.titulo;
        document.getElementById('detalleImg').src = productoSeleccionado.img;
        document.getElementById('detalleDescripcion').innerText = productoSeleccionado.descripcion;
        document.getElementById('detallePrecio').innerText = `$${productoSeleccionado.precio.toLocaleString('es-CL')}`;
        
        // se actualiza el botón de agregar para que agregue el producto correcto
        const btnModal = document.getElementById('btnAgregarDesdeDetalle');
        btnModal.onclick = function() {
            agregarAlCarro(productoSeleccionado.id);
            // Cerramos el modal usando la API de Bootstrap
            const modalElement = document.getElementById('modalDetalle');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            modalInstance.hide();
        };
    }
}

// Agregar al carrito
function agregarAlCarro(id) {
    const productoEncontrado = productos.find(p => p.id === id);
    carrito.push(productoEncontrado);
    actualizarTodo();
}

// Actualizar LocalStorage, Contador y Lista del Modal
function actualizarTodo() {
    //guardar estado actual en LocalStorage
    localStorage.setItem('carrito_manga', JSON.stringify(carrito));
    
    //actualizar el número rojo del carrito
    contadorNav.innerText = carrito.length;

    // Limpiar la lista antes de volver a pintarla
    listaCarrito.innerHTML = "";
    let total = 0;

    // Recorrer el carrito para dibujar los productos en el modal (carrito de compra)
    carrito.forEach((item, index) => {
        total += item.precio;        
        listaCarrito.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <div class="me-auto">
                    <span class="fw-bold">${item.titulo}</span>
                    <br>
                    <small class="text-muted">$${item.precio.toLocaleString('es-CL')}</small>
                </div>
                <button onclick="eliminarDelCarro(${index})" class="btn btn-sm btn-outline-danger border-0">
                    🗑️
                </button>
            </li>
        `;
    });

    //Si el carrito está vacío, mostrar un mensaje
    if (carrito.length === 0) {
        listaCarrito.innerHTML = `<li class="list-group-item text-center text-muted">El carrito está vacío</li>`;
    }

    //Actualizar el precio total
    totalCarrito.innerText = `$${total.toLocaleString('es-CL')}`;
}

//eliminar producto por su posición en el array
function eliminarDelCarro(index) {
    carrito.splice(index, 1);
    actualizarTodo();
}

//Inicializar
renderizarProductos();
actualizarTodo();