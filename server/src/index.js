import './config/env.js';
import express from 'express';
import cors from 'cors';

const app = express();

// Configurar Middlewares (Capa de seguridad y datos)
app.use(cors());          // Permite que tu Frontend se conecte aquí
app.use(express.json());  // Permite que tu API entienda datos en formato JSON

// Ruta de prueba (Ruta raíz)
app.get('/', (req, res) => {
    res.send('¡Servidor de TaskFlow encendido y reportándose!');
});

// 4. Arrancar el servidor usando el puerto del .env
const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    console.log('Presiona Ctrl + C para detenerlo');
});
