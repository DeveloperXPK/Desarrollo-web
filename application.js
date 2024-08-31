'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const path = require('path');

const application = express();

application.use(bodyParser.urlencoded({extended: false}));

application.use(bodyParser.json());
application.use(routes);
application.use('/images', express.static(path.join(__dirname, 'images')));
module.exports = application;