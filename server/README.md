# 🏗️ Ingeniería del Backend y Arquitectura de Capas

En esta fase, el proyecto ha evolucionado de una aplicación local a un sistema **Cliente-Servidor** robusto, eliminando la dependencia de `LocalStorage` para los datos del dominio y adoptando estándares de ingeniería de software modernos.

## 🏛️ Organización del Servidor (Domain-Driven Design)
Se ha implementado una arquitectura de **separación absoluta de responsabilidades** en Node.js (ES Modules):

*   **`routes/task.routes.js`**: Definición de endpoints RESTful.
*   **`controllers/task.controller.js`**: Capa de red que gestiona el protocolo HTTP.
    > **Técnica:** Implementa **validación defensiva** y normalización de datos (ej: `.trim()`) antes de delegar a la lógica de negocio.
    ```javascript
    if (!titulo || titulo.trim().length < 3) {
        const error = new Error('INVALID_DATA');
        return next(error);
    }
    ```

*   **`services/task.service.js`**: Capa de lógica de negocio pura.
    > **Técnica:** Gestión de estado mediante **operador spread** para actualizaciones inmutables y lanzamiento de **errores de dominio** (`NOT_FOUND`).
    ```javascript
    tasks[index] = { ...tasks[index], ...data };
    ```

---

## 🛡️ Gestión de Errores y Middlewares (Fase C)
Se ha implementado un **Middleware Global de Excepciones** que centraliza el tratamiento de fallos:

*   **Mapeo Semántico:** Traduce errores de lógica interna (`NOT_FOUND`, `INVALID_DATA`) en códigos de estado **HTTP 404** o **400**.
*   **Pipeline de Error:** Se utiliza el patrón de middleware de Express para capturar excepciones mediante el objeto `next(error)` en los controladores.

```javascript
if (error.message === 'NOT_FOUND') {
    return res.status(404).json({ error: 'Recurso no encontrado' });
} 
``` 

* 🔍 **Documentación Detallada:** Para ver el informe exhaustivo de capturas, mapeo de errores y pruebas de red, consulta el [Reporte de la Fase C](../docs/fase-c.md).

---

## 📡 Documentación de la API REST (v1)
| Método | Endpoint | Descripción | Estado OK |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/v1/tasks` | Obtiene el listado completo de prendas/tareas | 200 |
| **POST** | `/api/v1/tasks` | Registra una nueva prenda en el sistema | 201 |
| **PUT** | `/api/v1/tasks/:id` | Actualiza estado o detalles de una prenda | 200 |
| **DELETE** | `/api/v1/tasks/:id` | Elimina un registro de forma permanente | 204 |

### Contrato de Datos (Modelo Tarea)
```json
{
  "id": "string",
  "titulo": "string (min 3 chars)",
  "categoria": "string",
  "prioridad": "Alta | Media | Baja",
  "estado": "pendiente | progreso | finalizado",
  "createdAt": "date"
} 
```

---

## 🌐 Transparencia de Red en el Frontend (Fase D)
El cliente ha sido refactorizado para interactuar con la API mediante peticiones **asíncronas (Fetch API)**, gestionando la "física del mundo real":
*   **Estado de Carga (Loading):** Indicadores visuales (spinners) y bloqueo de inputs durante la latencia de red.
*   **Estado de Éxito (Success):** Sincronización reactiva de la interfaz de usuario con el estado real del servidor.
*   **Estado de Error (Error):** Feedback visual dinámico (bloques de alerta) ante caídas de servidor o respuestas de error 4xx/5xx.

### Ejemplo de flujo asíncrono
```javascript
async function cargarTareas() {
    try {
        mostrarSpinner(true);
        const tareas = await taskApi.getAll();
        renderizarTodo(tareas); 
    } catch (error) {
        mostrarError(error.message); 
    } finally {
        mostrarSpinner(false);
    }
}
```

---

## 🧠 Reflexión y Calidad (Ingeniería de Software)

La transición de una aplicación basada en persistencia local a una arquitectura **Cliente-Servidor** ha permitido aplicar principios avanzados de desarrollo:

1. **Desacoplamiento:** El Frontend es ahora independiente de la forma en que se guardan los datos. Podríamos cambiar el array en memoria por una base de datos real sin modificar la interfaz de usuario.
2. **Resiliencia:** La gestión de estados de red (Loading/Error) garantiza que la aplicación sea usable bajo condiciones de red inestables, evitando que la UI se quede "bloqueada".
3. **Escalabilidad:** Gracias a la arquitectura de capas en el Backend, la lógica de negocio está protegida en los Servicios, facilitando el mantenimiento y crecimiento del proyecto.

**Conclusión:** Este laboratorio consolida la importancia de la **limpieza arquitectónica** y el manejo proactivo de errores para crear software profesional, robusto y escalable.

---

## 🚀 Desarrollo Local
1. Instalar dependencias: `npm install`
2. Configurar variables en `.env`.
3. Ejecutar servidor: `npm run dev`.