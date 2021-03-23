const { Router } = require('express');
// const auth = require('../middleware/auth.middleware.js');
const router = Router();

const ordersController = require('../controllers/orders.js');

router.get('/', ordersController.ordersGet);

router.get('/new', ordersController.newOrdersPost);

router.post('/new', ordersController.ordersPost);

module.exports = router;
