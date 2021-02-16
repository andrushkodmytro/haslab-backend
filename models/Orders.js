const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  name: { type: 'String', required: true, },
  companyId: { type: Types.ObjectId , ref:'Companies', required: true,},
  productId: { type: Types.ObjectId , ref:'Products', required: true,},
  quantity:{ type:Number, required: true, default: 1}
}, { timestamps: true });

module.exports = model('Orders', schema);
