const { Router } = require('express');
const router = Router();
const accountsController = require('../controllers/accounts');

router.get('/', accountsController.accountsGet);

module.exports = router;
