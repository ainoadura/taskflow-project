const express = require('express');
const cors = require('cors');
const { port } = require('./config/env');
const taskRoutes = require('./routes/task.routes');

const app = express();

// Configurar Middlewares (Capa de seguridad y datos)
app.use(cors());          
app.use(express.json());  

// Ruta de prueba (Ruta raíz)
app.get('/', (req, res) => {
    res.send('¡Servidor de TaskFlow encendido y reportándose!');
});

// --- AQUÍ CONECTAMOS TU API ---
// Todas las rutas de tareas vivirán bajo /api/v1/tasks
app.use('/api/v1/tasks', taskRoutes);


app.listen(port, () => {
    console.log(`Servidor corriendo en: http://localhost:${port}`);
    console.log(`API lista en: http://localhost:${port}/api/v1/tasks`);
    console.log('Presiona Ctrl + C para detenerlo');
});
