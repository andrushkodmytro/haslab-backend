const Orders = require('../models/Orders');
const Users = require('../models/Users');
const Products = require('../models/Products');
const Carts = require('../models/Carts');
const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET = config.get('JWT_SECRET');

exports.ordersGet = async (req, res) => {
  try {
    res.json({
      ...res.paginatedResult,
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.ordersPost = async (req, res) => {
  try {
    const { first_name, last_name, phone, email, city, address } = req.body;
    const { headers } = req;
    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const cart = await Carts.findOne({ owner: id });

    if (!cart) {
      res.status(422).json({
        message: 'Products productId is required.',
      });
    }
    const orderProducts = cart.products.map(({ productId, quantity, price }) => {
      const sum = price * quantity || 0;

      return { productId, quantity, sum };
    });

    const newOrder = new Orders({
      user: id,
      contactInfo: { first_name, last_name, phone, email, city, address },
      products: orderProducts,
    });
    await newOrder.save();

    cart.products = [];

    await cart.save();

    res.status(201).json({
      message: 'New order is created.',
      product: newOrder,
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
