const orderModel = require('../models/Order');
const userModel = require('../models/User')
const { sendOrderConfirmation } = require('../config/nodemailer')

const getOrders = async (req, res) => {
    try {
        const orders = await orderModel.find();
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ order });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching orders' });
    }
};

const createOrder = async (req, res) => {
    const newOrder = new orderModel(req.body);
    try {
        const savedOrder = await newOrder.save();

        const user = await userModel.findById(req.body.user_id)
        if (user) {
            await sendOrderConfirmation({
                userEmail: user.email,
                orderId: savedOrder._id,
                items: savedOrder.product_details,
                total: savedOrder.order_total
            })

            console.log("Order confirmation email sent to:", user.email);
        } else {
            console.log("User not found. Email not sent.");
        }
        res.status(201).json(savedOrder);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const orders = await orderModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: 'after' }
        );
        if (!orders) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await orderModel.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted' });
    } catch (err) {
        res.status(500).json({ error: err });
    }
};

module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};
