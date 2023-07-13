const Products = require('../models/Products');
const User = require('../models/User.js');
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
    const { name, description, price, categoryId, roomId, image } = req.body;

    // const token = headers.authorization.split(' ')[1];

    // if (!token) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    // const { id } = jwt.verify(token, JWT_SECRET);

    // const { companyId } = await User.findById(id).lean();

    if (!name) {
      res.status(422).json({ message: 'Product name is required.' });
    }

    if (!categoryId) {
      res.status(422).json({ message: 'CategoryId is required.' });
    }

    if (!roomId) {
      res.status(422).json({ message: 'CategoryId is required.' });
    }

    const product = await Products.find({ name });

    if (product.length) {
      res.status(422).json({
        message: 'Product with this name is already exist.',
      });
    }

    const newProduct = new Products({ name, description, price, categoryId, roomId, image });

    await newProduct.save();

    res.status(201).json({
      message: 'New product is created.',
      product: { name },
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.productGetById = async (req, res) => {
  const { params } = req;

  try {
    if (!params.id) {
      res.status(422).json({ message: 'id is required.' });
    }

    const product = await Products.findById(params.id).lean();

    res.status(200).json(product);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.newProductsGet = async (req, res) => {
  // const { headers } = req;

  try {
    // const token = headers.authorization.split(' ')[1];

    // if (!token) {
    //   return res.status(401).json({ message: 'Not authorized' });
    // }

    const categories = await Categories.find().select('_id companyId name description');

    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
