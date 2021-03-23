const { Router } = require('express');
const auth = require('../middleware/auth.middleware.js');

const router = Router();
const companiesController = require('../controllers/companies');

router.get('/', companiesController.companiesGet);

router.post('/', companiesController.companiesPost);

module.exports = router;
