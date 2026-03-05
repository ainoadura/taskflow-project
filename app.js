// 1. Declarar el array de tareas (¡Importante!)
let tareas = [];

// 2. Seleccionar elementos
const formulario = document.querySelector('#miFormulario');
const listaTareas = document.querySelector('#listaTareas');
const inputBusqueda = document.querySelector('#inputBusqueda');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();

    // Capturar valores
    const titulo = document.querySelector('#inputTarea').value.trim();
    const categoria = document.querySelector('#inputCategoria').value.trim() || "General";
    const prioridad = document.querySelector('#prioridadTarea').value;

    if (titulo === "") return; // No agregar si está vacío

    // Crear el objeto
    const nuevaTarea = {
        id: Date.now(),
        titulo: titulo,
        categoria: categoria,
        prioridad: prioridad
    };

    // Guardar y Dibujar
    tareas.push(nuevaTarea);
    renderizarTarea(nuevaTarea);
    
    formulario.reset();
});

function renderizarTarea(tarea) {
    const nuevaLi = document.createElement('li');
    nuevaLi.className = 'tarea-item';
     const listaResumen = document.querySelector('#listaResumen'); // El destino en el aside

    nuevaLi.innerHTML = `
        <div class="tarea-info">
            <label class="tarea-titulo">${tarea.titulo}</label>
            <span class="tarea-categoria">${tarea.categoria}</span>
        </div>
        <div class="tarea-acciones">
            <span class="badge badge-${tarea.prioridad.toLowerCase()}">${tarea.prioridad}</span>
            
            <!-- Botones: EN PROGRESO, FINALIZADO Y ELIMINAR -->
            <button class="btn-progreso">EN PROGRESO</button>
            <button class="btn-finalizado">FINALIZADO</button>
            <button class="btn-eliminar">ELIMINAR</button>
        </div>
    `;

    // Lógica para el botón EN PROGRESO
    nuevaLi.querySelector('.btn-progreso').addEventListener('click', () => {
        const destino = document.getElementById('listaResumen');    
        
        if(listaResumen) {
            nuevaLi.style.borderLeft = "5px solid #f1c40f"; // Color amarillo
            console.log(`Tarea "${tarea.titulo}" en progreso`);
            listaResumen.appendChild(nuevaLi);

            // Dejamos solo el de PROGRESO (o puedes ocultarlos todos)
            nuevaLi.querySelector('.btn-finalizado').style.display = 'none';
            nuevaLi.querySelector('.btn-eliminar').style.display = 'none';
                
            // Cambiar el texto del botón que queda
            nuevaLi.querySelector('.btn-progreso').textContent = "EN CURSO...";
        }
        
    });

    // Lógica para el botón FINALIZADO
    nuevaLi.querySelector('.btn-finalizado').addEventListener('click', () => {
        const destino = document.getElementById('listaResumen');
        
        if(listaResumen) {
            nuevaLi.style.borderLeft = "5px solid #2ecc71"; // Color verde
            console.log(`Tarea "${tarea.titulo}" en progreso`);
            listaResumen.appendChild(nuevaLi);

            // OCULTAMOS LOS DEMÁS
            nuevaLi.querySelector('.btn-progreso').style.display = 'none';
            nuevaLi.querySelector('.btn-eliminar').style.display = 'none';
            
            // Cambiar el texto del botón que queda
            nuevaLi.querySelector('.btn-finalizado').textContent = "COMPLETADA";
        }
    });


    // Lógica para el botón ELIMINAR
    nuevaLi.querySelector('.btn-eliminar').addEventListener('click', () => {
        tareas = tareas.filter(t => t.id !== tarea.id); // Quitar del array
        nuevaLi.remove(); // Quitar del HTML
    });

    listaTareas.appendChild(nuevaLi);
}

// Lógica del buscador
inputBusqueda.addEventListener('input', () => {
    const textoFiltro = inputBusqueda.value.toLowerCase();
    const todasLasTareas = document.querySelectorAll('.tarea-item');

    todasLasTareas.forEach(tarea => {
        const tituloTarea = tarea.querySelector('.tarea-titulo').textContent.toLowerCase();
        
        if (tituloTarea.includes(textoFiltro)) {
            tarea.style.display = 'flex'; 
        } else {
            tarea.style.display = 'none';
        }
    });
});



