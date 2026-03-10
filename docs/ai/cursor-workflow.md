# Cursor workflow

## Log de cambios

### 2026-03-10 — Refactor arquitectónico de Taskflow

- **Capa de servicio (`taskService.js`)**: se creó `TaskService` para centralizar validación y reglas de negocio, además de constantes compartidas.
  - **Estados**: `ESTADO_TAREA` (pendiente/progreso/finalizado) para evitar “magic strings”.
  - **Persistencia**: `cargarTareasDesdeStorage` y `guardarTareasDesdeStorage` encapsulan el acceso a `localStorage`.
  - **Operaciones**: `crearTarea`, `actualizarEstadoTarea`, `eliminarTarea` devuelven resultados tipados `{ ok, ... }` y manejan errores (`INVALID_STATE`, `TASK_NOT_FOUND`, `TITLE_REQUIRED`).

- **Controladores más delgados (`app.js`)**: se movió la validación desde el handler del formulario al servicio y se refactorizó la gestión de estados para usar `TaskService`.
  - **Cambios de estado**: los botones de `PROGRESO`/`FINALIZADO` usan `actualizarEstadoTarea(...)` antes de persistir y mover el elemento entre listas.
  - **Creación**: el submit delega en `crearTarea(...)` y mantiene el comportamiento anterior (si no hay título, no crea).
  - **Eliminación**: se delega en `eliminarTarea(...)` para centralizar el caso “no encontrada”.

- **Carga de scripts (`index.html`)**: se añadió `taskService.js` antes de `app.js` para asegurar que el servicio esté disponible en el navegador.

- **Tests unitarios**:
  - **Suite exhaustiva para `actualizarEstadoTarea`** en `__tests__/taskService.actualizarEstadoTarea.test.cjs` cubriendo casos correctos y de error (estado inválido, tarea no encontrada, no mutar otras tareas, ids duplicados).
  - **Infra de test**: `jest.config.cjs` + `package.json` con script `npm test`.

