const { Router } = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');

const userController = require('../controllers/user.js');

router.post('/register', userController.registerPost);

router.post('/login', userController.loginPost);

router.get('/logout', auth, userController.logoutPost);

router.patch('/me', auth, userController.userUpdate);

router.patch('/:id', auth, userController.userUpdateByAdmin);

router.get('/me', auth, userController.userGet);

module.exports = router;
