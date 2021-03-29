const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    name: { type: 'String', required: true, unique: true },
    description: { type: 'String', required: false },
    companyId: { type: Types.ObjectId, ref: 'Company' },
  },
  { timestamps: true }
);

module.exports = model('Category', schema);
