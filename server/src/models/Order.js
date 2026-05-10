var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product_details: [{
        id: { type: String },
        name: { type: String },
        image: [{ type: String }],
        price: { type: String },
        gender: { type: String },
        type: { type: String },
        description: { type: String },
        qty: { type: Number }
    }],
    order_total: {
        type: Number
    },
    razorpay_order_id: {
        type: String
    },
    razorpay_payment_id: {
        type: String,
        default: null
    },
    status: {
        type: Number,
        enum: [1, 2],
        default: 1
    },
    shipping_details: {
        address: { type: String },
        city: { type: String }
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;