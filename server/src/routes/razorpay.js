const express = require("express");
const Razorpay = require("razorpay");
const shortid = require("shortid");
const router = express.Router();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/", async (req, res) => {
      try {
        const { amount } = req.body;
 
        if (!amount) {
            return res.status(400).json({
                success: false,
                message: 'Amount is required'
            });
        }
 
        if (amount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount'
            });
        }

    const options = {
         amount: Math.round(amount * 100),
        currency: "INR",
        receipt: `receipt_${shortid.generate()}`,
        payment_capture: 1,
    };

  
        const order = await razorpay.orders.create(options);
        res.status(200).json({
            id: order.id,
            currency: order.currency,
            amount: order.amount,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message || 'Failed to create Razorpay order'
        });
    }
});

router.post("/verify-payment", async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
 
        const crypto = require('crypto');
        const shasum = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
        shasum.update(`${razorpay_order_id}|${razorpay_payment_id}`);
        const digest = shasum.digest('hex');
 
        if (digest !== razorpay_signature) {
            return res.status(400).json({
                success: false,
                message: 'Payment verification failed'
            });
        }
 
        res.status(200).json({
            success: true,
            message: 'Payment verified successfully'
        });
 
    } catch (err) {
        console.error("Payment verification error:", err);
        res.status(500).json({
            success: false,
            message: err.message || 'Payment verification failed'
        });
    }
});


module.exports = router;