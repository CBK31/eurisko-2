const express = require('express');
const myRoutes = express.Router();

const categoryController = require('./categoryController');


myRoutes.use('/add', categoryController.addCateg);

module.exports = myRoutes;
