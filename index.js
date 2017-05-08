var express = require('express'),
	routes = require('./routes'),
	app = express(),
	Config = require('./config/Config');


//Configurações do servidor

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use('/', routes);

http.listen(Config.SERVER_PORT, function(){
	console.log("Server running on  " + Config.SERVER_PORT);
});