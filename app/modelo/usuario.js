const mongoose = require('mongoose');
  
var usuarioSchema = new mongoose.Schema({  		
	rol: String,
	email: String,		
	password: String,
	nombre: String,
	fotografia: String,
	autenticacion_hash: String
});  
  
//Pregunta => Collection
module.exports = mongoose.model('Usuario', usuarioSchema);

