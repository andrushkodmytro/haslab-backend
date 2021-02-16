const { Router } = require('express');
// const auth = require('../middleware/auth.middleware.js');
const router = Router();

const  productsController= require('../controllers/products.js')

router.get('/', productsController.productsGet );

router.post('/', productsController.productsPost);

module.exports = router;
