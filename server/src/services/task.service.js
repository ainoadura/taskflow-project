// Persistencia simulada en memoria
let tasks = [
    { id: "1", titulo: 'Configurar entorno', categoria: 'Estudio', prioridad: 'Alta', estado: 'finalizado' },
    { id: "2", titulo: 'Arquitectura por capas', categoria: 'Backend', prioridad: 'Media', estado: 'pendiente' }
];

export const obtenerTodas = () => {
    return tasks;
};

export const crearTarea = (data) => {
    const nuevaTarea = {
        id: Date.now().toString(), 
        titulo: data.titulo,
        categoria: data.categoria || 'General',
        prioridad: data.prioridad || 'Media',
        estado: 'pendiente',
        createdAt: new Date()
    };
    tasks.push(nuevaTarea);
    return nuevaTarea;
};

export const actualizarTarea = (id, data) => {
    const index = tasks.findIndex(t => t.id === id.toString());
    
    if (index === -1) {
        throw new Error('NOT_FOUND'); 
    }

    tasks[index] = { ...tasks[index], ...data };
    return tasks[index];
};

export const eliminarTarea = (id) => {
    const index = tasks.findIndex(t => t.id === id.toString());
    
    if (index === -1) {
        throw new Error('NOT_FOUND');
    }

    const tareaEliminada = tasks.splice(index, 1);
    return tareaEliminada[0];
};
