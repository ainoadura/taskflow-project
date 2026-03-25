# 🛠️ Master Guide: Prompt Engineering para Desarrollo

Esta guía consolida la experimentación técnica de roles, few-shot, razonamiento lógico y restricciones aplicados al ciclo de vida del software.

---

## 1. 🚀 Generación de Código (New Features)

### Componente de UI con Estado
> **Prompt:** "Actúa como un **Desarrollador Frontend Senior**. Crea un componente de 'Carrito de Compras' que gestione una lista de productos. **Restricciones:** No uses librerías externas de estado (usa solo Hooks/Composition API), el código debe estar en TypeScript y el diseño debe ser CSS-in-JS. **Paso a paso:** Explica primero la estructura del estado antes de codificar."

### Endpoint de API Robusto
> **Prompt:** "Actúa como un **Ingeniero de Backend**. Genera un endpoint POST para el registro de usuarios. **Restricciones:** El cuerpo debe validarse con Joi o Pydantic, la contraseña debe estar hasheada antes de guardarse y no incluyas el objeto de conexión a BD. **Formato:** Devuelve solo el código del controlador y el esquema de validación."

### Script de Automatización
> **Prompt:** "Actúa como un **Ingeniero DevOps**. Escribe un script que busque archivos `.log` de más de 30 días en un directorio y los mueva a una carpeta de backup comprimida. **Restricción:** Usa solo librerías estándar del lenguaje. **Paso a paso:** Describe la lógica de filtrado por fecha antes del script."

---

## 2. 🛠️ Refactorización (Clean Code & Performance)

### Optimización Algorítmica
> **Prompt:** "Actúa como un **Especialista en Rendimiento**. Refactoriza la siguiente función que tiene bucles anidados (adjunto código). **Misión:** Reduce la complejidad de O(n²) a O(n) o O(n log n). **Paso a paso:** Explica por qué la versión original es ineficiente antes de dar la solución."

### Patrones de Diseño
> **Prompt:** "Actúa como un **Arquitecto de Software**. Refactoriza este bloque de sentencias `if/else` múltiples utilizando el **Patrón Strategy**. **Ejemplo de entrada:** Un sistema de cálculo de impuestos por país. **Restricción:** El código resultante debe ser extensible sin modificar la clase principal."

### Modernización de Sintaxis
> **Prompt:** "Actúa como un **Desarrollador Fullstack**. Transforma este código de JavaScript antiguo (ES5 con callbacks y var) a JavaScript moderno (ES6+, async/await, destructuring). **Restricción:** Mantén exactamente la misma funcionalidad y nombres de variables."

### Sustitución de Librerías (Deuda Técnica)
> **Prompt:** "Actúa como un **Ingeniero de Software**. Refactoriza estas funciones que usan `Moment.js` para que utilicen la API nativa `Intl` o `date-fns`. **Misión:** Reducir el tamaño del bundle final. **Formato:** Muestra el 'Antes' y el 'Después' claramente."

---

## 3. 📝 Documentación y QA (Maintenance)

### Documentación Técnica
> **Prompt:** "Actúa como un **Technical Writer**. Genera la documentación técnica para la siguiente clase (adjunto código). **Restricciones:** Usa el formato estándar JSDoc/Google Docstrings, incluye descripción de parámetros, tipos de retorno y un ejemplo de uso `@example` para cada método."

### README Profesional
> **Prompt:** "Actúa como un **Product Owner**. Crea un archivo `README.md` profesional para este repositorio. **Secciones obligatorias:** 'Instalación', 'Configuración de variables de entorno', 'Scripts disponibles' y 'Guía de contribución'. **Restricción:** Usa un tono profesional y emojis para los títulos."

### Diseño de Tests Unitarios
> **Prompt:** "Actúa como un **QA Automation Engineer**. Analiza esta función y genera una lista de 5 casos de prueba unitarios. **Incluye:** 2 casos de éxito, 2 casos de borde (edge cases) y 1 caso de error. **Formato:** Entrega los tests usando el framework Jest o Pytest siguiendo el patrón **Arrange-Act-Assert**."

---

## 🧠 ¿Por qué funcionan estos prompts? (Análisis Técnico)


| Técnica | Por qué funciona | Efecto en el Código |
| :--- | :--- | :--- |
| **Asignación de Rol** | Filtra los datos de entrenamiento hacia un subconjunto experto. | Código con mejores prácticas (Senior vs Junior). |
| **Restricciones Negativas** | Elimina la "complacencia" del modelo (añadir librerías no solicitadas). | Resultados limpios, sin ruido ni dependencias externas. |
| **Chain-of-Thought** | Obliga a procesar la lógica en la memoria antes de la sintaxis. | Reducción drástica de bugs lógicos y alucinaciones. |
| **Few-Shot (Ejemplos)** | Provee una plantilla visual inamovible para el modelo. | Consistencia absoluta en nomenclatura y arquitectura. |
| **Control de Formato** | Define la estructura de salida (Markdown, JSON, JSDoc). | Entregables listos para copiar/pegar o automatizar. |
