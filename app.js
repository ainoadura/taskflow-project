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

//UTILIDADES DE ESTADO
/**
 * Indica si un estado de tarea es válido dentro del dominio de la aplicación.
 * @param {string} estado - Estado a comprobar.
 * @returns {boolean} `true` si el estado es uno de los definidos en ESTADOS_TAREA.
 */
function esEstadoValido(estado) {
    return Object.values(ESTADOS_TAREA).includes(estado);
}

/**
 * Indica si una tarea debe visualizarse en el listado de resumen (aside).
 * @param {string} estado - Estado actual de la tarea.
 * @returns {boolean} `true` si el estado es PROGRESO o FINALIZADO.
 */
function esEstadoDeResumen(estado) {
    return estado === ESTADOS_TAREA.PROGRESO || estado === ESTADOS_TAREA.FINALIZADO;
}

//CARGA INICIAL
let tareas = JSON.parse(localStorage.getItem(STORAGE_KEYS.TAREAS)) || [];

//FUNCIÓN DE GUARDADO
/**
 * Persiste el array global de tareas en localStorage.
 */
function guardarEnDisco() {
    localStorage.setItem(STORAGE_KEYS.TAREAS, JSON.stringify(tareas));
}

//UTILIDADES DE VALIDACIÓN DE FORMULARIO
/**
 * Elimina las marcas visuales de error en los campos del formulario de tareas.
 */
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

//CREACIÓN / RENDERIZADO DE LA TAREA
/**
 * Crea el elemento de lista (`<li>`) que representa una tarea en la interfaz.
 * @param {{titulo: string, categoria: string, prioridad: string, estado: string}} tarea - Datos de la tarea.
 * @returns {HTMLLIElement} Elemento de lista listo para insertarse en el DOM.
 */
function crearElementoTarea(tarea) {
    const nuevaLi = document.createElement('li');
    nuevaLi.className = 'flex justify-between items-center p-4 bg-white dark:bg-[#1e293b] rounded-xl mb-3 shadow-sm border border-transparent dark:border-slate-700 transition-all hover:-translate-y-0.5 hover:shadow-md';
    
    nuevaLi.innerHTML = `
    <div class="tarea-info flex flex-col">
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

function manejarCambioEstado(tarea, elemento, nuevoEstado) {
    if (!esEstadoValido(nuevoEstado)) return;

    tarea.estado = nuevoEstado;
    guardarEnDisco();
    listaResumen.appendChild(elemento);
    aplicarEstilosAside(elemento, nuevoEstado);
}

function manejarEliminacionTarea(tarea, elemento) {
    tareas = tareas.filter(t => t.id !== tarea.id);
    guardarEnDisco();
    elemento.remove();
}

function configurarEventosTarea(tarea, elemento) {
    const btnProgreso = elemento.querySelector('.btn-progreso');
    const btnFinalizado = elemento.querySelector('.btn-finalizado');
    const btnEliminar = elemento.querySelector('.btn-eliminar');

    if (btnProgreso) {
        btnProgreso.addEventListener('click', () => {
            manejarCambioEstado(tarea, elemento, ESTADOS_TAREA.PROGRESO);
        });
    }

    if (btnFinalizado) {
        btnFinalizado.addEventListener('click', () => {
            manejarCambioEstado(tarea, elemento, ESTADOS_TAREA.FINALIZADO);
        });
    }

    if (btnEliminar) {
        btnEliminar.addEventListener('click', () => {
            manejarEliminacionTarea(tarea, elemento);
        });
    }
}

//FUNCIÓN PARA DIBUJAR TAREAS
/**
 * Inserta una tarea en el DOM y asocia todos sus manejadores de eventos.
 * @param {{titulo: string, categoria: string, prioridad: string, estado: string}} tarea - Tarea a renderizar.
 */
function renderizarTarea(tarea) {
    const elemento = crearElementoTarea(tarea);
    ubicarTareaInicial(tarea, elemento);
    configurarEventosTarea(tarea, elemento);
}

//ESTILOS ASIDE
function aplicarEstilosAside(elemento, estado) {
    const btnProgreso = elemento.querySelector('.btn-progreso');
    const btnFinalizado = elemento.querySelector('.btn-finalizado');
    
    if (btnProgreso) {
        btnProgreso.classList.add('hidden');
    }
    if (btnFinalizado) {
        btnFinalizado.classList.add('hidden');
    }

    elemento.style.borderLeftWidth = "4px"; 
    elemento.style.borderLeftColor = (estado === ESTADOS_TAREA.PROGRESO) ? "#f1c40f" : "#2ecc71";
    
    const titulo = elemento.querySelector('.tarea-titulo');
    if (titulo) {
        titulo.classList.remove('line-through', 'opacity-50');
    }
    elemento.classList.remove('opacity-80');
}


//CREACIÓN DESDE FORMULARIO
/**
 * Lee los campos del formulario y, si pasan las validaciones,
 * construye un objeto de tarea listo para añadirse al estado.
 * @returns {{id:number, titulo:string, categoria:string, prioridad:string, estado:string} | null}
 *          Objeto tarea válido o `null` si alguna validación falla.
 */
function crearTareaDesdeFormulario() {
    const titulo = (inputTitulo?.value || '').trim();
    const categoria = (inputCategoria?.value || '').trim() || "General";
    const prioridad = selectPrioridad ? selectPrioridad.value : '';

    // Validaciones adicionales
    if (!titulo) {
        marcarCampoError(inputTitulo);
        alert('Por favor, escribe un título para la tarea.');
        return null;
    }

    if (titulo.length < 3) {
        marcarCampoError(inputTitulo);
        alert('El título debe tener al menos 3 caracteres.');
        return null;
    }

    if (titulo.length > 100) {
        marcarCampoError(inputTitulo);
        alert('El título es demasiado largo (máx. 100 caracteres).');
        return null;
    }

    if (!prioridad) {
        marcarCampoError(selectPrioridad);
        alert('Por favor, selecciona una prioridad para la tarea.');
        return null;
    }

    if (categoria.length > 200) {
        marcarCampoError(inputCategoria);
        alert('La descripción es demasiado larga (máx. 200 caracteres).');
        return null;
    }

    return {
        id: Date.now(),
        titulo,
        categoria,
        prioridad,
        estado: ESTADOS_TAREA.PENDIENTE
    };
}

//EVENTO SUBMIT
/**
 * Manejador del envío del formulario de tareas.
 * Valida la entrada, crea la tarea y actualiza estado y vista.
 * @param {SubmitEvent} e - Evento de envío del formulario.
 */
function manejarSubmitFormulario(e) {
    e.preventDefault();

    limpiarErroresFormulario();

    const nuevaTarea = crearTareaDesdeFormulario();
    if (!nuevaTarea) return;

    tareas.push(nuevaTarea);
    guardarEnDisco();
    renderizarTarea(nuevaTarea);

    formulario.reset();
}

if (formulario) {
    formulario.addEventListener('submit', manejarSubmitFormulario);
}

//FILTRO DE BÚSQUEDA (IMPLEMENTADO)
/**
 * Aplica un filtro de texto sobre las tareas visibles según su título.
 * @param {string} texto - Fragmento de texto a buscar en los títulos de tarea.
 */
function filtrarTareasPorTitulo(texto) {
    const termino = texto.toLowerCase();
    const items = listaTareas.querySelectorAll('li');

    items.forEach(li => {
        const tituloEl = li.querySelector('.tarea-titulo');
        const titulo = tituloEl ? tituloEl.textContent.toLowerCase() : '';
        li.style.display = titulo.includes(termino) ? 'flex' : 'none';
    });
}

if (inputBusqueda) {
    inputBusqueda.addEventListener('input', () => {
        filtrarTareasPorTitulo(inputBusqueda.value || '');
    });
}

//CARGAR TAREAS AL INICIAR
tareas.forEach(t => renderizarTarea(t));

// --- LÓGICA DE MODO OSCURO ---
const btnDarkMode = document.getElementById('btnDarkMode');

/**
 * Aplica el tema oscuro/claro almacenado previamente en localStorage.
 */
function aplicarTemaInicial() {
    if (localStorage.getItem(STORAGE_KEYS.THEME) === 'dark') {
        document.documentElement.classList.add('dark');
    }
}

function manejarToggleModoOscuro() {
    document.documentElement.classList.toggle('dark');

    const tema = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    localStorage.setItem(STORAGE_KEYS.THEME, tema);
}

aplicarTemaInicial();

if (btnDarkMode) {
    btnDarkMode.addEventListener('click', manejarToggleModoOscuro);
}
