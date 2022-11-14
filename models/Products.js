const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    name: { type: 'String', required: true },
    categoryId: { type: Types.ObjectId, ref: 'Category' },
    description: { type: 'String', required: true },
    price: { type: 'Number', required: true },
    image: { type: 'String' },
  },
  { timestamps: true }
);

module.exports = model('Product', schema);
