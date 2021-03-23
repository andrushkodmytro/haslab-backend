const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    email: { type: 'String', required: true, unique: true },
    password: { type: 'String', required: true },
    firstName: { type: 'String', required: true },
    lastName: { type: 'String', required: true },
    companyId: { type: Types.ObjectId, ref: 'Company', default: null },
  },
  { timestamps: true }
);

module.exports = model('User', schema);
