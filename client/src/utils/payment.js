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

export const openPaymentPopUp = (order, onSuccess, onError,showToast) => {
    const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "PratikWear",
        description: "Order Payment",
        order_id: order.id,

        handler: async function (response) {

            try {
               const updateRes = await axios.put(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/orders/update/${order.orderId}`,
                    {
                        status: 2, 
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id
                    }
                );

                showToast?.("Payment Successful", "success");

                if (onSuccess) {
                    onSuccess(updateRes.data);
                }
            } catch (error) {
                console.log("CONFIRM ERROR:", error);
                showToast?.("Payment successful but order update failed", "error");

                 if (onError) {
                    onError(error);
                }
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
    showToast,
}) => {
    try {
        if (!token) {
            showToast?.("Please login first", "error");
            return;
        }

        if (!profile || !profile._id) {
             showToast?.("Profile not loaded", "error");
            return;
        }

        const orderData = {
            user_id: profile._id,
            product_details: cartItems,
            order_total: subtotal,
             status: 1,
            shipping_details: {
                address: "Nagpur",
                city: "Nagpur",
            },
        };

        const orderRes  = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/orders/add`,
            orderData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

         if (!orderRes.data._id) {
            showToast?.("Failed to create order", "error");
            return;
        }

        const razorpayRes = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/razorpay`,{ amount: subtotal }
        );

        if (razorpayRes.data) {
            openPaymentPopUp(
                 {
                    ...razorpayRes.data,
                    orderId: orderRes.data._id, 
                },
                (successData) => {
                    console.log("Payment success callback:", successData);
                    localStorage.removeItem('cartitems');

                    showToast?.("Payment Successful", "success");

                    setTimeout(() => {
                        window.location.href = '/orders';
                    }, 1500);
                },
                (error) => {
                    console.log("Payment error callback:", error);
                    showToast?.("Payment failed", "error");
                },
                showToast 
            );
        } else {
            showToast?.("Order failed", "error");
        }
    } catch (error) {
        console.log("CHECKOUT ERROR:", error);
        showToast?.(
            error.response?.data?.message || "Checkout failed",
            "error"
        );
    }
};