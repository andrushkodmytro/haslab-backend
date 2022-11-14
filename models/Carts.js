const { Schema, model } = require('mongoose');

let ItemSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity can not be less then 1.'],
    },
    price: {
      type: Number,
      required: true,
    },
    // total: {
    //   type: Number,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const CartSchema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: 'Product' },
    products: [ItemSchema],
    subTotal: {
      default: 0,
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Cart', CartSchema);
