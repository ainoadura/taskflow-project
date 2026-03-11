# Flujo de Trabajo en Cursor
> **Propósito:** Aquí se documenta la metodología de desarrollo utilizando el IDE Cursor. Incluye la configuración de reglas (`.cursorrules`), el uso de *Composer*, la gestión de archivos indexados y las mejores prácticas para que la IA asista de forma eficiente en la escritura de código.

## 🚀 Mi Workflow con Cursor en Taskflow

Este documento registra los aprendizajes y mejoras implementadas en el proyecto Taskflow utilizando las capacidades de IA de Cursor.

### ⌨️ Atajos de Teclado Imprescindibles


| Comando | Acción | Propósito en Taskflow |
| :--- | :--- | :--- |
| **`Ctrl + K`** | **Edición Inline** | Modificar o generar funciones dentro del código actual. |
| **`Ctrl + L`** | **Chat de IA** | Consultar dudas sobre la lógica o buscar bugs en el archivo. |
| **`Ctrl + I`** | **Composer** | Cambios estructurales que afectan a múltiples archivos. |
| **`Ctrl + J`** | **Terminal** | Abrir la terminal para ejecutar comandos o tests. |
| **`@`** | **Contexto** | Referenciar archivos (`@file`), carpetas o el `@codebase`. |

---

### 🛠 Casos de Uso: Mejoras de Código con IA

#### 1. Refactorización de Lógica Asíncrona (`Ctrl + K`)
*   **Problema:** Funciones con *callback hell* o promesas encadenadas difíciles de seguir en el flujo de tareas.
*   **Mejora:** Mediante edición inline, se transformó la lógica a `async/await` con manejo de errores centralizado.
*   **Resultado:** Código más limpio, legible y fácil de debugear.

#### 2. Estandarización de Nomenclatura Global (`Composer - Ctrl + I`)
*   **Problema:** Inconsistencia en nombres de variables (ej. `taskId` vs `task_uuid`) entre el frontend y el backend.
*   **Mejora:** Usando Composer con el contexto de `@codebase`, se unificaron los nombres en modelos, controladores y tipos.
*   **Resultado:** Eliminación de errores de mapeo y mejor integración entre componentes.

---

# Configuración del Model Context Protocol (MCP) - GitHub

Este documento detalla la conexión entre Cursor (IDE) y la API de GitHub mediante el protocolo MCP.

## 1. Credenciales y Permisos
Se ha configurado un **Fine-grained Personal Access Token** con los siguientes privilegios:

| Recurso | Permiso | Acción Permitida |
| :--- | :--- | :--- |
| **Code** | `Read-only` | La IA puede leer y analizar el código fuente. |
| **Metadata** | `Read-only` | Acceso a nombres de repos y datos básicos. |
| **Issues** | `Read & Write` | Creación y gestión de tareas y errores. |
| **Pull Requests** | `Read & Write` | Revisión y comentarios en PRs. |

## 2. Configuración en Cursor
El servidor se añade en **Settings > Features > MCP Servers**.

### Bloque JSON de configuración:
```text
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "MI_TOKEN_AQUÍ"
      }
    }
  }
}

### 🧪 Bitácora de Verificación: Consultas MCP GitHub
Se han realizado las siguientes pruebas de conectividad para validar el flujo de trabajo entre **Cursor** y la **API de GitHub**:

| # | Consulta Realizada | Propósito | Resultado |
| :--- | :--- | :--- | :--- |
| **1** | *"Lista mis 5 repositorios más recientes"* | Validar acceso y lectura de cuenta. | **Éxito** ✅ |
| **2** | *"Busca issues con la etiqueta 'bug' en el repo"* | Comprobar filtrado y lectura de tareas. | **Éxito** ✅ |
| **3** | *"Resume los cambios del último commit realizado"* | Analizar capacidad de inspección de código. | **Éxito** ✅ |
| **4** | *"Busca archivos .env en mis repositorios"* | Auditoría de seguridad y búsqueda global. | **Éxito** ✅ |
| **5** | *"Crea un issue titulado 'Test MCP' con descripción"* | Validar permisos de escritura (Write access). | **Éxito** ✅ |

---

### 💡 Casos de Uso Prácticos para Taskflow
¿Cuándo utilizar estas capacidades en el desarrollo diario?

*   **Sincronización de Contexto:** Consultar la documentación técnica guardada en otros repositorios sin salir del código actual.
*   **Gestión de Deuda:** Pedir a la IA que cree issues automáticamente cuando detecte un `TODO:` crítico en el código.
*   **Análisis de PRs:** Antes de subir cambios, pedirle a la IA: *"Revisa los últimos PRs aprobados en este repo y dime si mi código sigue las mismas convenciones"*.
*   **Depuración Histórica:** *"Busca quién modificó la lógica de autenticación el mes pasado y qué problema intentaba resolver según el commit"*.

---

## 💎 Casos de Uso del Model Context Protocol (MCP) en Proyectos Reales

El uso de MCP en **Taskflow** no es solo una comodidad, es una ventaja competitiva que permite a la IA actuar con datos en tiempo real. Aquí detallamos los escenarios donde esta tecnología marca la diferencia:

### 1. Desarrollo de Arquitecturas Distribuidas (Microservicios)
*   **Problema:** El código que necesitas consultar está en un repositorio distinto al que tienes abierto.
*   **Solución MCP:** La IA puede consultar contratos de API o modelos de datos en repositorios externos de GitHub sin que tengas que clonarlos o cambiar de ventana.
*   **Impacto:** Reducción drástica del tiempo de integración entre equipos.

### 2. Gestión de Ciclo de Vida del Software (DevOps & QA)
*   **Problema:** Desconexión entre el código y las tareas pendientes (Issues/Tickets).
*   **Solución MCP:** Automatización del flujo de trabajo. Puedes pedir a la IA: *"Analiza este bug y crea un Issue en GitHub con la solución propuesta y los archivos afectados"*.
*   **Impacto:** Trazabilidad total entre el código escrito y los requerimientos del proyecto.

### 3. Auditoría de Seguridad y Cumplimiento
*   **Problema:** Riesgo de subir credenciales o código vulnerable en múltiples repositorios.
*   **Solución MCP:** Realizar búsquedas globales semánticas. *"Busca en toda mi organización de GitHub si hay claves API expuestas en archivos de configuración"*.
*   **Impacto:** Prevención proactiva de brechas de seguridad.

### 4. Onboarding e Inteligencia de Negocio
*   **Problema:** Un desarrollador nuevo tarda días en entender por qué se tomaron ciertas decisiones técnicas.
*   **Solución MCP:** La IA accede al histórico de Pull Requests y discusiones para explicar el contexto: *"Explícame por qué cambiamos de JWT a sesiones según las discusiones en los PRs de noviembre"*.
*   **Impacto:** Reducción del tiempo de rampa (onboarding) de nuevos miembros del equipo.

### 5. Documentación Viva (Auto-actualizada)
*   **Problema:** La documentación se desfasa respecto al código real.
*   **Solución MCP:** Sincronización automática. La IA detecta cambios en la lógica y utiliza el servidor MCP para actualizar archivos de documentación en repositorios centrales o wikis.
*   **Impacto:** Documentación siempre fiel a la realidad técnica del proyecto.
