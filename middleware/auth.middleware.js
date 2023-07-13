const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

const JWT_SECRET = config.get('JWT_SECRET');

module.exports = async (req, res, next) => {
  const { headers, method } = req;
  if (method === 'OPTIONS') {
    return next();
  }

  try {
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorized' });
  }
};
