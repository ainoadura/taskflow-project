//SELECTORES
const formulario = document.querySelector('#miFormulario');
const listaTareas = document.querySelector('#listaTareas');
const listaResumen = document.querySelector('#listaResumen');
const inputBusqueda = document.querySelector('#inputBusqueda');

//CARGA INICIAL
let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];

//FUNCIÓN DE GUARDADO
function guardarEnDisco() {
    localStorage.setItem('misTareas', JSON.stringify(tareas));
}

//FUNCIÓN PARA DIBUJAR TAREAS
function renderizarTarea(tarea) {
    const nuevaLi = document.createElement('li');
    nuevaLi.className = 'tarea-item';
    
    nuevaLi.innerHTML = `
        <div class="tarea-info">
            <label class="tarea-titulo">${tarea.titulo}</label>
            <span class="tarea-categoria">${tarea.categoria}</span>
        </div>
        <div class="tarea-acciones">
            <span class="badge badge-${tarea.prioridad.toLowerCase()}">${tarea.prioridad}</span>
            <button class="btn-progreso">PROGRESO</button>
            <button class="btn-finalizado">FINALIZADO</button>
            <button class="btn-eliminar">ELIMINAR</button>
        </div>
    `;

    // UBICACIÓN INICIAL AL CARGAR
    if (tarea.estado === 'progreso' || tarea.estado === 'finalizado') {
        listaResumen.appendChild(nuevaLi);
        aplicarEstilosAside(nuevaLi, tarea.estado);
    } else {
        listaTareas.appendChild(nuevaLi);
    }

    // EVENTOS DE CLIC (MOVIMIENTO MANUAL)
    nuevaLi.querySelector('.btn-progreso').addEventListener('click', () => {
        tarea.estado = 'progreso';
        guardarEnDisco();
        listaResumen.appendChild(nuevaLi);
        aplicarEstilosAside(nuevaLi, 'progreso');
    });

    // Cambiado selector a .btn-finalizado
    nuevaLi.querySelector('.btn-finalizado').addEventListener('click', () => {
        tarea.estado = 'finalizado';
        guardarEnDisco();
        listaResumen.appendChild(nuevaLi);
        aplicarEstilosAside(nuevaLi, 'finalizado');
    });

    nuevaLi.querySelector('.btn-eliminar').addEventListener('click', () => {
        tareas = tareas.filter(t => t.id !== tarea.id);
        guardarEnDisco();
        nuevaLi.remove();
    });
}

//ESTILOS ASIDE
function aplicarEstilosAside(elemento, estado) {
    elemento.style.borderLeft = (estado === 'progreso') ? "5px solid #f1c40f" : "5px solid #2ecc71";
    elemento.querySelector('.btn-progreso').style.display = 'none';
    elemento.querySelector('.btn-finalizado').style.display = 'none';
}

//EVENTO SUBMIT
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const tituloInput = document.querySelector('#inputTarea');
    const categoriaInput = document.querySelector('#inputCategoria');
    const prioridadInput = document.querySelector('#prioridadTarea');

    if (!tituloInput.value.trim()) return;

    const nuevaTarea = {
        id: Date.now(),
        titulo: tituloInput.value.trim(),
        categoria: categoriaInput.value.trim() || "General",
        prioridad: prioridadInput.value,
        estado: 'pendiente'
    };

    tareas.push(nuevaTarea);
    guardarEnDisco();
    renderizarTarea(nuevaTarea);
    formulario.reset();
});

//FILTRO DE BÚSQUEDA (IMPLEMENTADO)
inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.toLowerCase();
    const items = document.querySelectorAll('.tarea-item');

    items.forEach(li => {
        const titulo = li.querySelector('.tarea-titulo').textContent.toLowerCase();
        // Si el texto de búsqueda está en el título, mostramos; si no, ocultamos
        li.style.display = titulo.includes(texto) ? 'flex' : 'none';
    });
});

//CARGAR TAREAS AL INICIAR
tareas.forEach(t => renderizarTarea(t));

