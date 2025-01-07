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
    let resultado = '';

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

const Editar = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
};
const Borrar = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if (e.target.closest(selector)) {
            handler(e)
        }
    })
};


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

let idForm = 0;

Editar(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const descripcionForm = fila.children[1].innerHTML
    const precioForm = fila.children[2].innerHTML
    const stockForm = fila.children[3].innerHTML

    descripcion.value = descripcionForm;
    precio.value = precioForm;
    stock.value = stockForm;
    opcion = 'editar'
    modalArticulos.show()
})


formArticulo.addEventListener('submit', (e) => {
    e.preventDefault()
    if (opcion == 'crear') {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value
            })
        })
            .then(response => response.json())
            .then(data => {
                const nuevoArticulo = []
                nuevoArticulo.push(data)
                mostrar(nuevoArticulo)
            })

    }
    if (opcion == 'editar') {
        fetch(url + idForm, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                descripcion: descripcion.value,
                precio: precio.value,
                stock: stock.value
            })
        })
            .then(response => response.json())
            .then(response => location.reload())
    }
    modalArticulos.hide()
})

fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error));

