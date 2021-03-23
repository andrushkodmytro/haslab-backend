const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    name: { type: 'String', required: true, unique: true },
    userId: [{ type: Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

module.exports = model('Company', schema);
