const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    name: { type: 'String', required: true },
    description: { type: 'String', required: true },
    price: { type: 'Number', required: true },
    unit: { type: 'string', default: 'Pc.' },
    companyId: { type: Types.ObjectId, ref: 'Company' },
  },
  { timestamps: true }
);

module.exports = model('Product', schema);
