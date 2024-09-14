'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const DeportesSchema = Schema({
    nombre: String,
    jugadores: Number
})

module.exports = mongoose.model('Deportes', DeportesSchema)