const jwt = require('jsonwebtoken');
// const auth = require('../middleware/auth.middleware.js');
const Users = require('../models/Users.js');

const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');

exports.accountsGet = async (req, res) => {
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
};

exports.accountPost = async (req, res) => {
  const { headers } = req;
  const { firstName, lastName, email } = req.body;

  try {
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    // // const { companyId } = await Users.findById(id).lean();

    if (!firstName) {
      res.status(422).json({ message: 'firstName is required.' });
    }

    if (!lastName) {
      res.status(422).json({ message: 'lastName is required.' });
    }

    if (!email) {
      res.status(422).json({ message: 'email is required.' });
    }

    const { _id: userId } = await Users.findById(id);

    if (!userId) {
      res.status(422).json({
        message: 'user not found',
      });
    }

    const user = await Users.findByIdAndUpdate(
      { _id: userId },
      { $set: { firstName, lastName, email } },
      { new: true }
    );

    res.status(201).json({
      message: 'User is updated',
      user: { firstName: user.firstName, lastName: user.lastName, email: user.email },
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.usersGet = async (req, res) => {
  try {
    res.json({
      ...res.paginatedResult,
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
