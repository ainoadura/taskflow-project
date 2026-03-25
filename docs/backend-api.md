# 🛡️ Ecosistema y Estándares de Ingeniería Backend

En el desarrollo de APIs de grado de producción, la robustez no solo depende del código del servidor, sino de las herramientas de consumo, documentación y observabilidad que lo rodean.

---

### 1. Axios (Client-side HTTP Library)
**Definición:** Cliente HTTP basado en promesas que utiliza el motor XMLHttpRequests en el navegador y el módulo nativo `http` en Node.js.
**Uso Técnico:** Se prefiere sobre `fetch` en arquitecturas desacopladas por su soporte nativo de **Interceptores**. Estos permiten inyectar lógica (como tokens JWT en los headers) antes de que la petición salga o transformar la respuesta globalmente antes de que llegue al controlador del frontend. Además, realiza el parseo automático de JSON y gestiona el rechazo de promesas ante códigos de estado fuera del rango 2xx.

### 2. Postman (API Development Environment)
**Definición:** Suite integral para el ciclo de vida de una API, que actúa como cliente de red independiente del navegador.
**Uso Técnico:** Es fundamental para el **Testeo de Integración**. Permite automatizar colecciones de peticiones, validar esquemas de respuesta JSON y simular diferentes entornos (Desarrollo, Staging, Producción) sin necesidad de una interfaz gráfica (UI). Facilita la depuración de la lógica de los controladores y middlewares de forma aislada.

### 3. Postman Interceptor (Network Proxy Tool)
**Definición:** Proxy de red que captura peticiones y cookies directamente desde el navegador y las sincroniza con la aplicación de escritorio de Postman.
**Uso Técnico:** Se utiliza para la **Ingeniería Inversa** y depuración de flujos de sesión. Permite replicar peticiones complejas realizadas por el frontend (con todos sus headers y cookies de sesión originales) para reproducir errores específicos del servidor en un entorno controlado.

### 4. Sentry (Error Tracking & APM)
**Definición:** Plataforma de observabilidad y monitoreo de errores en tiempo real basada en el rastreo de **Stack Traces**.
**Uso Técnico:** Implementa un middleware de captura de excepciones en el servidor. Cuando ocurre un error 500, Sentry captura el contexto completo (variables de entorno, versión del código, Breadcrumbs de la petición) y lo notifica al equipo de ingeniería. Es vital para la **Resiliencia**, permitiendo solucionar bugs en producción antes de que afecten a una masa crítica de usuarios.

### 5. Swagger / OpenAPI (API Specification & UI)
**Definición:** Framework de documentación basado en la especificación **OpenAPI (OAS)** que genera una interfaz interactiva de consulta.
**Uso Técnico:** Funciona como un **Contrato de Interfaz** entre el equipo de Backend y Frontend. Al documentar los modelos de datos y los códigos de respuesta (200, 201, 400, 404, 500), Swagger autogenera un "Sandbox" donde otros desarrolladores pueden ejecutar peticiones reales contra el servidor sin escribir una sola línea de código, garantizando la consistencia del sistema.

---
