const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: 'String', required: true, },
  companyId: { type: Types.ObjectId , ref:'Companies'},
}, { timestamps: true });

module.exports = model('Products', schema);
