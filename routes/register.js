const { Router } = require('express');
const router = Router();

const registerController = require('../controllers/register.js');

router.post('/register', registerController.registerPost);

router.post('/login', registerController.loginPost);

module.exports = router;
