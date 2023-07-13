const jwt = require('jsonwebtoken');
// const auth = require('../middleware/auth.middleware.js');
const User = require('../models/User.js');
const Rooms = require('../models/Room.js');

const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');

exports.roomsGet = async (req, res) => {
  try {
    res.json({
      ...res.paginatedResult,
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.roomsPost = async (req, res) => {
  const { headers } = req;
  const { name, description } = req.body;

  try {
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!name) {
      return res.status(421).json({ message: 'Room name is required.' });
    }

    // const { id } = jwt.verify(token, JWT_SECRET);

    // const user = await User.findById(id).lean();

    let data = { name };

    if (description) {
      data.description = description;
    }

    const newCategory = new Rooms(data);
    newCategory.save();

    res.status(201).json({ message: 'Ok' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
