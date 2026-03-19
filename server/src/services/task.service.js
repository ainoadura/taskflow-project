// Persistencia simulada en memoria
let tasks = [
    { id: 1, title: 'Configurar entorno', completed: true },
    { id: 2, title: 'Aprender arquitectura por capas', completed: false }
];

const obtenerTodas = () => {
    return tasks;
};

const crearTarea = (data) => {
    const nuevaTarea = {
        id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
        title: data.title,
        completed: false,
        createdAt: new Date()
    };
    tasks.push(nuevaTarea);
    return nuevaTarea;
};

const eliminarTarea = (id) => {
    const index = tasks.findIndex(t => t.id === parseInt(id));
    
    if (index === -1) {
        throw new Error('NOT_FOUND');
    }

    const tareaEliminada = tasks.splice(index, 1);
    return tareaEliminada[0];
};

module.exports = {
    obtenerTodas,
    crearTarea,
    eliminarTarea
};
