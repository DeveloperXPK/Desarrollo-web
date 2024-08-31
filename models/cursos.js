'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const CursosSchema = Schema({
    nombre: String,
    duracion_horas: Number,
    precio: Number
})

module.exports = mongoose.model('Cursos', CursosSchema)