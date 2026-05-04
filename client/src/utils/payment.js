import axios from "axios";


export const loadRazorpay = () => {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);

        document.body.appendChild(script);
    });
};

export const openPaymentPopUp = (order) => {
    const options = {
        key: "rzp_test_RghXFo7rcpVb1U",
        amount: order.amount,
        currency: "INR",
        name: "PratikWear",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {
            console.log("PAYMENT SUCCESS:", response);

            try {
                await axios.post(
                    "http://localhost:5000/api/frontend/orders/confirm-order",
                    {
                        order_id: response.razorpay_order_id,
                        payment_id: response.razorpay_payment_id,
                        status: 2,
                    }
                );

                alert("Payment Successful");
            } catch (error) {
                console.log("CONFIRM ERROR:", error);
            }
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};

// checkout function
export const handleCheckoutService = async ({
    token,
    profile,
    cartItems,
    subtotal,
}) => {
    try {
        if (!token) {
            alert("Please login first");
            return;
        }

        if (!profile || !profile._id) {
            alert("Profile not loaded");
            return;
        }

        const orderData = {
            user_id: profile._id,
            product_details: cartItems,
            order_total: subtotal,
            shipping_details: {
                address: "Nagpur",
                city: "Nagpur",
            },
        };

        const res = await axios.post(
            "http://localhost:5000/api/frontend/orders/place-order",
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        if (res.data.status) {
            openPaymentPopUp(res.data.data);
        } else {
            alert("Order failed");
        }
    } catch (error) {
        console.log("CHECKOUT ERROR:", error);
    }
};