const { Router } = require('express');
const router = Router();
const accountsController = require('../controllers/accounts');
const paginate = require('../middleware/paginate.middleware');
const Users = require('../models/Users');

router.get('/', accountsController.accountsGet);
router.post('/', accountsController.accountPost);
router.get('/all', paginate(Users), accountsController.usersGet);

module.exports = router;
