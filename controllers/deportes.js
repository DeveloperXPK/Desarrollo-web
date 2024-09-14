'use strict'
const Deportes = require('../models/deportes');

// Función para crear un deporte en la base de datos de MongoDB deportes
function crearDeporte(req, res) {
    const deporteRecibido = req.body;

    const nuevoDeporte = new Deportes()
    nuevoDeporte.nombre = deporteRecibido.nombre
    nuevoDeporte.jugadores = deporteRecibido.jugadores

    nuevoDeporte.save()
    .then(
        (deporteGuardado) => {
            res.status(200)
            .send({deporteCreado: deporteGuardado})
        },
        err => {
            res.status(500)
            .send({message: "No se pudo crear deporte"})
        }
    )
}

// Función para obtener un deporte con el ID de la base de datos de MongoDB deportes
function obtenerDeporte (req, res) {
    const idDeporte = req.params._id

    Deportes.findById(idDeporte)
    .then(
        (deporteEncontrado) => {
            res.status(200)
            .send({deporteEncontrado: deporteEncontrado})
        },
        err => {
            res.status(500)
            .send({message: "No se pudo encontrar deporte"})
        }
    )
}

// Función para eliminar un deporte con el ID de la base de datos de MongoDB deportes
function eliminarDeporte (req, res) {
    const idDeporte = req.params._id

    Deportes.findByIdAndDelete(idDeporte)
    .then(
        (deporteEliminado) => {
            res.status(200)
            .send({deporteEliminado: deporteEliminado})
        },
        err => {
            res.status(500)
            .send({message: "No se pudo eliminar deporte"})
        }
    )
}

// Función para editar un deporte con el ID de la base de datos de MongoDB deportes
function editarDeporte (req, res) {
    const idDeporte = req.params._id
    const datosDeporte = req.body

    const deporteEditar = new Deportes()

    deporteEditar._id = idDeporte
    deporteEditar.nombre = datosDeporte.nombre
    deporteEditar.jugadores = datosDeporte.jugadores

    Deportes.findByIdAndUpdate(
        idDeporte,
        deporteEditar,
        {new: true}
    )
    .then(
        (deporteEditado) => {
            res.status(200)
            .send({deporteEditado: deporteEditado})
        },
        err => {
            res.status(500)
            .send({message: "No se pudo editar deporte"})
        }
    )
}

module.exports = {
    crearDeporte,
    obtenerDeporte,
    eliminarDeporte,
    editarDeporte
}