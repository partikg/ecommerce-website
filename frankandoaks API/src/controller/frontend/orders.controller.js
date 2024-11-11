const orderModel = require('../../models/order');

const Razorpay = require('razorpay');

const instance = new Razorpay({
    key_id: 'rzp_test_7xIni0RPTlUpmY',
    key_secret: 'Q8wxUl6gUCWmHjPbz0Ip17Co',
});

exports.placeOrder = async (request, response) => {

    var data = new orderModel({
        user_id: request.body.user_id,
        product_details: request.body.product_details,
        order_total: request.body.order_total,
        shipping_details: request.body.shipping_details,
        status: 1
    })

    await data.save().then((result) => {

        var options = {
            amount: result.order_total,  // amount in the smallest currency unit
            currency: "INR",
            receipt: result._id
        };

        instance.orders.create(options, async function (err, order) {

            await orderModel.updateOne(
                {
                    _id: result._id
                },
                {
                    $set: {
                        razorpay_order_id: order.id
                    }
                });
            // console.log(result);

            order.status = 1;
            var resp = {
                status: true,
                message: 'Order Placedd successfully !!',
                data: order
            }

            response.send(resp);

        })

    }).catch((error) => {

        var resp = {
            status: false,
            message: 'Something went wrong !!',
            error: error
        }

        response.send(resp);

    });
}

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
            message: 'Order Status update successfully !!',
        }

        response.send(resp);

    }).catch((error) => {

        var resp = {
            status: false,
            message: 'Something went wrong !!'
        }

        response.send(resp);

    });
}