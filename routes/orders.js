const { Router } = require('express');
// const auth = require('../middleware/auth.middleware.js');
const router = Router();
const Orders = require('../models/Orders');
const paginate = require('../middleware/paginate.middleware');

const ordersController = require('../controllers/orders.js');

router.get('/', paginate(Orders), ordersController.ordersGet);
router.post('/', ordersController.ordersPost);

// router.get('/', ordersController.newOrdersPost);


module.exports = router;
