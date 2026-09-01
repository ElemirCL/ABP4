class Tarea {//clase tarea que define las propiedades que tendrá cada tarea
    constructor(id, descripcion, fechaCreacion) {
        this.id = id;
        this.descripcion = descripcion;
        this.estadoTarea = false;
        this.fechaCreacion = fechaCreacion;
    }

    cambiarEstado() {
        this.estadoTarea = !this.estadoTarea;
        console.log(`Se cambia estado de tarea a ${this.estadoTarea ? 'completada' : 'pendiente'}`)
    }
}

class GestorTareas {//clase que modifica gestiona las tareas 
    constructor() {
        this.totalTareas = []
    }
// 
    agregarTarea(tarea) {
        this.totalTareas.push(tarea)
    }

    editarTarea(id, nuevaDescripcion) {
        const buscarTarea = this.totalTareas.find(tarea => tarea.id === id)
        if (buscarTarea) {
            buscarTarea.descripcion = nuevaDescripcion
            console.log(`Se actualiza tarea con id ${id}, nueva descripción: ${buscarTarea.descripcion}`)
        } else {
            console.log(`Error: No se encuentra tarea con id ${id}`)
        }
    }
    mostrarTareas() {
        return this.totalTareas
    }
    eliminarTarea(idABorrar) {
        this.totalTareas = this.totalTareas.filter(tarea => tarea.id !== idABorrar);
    }
}


const miGestor = new GestorTareas();
let contadorId = 1;


const inputTarea = document.getElementById('input-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const contenedorTareas = document.getElementById('contenedor-tareas');

function actualizarInterfaz() {//funcion para generar codigo html al crear una nueva tarea
    contenedorTareas.innerHTML = '';
    const tareas = miGestor.mostrarTareas();

    tareas.forEach(tarea => {
        const claseTachado = tarea.estadoTarea ? 'text-decoration-line-through text-muted' : '';
        const iconoCheck = tarea.estadoTarea ? 'bi-check-circle-fill text-success' : 'bi-circle';

        contenedorTareas.innerHTML += `
            <div class="card mb-2 shadow-sm spanTarea">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div class="d-flex align-items-center gap-3">
                        <i class="bi ${iconoCheck} fs-4" style="cursor: pointer;" onclick="cambiarEstadoDesdeUI(${tarea.id})"></i>
                        <span class="${claseTachado}">${tarea.descripcion}</span>
                    </div>
                    <div>
                        <button class="btn btn-sm btn-warning me-1" onclick="editarTareaDesdeUI(${tarea.id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="eliminarTareaDesdeUI(${tarea.id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>

                </div>
            </div>
        `;
    });
}

function cambiarEstadoDesdeUI(id) {//modificación de estado de tarea
    const tareaEncontrada = miGestor.totalTareas.find(tarea => tarea.id === id);

    if (tareaEncontrada) {
        tareaEncontrada.cambiarEstado();
        actualizarInterfaz();
    }
}

function editarTareaDesdeUI(id) {//Editar tarea confirmando que se haya ingresado un texto

    const nuevaDescripcion = prompt("Escribe la nueva descripción de la tarea:");

    if (nuevaDescripcion !== null && nuevaDescripcion.trim() !== "") {


        miGestor.editarTarea(id, nuevaDescripcion.trim());
        actualizarInterfaz();
    } else if (nuevaDescripcion !== null) {
        alert("La descripción no puede estar vacía.");
    }
}


btnAgregar.addEventListener('click', () => {//escucha de boton para agregar nueta tarea y actualizar la interfaz
    const texto = inputTarea.value.trim();
    if (texto !== '') { //validación antes de agregar una tarea
        const fechaActual = new Date().toLocaleDateString();
        const nuevaTarea = new Tarea(contadorId, texto, fechaActual);
        miGestor.agregarTarea(nuevaTarea);
        contadorId++;
        inputTarea.value = '';
        actualizarInterfaz();
    } else {
        alert("Por favor, escribe una tarea válida.");
    }
});


// se utilizan los metodos de la instancia miGestor para eliminar tarea
function eliminarTareaDesdeUI(id) {
    miGestor.eliminarTarea(id);
    actualizarInterfaz();
}


// const t1 = new Tarea(1, 'tarea1', new Date());
// const t2 = new Tarea(2, 'nueva tarea', 'hoy');
// const t3 = new Tarea(3, 'antigua tarea', 'ayer');

// miGestor.agregarTarea(t1);
// miGestor.agregarTarea(t2);
// miGestor.agregarTarea(t3);
// console.log(miGestor.mostrarTarea());
// miGestor.eliminarTarea(2);
// console.log(miGestor.mostrarTarea());

// miGestor.editarTarea(3, 'Cambio de descripción de tarea')
// console.log(miGestor.mostrarTarea());
