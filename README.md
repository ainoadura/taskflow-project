# 📝 Taskflow Project

**🚀 Aplicación en vivo:** [Puntada Maestra - Taskflow Project con Vercel](https://primeras-puntadas-tailwindcss-ainoa.vercel.app)

---

## 📝 Gestor de Tareas Dinámico

Una aplicación web interactiva para gestionar tareas diarias, permitiendo clasificarlas por prioridad y hacer un seguimiento de su estado (Pendiente, En Progreso o Finalizada).

## 🚀 Características

- **Gestión de Tareas:** Añade tareas con título, descripción y categoría.
- **Priorización:** Clasificación visual mediante colores (Baja, Media, Alta).
- **Flujo de Trabajo:** Mueve tareas entre el panel principal y el panel de estado (Aside).
- **Persistencia:** Los datos se guardan en el navegador mediante `LocalStorage`.
- **Buscador en Tiempo Real:** Filtra tareas instantáneamente por su título.
- **Diseño Responsivo:** Interfaz adaptada con Flexbox.

## 🛠️ Tecnologías utilizadas

* **HTML5:** Estructura semántica (Main, Aside, Sections).
* **CSS3:** Variables personalizadas, Flexbox y diseño de componentes.
* **JavaScript:** Manipulación del DOM, eventos y almacenamiento local.

## 📦 Instalación y Uso
- **Clona este repositorio:** `https://github.com/ainoadura/primeras-puntadas-tailwindcss-ainoa-dura`

---

## 🧪 Reporte de Pruebas Manuales (QA)

### 1. Verificación de Lista Vacía (Empty State)
- **Mensaje Informativo:** Se confirma la aparición de un texto claro cuando no hay tareas.
- **Call to Action:** El formulario permanece accesible para invitar a la creación de datos.
- **Retorno al Vacío:** Al eliminar la última tarea, el estado vacío reaparece automáticamente.

### 2. Pruebas de Entrada y Robustez
- **Título Vacío:** Bloqueo de creación con validación visual (campo obligatorio).
- **Título con Espacios:** Se descartan entradas compuestas únicamente por espacios en blanco.
- **Título de Longitud Extrema:** Verificado que textos muy largos no desbordan los contenedores ni bloquean botones de acción.
- **Seguridad:** Los caracteres especiales se renderizan como texto plano para prevenir inyecciones de código.

### 3. Gestión de Estados y Sincronización
- **Feedback Visual:** Cambio de estilo inmediato (tachado/color) al marcar tareas como completadas.
- **Sincronización:** Los cambios en la lista principal se reflejan en el panel de estado (`Aside`) en tiempo real.
- **Eliminación:** Borrado efectivo tanto en la interfaz visual como en el almacenamiento interno.

### 4. Persistencia de Datos
- **Recarga (F5):** Comprobado que las tareas y sus estados persisten tras refrescar la página.
- **Cierre de Navegador:** Los datos se mantienen en `LocalStorage` para futuras sesiones.

---

## ♿ Compromiso con la Accesibilidad (WCAG 2.1)

### ⌨️ Accesibilidad de Teclado
- **Navegación Secuencial:** Soporte completo para `Tab` y `Shift+Tab` en buscadores, inputs y botones.
- **Interacción:** Ejecución de todas las acciones mediante las teclas `Enter` y `Espacio`.
- **Indicador de Foco:** Verificado que todos los elementos interactivos muestran un resalte visual claro (`outline`) al navegar con el teclado.
- **Sin Atrapamiento:** El foco entra y sale de todos los elementos sin quedar bloqueado en ninguna sección.

### 🎨 Accesibilidad Visual y Lectores de Pantalla
- **Etiquetado Semántico:** Uso de atributos `aria-label` en botones de iconos para que los lectores de pantalla describan acciones como "Borrar" o "Completar".
- **Formularios Accesibles:** Inputs vinculados correctamente con sus etiquetas para una identificación clara.
- **Contraste de Colores:** Etiquetas de prioridad ajustadas para cumplir con el ratio mínimo de **4.5:1**.
- **Legibilidad:** Combinación de colores optimizada para usuarios con baja visión o en condiciones de iluminación variable.

---
Desarrollado por [ainoadura](https://github.com/ainoadura)
