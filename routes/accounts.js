const { Router } = require('express');
const router = Router();
const accountsController = require('../controllers/accounts');
const paginate = require('../middleware/paginate.middleware');
const User = require('../models/User');

router.get('/', accountsController.accountsGet);
router.post('/', accountsController.accountPost);
router.get('/all', paginate(User), accountsController.UserGet);

module.exports = router;
