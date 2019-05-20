/*
 * El servidor de la aplicación 
 */

var app = require('express')();

// Maneja los archivos estaticos que estn en el directorio public
const express = require('express');
const app_ = express();
app.use(express.static(__dirname + '/public'));

/*
 * Se suministra la app al servidor http
 */
var http = require('http').createServer(app);

/* 
 * Se inicializa una instancia del socket pasandole
 * el servidor http como parámetro
 */
var io = require('socket.io')(http);
var people = {};
/*
 * Se define como raíz de ruta a / que será
 * llamado cuando se inicie el sitio web y se provee
 * la página web
 */
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});



/*
 * Escucha por los eventos de conexiones
 * y el evento chat message cuando un usuario
 * ha enviado algún mensaje por el chat
 */
io.on('connection', function(socket) {
	console.log("Usuario conectado");
/*	
	client.on("join", function(name){
		people[client.id] = name;
		client.emit("update", "You have connected to the server.");
		socket.sockets.emit("update", name + " has joined the server.")
		socket.sockets.emit("update-people", people);
	});

	client.on("disconnect", function(){
		socket.sockets.emit("update", people[client.id] + " has left the server.");
		delete people[client.id];
		socket.sockets.emit("update-people", people);
	});

	/*socket.on('send-nickname', function(nickname) {
		socket.nickname = nickname;
		users.push(socket.nickname);
		console.log(users);
	});*/

	socket.on('chat message', function(msg) {
		console.log("emit message: " + msg);
		io.emit('chat message', msg);
	});
});


/*
 * El servidor escucha en el puerto 8000
 */
http.listen(8000, function() {
	console.log('listening on *:8000');
});