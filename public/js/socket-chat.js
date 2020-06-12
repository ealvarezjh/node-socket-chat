var socket = io();


// ==================================
// Obtenemos el nombre como parámetro
// ==================================
var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('nombre') || !searchParams.has('sala')) {

    window.location = 'index.html';
    throw new Error('Es necesario indicar el nombre y la sala.')
}

var newUser = {
    name: searchParams.get('nombre'),
    room: searchParams.get('sala')
}


// ========================
// Configuración de sockets
// ========================

// Establece conexión con el server y emite un mensaje al ingresar al chat
socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('entrarChat', newUser, function(resp) {
        console.log(resp);
    });

});


// Recibe un mensaje personalizado
socket.on('crearMensaje', function(data) {
    console.log(data);
});


// Verifica la lista de usuarios conectados
socket.on('listaChat', function(data) {
    console.log(data);
});


// Escucha mensajes(privados) a un usuario específico 
socket.on('mensajePrivado', function(data) {
    console.log(data);
});


// Pendiente de la conexión con el server
socket.on('disconnect', function() {
    console.log('Perdimos conexión con el servidor');
});