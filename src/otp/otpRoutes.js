const express = require('express');
const myRoutes = express.Router();
const otpController = require('./otpController');


myRoutes.use('/verifyOTP', otpController.verifyOTP);


module.exports = myRoutes;