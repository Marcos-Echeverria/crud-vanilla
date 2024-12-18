// Variables
const url = 'api';
const contenedor = document.querySelector('tbody');
let resultado = ''
const modalArticulos = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
let opcion = ''

btnCrear.addEventListener('click', () => {
    modalArticulos.show();
});

