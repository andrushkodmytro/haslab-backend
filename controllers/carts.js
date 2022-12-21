const Orders = require('../models/Orders');
const Users = require('../models/Users');
const Carts = require('../models/Carts');
const jwt = require('jsonwebtoken');
const config = require('config');

const JWT_SECRET = config.get('JWT_SECRET');

exports.cartsGet = async (req, res) => {
  try {
    const { headers } = req;

    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const cart = await Carts.findOne({ owner: id });

    res.json({
      message: 'Get',
      data: cart || [],
    });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.addItemToCart = async (req, res) => {
  try {
    const { headers } = req;
    const { productId, quantity, price } = req.body;

    const token = headers.authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!productId) {
      return res.status(421).json({ message: 'productId is required' });
    }
    if (!quantity) {
      return res.status(421).json({ message: 'quantity is required' });
    }
    if (!price) {
      return res.status(421).json({ message: 'price is required' });
    }

    const { id } = jwt.verify(token, JWT_SECRET);

    const cart = await Carts.findOne({ owner: id });

    if (cart) {
      const itemIndex = cart.products.findIndex((item) => item.productId == productId);

      if (itemIndex > -1) {
        let product = cart.products[itemIndex];
        product.quantity += quantity;
        cart.products[itemIndex] = product;
      } else {
        cart.products.push({ productId, quantity, price });
      }
      await cart.save();
      res.json({ message: 'Get', data: cart });
    } else {
      const newCart = new Carts({
        owner: id,
        products: [{ productId, quantity, price }],
        subTotal: 0,
      });

      await newCart.save();
    }

    res.json({ message: 'Get', data: cart });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

// exports.ordersPost = async (req, res) => {
//   try {
//     const { companyId, client, status, orderItems } = req.body;

//     if (!client) {
//       res.status(422).json({ message: 'Client name is required.' });
//     }

//     if (!companyId) {
//       res.status(422).json({ message: 'Order companyId is required.' });
//     }

//     if (!orderItems) {
//       res.status(422).json({
//         message: 'OrderItems productId is required.',
//       });
//     }

//     const products = await Products.find({ companyId });

//     const order = orderItems.map((order) => {
//       const product = products.find(({ id, price }) => order.productId === id);
//       const sum = product.price * order.quantity;
//       return { ...order, sum };
//     });

//     const newOrder = new Orders({
//       companyId,
//       client,
//       status,
//       orderItems: order,
//     });
//     await newOrder.save();

//     res.status(201).json({
//       message: 'New order is created.',
//       product: newOrder,
//     });
//   } catch (e) {
//     res.status(500).json({ message: 'Something went wrong' });
//   }
// };
