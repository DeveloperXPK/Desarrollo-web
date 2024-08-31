'use strict'
const application = require('./application');
const mongoose = require('mongoose');

const desiredPORT = process.env.PORT ?? 3000;

mongoose.connect('mongodb://localhost:27017/desarrolloweb')
    .then(
        () => {
            console.log('Conexión a la base de datos establecida');
            application.listen(desiredPORT, () => {
                console.log(`Servidor corriendo en el puerto http://localhost:${desiredPORT}`);
            });
        },
        err => {
            console.log('Error al conectar a la base de datos', err);
        }
    )