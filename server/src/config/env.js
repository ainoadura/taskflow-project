import 'dotenv/config';

export const PORT = process.env.PORT || 3000;

if (!process.env.PORT) {
    throw new Error('El puerto no está definido en el archivo .env');
}

export default {
    port: PORT
};
