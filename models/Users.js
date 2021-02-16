const { Schema, model, Types } = require('mongoose');

const schema = new Schema({
  email: { type: 'String', required: true, unique: true },
  password: { type:'String', required: true },
  firstName:{type:'String', required: true},
  lastName:{type:'String', required: true},
  // company_id: [{ type: Types.ObjectId , ref:'Company'}],
}, { timestamps: true });

module.exports = model('Users', schema);
