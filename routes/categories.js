const { Router } = require('express');
const paginate = require('../middleware/paginate.middleware');
const Categories = require('../models/Categories');
// const auth = require('../middleware/auth.middleware.js');

const router = Router();
const categoriesController = require('../controllers/categories');

router.get('/', paginate(Categories), categoriesController.categoriesGet);

router.post('/', categoriesController.categoriesPost);

module.exports = router;
