# Registro de Experimentos
> **Propósito:** Un diario técnico donde se anotan las pruebas realizadas, las hipótesis planteadas y los resultados obtenidos. Sirve para evitar repetir errores pasados y para documentar el progreso iterativo de las soluciones de IA implementadas.

# 📊 Comparativa de Desarrollo: Programador Junior vs. Inteligencia Artificial

Este análisis desglosa las diferencias fundamentales entre una solución manual pedagógica y una solución optimizada mediante IA.

---

### 1. Cuadro Comparativo de Ejecución


| Criterio | Programador Junior (Manual) | Inteligencia Artificial (Optimizado) |
| :--- | :--- | :--- |
| **Tiempo Invertido** | **Alto (15-30 min):** Requiere pensar la lógica de índices, depurar errores de "fuera de rango" y probar manualmente. | **Mínimo (<1 seg):** La respuesta es instantánea. El esfuerzo se desplaza de escribir a **validar** el resultado. |
| **Calidad del Código** | **Elemental:** Código imperativo con muchos `if/else` y bucles anidados. Fácil de seguir pero difícil de escalar. | **Profesional:** Código declarativo/funcional. Usa librerías estándar y estructuras de datos avanzadas. |
| **Rendimiento ($O$)** | **Bajo:** Generalmente $O(n^2)$ o superior. Procesa cada elemento de forma secuencial y lenta. | **Máximo:** $O(n)$ o vectorial. Minimiza ciclos de CPU mediante operaciones en bloque. |
| **Mantenibilidad** | **Frágil:** Cambiar una regla suele implicar reescribir toda la lógica de los bucles. | **Robusta:** Al ser modular y usar funciones puras, los ajustes son quirúrgicos y seguros. |

---

### 2. Diferencias en la Comprensión del Problema

#### **A. Picas y Famas**
*   **Junior:** Lo entiende como una **tarea de rastreo**. Su mente visualiza el proceso de "tachado" físico para no repetir números, usando variables temporales y listas de apoyo.
*   **IA:** Lo entiende como una **intersección de conjuntos**. Utiliza la frecuencia de caracteres (Multiset) para resolver el problema de forma matemática, eliminando la necesidad de "tachar" nada.

#### **B. Rombo de Asteriscos**
*   **Junior:** Se enfoca en la **geometría**. Calcula espacios y asteriscos línea por línea, sufriendo con la alineación manual del texto.
*   **IA:** Se enfoca en el **formato de cadenas**. Utiliza métodos integrados como `.center()` para delegar la gestión del espacio en el lenguaje, tratando el rombo como una lista de strings centrados.

#### **C. Juego de la Vida**
*   **Junior:** Lo ve como una **cuadrícula de celdas**. Aplica la regla casilla por casilla, lo que es extremadamente lento en matrices grandes y propenso a errores en los bordes.
*   **IA:** Lo ve como una **operación de tensores (matemática)**. No recorre la matriz; la "desplaza" sobre sí misma 8 veces para que todos los vecinos se sumen simultáneamente.

---

### 3. Conclusión del Experimento


| Perfil | Ventaja Principal | Desventaja |
| :--- | :--- | :--- |
| **Junior** | **Transparencia:** Es ideal para aprender cómo funciona el flujo de control básico. | **Ineficiencia:** Código redundante y lento en grandes volúmenes de datos. |
| **IA** | **Eficiencia:** Entrega soluciones de nivel Senior, listas para producción y altamente optimizadas. | **Abstracción:** Requiere un nivel de conocimientos alto para entender *cómo* funciona la optimización. |

---

# 🧵 Experimento: Junior vs. IA en Proyecto de Corte y Confección

Este experimento analiza cómo se resuelven tres retos técnicos clave en una plataforma de gestión de taller, comparando el razonamiento manual (Junior) frente al optimizado (IA).

---

## 🔍 Tarea 1: Filtrado y Búsqueda de Tareas
**Problema:** El usuario busca por nombre o descripción; el sistema debe filtrar ignorando mayúsculas/minúsculas.

*   **Enfoque Junior:** Utiliza una mentalidad de **rastreo manual**. Crea un array vacío, recorre la lista original con un bucle `for`, convierte cada campo a minúsculas y, si hay coincidencia, añade el elemento al nuevo array con `push`.
*   **Enfoque IA:** Utiliza una mentalidad **declarativa**. Aplica el método `.filter()` directamente sobre el array. Es más eficiente porque delega la gestión de la memoria al lenguaje y reduce el código a una sola expresión lógica.

---

## ⚖️ Tarea 2: Gestión de Prioridades (Ordenación)
**Problema:** Ordenar las prendas según su urgencia: **Alta > Media > Baja**.

*   **Enfoque Junior:** Intenta comparar los strings directamente dentro de la función `.sort()`. Al ver que "Alta" no es mayor que "Media" alfabéticamente, acaba creando una cadena compleja de `if/else` anidados que es difícil de mantener si se añade una nueva prioridad (ej. "Urgente").
*   **Enfoque IA:** Utiliza un **Diccionario de Pesos**. Asigna un valor numérico a cada etiqueta (`{ Alta: 3, Media: 2, Baja: 1 }`). La ordenación se convierte en una simple resta matemática, lo que hace el código extremadamente limpio y fácil de escalar.

---

## 🔄 Tarea 3: Cambio de Estado de la Prenda (Workflow)
**Problema:** Al finalizar una tarea, registrar la fecha de cierre y moverla al final de la lista.

*   **Enfoque Junior:** Aplica **Mutación Directa**. Busca el objeto por su índice y cambia sus propiedades (`tarea.estado = 'finalizada'`). Esto suele causar errores en frameworks modernos (como React o Vue) porque el sistema no detecta que el objeto ha cambiado y no actualiza la interfaz visual.
*   **Enfoque IA:** Aplica **Inmutabilidad**. Utiliza el *spread operator* (`...`) para crear una copia nueva del objeto con los datos actualizados. Esto garantiza que la web reaccione al cambio instantáneamente y mantiene un historial de datos íntegro sin efectos secundarios.

---

## 📊 Resumen Comparativo de Calidad



| Dimensión | Programador Junior | Inteligencia Artificial |
| :--- | :--- | :--- |
| **Tiempo de Desarrollo** | **Lento:** Depuración de bucles e índices. | **Instantáneo:** Uso de patrones probados. |
| **Arquitectura** | **Imperativa:** Explica el "paso a paso". | **Declarativa:** Define el "qué" desea obtener. |
| **Manejo de Datos** | **Mutación:** Modifica datos originales. | **Inmutabilidad:** Protege la integridad de datos. |
| **Rendimiento** | **O(n²):** Tiende a anidar procesos. | **O(n):** Optimiza el acceso a la memoria. |

---

### 💡 Conclusión del Análisis
Para tu proyecto de **Corte y Confección**, el enfoque de la IA no solo ahorra líneas de código, sino que previene fallos visuales en el buscador y asegura que las prioridades de entrega se calculen con precisión matemática.

