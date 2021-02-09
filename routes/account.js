const { Router } = require('express');

const router = Router();

router.get('/account', (req, res) => {
res.json("Hello")


});

module.exports = router;