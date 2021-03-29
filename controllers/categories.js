const jwt = require('jsonwebtoken');
// const auth = require('../middleware/auth.middleware.js');
const Users = require('../models/Users.js');
const Categories = require('../models/Categories.js');

const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');

exports.categoriesGet = async (req, res) => {
  const { headers } = req;

  try {
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await Users.findById(id).lean();
    const { companyId } = user;

    const categories = await Categories.find(companyId);

    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.categoriesPost = async (req, res) => {
  const { headers } = req;
  const { name, description } = req.body;

  try {
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!name) {
      return res.status(421).json({ message: 'Category name is required.' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await Users.findById(id).lean();
    const { companyId } = user;

    let data = { name, companyId };

    if (description) {
      data.description = description;
    }

    const newCategory = new Categories(data);
    newCategory.save();

    res.status(201).json({ message: 'Ok' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
