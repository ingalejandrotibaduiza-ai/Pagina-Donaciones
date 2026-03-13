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
## Contenidos de HTML5 y CSS3 (Tema 1 – Tema 21)

### Tema 1: Estructura semántica de HTML5
HTML5 introduce etiquetas con significado propio que permiten organizar mejor el contenido:

🔹`<header>`  
🔹 `<nav>`  
🔹 `<main>`  
🔹 `<section>`  
🔹 `<article>`  
🔹 `<aside>`  
🔹 `<footer>`  

Estas etiquetas ayudan a la organización del código y al SEO.

---

### Tema 2: Etiquetas básicas
Etiquetas fundamentales para estructurar texto:

🔹 `<p>` párrafos  
🔹`<br>` saltos de línea  
🔹`<h1> - <h6>` encabezados  
🔹`<b>` negrita  
🔹`<i>` cursiva  

---

### Tema 3: Imágenes, listas y enlaces
HTML permite agregar:

🔹 `<img>` para imágenes  
🔹 `<ul>` y `<ol>` para listas  
🔹 `<a>` para enlaces  

---

### Tema 4: Introducción a CSS 
CSS permite dar estilo a los elementos HTML. Se puede incluir:

🔹 Inline (`style=""`)  
🔹 Interno (`<style>` en `<head>`)  
🔹 Externo (`<link rel="stylesheet" href="estilos.css">`)  

---

### Tema 5: Propiedades CSS más usadas
🔹 Color y fondo (`color`, `background-color`)  
🔹 Texto (`font-size`, `font-family`, `text-align`)  
🔹Box Model (`margin`, `padding`, `border`)  
🔹 Display (`block`, `inline`, `inline-block`, `flex`)  

---

### Tema 6: Creación de un favicon
🔹 Qué es un favicon (icono en la pestaña del navegador)
🔹Cómo crearlo y vincularlo en la página web

----

### Tema 7: Bordes redondeados (CSS3)
🔹Propiedad `border-radius` para esquinas redondeadas
🔹Aplicable a `<div>`, `<img>` y otros elementos

---

### Tema 8: Sombras (CSS3)
🔹`box-shadow` para sombras en cajas
🔹`text-shadow` para sombras en textos

---

### Tema 9: Imágenes de fondo
🔹 Fondos múltiples (`background-image`)
🔹Control de repetición (`background-repeat`), posición (`background-position`), tamaño (`background-size`) y fijación (`background-attachment`)

---

### Tema 10: Tipografías
🔹 Uso de tipografías web
🔹Fuentes externas con Google Fonts
🔹Uso de `@font-face`

---

### Tema 11: Cajas flotantes (float)
🔹 Uso de `float` para situar elementos lado a lado
🔹Propiedad `clear` para evitar solapamientos

---

### Tema 12: Centrar el contenido
🔹Centrado de textos con `text-align`
🔹Centrado horizontal de cajas con `margin: 0 auto`

---

### Tema 13: Flex, sin dolor
🔹Introducción a Flexbox
🔹Propiedades principales: `display: flex`, `justify-content`, `align-items`, `flex-direction`

---

### Tema 14: Posición de los elementos (position)
🔹`position: relative`, `absolute`, `fixed`
🔹Uso de `top`, `left`, `right`, `bottom`

---

### Tema 15: Transformaciones (transform)
🔹Propiedad `transform` para mover (`translate`), girar (`rotate`), escalar (`scale`) o sesgar (`skew`) elementos

---

### Tema 16: Formularios
🔹Elementos de formulario HTML5
🔹Nuevos tipos de `<input>` y validación sin JavaScript

---

### Tema 17: iframe
🔹Uso de `<iframe>` para incrustar contenido externo
🔹Ejemplos: mapas, vídeos

---

### Tema 18: Transiciones (transition)
🔹Transiciones CSS para animar cambios de estilo
🔹Ejemplos: hover, focus

---

### Tema 19: Columnas de texto
🔹Propiedades `column-count`, `column-gap`
🔹Dividir texto en varias columnas

---

### Tema 20: Vídeo
🔹Insertar vídeos `<video>` en HTML
🔹 Uso de múltiples formatos y controles

---

### Tema 21: Audio
🔹Incluir audios `<audio>` en la página
🔹Controles multimedia modernos sin plugins

---