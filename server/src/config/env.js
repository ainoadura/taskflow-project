import 'dotenv/config';

export const PORT = process.env.PORT || 3000;

console.log(`Configuración cargada: Puerto ${PORT}`);

export default {
    port: PORT
};
