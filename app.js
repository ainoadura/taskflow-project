// 1. Seleccionar los elementos del DOM
const formulario = document.querySelector('#miFormulario'); // Cambia el ID según tu HTML
const listaTareas = document.querySelector ('#listaTareas');
const inputTarea = document.querySelector('#inputTarea');
const inputCategoria = document.querySelector('#inputCategoria');
const selectPrioridad = document.querySelector('#prioridadTarea'); // Seleccionamos prioridad

// Vincular el evento 'submit'. Evento de envío
formulario.addEventListener('submit', function(e) {
    // Prevenir que la página se recargue
    e.preventDefault();

    const textoTarea = inputTarea.value.trim();
    const categoria = inputCategoria.value.trim();
    const prioridad = selectPrioridad.value; // Capturamos el valor (Baja, Media o Alta)

    if (textoTarea !== "") {
        crearTarea(textoTarea, prioridad, categoria); //Enviamos ambos datos
        formulario.reset();
    }

    //Creamos el objeto de la tarea y lo guardamos
    const nuevaTarea = {
        id: Date.now(),
        titulo: document.querySelector('#inputTarea').value.trim(),
        categoria: document.querySelector('#inputCategoria').value || "General",
        prioridad: document.querySelector('#prioridadTarea').value.trim(),
        
    };

    tareas.push(nuevaTarea);
    renderizarTareas(); // Llamamos a la función para dibujar
    formulario.reset();
});

//Función para el main
function crearTarea(titulo, prioridad, categoria) {
    const nuevaLi = document.createElement('li');
    nuevaLi.className = 'tarea-item';

     nuevaLi.innerHTML = `
        <div class="tarea-check">
            <div class="tarea-info">
                <label class="tarea-titulo">${titulo}</label>
                <span class="tarea-categoria">${categoria}</span>
            </div>
        </div>

        <div class="tarea-acciones">
            <span class="badge badge-${prioridad.toLowerCase()}">${prioridad}</span>
            <!-- BOTÓN DE ELIMINACIÓN -->
            <button class="btn-eliminar" aria-label="Eliminar tarea">ELIMINAR</button>
        </div>
    `;

    // Seleccionamos el botón dentro de la nueva Li y le añadimos el evento
    const botonEliminar = nuevaLi.querySelector('.btn-eliminar');
    botonEliminar.addEventListener('click', () => {
        nuevaLi.remove(); // Borra el nodo completo del DOM
    });

    listaTareas.appendChild(nuevaLi);
};
