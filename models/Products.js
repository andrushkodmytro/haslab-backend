const { Schema, model, Types } = require('mongoose');

const schema = new Schema(
  {
    name: { type: 'String', required: true },
    categoryId: { type: Types.ObjectId, ref: 'Category' },
    roomId: { type: Types.ObjectId, ref: 'Room' },
    description: { type: 'String', required: true },
    price: { type: 'Number', required: true, min: 0 },
    imgUrl: { type: 'String' },
    imgGallery: [{ type: 'String' }],
    promoted: { type: 'Bool', default: false },
  },
  { timestamps: true }
);

schema.virtual('category', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

schema.virtual('room', {
  ref: 'Room',
  localField: 'roomId',
  foreignField: '_id',
  justOne: true,
});

module.exports = model('Product', schema);
