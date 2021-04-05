const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('config');
const Users = require('../models/Users.js');
const router = Router();
const JWT_SECRET = config.get('JWT_SECRET');

exports.registerPost = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    const newUser = await Users.findOne({ email });

    if (newUser) {
      return res.status(400).json({ message: 'This user is already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new Users({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};

exports.loginPost = async (req, res) => {
  try {
    const { email, password, remember } = req.body;

    const newUser = await Users.findOne({ email }).select('_id email companyId firstName lastName password');

    if (!newUser) {
      return res.status(401).json({ message: 'This user not found' });
    }

    const isMatch = await bcrypt.compare(password, newUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'This user not found' });
    }

    let expiresIn = '1h';

    if (remember === true) {
      expiresIn = '7d';
    }

    const token = jwt.sign(
      {
        id: newUser._id,
      },
      JWT_SECRET,
      { expiresIn }
    );

    var date = new Date();
    const inc = 1000 * 60 * 60;
    const expiry = date.getTime() + inc;

    res.json({
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
        companyId: newUser.companyId,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        expiry: expiry,
      },
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong!' });
  }
};
