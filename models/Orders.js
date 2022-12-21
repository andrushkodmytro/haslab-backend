const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: 'User',
      required: true,
    },
    contactInfo: {
      first_name: { type: 'String', required: true },
      last_name: { type: 'String', required: true },
      phone: { type: 'String', required: true },
      email: { type: 'String', required: true },
      city: { type: 'String', required: true },
      address: { type: 'String', required: true },
    },
    status: {
      type: String,
      enum: ['new', 'pending', 'completed', 'canceled'],
      default: 'new',
    },
    products: [
      {
        productId: {
          type: Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: { type: Number, required: true, min: 0, default: 1 },
        sum: { type: Number, required: true, min: 0, default: 0 },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model('Order', schema);
