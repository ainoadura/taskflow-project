/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",           // El archivo raíz
    "./src/**/*.{html,js}",   // Tu carpeta de código
    "./app.js"                // ¡Importante! Tu JavaScript donde creas los elementos
  ],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [],
}

