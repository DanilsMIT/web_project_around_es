# Tripleten web_project_around_es

# Around The U.S.

## Descripción del proyecto

**Around The U.S.** es una aplicación web interactiva que permite mostrar y gestionar tarjetas de lugares con imágenes.
El usuario puede editar su perfil, agregar nuevas tarjetas con imágenes de lugares, dar "me gusta" a las tarjetas y eliminarlas si lo desea.

El proyecto está construido utilizando **HTML, CSS y JavaScript**, enfocándose en la manipulación del DOM y la interacción con el usuario.

## Funcionalidades

- ✏️ **Editar perfil**
  Permite cambiar el nombre y la descripción del perfil mediante un formulario emergente (popup).

- 🖼 **Visualización de tarjetas**
  Se muestran tarjetas de lugares con imágenes y títulos.

- ➕ **Agregar nuevas tarjetas**
  El usuario puede añadir nuevas tarjetas indicando el nombre del lugar y el enlace de la imagen.

- ❤️ **Dar "Me gusta" a las tarjetas**
  Cada tarjeta tiene un botón de like que puede activarse o desactivarse.

- 🗑 **Eliminar tarjetas**
  Las tarjetas pueden eliminarse individualmente.

- 🔍 **Ver imagen ampliada**
  Al hacer clic en una imagen de tarjeta, se abre un popup mostrando la imagen en tamaño grande con su título.

## Tecnologías utilizadas

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla JS)**
- Manipulación del **DOM**
- Uso de **templates HTML**
- Manejo de **event listeners**
- Control de **popups/modales**

## Estructura del proyecto

📁 project
├── index.html
├── scripts
│ └── index.js
├── pages
│ └── index.css
├── images
└── README.md

## Funcionamiento del proyecto

1. Al cargar la página se renderizan tarjetas iniciales definidas en JavaScript.
2. El botón **editar perfil** abre un popup donde se pueden modificar los datos del perfil.
3. El botón **agregar tarjeta** abre un formulario para crear nuevas tarjetas.
4. Cada tarjeta tiene botones para:
   - Dar "like"
   - Eliminar la tarjeta

5. Al hacer clic en una imagen se abre un popup con la imagen ampliada.
