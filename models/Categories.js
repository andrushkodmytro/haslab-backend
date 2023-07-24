const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: 'String', required: true, unique: true },
    description: { type: 'String', required: false },
    imgUrl: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = model('Category', schema);
