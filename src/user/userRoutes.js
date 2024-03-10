const express = require('express');
const myRoutes = express.Router();

const userController = require('./userController');


myRoutes.use('/signUp', userController.signUp);

module.exports = myRoutes;