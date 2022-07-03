const mongoose = require('mongoose');
  
var preguntaSchema = new mongoose.Schema({  	
	id: Number,
	dificultad: Number,
	materia: Number,
	tiempo: Number,
	pregunta: String,	
	respuesta: {A: String, B: String, C: String, D: String},
	correcta: String		
});  
  
//Pregunta => Collection
module.exports = mongoose.model('preguntav1', preguntaSchema);

