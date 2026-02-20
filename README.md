# Pagina-Donaciones
#  Documento Técnico 
## Estructura del Ejercicio Grupal y Arquitectura Cliente-Servidor  

---

##  1. Propósito y Ventajas de la Estructura Utilizada

En el ejercicio grupal se implementó una **arquitectura por capas**, dividida en:

| Capa | Función Principal |
|------|------------------|
|  Presentación | Interfaz con el usuario |
|  Lógica de negocio | Procesamiento y reglas del sistema |
|  Acceso a datos | Comunicación con la base de datos |

###  Propósito

- 🔹**Separar responsabilidades:** Cada componente cumple una función específica.
- 🔹**Facilitar el trabajo en equipo:** Los integrantes pueden trabajar en diferentes partes sin interferencias.
- 🔹**Mejorar la claridad del código:** Una estructura definida hace que el proyecto sea más comprensible.

###  Ventajas

- 🔹 **Mantenibilidad:** Los cambios en una capa no afectan directamente a las demás.  
- 🔹 **Escalabilidad:** Permite agregar nuevas funcionalidades sin rehacer todo el sistema
- 🔹 **Reutilización:** Algunos módulos pueden reutilizarse en otros proyectos..  
- 🔹 **Depuración sencilla:** Es más fácil identificar y corregir errores.  

---

##  2. Importancia de la Separación Cliente-Servidor

La arquitectura **cliente-servidor** divide la aplicación en dos partes principales:

###  Cliente
- Interfaz gráfica.
- Se ejecuta en el navegador.
- Envía solicitudes al servidor.
- Muestra la información al usuario.

### Servidor
- Procesa las solicitudes.
- Ejecuta la lógica del sistema.
- Gestiona la base de datos.
- Devuelve respuestas al cliente.

---

##  ¿Por qué es importante esta separación?

| Aspecto | Beneficio |
|----------|------------|
|  Seguridad | La información sensible se protege en el servidor |
|  Rendimiento | Cada parte cumple su función específica |
|  Escalabilidad | Se puede mejorar el servidor sin modificar el cliente |
| Flexibilidad | Permite usar distintas tecnologías en cada lado |

---

##  Conclusión

La estructura por capas y la arquitectura cliente-servidor permiten desarrollar aplicaciones web:

-  Más organizadas  
-  Más seguras  
-  Más escalables  
-  Más fáciles de mantener  

Estas prácticas son fundamentales para crear sistemas eficientes y profesionales.