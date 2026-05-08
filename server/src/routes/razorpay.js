const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const router = express.Router();

router.post("/", async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
        amount: (499 * 100).toString(),
        currency: "INR",
        receipt: shortid.generate(),
        payment_capture: 1,
    };

    try {
        const order = await razorpay.orders.create(options);
        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;