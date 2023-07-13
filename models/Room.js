const { Schema, model } = require('mongoose');

const schema = new Schema(
  {
    name: { type: 'String', required: true, unique: true },
    description: { type: 'String', required: false },
  },
  { timestamps: true }
);

module.exports = model('Room', schema);
