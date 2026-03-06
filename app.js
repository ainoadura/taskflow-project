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
    const btnProgreso = elemento.querySelector('.btn-progreso');
    const btnFinalizado = elemento.querySelector('.btn-finalizado');
    
    btnProgreso.classList.add('hidden');
    btnFinalizado.classList.add('hidden');

    elemento.style.borderLeftWidth = "4px"; 
    elemento.style.borderLeftColor = (estado === 'progreso') ? "#f1c40f" : "#2ecc71";
    
    const titulo = elemento.querySelector('.tarea-titulo');
    titulo.classList.remove('line-through', 'opacity-50');
    elemento.classList.remove('opacity-80');
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
    const items = listaTareas.querySelectorAll('li');

    items.forEach(li => {
        const titulo = li.querySelector('.tarea-titulo').textContent.toLowerCase();
        // Si el texto de búsqueda está en el título, mostramos; si no, ocultamos
        li.style.display = titulo.includes(texto) ? 'flex' : 'none';
    });
});

//CARGAR TAREAS AL INICIAR
tareas.forEach(t => renderizarTarea(t));

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
