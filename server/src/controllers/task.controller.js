import * as TaskService from '../services/task.service.js';

export const obtenerTareas = (req, res, next) => {
    try {
        const tareas = TaskService.obtenerTodas();
        res.status(200).json(tareas);
    } catch (error) {
        next(error); 
    }
};

export const crearTarea = (req, res, next) => {
    const { titulo } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
        const error = new Error('INVALID_DATA');
        return next(error);
    }

    try {
        const nuevaTarea = TaskService.crearTarea({ titulo: titulo.trim() });
        res.status(201).json(nuevaTarea);
    } catch (error) {
        next(error);
    }
};

export const actualizarTarea = (req, res, next) => {
    const { id } = req.params;
    const data = req.body;

    try {
        const tareaActualizada = TaskService.actualizarTarea(id, data);
        res.status(200).json(tareaActualizada);
    } catch (error) {
        next(error);
    }
};

export const eliminarTarea = (req, res, next) => {
    const { id } = req.params;

    try {
        TaskService.eliminarTarea(id);
        res.status(204).send();
    } catch (error) {
       next(error);
    }   
};
