const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');

const Users = require('../models/Users.js');

const router = Router();
const JWT_SECRET = config.get('JWT_SECRET');

router.post('/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const newUser = await Users.findOne({ email });

    if (newUser) {
      return res.status(400).json({ message: 'This user is already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new Users({ email, password: hashedPassword, firstName, lastName });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await Users.findOne({ email });

    if (!newUser) {
      return res.status(401).json({ message: 'This user not found' });
    }

    const isMatch = await bcrypt.compare(password, newUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'This user not found' });
    }

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const user = {
      id: newUser._id,
      email: newUser.email,
    };

    res.json({ token, user });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

module.exports = router;
