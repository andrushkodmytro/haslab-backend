const Orders = require('../models/Orders');
const Users = require('../models/Users');
const Products = require('../models/Products');
const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET = config.get('JWT_SECRET');

exports.ordersGet = async (req, res) => {
  try {
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

    const orders = await Orders.find({ companyId: user.companyId }).populate('companyId', 'name').lean();

    res.json({
      message: 'Get',
      data: { count: orders.length, data: orders },
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.newOrdersPost = async (req, res) => {
  try {
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

    const products = await Products.find({
      companyId: user.companyId,
    }).lean();

    res.json({ message: 'Get', data: products || [] });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.ordersPost = async (req, res) => {
  try {
    const { companyId, client, status, orderItems } = req.body;

    if (!client) {
      res.status(422).json({ message: 'Client name is required.' });
    }

    if (!companyId) {
      res.status(422).json({ message: 'Order companyId is required.' });
    }

    if (!orderItems) {
      res.status(422).json({
        message: 'OrderItems productId is required.',
      });
    }

    const products = await Products.find({ companyId });

    const order = orderItems.map((order) => {
      const product = products.find(({ id, price }) => order.productId === id);
      const sum = product.price * order.quantity;
      return { ...order, sum };
    });

    const newOrder = new Orders({
      companyId,
      client,
      status,
      orderItems: order,
    });
    await newOrder.save();

    res.status(201).json({
      message: 'New order is created.',
      product: newOrder,
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
