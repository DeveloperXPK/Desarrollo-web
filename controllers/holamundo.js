'use strict'

function greeting(req, res){
    res.status(200).send({
        message: "Hola mundo"
    });
}

module.exports = {
    greeting
}
