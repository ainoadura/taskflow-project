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

export default app;