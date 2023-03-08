const Carts = require('../models/Carts');
const Products = require('../models/Products');
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

    const cart = await Carts.findOne({ owner: id })
      .populate({
        path: 'products',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      })
      .exec();

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

    const cart = await Carts.findOne({ owner: id })
      .populate({
        path: 'products',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      })
      .exec();

    if (cart) {
      const itemIndex = cart.products.findIndex((item) => item.productId._id == productId);

      if (itemIndex > -1) {
        let product = cart.products[itemIndex];
        product.quantity += quantity;
        cart.products[itemIndex] = product;
        await cart.save();
      } else {
        cart.products.push({ productId, quantity, price });
        await cart.save();
      }
      const updatedCart = await Carts.findOne({ owner: id })
        .populate({
          path: 'products',
          populate: {
            path: 'productId',
            model: 'Product',
          },
        })
        .exec();

      return res.json({ message: 'Product added to cart', data: updatedCart });
    } else {
      const newCart = new Carts({
        owner: id,
        products: [{ productId, quantity, price }],
        subTotal: 0,
      });

      await newCart.save();

      return res.json({ message: 'New cart created', data: newCart });
    }
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.removeItemFromCart = async (req, res) => {
  try {
    const { headers } = req;
    const { productId, quantity } = req.body;

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

    const { id } = jwt.verify(token, JWT_SECRET);

    const cart = await Carts.findOne({ owner: id })
      .populate({
        path: 'products',
        populate: {
          path: 'productId',
          model: 'Product',
        },
      })
      .exec();

    if (cart) {
      const itemIndex = cart.products.findIndex((item) => item.productId._id == productId);

      if (itemIndex > -1) {
        let product = cart.products[itemIndex];

        if (quantity < product.quantity) {
          product.quantity -= quantity;

          cart.products[itemIndex] = product;
        } else {
          cart.products = cart.products.filter((item) => item.productId._id !== product.productId._id);
        }
      } else {
        res.status(500).json({ message: 'Product not found in cart' });
      }

      await cart.save();
      res.json({ message: 'Get', data: cart });
    } else {
      res.status(500).json({ message: 'Cart not found' });
    }

    res.json({ message: 'Get', data: cart });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};
