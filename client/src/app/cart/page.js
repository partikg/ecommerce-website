'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emptycart, removecart, updatecartaddqty, updatecartminusqty, setCart } from '../../features/cart/cartslice';
import axios from 'axios';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Page() {

    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart?.cart || []);

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState(true);

    // ✅ Ensure client-side rendering only
    useEffect(() => {
        setMounted(true);
    }, []);

    // ✅ Load cart from localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const cart = localStorage.getItem('cartitems');
            if (cart) {
                dispatch(setCart(JSON.parse(cart)));
            }
        }
    }, [dispatch]);

    if (!mounted) return null; // 🔥 prevents SSR crash

    const subtotal = cartItems.reduce((total, item) => {
        const price = Number(String(item.price).replace('$', '').trim()); return total + (price * item.qty);
    }, 0);

    const placeOrder = (e) => {
        e?.preventDefault();

        const productDetails = cartItems.map((c) => ({
            productId: c.id,
            qty: c.qty,
            price: c.price,
            total: c.qty * c.price,
        }));

        axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/frontend/orders/place-order`,
            {
                user_id: 1001,
                product_details: productDetails,
                order_total: subtotal,
                shipping_details: { address: "testing address" },
            }
        ).then((res) => {
            if (res.data.data.status) {
                openPaymentPopUp(res.data.data);
            }
        });
    };

    const openPaymentPopUp = (order) => {
        if (typeof window === "undefined") return;

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
            amount: order.amount,
            currency: "INR",
            name: "WsCube Tech",
            description: "Order Payment",
            order_id: order.id,

            handler: function (response) {
                axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/frontend/orders/confirm-order`, {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    status: 2
                });
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75" />

            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">

                        <DialogPanel className="pointer-events-auto w-screen max-w-md bg-white shadow-xl">

                            <div className="flex h-full flex-col overflow-y-scroll">

                                {/* Header */}
                                <div className="flex justify-between p-4">
                                    <DialogTitle className="text-lg font-medium">Shopping Cart</DialogTitle>
                                    <button onClick={() => setOpen(false)}>
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                {/* Items */}
                                <div className="p-4">
                                    {cartItems.length === 0 ? (
                                        <p>Your cart is empty</p>
                                    ) : (
                                        cartItems.map((product) => {
                                            const img = Array.isArray(product.image)
                                                ? product.image[0]
                                                : product.image;

                                            return (
                                                <div key={product.id} className="flex mb-4">

                                                    <img src={img} className="h-20 w-20 object-cover" />

                                                    <div className="ml-4 flex-1">
                                                        <p>{product.name}</p>
                                                        <p>{product.price}</p>

                                                        <div className="flex items-center mt-2">
                                                            <button onClick={() => dispatch(updatecartminusqty(product.id))}>-</button>
                                                            <span className="mx-2">{product.qty}</span>
                                                            <button onClick={() => dispatch(updatecartaddqty(product.id))}>+</button>
                                                        </div>

                                                        <button
                                                            onClick={() => dispatch(removecart(product.id))}
                                                            className="text-red-500 text-sm"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-4 border-t">
                                    <div className="flex justify-between">
                                        <span>Total</span>
                                        <span>₹{subtotal.toFixed(2)}</span>
                                    </div>

                                    <button
                                        onClick={placeOrder}
                                        className="w-full bg-blue-500 text-white mt-4 p-2"
                                    >
                                        Checkout
                                    </button>

                                    <button
                                        onClick={() => dispatch(emptycart())}
                                        className="w-full mt-2 border p-2"
                                    >
                                        Clear Cart
                                    </button>
                                </div>

                            </div>

                        </DialogPanel>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}