import * as TaskService from '../services/task.service.js';

export const obtenerTareas = async (req, res, next) => {
    try {
        const tareas = await TaskService.obtenerTodas();
        res.status(200).json(tareas);
    } catch (error) {
        next(error); 
    }
};

export const crearTarea = (req, res, next) => {
    const { titulo, categoria, prioridad, estado } = req.body;

    if (!titulo || typeof titulo !== 'string' || titulo.trim().length < 3) {
        const error = new Error('INVALID_DATA');
        return next(error);
    }

    try {
        // 3. Pasa el objeto COMPLETO al servicio para que se guarde con categoría y prioridad
        const nuevaTarea = TaskService.crearTarea({ 
            titulo: titulo.trim(),
            categoria: categoria || 'General',
            prioridad: prioridad || 'Media',
            estado: estado || 'pendiente'
        });
        
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
