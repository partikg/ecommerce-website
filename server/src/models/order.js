var mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [{
        name: { type: String },
        price: { type: Number },
        stock: { type: Number },
    }],
    total: {
        type: Number
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Completed", "Failed"]
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered"]
    },
    paymentId: { type: String }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;