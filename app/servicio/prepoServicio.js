const fs = require('fs');
const jwt = require('jsonwebtoken');

var prepoDao = require("../DAO/prepoDao.js");
var funciones = require("../utilitario/funciones.js");
let usuarioAutenticado = require("../DTO/usuario_autenticado.js");
let usuarioAutenticadoError = require("../DTO/usuario_autenticado.js");

//variable global almacena todos los usuarios registrados
var usuarios = [];
//var bodyParser = require('body-parser');

let fecha = () => {
    return new Date();
}

let saludo = () => {
    return "hola";
}

let pi = 3.1416;

let guardarServicio = (req, res) => {
  //console.log(req);
  //res.json({ message: prepoDao.preguntas()});
  res.send(prepoDao.guardar());
}



const autenticacion = (req, res) => {

		//console.log("autenticacion 0",typeof req.body, req.body);	
		let email = "", password = "";
		console.warn("data ini",req.body.email, req.body.password);
	  
	  if(funciones.string_indefinido_null_vacio(req.body.email) && funciones.string_indefinido_null_vacio(req.body.password)){
		  email = req.body.email;  
		  password = req.body.password;  
		  //console.log("usuarios ",usuarios);
		  const usuario_encontrado = funciones.buscar_usuario_por_email(email, usuarios);
		  if(usuario_encontrado != false){
			
			if(usuario_encontrado.password == password){
				//return usuario_encontrado;
				console.log(usuario_encontrado);
				res.send(usuario_encontrado);				
			}
			else{
				console.log("Error Autenticación password");
				prepoDao.guardarLog(Date.now(),"Error Autenticación Password", "Servicio Autenticación");				
				
				return false;
			}
			
		  }
		  else{
			console.log("Error Autenticación Email");
			prepoDao.guardarLog(Date.now(),"Error Autenticación Email", "Servicio Autenticación");
			return false;
			
		  } 
		  
		  
		  //let jsonPrueba = [{"_id":{"$oid":"61427a3de47b92ea78f890c6"},"id":1,"rol":"Administrador","email":"ivan.velasco.333@gmail.com","password":"1234"},{"_id":{"$oid":"61427a3de47b92ea78f890c6"},"id":1,"rol":"Administrador","email":"ivan.velasco.333@gmail.com","password":"1234"}];
		  
		  //console.log("check array)", funciones.check_json(usuarios));		  

	  }
	  else{
			console.log("Error Null Email Password");
			prepoDao.guardarLog(Date.now(),"Error Null Email Password", "Servicio Autenticación");
			
			return false;		  

	  }
	  
	  
	  

	  /*res.send({
		'user_id': 123,
		'token': 123,
		'geo': 141234333
	  });	*/

}


const RSA_PRIVATE_KEY = fs.readFileSync('./app/pk/private.key');
const autenticacionHash = (req, res) => {

		//console.log("autenticacion 0",typeof req.body, req.body);	
		let email = "", password = "";
		console.warn("data ini",req.body.email, req.body.password);
	  
	  if(funciones.string_indefinido_null_vacio(req.body.email) && funciones.string_indefinido_null_vacio(req.body.password)){
		  email = req.body.email;  
		  password = req.body.password;  
		  //console.log("usuarios ",usuarios);
		  let usuario_encontrado = funciones.buscar_usuario_por_email(email, usuarios);
		  if(usuario_encontrado != false){
			
			if(usuario_encontrado.password == password){
				//return usuario_encontrado;				
				let email = req.body.email, password = req.body.password;
				
				//const jwtBearerToken = jwt.sign(			
				jwt.sign(
				//{correo: email, pass: password}
				{}
				, {key: RSA_PRIVATE_KEY, passphrase: 'apocalipcis'}
				//, {algorithm: 'RS256', expiresIn: 120, subject: usuario_encontrado._id.toString()}
				, {algorithm: 'RS256', expiresIn: 120}
				, function(err, token) {
					usuarioAutenticado.updateRol(usuario_encontrado.rol);
					usuarioAutenticado.updateEmail(usuario_encontrado.email);
					usuarioAutenticado.updateNombre(usuario_encontrado.nombre);
					usuarioAutenticado.updateFotografia(usuario_encontrado.fotografia);					
					usuarioAutenticado.updateHash(token);									
					res.send(usuarioAutenticado.getUsuarioAutenticado());
					
				}				
				)																
				
			}
			else{
				console.log("Error Autenticación password");
				prepoDao.guardarLog(Date.now(),"Error Autenticación Password", "Servicio Autenticación");
				res.send(usuarioAutenticadoError);
			}
			
		  }
		  else{
			console.log("Error Autenticación Email");
			prepoDao.guardarLog(Date.now(),"Error Autenticación Email", "Servicio Autenticación");
			res.send(usuarioAutenticadoError);
		  }
		  
		  
		  //let jsonPrueba = [{"_id":{"$oid":"61427a3de47b92ea78f890c6"},"id":1,"rol":"Administrador","email":"ivan.velasco.333@gmail.com","password":"1234"},{"_id":{"$oid":"61427a3de47b92ea78f890c6"},"id":1,"rol":"Administrador","email":"ivan.velasco.333@gmail.com","password":"1234"}];
		  
		  //console.log("check array)", funciones.check_json(usuarios));		  

	  }
	  else{
			console.log("Error Null Email Password");
			prepoDao.guardarLog(Date.now(),"Error Null Email Password", "Servicio Autenticación");
			res.send(usuarioAutenticadoError);
	  }
	  
	  
	  

	  /*res.send({
		'user_id': 123,
		'token': 123,
		'geo': 141234333
	  });	*/

}


var temp = 0;
const log_sistema = (err, req, res, next) => {
	
	//console.error(err.stack, temp++);
	//res.status(500).send('Something broke!');	
	prepoDao.guardarLog(Date.now(),"Error Request Json", err.stack);
	res.status(400).send("Bad request!");
	
}


const cargarUsuarios = async () => {
	usuarios = await prepoDao.todosUsuarios();
	//console.log("inicio ",usuarios);
}



module.exports = {fecha,saludo, pi, guardarServicio, autenticacion, autenticacionHash, log_sistema, cargarUsuarios};