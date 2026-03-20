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

app.use('/api/v1/tasks', taskRoutes);

app.use((err, req, res, next) => {
    console.error('--- DETALLE TÉCNICO DEL ERROR ---');
    console.error(err.stack); 
    console.error('---------------------------------');

    let statusCode = 500; 
    let message = 'Error interno del servidor';

    if (err.message === 'NOT_FOUND') {
        statusCode = 404;
        message = 'El recurso solicitado no existe.';
    } else if (err.message === 'INVALID_DATA' || err.message === 'INVALID_ID') {
        statusCode = 400;
        message = 'La solicitud contiene datos no válidos.';
    }

    res.status(statusCode).json({
        error: {
            code: statusCode,
            message: message
        }
    });
});

module.exports = app;
