const { Router } = require('express');
const router = Router();

const cartsController = require('../controllers/carts.js');

router.get('/', cartsController.cartsGet);
router.post('/', cartsController.addItemToCart);
router.post('/remove', cartsController.removeItemFromCart);

module.exports = router;
