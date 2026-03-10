# Flujo de Trabajo en Cursor
> **Propósito:** Aquí se documenta la metodología de desarrollo utilizando el IDE Cursor. Incluye la configuración de reglas (`.cursorrules`), el uso de *Composer*, la gestión de archivos indexados y las mejores prácticas para que la IA asista de forma eficiente en la escritura de código.

## 🚀 Mi Workflow con Cursor en Taskflow

Este documento registra los aprendizajes y mejoras implementadas en el proyecto Taskflow utilizando las capacidades de IA de Cursor.

### ⌨️ Atajos de Teclado Imprescindibles


| Comando | Acción | Propósito en Taskflow |
| :--- | :--- | :--- |
| **`Ctrl + K`** | **Edición Inline** | Modificar o generar funciones dentro del código actual. |
| **`Ctrl + L`** | **Chat de IA** | Consultar dudas sobre la lógica o buscar bugs en el archivo. |
| **`Ctrl + I`** | **Composer** | Cambios estructurales que afectan a múltiples archivos. |
| **`Ctrl + J`** | **Terminal** | Abrir la terminal para ejecutar comandos o tests. |
| **`@`** | **Contexto** | Referenciar archivos (`@file`), carpetas o el `@codebase`. |

---

### 🛠 Casos de Uso: Mejoras de Código con IA

#### 1. Refactorización de Lógica Asíncrona (`Ctrl + K`)
*   **Problema:** Funciones con *callback hell* o promesas encadenadas difíciles de seguir en el flujo de tareas.
*   **Mejora:** Mediante edición inline, se transformó la lógica a `async/await` con manejo de errores centralizado.
*   **Resultado:** Código más limpio, legible y fácil de debugear.

#### 2. Estandarización de Nomenclatura Global (`Composer - Ctrl + I`)
*   **Problema:** Inconsistencia en nombres de variables (ej. `taskId` vs `task_uuid`) entre el frontend y el backend.
*   **Mejora:** Usando Composer con el contexto de `@codebase`, se unificaron los nombres en modelos, controladores y tipos.
*   **Resultado:** Eliminación de errores de mapeo y mejor integración entre componentes.
