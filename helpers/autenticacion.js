const jwt = require('jwt-simple'); // jwt nos permite generar tokens de autenticación
const moment = require('moment'); // moment nos validar la vigencia del token

let secret = "masdfARAWEWRGSA234345..!asdfsfs32345!.SADNNL"

function generarTokenUsuario(usuario){
    const payload = {
        sub: usuario._id,
        name: usuario.nombre,
        email: usuario.email,
        iat: moment.unix(),
        exp: moment().add(10, 'minutes').unix(),
    }
    return jwt.encode(payload, secret);
}

function validarToken(req, res, nextStep){
    try{
        const tokenEnviadoPorUsuario =  
            req.headers.authorization.split(" ")[1]; 
            
            /* 
            * Se hace el split ya que a veces el token viene precedido por "Bearer" y un espacio
            * y solo necesitamos el token, asi que tomamos el segundo elemento del array
            */

            const payload = jwt.decode(tokenEnviadoPorUsuario, secret); 
            // Si se puede decodificar utilizando el secret el token es valido

            req.header.UserId = payload.sub; // Para recordar al backend que usuario hizo la petición y se logueo

            nextStep();

            
    } catch(err) {
        res.status(403)
        .send({message: "Token invalido"});
    }
}

module.exports = {
    generarTokenUsuario,
    validarToken
}