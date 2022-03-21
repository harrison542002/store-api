const express = require('express')
const route = express.Router()
const {getAllProducts, getAllProductsStatic} = require('../controllers/products')

route.route('/').get(getAllProducts)
route.route('/static').get(getAllProductsStatic)

module.exports = route