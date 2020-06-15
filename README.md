# Socket Chat

Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web. Desarrollada con NodeJS. Contiene los principios necesarios para desarrollar un chat por medio de socket.

Cuenta con las siguientes características:

BackEnd

* Notificación de ingreso de un nuevo usuario.
* Uso de salas o grupos.
* Envío de mensajes a toda la sala (broadcast).
* Envío de mensajes privados a otros usuarios.
* Notificación de salida de un usuario.
* Actualización de la lista de usuarios conectados.

FrontEnd

* Interfaz propia de chat a todos los usuarios.
* Notificación de aviso cuando un usuario se une o sale del chat.
* Renderización de usuarios y mensajes.
* Función para mantener scroll al nivel de los mensajes.

Recuerden que deben de reconstruir los módulos de node con el comando

```
npm install
```