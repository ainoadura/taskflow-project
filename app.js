// 1. VARIABLES Y CARGA INICIAL
const formulario = document.querySelector('#miFormulario');
const listaTareas = document.querySelector('#listaTareas');
const listaResumen = document.querySelector('#listaResumen');
const inputBusqueda = document.querySelector('#inputBusqueda');

// Cargamos las tareas del disco o empezamos con un array vacío
let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];

// 2. FUNCIÓN PARA DIBUJAR (La pieza maestra)
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

    // --- LÓGICA DE CARGA (Donde aparece al abrir la web) ---
    const listaMain = document.querySelector('#listaTareas');
    const listaAside = document.querySelector('#listaResumen');

    if (tarea.estado === 'progreso' || tarea.estado === 'finalizado') {
        // Si el estado no es "pendiente", va al Aside directamente
        listaAside.appendChild(nuevaLi);
        aplicarEstiloEstado(nuevaLi, tarea.estado);
    } else {
        // Si es nueva o "pendiente", va al Main
        listaMain.appendChild(nuevaLi);
    }

    // Botón Progreso -> Mueve al aside
    nuevaLi.querySelector('.btn-progreso').addEventListener('click', () => {
        const destino = document.getElementById('listaResumen');
        if (destino) {
            nuevaLi.style.borderLeft = "5px solid #f1c40f";
            nuevaLi.querySelector('.tarea-titulo').style.textDecoration = "line-through";
            nuevaLi.querySelector('.btn-finalizado').style.display = 'none';
            
            tarea.estado = 'progreso';
            actualizarLocalStorage();
            listaAside.appendChild(nuevaLi);
            aplicarEstiloEstado(nuevaLi, 'progreso');

            localStorage.setItem('misTareas', JSON.stringify(tareas));
            
            destino.appendChild(nuevaLi);

             // Cambiar el texto del botón que queda
            nuevaLi.querySelector('.btn-progreso').textContent = "EN CURSO...";
        }
    });

    // Botón Finalizado -> Mueve al aside y tacha
    nuevaLi.querySelector('.btn-finalizado').addEventListener('click', () => {
        const destino = document.getElementById('listaResumen');
        if (destino) {
            nuevaLi.style.borderLeft = "5px solid #2ecc71";
            nuevaLi.querySelector('.tarea-titulo').style.textDecoration = "line-through";
            nuevaLi.querySelector('.btn-progreso').style.display = 'none';
            
            tarea.estado = 'finalizado';
            actualizarLocalStorage();
            listaAside.appendChild(nuevaLi);
            aplicarEstiloEstado(nuevaLi, 'finalizado');

            localStorage.setItem('misTareas', JSON.stringify(tareas));
            
            destino.appendChild(nuevaLi);

            // Cambiar el texto del botón que queda
            nuevaLi.querySelector('.btn-finalizado').textContent = "COMPLETADA";
        }
    });

    // Botón Eliminar -> Borra y guarda cambios
    nuevaLi.querySelector('.btn-eliminar').addEventListener('click', () => {
        tareas = tareas.filter(t => t.id !== tarea.id);
        actualizarLocalStorage();

        localStorage.setItem('misTareas', JSON.stringify(tareas));

        nuevaLi.remove();
    });

    // Función auxiliar para no repetir código de estilos
    function aplicarEstiloEstado(elemento, estado) {
        elemento.style.transition = "none";
        if (estado === 'progreso') {
            elemento.style.borderLeft = "5px solid #f1c40f";
        } else if (estado === 'finalizado') {
            elemento.style.borderLeft = "5px solid #2ecc71";
        }
        // Ocultamos botones para que no se "suavice" ni se sature el aside
        elemento.querySelector('.btn-progreso').style.display = 'none';
        elemento.querySelector('.btn-finalizar').style.display = 'none';
    }
}
// Función para guardar siempre el array actual
    function actualizarLocalStorage() {
        localStorage.setItem('misTareas', JSON.stringify(tareas));

        listaTareas.appendChild(nuevaLi);
}

// EVENTO PARA AÑADIR TAREAS
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nuevaTarea = {
        id: Date.now(),
        titulo: document.querySelector('#inputTarea').value.trim(),
        categoria: document.querySelector('#inputCategoria').value.trim() || "General",
        prioridad: document.querySelector('#prioridadTarea').value,
        estado: 'pendiente'
    };

    if (nuevaTarea.titulo !== "") {
        tareas.push(nuevaTarea);
        localStorage.setItem('misTareas', JSON.stringify(tareas)); // GUARDAR
        renderizarTarea(nuevaTarea); // DIBUJAR
        formulario.reset();
    }
});

// EL BUSCADOR
inputBusqueda.addEventListener('input', () => {
    const texto = inputBusqueda.value.toLowerCase();
    document.querySelectorAll('.tarea-item').forEach(li => {
        const coincidencia = li.querySelector('.tarea-titulo').textContent.toLowerCase().includes(texto);
        li.style.display = coincidencia ? 'flex' : 'none';
    });
});

// Recorre el array guardado y dibuja cada tarea
tareas.forEach(t => renderizarTarea(t));






