const API_URL = `${window.location.origin}/api/v1/tasks`;

export const taskApi = {
    // Obtener todas las tareas
    async getAll() {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Error al obtener tareas');
        return await response.json();
    },

    // Crear una nueva tarea
    async create(taskData) {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(taskData)
        });
        if (!response.ok) throw new Error('Error al crear la tarea');
        return await response.json();
    },

    // Eliminar una tarea por ID
    async delete(id) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        // Si el backend devuelve 204 No Content, no hay JSON que parsear
        if (!response.ok) throw new Error('No se pudo eliminar la tarea');
        return true;
    },

     // PUT: Actualizar estado o título 
    async update(id, data) {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) throw new Error('Error al actualizar la tarea');
        return await response.json();
    }
};
