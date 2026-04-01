import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

let tareas = [
    { id: "1", titulo: 'Configurar entorno', categoria: 'Estudio', prioridad: 'Alta', estado: 'finalizado' }
];

app.get('/api/v1/tasks', (req, res) => {
  res.json(tareas); 
});

app.post('/api/v1/tasks', (req, res) => {
  const { titulo, categoria, prioridad, estado } = req.body;

  // Validación rápida para que no guarde basura
  if (!titulo || titulo.length < 3) {
    return res.status(400).json({ error: 'Datos inválidos' });
  }

  const nuevaTarea = { 
    id: Date.now().toString(), 
    titulo, 
    categoria: categoria || 'General', 
    prioridad: prioridad || 'Media', 
    estado: estado || 'pendiente' 
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
})

// ACTUALIZAR (Para marcar como finalizada o progreso)
app.put('/api/v1/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: 'No encontrada' });

  // Mezclamos los datos antiguos con los nuevos (como el estado)
  tareas[index] = { ...tareas[index], ...req.body };
  res.json(tareas[index]);
});

// BORRAR
app.delete('/api/v1/tasks/:id', (req, res) => {
  const { id } = req.params;
  const index = tareas.findIndex(t => t.id === id);

  if (index === -1) return res.status(404).json({ error: 'No encontrada' });

  tareas.splice(index, 1);
  res.status(204).send(); // 204 significa "OK, borrado sin contenido"
});


export default app;