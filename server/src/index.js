import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import { PORT } from './config/env.js'; 
import taskRoutes from './routes/task.routes.js';

import path from 'path'; 
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configurar Middlewares (Capa de seguridad y datos)
app.use(cors());          
app.use(express.json());  

app.use('/api/v1/tasks', taskRoutes);

app.use(express.static(path.join(__dirname, '../../public')));

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

app.listen(PORT, () => {
    console.log(`Servidor TaskFlow listo en el puerto ${PORT}`);
});

export default app; 