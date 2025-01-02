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

const Borrar = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
};
// Procedimiento Borrar
Borrar(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML

    alertify.confirm("¿Seguro que desea eliminar el producto?",
        function () {
            fetch(url + id, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(() => location.reload())
        },
        function () {
            alertify.error('Cancel')
        });
})

// Procedimineto Editar
// let idForm = 0;

// Editar(document, 'click', '.btnEditar', e = {
//     const fila = e.target.parentNode.parentNode
//     const id = fila.firstElementChild.innerHTML
// })

// Procedimiento mostrar 
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));

