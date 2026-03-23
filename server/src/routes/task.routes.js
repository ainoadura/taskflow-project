import { Router } from 'express';
// IMPORTANTE: Nota el .js al final de la ruta del controlador
import * as taskController from '../controllers/task.controller.js';

const router = Router();

// GET /api/v1/tasks - Obtener todas las tareas
router.get('/', taskController.obtenerTareas);

// POST /api/v1/tasks - Crear una nueva tarea
router.post('/', taskController.crearTarea);

// PUT /api/v1/tasks/:id - Actualizar una tarea (Estado o Título)
router.put('/:id', taskController.actualizarTarea);

// DELETE /api/v1/tasks/:id - Eliminar una tarea por ID
router.delete('/:id', taskController.eliminarTarea);

export default router;