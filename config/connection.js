var Config = require('../config/Config');
var mongoose = require('mongoose');
var Fawn = require('fawn');
mongoose.Promise = require('bluebird');

var db = mongoose.connection;

db.on('error', function(error){
	console.log(error);
});

db.once('open', function(){
	console.log('Conectado ao MongoDB');
});

mongoose.connect(Config.DB);
Fawn.init(mongoose);

module.exports = mongoose;