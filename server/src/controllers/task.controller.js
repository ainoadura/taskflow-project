const TaskService = require('../services/task.service');

const obtenerTareas = (req, res) => {
    const tareas = TaskService.obtenerTodas();
    res.status(200).json(tareas);
};

const crearTarea = (req, res) => {
    // 1. Extraer datos del body
    const { title } = req.body;

    // 2. Validación defensiva: El título es obligatorio y debe ser un texto
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        return res.status(400).json({ 
            error: 'Solicitud incorrecta: El campo "title" es obligatorio y debe ser un texto válido.' 
        });
    }

    try {
        // 3. Invocar al servicio
        const nuevaTarea = TaskService.crearTarea({ title: title.trim() });
        
        // 4. Devolver código 201 (Created)
        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ error: 'Error interno al procesar la tarea.' });
    }
};

const eliminarTarea = (req, res) => {
    // 1. Extraer el ID de los parámetros de la URL
    const { id } = req.params;

    // 2. Validación defensiva: Verificar que el ID sea un número válido
    if (isNaN(id)) {
        return res.status(400).json({ error: 'El ID proporcionado no es un formato válido.' });
    }

    try {
        // 3. Invocar al servicio
        TaskService.eliminarTarea(id);
        
        // 4. Devolver código 204 (No Content) para éxito en borrado
        res.status(204).send();
    } catch (error) {
        // 5. Manejo del error específico lanzado por el servicio
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ error: `La tarea con ID ${id} no existe.` });
        }
        res.status(500).json({ error: 'Error inesperado al intentar eliminar.' });
    }
};

module.exports = {
    obtenerTareas,
    crearTarea,
    eliminarTarea
};
