const mongoose = require('mongoose');
  
var logSchema = new mongoose.Schema({  	
	fecha: Date,
	tipo: String,
	texto: String
});  
  
//Pregunta => Collection
module.exports = mongoose.model('logSistema', logSchema);

