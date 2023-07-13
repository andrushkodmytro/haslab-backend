const { Router } = require('express');
const paginate = require('../middleware/paginate.middleware');
const Rooms = require('../models/Room');
// const auth = require('../middleware/auth.middleware.js');

const router = Router();
const roomsController = require('../controllers/rooms');

router.get('/', paginate(Rooms), roomsController.roomsGet);

router.post('/', roomsController.roomsPost);

module.exports = router;
