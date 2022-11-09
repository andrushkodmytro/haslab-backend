const { Router } = require('express');
const router = Router();
const accountsController = require('../controllers/accounts');

router.get('/', accountsController.accountsGet);
router.post('/', accountsController.accountPost);

module.exports = router;
