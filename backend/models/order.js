const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    broker: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    referenceNo: {
        type: String,
        required: false
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },
    index: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },
    deliveryAddress: {
        type: Object,
    },
    receipt:
    {
        type: Object,
    },


},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Order', orderSchema)