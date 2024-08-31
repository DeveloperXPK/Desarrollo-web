'use strict'
const express = require('express');
const holaMundoController = require('../controllers/holamundo');
const homeController = require('../controllers/home');
const cursosController = require('../controllers/cursos');

const routes = express.Router();

routes.get('/api/greeting', holaMundoController.greeting);
routes.get('/api/home', homeController.home);
routes.post('/api/curso', cursosController.crearCurso);
routes.put('/api/curso/:_id', cursosController.editarCurso);
routes.get('/api/curso/:_id', cursosController.obtenerCurso);
routes.delete('/api/curso/:_id', cursosController.eliminarCurso);
routes.get('/api/curso/eliminados', cursosController.obtenerEliminados)
module.exports = routes;