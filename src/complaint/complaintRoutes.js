const express = require('express');
const myRoutes = express.Router();
const complaintController = require('./complaintController');
const { verifyToken } = require('../validations/tokenValidation');

myRoutes.use('/submit', verifyToken, complaintController.submit);



module.exports = myRoutes;