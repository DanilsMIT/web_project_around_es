# Tripleten web_project_around_es

# Around The U.S.

## Descripción del proyecto

**Around The U.S.** es una aplicación web interactiva que permite mostrar y gestionar tarjetas de lugares con imágenes.
En sus versiones más recientes, el proyecto ha sido refactorizado utilizando **Programación Orientada a Objetos (POO)** y conectado a una **API REST** para que toda la información (usuario, tarjetas, likes y avatares) persista de forma remota en un servidor.

## Funcionalidades

- ✏️ **Editar perfil y avatar**
  Permite cambiar el nombre, la descripción y la foto de perfil (avatar) del usuario, guardando los cambios directamente en el servidor mediante peticiones PATCH.
- 🖼 **Visualización de tarjetas**
  Se obtienen y renderizan tarjetas de lugares obtenidas desde el servidor (peticiones GET).
- ➕ **Agregar nuevas tarjetas**
  El usuario puede añadir nuevas tarjetas indicando el nombre del lugar y el enlace de la imagen (petición POST).
- ❤️ **Dar "Me gusta" a las tarjetas**
  Cada tarjeta tiene un botón de like que interactúa con la API (PUT/DELETE) para actualizar el estado en el servidor.
- 🗑 **Eliminar tarjetas**
  Las tarjetas creadas por el usuario pueden eliminarse con una validación previa (popup de confirmación).
- 🔍 **Ver imagen ampliada**
  Al hacer clic en una imagen de tarjeta, se abre un popup mostrando la imagen en tamaño grande con su título.
- ⏳ **Estado de carga y manejo de errores**
  Muestra un _spinner_ de carga global mientras se resuelven las peticiones asíncronas y cuenta con un sistema visual para atrapar y mostrar errores de red.
- ✅ **Validación de formularios**
  Validación visual y de seguridad en tiempo real para todos los campos a través de la clase `FormValidator`.

## Tecnologías utilizadas

- **HTML5** y **CSS3**
- **JavaScript (ES6+)**
- **Programación Orientada a Objetos (POO)** (Clases e instancias)
- **Fetch API** y **Promesas** (`then`, `catch`, `finally`)
- **Módulos ES6** (`import` / `export`)
- Manipulación avanzada del **DOM**

## Estructura principal del código

El proyecto ha evolucionado para usar una arquitectura modular basada en clases:

- `Api.js`: Centraliza las peticiones de red y controla los estados visuales de carga.
- `Card.js`: Instancia y controla los eventos individuales de cada tarjeta.
- `FormValidator.js`: Gestiona las reglas de validación de los inputs.
- `Section.js`, `UserInfo.js`, y clases `Popup`: Administran la inserción en el DOM y el comportamiento de las ventanas modales.
- `index.js`: Actúa como el controlador principal conectando todas las instancias.

## Funcionamiento del proyecto

1. Al iniciar la aplicación, la clase `Api` descarga la información del usuario y las tarjetas iniciales de la base de datos de TripleTen.
2. Mientras la información viaja, un spinner de carga mantiene la UI a la espera.
3. Las modificaciones del usuario (editar datos, cambiar foto o agregar tarjeta) se comunican con el servidor y la interfaz visual solo se actualiza al recibir una confirmación (status 200) [cite: README.md].
