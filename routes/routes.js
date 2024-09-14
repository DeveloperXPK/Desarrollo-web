'use strict'
const express = require('express');
const holaMundoController = require('../controllers/holamundo');
const homeController = require('../controllers/home');
const cursosController = require('../controllers/cursos');
const deportesController = require('../controllers/deportes');
const autenticacionController = require('../controllers/autenticacion');
const token = require('../helpers/autenticacion');

const routes = express.Router();

// Rutas de prueba o inicio
routes.get('/api/greeting', holaMundoController.greeting);
routes.get('/api/home', homeController.home);



// Metodos para CRUD de cursos
routes.post('/api/curso',  
    token.validarToken , // Se valida el token antes de crear el curso
    cursosController.crearCurso
);

routes.put('/api/curso/:_id', 
    token.validarToken, // Se valida el token antes de editar el curso
    cursosController.editarCurso
);
routes.get('/api/curso/:_id', 
    token.validarToken, // Se valida el token antes de obtener el curso
    cursosController.obtenerCurso
);

routes.delete('/api/curso/:_id', 
    token.validarToken, // Se valida el token antes de eliminar el curso
    cursosController.eliminarCurso
);



// Metodos para CRUD de deportes
routes.post('/api/deporte', 
    token.validarToken, // Se valida el token antes de crear
    deportesController.crearDeporte
);

routes.get('/api/deporte/:_id', 
    token.validarToken, // Se valida el token antes de obtener
    deportesController.obtenerDeporte
);

routes.put('/api/deporte/:_id', 
    token.validarToken, // Se valida el token antes de editar
    deportesController.editarDeporte
);

routes.delete('/api/deporte/:_id', 
    token.validarToken, // Se valida el token antes de eliminar
    deportesController.eliminarDeporte
);

// Rutas para autenticación
routes.post('/api/usuario', autenticacionController.registrarUsuario);
routes.post('/api/login', autenticacionController.iniciarSesion); // Se usa post ya que estamos creando una nueva sesion

module.exports = routes;