# 📝 Taskflow Project

**🚀 Aplicación en vivo:** [Puntada Maestra - Taskflow Project con Vercel](https://primeras-puntadas-tailwindcss-ainoa.vercel.app)

---

## 📝 Gestión Inteligente para el Taller de Costura

**Puntada Maestra** es un gestor de tareas dinámico diseñado para digitalizar el flujo de trabajo en talleres de corte y confección. Permite organizar encargos, priorizar urgencias y realizar un seguimiento preciso de cada prenda desde la recepción hasta la entrega final.

## 🚀 Características

- **Gestión de Tareas:** Añade tareas con título, descripción y categoría.
- **Priorización:** Clasificación visual mediante colores (Baja, Media, Alta).
- **Flujo de Trabajo:** Mueve tareas entre el panel principal y el panel de estado (Aside).
- **Persistencia:** Los datos se guardan en el navegador mediante `LocalStorage`.
- **Buscador en Tiempo Real:** Filtra tareas instantáneamente por su título.
- **Diseño Responsivo:** Interfaz adaptada con Flexbox.

## ✨ Funcionalidades Pro (Implementadas con IA)

Tras una fase de experimentación y optimización asistida por IA, se han integrado las siguientes mejoras de arquitectura:

- **🔍 Búsqueda Omnicanal:** Filtro inteligente en tiempo real que rastrea coincidencias tanto en el **título de la prenda** como en su **categoría/descripción**.
- **⚖️ Algoritmo de Priorización:** Ordenación automática basada en un mapa de pesos numéricos. Las tareas **Altas** (urgentes) encabezan siempre la lista, seguidas de Media y Baja.
- **📝 Edición In situ:** Sistema de edición rápida mediante **doble clic** en la información de la tarea, permitiendo corregir detalles sin eliminar el registro.
- **🔄 Flujo Inmutable:** Gestión de estados (Pendiente, Progreso, Finalizado) mediante una arquitectura que protege la integridad de los datos en `LocalStorage`.

## 🛠️ Stack Tecnológico

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

## 📖 Ejemplos de Uso en el Taller

Aquí tienes cómo **TaskFlow** optimiza el día a día de una costurera o sastre:

### 1. Gestión de Pedidos Urgentes 🔴
Imagina que entra un cliente con un **Vestido de Novia** que necesita un ajuste para mañana.
*   **Acción:** Creas la tarea con prioridad **"Alta"**.
*   **Resultado:** Aunque tengas 10 tareas "Baja" creadas antes, el vestido aparecerá automáticamente en la **primera posición** de la lista para que no olvides su urgencia.

### 2. Organización del Flujo de Trabajo 🧵
Tienes varias prendas cortadas y listas para empezar a coser.
*   **Acción:** Pulsas el botón **"PROGRESO"** en la tarea "Pantalón de Lino".
*   **Resultado:** La tarea se mueve visualmente al panel lateral (`Aside`) y se marca con un **borde amarillo**, indicando que esa prenda ocupa actualmente tu máquina de coser.

### 3. Búsqueda Rápida de Clientes 🔍
Un cliente llamado "Carlos" llama por teléfono para preguntar por su encargo.
*   **Acción:** Escribes "Carlos" en el buscador.
*   **Resultado:** La interfaz oculta el resto de pedidos y te muestra solo las tareas asociadas a él (ej. "Traje Azul - Carlos"), permitiéndote darle una respuesta inmediata sobre el estado de su prenda.

### 4. Corrección de Detalles (Quick-Edit) 📝
Te das cuenta de que anotaste mal el tipo de tela en una tarea ya creada.
*   **Acción:** Haces **doble clic** sobre el título "Falda de Algodón".
*   **Resultado:** Se abre un cuadro donde cambias el nombre a "Falda de Seda". El cambio se guarda en el disco sin necesidad de borrar y volver a escribir la prioridad o categoría.

Desarrollado por [ainoadura](https://github.com/ainoadura)
