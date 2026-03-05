const formulario = document.querySelector('#miFormulario');
const listaTareas = document.querySelector('#listaTareas');
const listaResumen = document.querySelector('#listaResumen');
const inputBusqueda = document.querySelector('#inputBusqueda');

// Cargamos de localStorage o empezamos vacío
let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];

// FUNCIÓN DE RENDERIZADO
function renderizarTarea(tarea) {
    const nuevaLi = document.createElement('li');
    nuevaLi.className = 'tarea-item';
    nuevaLi.dataset.id = tarea.id; // Guardamos el ID para identificarla

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

    // Lógica para decidir dónde colocarla al cargar/mover
    if (tarea.estado === 'progreso' || tarea.estado === 'finalizado') {
        listaResumen.appendChild(nuevaLi);
        aplicarEstilosAside(nuevaLi, tarea.estado);
    } else {
        listaTareas.appendChild(nuevaLi);
    }

    // EVENTOS DE BOTONES
    nuevaLi.querySelector('.btn-progreso').addEventListener('click', () => {
        tarea.estado = 'progreso';
        actualizarTodo(nuevaLi, 'progreso');
    });

    nuevaLi.querySelector('.btn-finalizado').addEventListener('click', () => {
        tarea.estado = 'finalizado';
        actualizarTodo(nuevaLi, 'finalizado');
    });

    nuevaLi.querySelector('.btn-eliminar').addEventListener('click', () => {
        tareas = tareas.filter(t => t.id !== tarea.id);
        guardarEnDisco();
        nuevaLi.remove();
    });
}

// 3. FUNCIONES AUXILIARES (Para evitar errores de duplicidad)
function actualizarTodo(elemento, nuevoEstado) {
    listaResumen.appendChild(elemento); // Mueve el nodo al aside
    aplicarEstilosAside(elemento, nuevoEstado);
    guardarEnDisco();
}

function aplicarEstilosAside(elemento, estado) {
    elemento.style.transition = "none";
    elemento.style.borderLeft = (estado === 'progreso') ? "5px solid #f1c40f" : "5px solid #2ecc71";
    // Ocultar botones
    elemento.querySelector('.btn-progreso').style.display = 'none';
    elemento.querySelector('.btn-finalizado').style.display = 'none';
    elemento.querySelector('.btn-eliminar').style.display = 'inline-block'; // Dejar eliminar si quieres
}

function guardarEnDisco() {
    localStorage.setItem('misTareas', JSON.stringify(tareas));
}

// 4. EVENTOS GLOBALES
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const titulo = document.querySelector('#inputTarea').value.trim();
    if (!titulo) return;

    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        categoria: document.querySelector('#inputCategoria').value.trim() || "General",
        prioridad: document.querySelector('#prioridadTarea').value,
        estado: 'pendiente'
    };

    tareas.push(nuevaTarea);
    guardarEnDisco();
    renderizarTarea(nuevaTarea);
    formulario.reset();
});

// 5. MOTOR DE CARGA (¡Debe ir al final!)
tareas.forEach(t => renderizarTarea(t));
