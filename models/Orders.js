const { Schema, model, Types } = require('mongoose')

const schema = new Schema(
    {
        companyId: { type: Types.ObjectId, ref: 'Company', required: true },
        client: { type: String, required: true },
        status: {
            type: String,
            enum: ['new', 'pending', 'completed', 'canceled'],
            default: 'new',
        },
        orderItems: [
            {
                productId: {
                    type: Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
                quantity: { type: Number, required: true, min: 0, default: 1 },
                sum: { type: Number, required: true },
            },
        ],
    },
    { timestamps: true }
)

module.exports = model('Order', schema)
