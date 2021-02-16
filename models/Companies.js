const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: 'String', required: true, unique: true },
  userId: [{ type: Types.ObjectId , ref:'Users'}],
}, { timestamps: true });

module.exports = model('Companies', schema);
