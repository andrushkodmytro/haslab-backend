const { Router } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');

const router = Router();

const TOKEN_STR = 'dima';

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.findOne({ email });

    if (newUser) {
      return res.status(400).json({ message: 'This user is already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({ email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const newUser = await User.findOne({ email });

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
        email: newUser.email,
      },
      TOKEN_STR,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
});

module.exports = router;
