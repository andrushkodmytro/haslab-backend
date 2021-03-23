const { Router } = require('express');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.middleware.js');
const Users = require('../models/Users.js');

const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');
const router = Router();

router.get('/', async (req, res) => {
  const { headers } = req;

  try {
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await Users.findById(id).lean();
    const { email, firstName, lastName } = user;

    res.json({ email, firstName, lastName });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// router.post('/account/logo',upload.single('avatar'), auth, async(req, res) => {
//   const { headers } = req;

//   try {
//   console.log(req,body)
//     const token = headers.authorization.split(' ')[1];`

//     if (!token) {
//       return res.status(401).json({ message: 'Not authorized' });
//     }

//     const { id } = jwt.verify(token, JWT_SECRET);

//     const user = await Users.findById(id).lean()

//     const {email, firstName, lastName} = user;

//     res.json({email, firstName, lastName})

//   } catch (e) {
//     res.status(500).json({message: 'Something went wrong'})
//   }

// });

module.exports = router;
