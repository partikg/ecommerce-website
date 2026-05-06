const orderModel = require('../../models/order');

const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.placeOrder = async (request, response) => {

    try {

        const data = new orderModel({
            user_id: request.body.user_id,
            product_details: request.body.product_details,
            order_total: request.body.order_total,
            shipping_details: request.body.shipping_details,
            status: 1
        });

        const result = await data.save();

        const options = {
            amount: result.order_total * 100,
            currency: "INR",
            receipt: result._id.toString()
        };

        instance.orders.create(options, async function (err, order) {

            if (err) {
                console.log("RAZORPAY ERROR:", err);

                return response.send({
                    status: false,
                    message: "Razorpay failed",
                    error: err
                });
            }

            await orderModel.updateOne(
                { _id: result._id },
                { $set: { razorpay_order_id: order.id } }
            );

            order.status = true;

            response.send({
                status: true,
                message: 'Order placed successfully',
                data: order
            });

        });

    } catch (error) {

        console.log("SERVER ERROR:", error);

        response.send({
            status: false,
            message: 'Something went wrong',
            error: error
        });
    }
};

exports.confirmOrder = async (request, response) => {

    await orderModel.updateOne(
        {
            razorpay_order_id: request.body.order_id
        },
        {
            $set: {
                razorpay_payment_id: request.body.payment_id,
                status: request.body.status
            }
        }
    ).then((result) => {

        var resp = {
            status: true,
            message: 'Order Status update successfully',
        }

        response.send(resp);

    }).catch((error) => {

        var resp = {
            status: false,
            message: 'Something went wrong'
        }

        response.send(resp);

    });
}