const preguntaSchema = require('../modelo/pregunta.js');
const logModel = require('../modelo/log.js');
const usuarioModel = require('../modelo/usuario.js');
var funciones = require("../utilitario/funciones.js");

// getting-started.js
const mongoose = require('mongoose');
//mongoose.connect('mongodb://localhost:27017/prepo1', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb://prepoadmin:333@localhost:27017/prepo1', {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("we're connected!");
});
//Pregunta => Collection
const Pregunta = mongoose.model('preguntav1', preguntaSchema.Pregunta);


const question = new Pregunta(
{
	id: 1,
	dificultad: 1,
	materia: 1,
	tiempo: 30,
	pregunta: "¿Cual es la velocidad de la luz :);) en el vacío?",	
	respuesta: {
		 A: "3.14 m/s"
		,B: "e m/s"
		,C: " 3·10⁸ m/s"
		,D: " 1000000000 m/s"
	},
	correcta: "C"
}
);

console.log(question.pregunta); // 'Silence'

let guardar = () => {
	
	question.save(function(err, doc) {
	  if (err){
		  return console.error(err);
	  }
	  console.log("Document inserted succussfully!");
	  return "Document inserted succussfully!";
	});

	
}
///////////////
const Log = mongoose.model('logSistema', logModel.logSchema);



const guardarLog = (logFecha, logTipo, logTexto) => {
	
const log = new Log(
	{fecha: logFecha, tipo: logTipo, texto: logTexto}
);	
	
	log.save(function(err, doc) {
	  if (err){
		  return console.error(err);
	  }
	  //console.log("Log guardado!");
	  return "Log guardado!";
	});

	
}

const Usuario = mongoose.model('Usuario', usuarioModel.usuarioSchema);

const todosUsuarios = async () => {	
	let usuarios = await Usuario.find();
	//console.log(usuarios);
	return usuarios;	
}



var preguntas = () =>{	
	var temp = Pregunta.find({});
	console.log(temp);
}

var prueba = Pregunta.find({});
	
module.exports = {preguntas, prueba, guardar, guardarLog, todosUsuarios}


