const { Router } = require('express');
// const auth = require('../middleware/auth.middleware.js');

const router = Router();
const categoriesController = require('../controllers/categories');

router.get('/', categoriesController.categoriesGet);

router.post('/', categoriesController.categoriesPost);

module.exports = router;
