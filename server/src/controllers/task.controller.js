const TaskService = require('../services/task.service');

const obtenerTareas = (req, res, next) => {
    try {
        const tareas = TaskService.obtenerTodas();
        res.status(200).json(tareas);
    } catch (error) {
        next(error); 
    }
};

const crearTarea = (req, res, next) => {
    const { title } = req.body;

    if (!title || typeof title !== 'string' || title.trim().length === 0) {
        const error = new Error('INVALID_DATA');
        return next(error);
    }

    try {
        const nuevaTarea = TaskService.crearTarea({ title: title.trim() });
        res.status(201).json(nuevaTarea);
    } catch (error) {
        next(error);
    }
};

const eliminarTarea = (req, res, next) => {
    const { id } = req.params;

    if (isNaN(id)) {
        const error = new Error('INVALID_ID');
        return next(error);
    }

    try {
        TaskService.eliminarTarea(id);
        res.status(204).send();
    } catch (error) {
       next(error);
    }   
};

module.exports = {
    obtenerTareas,
    crearTarea,
    eliminarTarea
};
