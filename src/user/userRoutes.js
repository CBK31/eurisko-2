const express = require('express');
const myRoutes = express.Router();
const userController = require('./userController');


myRoutes.use('/signUp', userController.signUp);
myRoutes.use('/login', userController.login);
myRoutes.use('/forgetpassword', userController.forgetpassword);

module.exports = myRoutes;