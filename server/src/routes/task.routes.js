const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

// GET /api/v1/tasks - Obtener todas las tareas
router.get('/', taskController.obtenerTareas);

// POST /api/v1/tasks - Crear una nueva tarea
router.post('/', taskController.crearTarea);

// DELETE /api/v1/tasks/:id - Eliminar una tarea por ID
router.delete('/:id', taskController.eliminarTarea);

module.exports = router;
