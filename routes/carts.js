const { Router } = require('express');
const router = Router();

const cartsController = require('../controllers/carts.js');

router.post('/', cartsController.addItemToCart);
router.get('/', cartsController.cartsGet);

// router.get('/new', ordersController.newOrdersPost);

// router.post('/new', ordersController.ordersPost);

module.exports = router;
