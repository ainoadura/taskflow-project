import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())

let tareas = [];

app.post('/api/v1/tasks', (req, res) => {
  const nuevaTarea = { 
    id: Date.now().toString(), 
    ...req.body 
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
})

export default app;