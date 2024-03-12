const express = require('express');
const myRoutes = express.Router();
const complaintController = require('./complaintController');
const { verifyToken } = require('../validations/tokenValidation');

myRoutes.use('/submit', verifyToken, complaintController.submit);
myRoutes.use('/getcomplaints', verifyToken, complaintController.getComplaints);
myRoutes.use('/getacomplaint', verifyToken, complaintController.getAComplaint);



module.exports = myRoutes;