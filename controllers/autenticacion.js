const bcrypt = require('bcryptjs');
const token = require('../helpers/autenticacion');
const Usuario = require('../models/usuarios');

function registrarUsuario(req, res){
    const {nombre, apellidos, email, password} = req.body; // Se obtienen los datos del body
    
    const salt = bcrypt.genSaltSync(10); 
    // Se genera un salt para el password (Un salt es un valor aleatorio que se añade al password para hacerlo más seguro)
    
    const passwordHash = bcrypt.hashSync(password, salt); // Se hashea el password
    
    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.apellidos = apellidos;
    usuario.email = email;
    usuario.password = passwordHash;

    usuario.save()
    .then(
        (usuarioGuardado) => {
            res.status(200)
            .send({usuario: usuarioGuardado});
        },
        err => {
            res.status(500)
            .send({message: "Error al guardar el usuario"});
        }
    )
}

function iniciarSesion(req, res){
    const {email, password} = req.body;
    Usuario.findOne({email: email}) // findOne busca un documento en la colección que cumpla con las condiciones
    .then(
        (UsuarioEncontrado) => {
            if(!UsuarioEncontrado){
                res.status(404)
                .send({message: "Usuario no encontrado"});
            } else {
                // Se compara el password ingresado con el password hasheado
                if(bcrypt.compareSync(password, UsuarioEncontrado.password)){ 
                    res.status(200)
                    .send({
                        message: "Inicio de sesión correcto",
                        token: token.generarTokenUsuario(UsuarioEncontrado) // Se genera un token para el usuario
                    })
                } else {
                    res.status(403)
                    .send({message: "Credenciales incorrecta"})
                }
            }
        },
        err => {
            res.status(500)
            .send({message: "Error al buscar usuario"})
        }
    )
}

module.exports = {
    registrarUsuario, 
    iniciarSesion
}