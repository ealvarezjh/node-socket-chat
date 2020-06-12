const { io } = require('../server');

const { User } = require('../classes/User');

const { createMessage } = require('../utilities/utilities');

const user = new User();


// ========================
// Configuración de sockets
// ========================

// Establece la conexión 
io.on('connection', (client) => {

    // El usuario se une al chat y se agrega a la lista 
    client.on('entrarChat', (data, callback) => {

        if (!data.name || !data.room) {
            callback({
                ok: false,
                err: 'Es necesario indicar el nombre y la sala.'
            })
        }

        // Agregamos usuarios a una sala
        client.join(data.room);

        user.addUser(client.id, data.name, data.room);

        // Se utiliza para actualizar la lista en caso de reconexión
        client.broadcast.to(data.room).emit('listaChat', user.getUsersByRoom(data.room));
        callback(user.getUsersByRoom(data.room));
    });


    // Escuchar una mensaje del usuario y retransmitir a todos los usuarios
    client.on('crearMensaje', (data) => {

        let person = user.getUser(client.id);
        client.broadcast.to(person.room).emit('crearMensaje', createMessage(person.name, data.msg));
    });


    // Escucha mensajes(privados) a un usuario específico 
    client.on('mensajePrivado', (data) => {

        let person = user.getUser(client.id);
        client.broadcast.to(person.id).emit('mensajePrivado', createMessage(person.name, data.msg));
    });


    client.on('disconnect', () => {

        let userDeleted = user.deleteUser(client.id);

        // Informa de la desconexión de un usuario
        client.broadcast.to(userDeleted.room).emit('crearMensaje', createMessage('admin', `${ userDeleted.name } salió.`));
        // Actualiza la lista de usuarios conectados
        client.broadcast.to(userDeleted.room).emit('listaChat', user.getUsersByRoom(userDeleted.room));
    });

});