//SELECTORES
const formulario = document.querySelector('#miFormulario');
const listaTareas = document.querySelector('#listaTareas');
const listaResumen = document.querySelector('#listaResumen');
const inputBusqueda = document.querySelector('#inputBusqueda');
const inputTitulo = document.querySelector('#inputTarea');
const inputCategoria = document.querySelector('#inputCategoria');
const selectPrioridad = document.querySelector('#prioridadTarea');

//CONSTANTES DE ESTADO Y STORAGE
const ESTADOS_TAREA = {
    PENDIENTE: 'pendiente',
    PROGRESO: 'progreso',
    FINALIZADO: 'finalizado'
};

const STORAGE_KEYS = {
    TAREAS: 'misTareas',
    THEME: 'theme'
};

//CARGA INICIAL
let filtroActual = 'todos';
let tareas = JSON.parse(localStorage.getItem(STORAGE_KEYS.TAREAS)) || [];

// --- NUEVA FUNCIÓN: RENDERIZADO DINÁMICO (FILTRO + BÚSQUEDA + ORDENACIÓN) ---
function renderizarTodo() {
    listaTareas.innerHTML = '';
    listaResumen.innerHTML = '';

    const query = inputBusqueda.value.toLowerCase().trim();
    const PESOS = { 'Alta': 3, 'Media': 2, 'Baja': 1 };

    let tareasProcesadas = tareas.filter(t => {
        const coincideBusqueda = t.titulo.toLowerCase().includes(query) || 
                                 t.categoria.toLowerCase().includes(query);
        
        // LÓGICA DE FILTRO CORREGIDA:
        let coincideFiltro = false;
        
        if (filtroActual === 'todos') {
            coincideFiltro = true;
        } else if (filtroActual === 'pendiente') {
            // "Pendientes" ahora incluye las que están en 'pendiente' O en 'progreso'
            coincideFiltro = (t.estado === ESTADOS_TAREA.PENDIENTE || t.estado === ESTADOS_TAREA.PROGRESO);
        } else if (filtroActual === 'finalizado') {
            coincideFiltro = (t.estado === ESTADOS_TAREA.FINALIZADO);
        }

        return coincideBusqueda && coincideFiltro;
    
    });

    // 2. ORDENACIÓN (Prioridad: ALTA, MEDIA Y BAJA. En el main y en el aside)
    tareasProcesadas.sort((a, b) => (PESOS[b.prioridad] || 0) - (PESOS[a.prioridad] || 0));

    tareasProcesadas.forEach(tarea => {
        const elemento = crearElementoTarea(tarea);
        ubicarTareaInicial(tarea, elemento);
        configurarEventosTarea(tarea, elemento);
    });

}

//UTILIDADES DE ESTADO
function esEstadoValido(estado) {
    return Object.values(ESTADOS_TAREA).includes(estado);
}

function esEstadoDeResumen(estado) {
    return estado === ESTADOS_TAREA.PROGRESO || estado === ESTADOS_TAREA.FINALIZADO;
}

//FUNCIÓN DE GUARDADO
function guardarEnDisco() {
    localStorage.setItem(STORAGE_KEYS.TAREAS, JSON.stringify(tareas));
}

//UTILIDADES DE VALIDACIÓN
function limpiarErroresFormulario() {
    [inputTitulo, inputCategoria, selectPrioridad].forEach(campo => {
        if (!campo) return;
        campo.classList.remove('ring-2', 'ring-red-400', 'border-red-400');
    });
}

function marcarCampoError(campo) {
    if (!campo) return;
    campo.classList.add('ring-2', 'ring-red-400', 'border-red-400');
}

//CREACIÓN / RENDERIZADO
function crearElementoTarea(tarea) {
    const nuevaLi = document.createElement('li');
    nuevaLi.className = 'flex justify-between items-center p-4 bg-white dark:bg-[#1e293b] rounded-xl mb-3 shadow-sm border border-transparent dark:border-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md';
    
    nuevaLi.innerHTML = `
    <div class="tarea-info flex flex-col cursor-pointer" title="Doble clic para editar">
        <label class="tarea-titulo font-bold !text-black dark:!text-white">${tarea.titulo}</label>
        <span class="tarea-categoria text-sm text-slate-500 dark:text-slate-400">${tarea.categoria}</span>
    </div>
    <div class="tarea-acciones flex gap-2">
        <span class="badge-${tarea.prioridad.toLowerCase()} px-3 py-1 rounded-full text-[10px] font-bold uppercase shadow-sm">${tarea.prioridad}</span>
        
        ${tarea.estado === ESTADOS_TAREA.PENDIENTE ? `
            <button class="btn-progreso bg-[#92400e] text-white px-3 py-1 rounded-full text-[10px] font-bold transition-all hover:saturate-150">PROGRESO</button>
            <button class="btn-finalizado bg-[#12941a] text-white px-3 py-1 rounded-full text-[10px] font-bold transition-all hover:saturate-150">FINALIZADO</button>
        ` : ''}
        
        <button class="btn-eliminar bg-[#991b1b] text-white px-3 py-1 rounded-full text-[10px] font-bold transition-all hover:brightness-125">
            ELIMINAR
        </button>
    </div>
`;
    return nuevaLi;
}

function ubicarTareaInicial(tarea, elemento) {
    if (esEstadoDeResumen(tarea.estado)) {
        listaResumen.appendChild(elemento);
        aplicarEstilosAside(elemento, tarea.estado);
    } else {
        listaTareas.appendChild(elemento);
    }
}

function manejarCambioEstado(tarea, nuevoEstado) {
    if (!esEstadoValido(nuevoEstado)) return;
    tarea.estado = nuevoEstado;
    guardarEnDisco();
    renderizarTodo(); // Actualización global para mover la tarea de lista
}

function manejarEliminacionTarea(id) {
    tareas = tareas.filter(t => t.id !== id);
    guardarEnDisco();
    renderizarTodo();
}

// --- EDICIÓN DE TAREAS ---
function manejarEdicionTarea(tarea) {
    const nuevoTitulo = prompt("Editar nombre de la prenda/tarea:", tarea.titulo);
    if (nuevoTitulo === null || nuevoTitulo.trim().length < 3) {
        if (nuevoTitulo !== null) alert("El título debe tener al menos 3 caracteres.");
        return;
    }

    const nuevaDesc = prompt("Editar descripción/categoría:", tarea.categoria);
    
    // Si el usuario no cancela la descripción (null), procedemos a guardar
    if (nuevaDesc !== null) {
        tarea.titulo = nuevoTitulo;
        tarea.categoria = nuevaDesc.trim() || "General";
        
        guardarEnDisco();
        renderizarTodo();
    }
}

function configurarEventosTarea(tarea, elemento) {
    const btnProgreso = elemento.querySelector('.btn-progreso');
    const btnFinalizado = elemento.querySelector('.btn-finalizado');
    const btnEliminar = elemento.querySelector('.btn-eliminar');
    const infoTarea = elemento.querySelector('.tarea-info');

    if (btnProgreso) btnProgreso.addEventListener('click', () => manejarCambioEstado(tarea, ESTADOS_TAREA.PROGRESO));
    if (btnFinalizado) btnFinalizado.addEventListener('click', () => manejarCambioEstado(tarea, ESTADOS_TAREA.FINALIZADO));
    if (btnEliminar) btnEliminar.addEventListener('click', () => manejarEliminacionTarea(tarea.id));
    
    // Evento de Edición (Doble clic)
    if (infoTarea) infoTarea.addEventListener('dblclick', () => manejarEdicionTarea(tarea));
}

function aplicarEstilosAside(elemento, estado) {
    const btnProgreso = elemento.querySelector('.btn-progreso');
    const btnFinalizado = elemento.querySelector('.btn-finalizado');
    
    if (btnProgreso) btnProgreso.classList.add('hidden');
    if (btnFinalizado) btnFinalizado.classList.add('hidden');

    elemento.style.borderLeftWidth = "4px"; 
    elemento.style.borderLeftColor = (estado === ESTADOS_TAREA.PROGRESO) ? "#f1c40f" : "#2ecc71";
}

function crearTareaDesdeFormulario() {
    const titulo = (inputTitulo?.value || '').trim();
    const categoria = (inputCategoria?.value || '').trim() || "General";
    const prioridad = selectPrioridad ? selectPrioridad.value : '';

    if (titulo.length < 3 || !prioridad) {
        marcarCampoError(!titulo ? inputTitulo : selectPrioridad);
        alert('Datos inválidos. Revisa el título (mín. 3 caracteres) y la prioridad.');
        return null;
    }

    return { id: Date.now(), titulo, categoria, prioridad, estado: ESTADOS_TAREA.PENDIENTE };
}

//EVENTO SUBMIT
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    limpiarErroresFormulario();
    const nuevaTarea = crearTareaDesdeFormulario();
    if (nuevaTarea) {
        tareas.push(nuevaTarea);
        guardarEnDisco();
        formulario.reset();
        renderizarTodo();
    }
});

// --- BÚSQUEDA EN TIEMPO REAL ---
inputBusqueda.addEventListener('input', () => {
    renderizarTodo();
});

document.querySelectorAll('.filtro-btn').forEach(boton => {
    boton.addEventListener('click', (e) => {
        // Cambiar estado global
        filtroActual = e.target.dataset.filtro;

        // Estética: Quitar clase active de todos y ponerla en el clicado
        document.querySelectorAll('.filtro-btn').forEach(b => {
            b.classList.remove('bg-blue-500', 'text-white');
            b.classList.add('bg-slate-200', 'dark:bg-slate-700');
        });
        e.target.classList.add('bg-blue-500', 'text-white');
        e.target.classList.remove('bg-slate-200', 'dark:bg-slate-700');

        // Volver a dibujar la lista
        renderizarTodo();
    });
});

// --- LÓGICA DE MODO OSCURO ---
const btnDarkMode = document.getElementById('btnDarkMode');

if (localStorage.getItem('theme') === 'dark') {
    document.documentElement.classList.add('dark');
}

if (btnDarkMode) {
    btnDarkMode.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        
        if (document.documentElement.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// FUNCIÓN PARA FINALIZAR TODAS LAS TAREAS VISIBLES
function finalizarTodasLasTareas() {
    // 1. Filtramos las tareas que NO están finalizadas todavía
    const tareasPendientes = tareas.filter(t => t.estado !== ESTADOS_TAREA.FINALIZADO);

    if (tareasPendientes.length === 0) {
        alert("No hay tareas pendientes para finalizar.");
        return;
    }

    if (confirm(`¿Quieres marcar las ${tareasPendientes.length} tareas como FINALIZADAS?`)) {
        // 2. Cambiamos el estado de TODAS las tareas a finalizado
        tareas.forEach(t => {
            t.estado = ESTADOS_TAREA.FINALIZADO;
        });

        // 3. Guardamos y refrescamos la vista
        guardarEnDisco();
        renderizarTodo();
    }
}

// EVENTO PARA EL BOTÓN
document.querySelector('#btnFinalizarTodo')?.addEventListener('click', finalizarTodasLasTareas);

// FUNCIÓN PARA BORRAR TODAS LAS TAREAS CON ESTADO FINALIZADO
function borrarTareasFinalizadas() {
    const finalizadas = tareas.filter(t => t.estado === ESTADOS_TAREA.FINALIZADO);

    if (finalizadas.length === 0) {
        alert("No hay tareas finalizadas para borrar.");
        return;
    }

    if (confirm(`¿Estás seguro de que quieres borrar permanentemente las ${finalizadas.length} tareas finalizadas?`)) {
        // Filtramos para quedarnos solo con las que NO están finalizadas
        tareas = tareas.filter(t => t.estado !== ESTADOS_TAREA.FINALIZADO);
        
        guardarEnDisco();
        renderizarTodo();
    }
}

// EVENTO PARA EL NUEVO BOTÓN
document.querySelector('#btnBorrarFinalizadas')?.addEventListener('click', borrarTareasFinalizadas);


// INICIO DE LA APP
renderizarTodo();
