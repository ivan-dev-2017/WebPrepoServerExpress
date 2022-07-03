

const string_indefinido_null_vacio = (palabra) => {		
	//console.log("palabra: ",palabra);
	if(palabra == null){
	return false;
	}
	else{
	  if(typeof palabra === 'string'){
		if(palabra.length > 0){
			return true;
		}
		else{
			return false;
		}			  		  
	  }
	  else{
		  return false;
	  }	
	}  
}

const check_json = (objeto_json) => {
	//console.log(typeof objeto_json);
    try {
        let array_check = JSON.stringify(objeto_json);
		
		if (typeof objeto_json === "object" && objeto_json !== null) {
			return true;
		}
		else{
			//console.log("else check_json");
			return false;
		}		
    } catch (e) {
		//console.log("try check_json");
        return false;
    }
}

const buscar_usuario_por_email = (correo_usuario, lista_usuarios) =>{
	if(check_json(lista_usuarios)){				
		const usuario_encontrado = lista_usuarios.find(user => user.email == correo_usuario);
		if(usuario_encontrado != null){
			return usuario_encontrado;
		}
		else{
			return false;
		}
		
	}
	else{
		return false;
	}	
}











module.exports = {string_indefinido_null_vacio, check_json, buscar_usuario_por_email};