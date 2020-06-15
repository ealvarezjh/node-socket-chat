var searchParams = new URLSearchParams(window.location.search);

var name = searchParams.get('nombre');
var sala = searchParams.get('sala');


var divUsuarios = $('#divUsuarios');
var formEnviar = $('#formEnviar');
var txtMensaje = $('#txtMensaje');
var divChatbox = $('#divChatbox');

function renderizarUsuarios(usuarios) {

    console.log(usuarios);
    var htmlUsuarios = '';

    htmlUsuarios += '<li>';
    htmlUsuarios += '<a href="javascript:void(0)" class="active"> Chat de <span>' + sala + '</span></a> ';
    htmlUsuarios += '</li>';

    for (let i = 0; i < usuarios.length; i++) {

        htmlUsuarios += '<li>';
        htmlUsuarios += '<a data-id="' + usuarios[i].id + '" href="javascript:void(0)"><img src="assets/images/users/1.jpg" alt="user-img" class="img-circle"> <span>' + usuarios[i].name + '<small class = "text-success"> online </small></span> </a>';
        htmlUsuarios += '</li>';
    }


    divUsuarios.html(htmlUsuarios);
}


function renderizarMensajes(mensaje, yo) {

    var htmlMensaje = '';
    var fecha = new Date(mensaje.date);
    var hora = fecha.getHours() + ':' + fecha.getMinutes();
    var classAdmin = 'info';

    if (mensaje.name === 'Deleted') { classAdmin = 'danger'; }
    if (mensaje.name === 'Add') { classAdmin = 'success'; }


    if (yo) {

        htmlMensaje += '<li class="reverse">';
        htmlMensaje += '    <div class="chat-content">';
        htmlMensaje += '        <h5>' + mensaje.name + '</h5>';
        htmlMensaje += '        <div class="box bg-light-inverse">' + mensaje.msg + '</div>';
        htmlMensaje += '    </div>';
        htmlMensaje += '    <div class="chat-img"><img src="assets/images/users/5.jpg" alt="user" /></div>';
        htmlMensaje += '    <div class="chat-time">' + hora + '</div>';
        htmlMensaje += '</li>';

    } else {

        htmlMensaje += '<li class="animated fadeIn">';

        if (mensaje.name != 'Deleted' && mensaje.name != 'Add') {
            htmlMensaje += '  <div class="chat-img"><img src="assets/images/users/1.jpg" alt="user" /></div>';
        }

        htmlMensaje += '    <div class="chat-content">';
        htmlMensaje += '        <h5>' + mensaje.name + '</h5>';
        htmlMensaje += '        <div class="box bg-light-' + classAdmin + '">' + mensaje.msg + '</div>';
        htmlMensaje += '    </div>';
        htmlMensaje += '  <div class="chat-time">' + hora + '</div>';
        htmlMensaje += '</li>';
    }

    divChatbox.append(htmlMensaje);
}


function scrollBottom() {

    // selectors
    var newMessage = divChatbox.children('li:last-child');

    // heights
    var clientHeight = divChatbox.prop('clientHeight');
    var scrollTop = divChatbox.prop('scrollTop');
    var scrollHeight = divChatbox.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight() || 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        divChatbox.scrollTop(scrollHeight);
    }
}


// Listeners

divUsuarios.on('click', 'a', function() {

    var id = $(this).data('id');
    if (id) {
        console.log(id);
    }
});


formEnviar.on('submit', function(e) {

    e.preventDefault();

    if (txtMensaje.val().trim().length === 0) {
        return;
    }

    socket.emit('crearMensaje', {
        name: name,
        msg: txtMensaje.val()
    }, function(mensaje) {

        txtMensaje.val('').focus();
        renderizarMensajes(mensaje, true);
        scrollBottom();

    });

});