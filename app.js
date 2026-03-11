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
let tareas = JSON.parse(localStorage.getItem(STORAGE_KEYS.TAREAS)) || [];

// --- NUEVA FUNCIÓN: RENDERIZADO DINÁMICO (FILTRO + BÚSQUEDA + ORDENACIÓN) ---

function renderizarTodo() {
    listaTareas.innerHTML = '';
    listaResumen.innerHTML = '';

    const query = inputBusqueda.value.toLowerCase().trim();
    const PESOS = { 'Alta': 3, 'Media': 2, 'Baja': 1 };

    // 1. FILTRADO POR TEXTO (Búsqueda)
    let tareasProcesadas = tareas.filter(t => 
        t.titulo.toLowerCase().includes(query) || 
        t.categoria.toLowerCase().includes(query)
    );

    // 2. ORDENACIÓN (Prioridad)
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
        
        <button class="btn-progreso bg-[#92400e] text-white px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 hover:saturate-150 hover:shadow-inner active:scale-95">
            PROGRESO
        </button>
        <button class="btn-finalizado bg-[#12941a] text-white px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 hover:saturate-150 hover:shadow-inner active:scale-95">
            FINALIZADO
        </button>
        <button class="btn-eliminar bg-[#991b1b] text-white px-3 py-1 rounded-full text-[10px] font-bold transition-all duration-300 hover:brightness-125 hover:shadow-md active:rotate-3 active:scale-95">
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
    if (nuevoTitulo !== null && nuevoTitulo.trim().length >= 3) {
        tarea.titulo = nuevoTitulo.trim();
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

// INICIO DE LA APP
renderizarTodo();
