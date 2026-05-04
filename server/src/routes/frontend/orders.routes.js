const express = require('express');
const route = express.Router();
const orderController = require('../../controller/frontend/orders.controller');

module.exports = app => {

    route.post('/place-order', orderController.placeOrder);
    route.post('/confirm-order', orderController.confirmOrder);

    route.get('/test-razorpay', async (req, res) => {

        const Razorpay = require("razorpay");

        const instance = new Razorpay({
            key_id: "rzp_test_RghXFo7rcpVb1U",
            key_secret: "iiZE9Dh75wXoj0V4OQ6OMWw0",
        });

        try {
            const order = await instance.orders.create({
                amount: 50000, // ₹500
                currency: "INR"
            });

            console.log("TEST ORDER:", order);

            res.send({
                status: true,
                order: order
            });

        } catch (err) {
            console.log("TEST ERROR:", err);

            res.send({
                status: false,
                error: err
            });
        }
    });

    app.use('/api/frontend/orders', route);

}