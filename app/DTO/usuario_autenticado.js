

let usuarioAutenticado = {
    rol: "",
	email: "",
	nombre: "",
	fotografia: "",
	autenticacionHash: ""
};

function updateRol(nuevoRol){
    usuarioAutenticado.rol = nuevoRol; 
}

function updateEmail(nuevoEmail){
    usuarioAutenticado.email = nuevoEmail; 
}

function updateNombre(nuevoNombre){
    usuarioAutenticado.nombre = nuevoNombre; 
}

function updateFotografia(nuevaFotografia){
    usuarioAutenticado.fotografia = nuevaFotografia; 
}

function updateHash(nuevoHash){
    usuarioAutenticado.autenticacionHash = nuevoHash; 
}

function getUsuarioAutenticado(){
    return this.usuarioAutenticado;
}
module.exports = {
    usuarioAutenticado, updateRol, updateEmail, updateNombre, updateFotografia, updateHash, getUsuarioAutenticado};
