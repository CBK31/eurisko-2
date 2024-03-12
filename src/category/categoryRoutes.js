const express = require('express');
const myRoutes = express.Router();
const { verifyToken } = require('../validations/tokenValidation');
const { userIsAdmin } = require('../validations/isAdmin');
const categoryController = require('./categoryController');


myRoutes.use('/add', verifyToken, userIsAdmin, categoryController.addCateg);
myRoutes.use('/getcategories', verifyToken, userIsAdmin, categoryController.getcategories);
myRoutes.use('/getcategory', verifyToken, userIsAdmin, categoryController.getOnecategory);



module.exports = myRoutes;
