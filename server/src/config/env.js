import dotenv from 'dotenv';
dotenv.config();

// Validación manual de seguridad
if (!process.env.PORT) {
    throw new Error('El PUERTO no está definido en el archivo');
}

export const env = {
    PORT: process.env.PORT
};
