'use strict'

const Cursos = require('../models/cursos')

// Función para crear un curso
function crearCurso (req, res) {
    const cursoRecibido = req.body

    const nuevoCurso = new Cursos()
    nuevoCurso.nombre = cursoRecibido.nombre
    nuevoCurso.duracion_horas = cursoRecibido.duracion_horas
    nuevoCurso.precio = cursoRecibido.precio

    nuevoCurso.save()
    .then(
        (cursoGuardado) => {
            res.status(200)
            .send({cursoCreado: cursoGuardado})
        },
        err => {
            res.status(500)
            .send({message: "No se pudo crear curso"})
        }
    )
}

// Función para editar un curso
function editarCurso (req, res) {
    const idCurso = req.params._id
    const datosCurso = req.body

    const cursoEditar = new Cursos()
    cursoEditar._id = idCurso
    cursoEditar.nombre = datosCurso.nombre
    cursoEditar.duracion_horas = datosCurso.duracion_horas
    cursoEditar.precio = datosCurso.precio

    Cursos.findByIdAndUpdate(
        idCurso, 
        cursoEditar, 
        {new: true} // {new: true} para que devuelva el curso actualizado
    ) 
    .then(
        (cursoEditado) => {
            res.status(200)
            .send({cursoEditado: cursoEditado})
        },
        err => {
            res.status(500)
            .send({message: "No se pudo editar curso"})
        }
    )
}

function eliminarCurso (req, res) {
    const idCurso = req.params._id
    // Se podria crear un array de los cursos eliminados
    Cursos.findByIdAndDelete(idCurso)
    .then(
        (cursoEliminado) => {
            eliminados.append(cursoEliminado)
            res.status(200).send({cursoEliminado: cursoEliminado})
        },
        err => {
            res.status(500).send({message: 'No se pudo eliminar el curso'})
        }
    )

}

// Función para obtener un curso
function obtenerCurso (req, res) {
    const idCurso = req.params._id

    Cursos.findById(idCurso)
    .then(
        (cursoEncontrado) => {
            res.status(200)
            .send({curso: cursoEncontrado})
        },
        err => {
            res.status(404)
            .send({message: "Curso no encontrado"})
        }
    )
}


module.exports = {
    crearCurso,
    obtenerCurso,
    editarCurso,
    eliminarCurso
}