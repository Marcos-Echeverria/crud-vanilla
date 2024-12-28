// Variables
const url = 'http://localhost:3000/api/articulos/';
const contenedor = document.querySelector('tbody');
let resultado = ''
const modalArticulos = new bootstrap.Modal(document.getElementById('modalArticulo'));
const formArticulo = document.querySelector('form');
const descripcion = document.getElementById('descripcion');
const precio = document.getElementById('precio');
const stock = document.getElementById('stock');
let opcion = ''

btnCrear.addEventListener('click', () => {
    descripcion.value = '';
    precio.value = '';
    stock.value = '';
    modalArticulos.show();
    opcion = 'crear';
});

// Procedimiento para mostrar resultados
const mostrar = (articulos) => {
    let resultado = ''; // Asegúrate de inicializar la variable resultado

    articulos.forEach(articulo => {
        resultado += `
            <tr>
                <td>${articulo.id}</td>
                <td>${articulo.descripcion}</td>
                <td>${articulo.precio}</td>
                <td>${articulo.stock}</td>
                <td class='text-center'>
                    <a class='btnEditar btn btn-primary'>Editar</a>
                    <a class='btnBorrar btn btn-danger'>Borrar</a>
                </td>
            </tr>
        `;
    });

    contenedor.innerHTML = resultado;
};



// Procedimiento mostrar 
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));
