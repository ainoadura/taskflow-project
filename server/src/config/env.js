require('dotenv').config();

if (!process.env.PORT) {
    throw new Error('El PUERTO no está definido');
}

module.exports = {
    port: process.env.PORT
};
