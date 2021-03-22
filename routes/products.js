const { Router } = require('express')
// const auth = require('../middleware/auth.middleware.js');
const Products = require('../models/Products')
const router = Router()
const paginate = require('../middleware/paginate.middleware')

const productsController = require('../controllers/products.js')

router.get('/', paginate(Products), productsController.productsGet)

router.post('/', productsController.productsPost)

module.exports = router
