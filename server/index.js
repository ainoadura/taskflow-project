import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// 1. Cargar configuración del .env
dotenv.config();

const app = express();

// 2. Configurar Middlewares (Capa de seguridad y datos)
app.use(cors());          // Permite que tu Frontend se conecte aquí
app.use(express.json());  // Permite que tu API entienda datos en formato JSON

// 3. Crear una ruta de prueba (Ruta raíz)
app.get('/', (req, res) => {
    res.send('¡Servidor de TaskFlow encendido y reportándose! 🚀');
});

// 4. Arrancar el servidor usando el puerto del .env
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en: http://localhost:${PORT}`);
    console.log('Presiona Ctrl + C para detenerlo');
});
