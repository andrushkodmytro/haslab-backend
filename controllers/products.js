const Products = require('../models/Products');
const Users = require('../models/Users.js');
const Categories = require('../models/Categories.js');
const jwt = require('jsonwebtoken');
const config = require('config');
const JWT_SECRET = config.get('JWT_SECRET');

exports.productsGet = async (req, res) => {
  try {
    res.json({
      ...res.paginatedResult,
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.productsPost = async (req, res) => {
  try {
    const { headers } = req;
    const { name, description, price, categoryId } = req.body;

    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const { companyId } = await Users.findById(id).lean();

    if (!name) {
      res.status(422).json({ message: 'Product name is required.' });
    }

    if (!categoryId) {
      res.status(422).json({ message: 'CategoryId is required.' });
    }

    const product = await Products.find({ name });

    if (product.length) {
      res.status(422).json({
        message: 'Product with this name is already exist.',
      });
    }

    const newProduct = new Products({ name, description, price, companyId, categoryId });

    await newProduct.save();

    res.status(201).json({
      message: 'New product is created.',
      product: { name, companyId },
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.newProductsGet = async (req, res) => {
  const { headers } = req;

  try {
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await Users.findById(id).lean();
    const { companyId } = user;

    const categories = await Categories.find({ companyId: companyId }).select('_id companyId name description');

    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
