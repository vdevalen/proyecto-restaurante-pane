const carrito = document.getElementById("carrito");
const platillos = document.getElementById("lista-platillos");
const listaPlatillos = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.getElementById("vaciar-carrito");
let sumaCarrito = document.getElementById("precioTotal");
let sumaCarrito2 = document.getElementById("precioTotal2");
sumaCarrito.innerHTML = parseInt(0);
sumaCarrito.placeholder = parseInt(0);
sumaCarrito2.innerHTML = parseInt(0);
console.log(sumaCarrito.textContent);
console.log(sumaCarrito2.textContent);

cargarEventListeners();

function cargarEventListeners() {
platillos.addEventListener("click", comprarPlatillo);
carrito.addEventListener("click", eliminarPlatillo);
vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
document.addEventListener("DOMContentLoaded", leerLocalStorage);
}

function comprarPlatillo(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const platillo = e.target.parentElement.parentElement;
        console.log(platillo)

        leerDatosPlatillo(platillo);
    }
}

function leerDatosPlatillo(platillo){
    const infoPlatillo = {
        imagen: platillo.querySelector('img').src,
        titulo: platillo.querySelector('h4').textContent,
        precio: platillo.querySelector('.precioSolo').textContent,
        id: platillo.querySelector('a').getAttribute('data-id'),
    }

    insertarCarrito(infoPlatillo);
}

function insertarCarrito(platillo) {
    const row = document.createElement('tr');
    row.innerHTML = `  
    <td>
        <img src="${platillo.imagen}" width=100> 
    </td> 
    <td>${platillo.titulo}</td>
    <td><span>$<span class="platilloPrecio">${platillo.precio}</span></span> </td>
    <td>
        <a href="#" class="borrar-platillo" precio=${platillo.precio} data-id="${platillo.id}">X</a>
    </td>
    `;
    sumaCarrito.innerHTML = parseInt(sumaCarrito.textContent)+parseInt(platillo.precio);
    sumaCarrito.placeholder = parseInt(sumaCarrito.textContent);
    sumaCarrito2.innerHTML = parseInt(sumaCarrito2.textContent)+parseInt(platillo.precio);

    listaPlatillos.appendChild(row);
    guardarPlatilloLocalStorage(platillo);
}

function eliminarPlatillo(e) {
    e.preventDefault();

    let platillo,
        platilloId,
        precio;
    
    if(e.target.classList.contains('borrar-platillo')) {

        platillo = e.target.parentElement.parentElement;
        platilloId = platillo.querySelector('a').getAttribute('data-id');
        precio=platilloId = platillo.querySelector('a').getAttribute('precio');
        sumaCarrito.innerHTML = parseInt(sumaCarrito.textContent)-parseInt(precio);
        sumaCarrito.placeholder = parseInt(sumaCarrito.textContent);
        sumaCarrito2.innerHTML = parseInt(sumaCarrito2.textContent)-parseInt(precio);

        e.target.parentElement.parentElement.remove();
    }
    eliminarPlatilloLocalStorage(platilloId)
}


function vaciarCarrito(){
    while(listaPlatillos.firstChild){
        listaPlatillos.removeChild(listaPlatillos.firstChild);
    }
    vaciarLocalStorage();
    sumaCarrito.innerHTML=(parseInt(0))
    sumaCarrito.placeholder=0;
    sumaCarrito2.innerHTML=(parseInt(0))

    return false;
}

function guardarPlatilloLocalStorage(platillo) {
    let platillos;

    platillos = obtenerPlatillosLocalStorage();
    platillos.push(platillo);

    localStorage.setItem('platillos', JSON.stringify(platillos));
}

function obtenerPlatillosLocalStorage() {
    let platillosLS;

    if(localStorage.getItem('platillos') === null) {
        platillosLS = [];
    }else {
        platillosLS = JSON.parse(localStorage.getItem('platillos'));
    }
    return platillosLS;
}

function leerLocalStorage() {
    let platillosLS;

    platillosLS = obtenerPlatillosLocalStorage();

    platillosLS.forEach(function(platillo){
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${platillo.imagen}" width=100>
            </td>
            <td>${platillo.titulo}</td>
            <td>${platillo.precio}</td>
            <td>
                <a href="#" class="borrar-platillo" data-id="${platillo.id}">X</a>
            </td>
        `;
        listaPlatillos.appendChild(row);
    });
}

function eliminarPlatilloLocalStorage(platillo) {
    let platillosLS;
    platillosLS = obtenerPlatillosLocalStorage();


    platillosLS.forEach(function(platilloLS, index){
        if(platilloLS.id === platillo) {
            platillosLS.splice(index, 1);
        }
    });

    // platilloPrecio=platillo.querySelector('.precioSolo').textContent;
    //     console.log(platilloPrecio);

    localStorage.setItem('platillos', JSON.stringify(platillosLS));
}

function vaciarLocalStorage() {
    localStorage.clear();
}



const open = document.getElementById('open');
const modal_container = document.getElementById('modal_container');
const close = document.getElementById('close');

open.addEventListener('click', () => {
  modal_container.classList.add('show');  
});

close.addEventListener('click', () => {
  modal_container.classList.remove('show');
});
