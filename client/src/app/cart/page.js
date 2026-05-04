'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { emptycart, removecart, updatecartaddqty, updatecartminusqty } from '../../features/cart/cartslice'
import useRazorpay from "react-razorpay";
import axios from 'axios'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function page() {

    const getcartitems = useSelector((state) => state.cart.cart)
    console.log(getcartitems)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(true)
    const [Razorpay] = useRazorpay();

    const subtotal = getcartitems.reduce((total, item) => {
        const price = parseFloat(item.price.replace('$', '').trim());
        return total + (price * item.qty);
    }, 0);


    const placeOrder = (e) => {

        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }

        const shippingDetails = {
            address: "testing address"
        }
        const userId = 1001;
        const productDetails = getcartitems.map(
            (c) => {
                return {
                    productId: c.id,
                    qty: c.qty,
                    price: c.price,
                    total: c.qty * c.price,
                }
            }
        )

        axios.post(
            "http://localhost:5000/api/frontend/orders/place-order",
            {
                user_id: userId,
                product_details: productDetails,
                order_total: 5000,
                shipping_details: shippingDetails,
            }
        ).then(
            (success) => {
                console.log(success)
                if (success.data.data.status) {
                    openPaymentPopUp(success.data.data.id, success.data.data);
                } else {
                    console.log('Unable to place order');
                }
            }
        )
    }

    const openPaymentPopUp = (razorpayOrder) => {
        const options = {
            key: "rzp_test_RghXFo7rcpVb1U",
            amount: razorpayOrder.amount,
            currency: "INR",
            name: "WsCube Tech",
            description: "upskillingBharat",
            image: "https://www.wscubetech.com/images/wscube-tech-logo.svg",
            order_id: razorpayOrder.id,

            handler: function (response) {
                console.log(response);
                alert('success');

                axios.post("http://localhost:5000/api/frontend/orders/confirm-order", {
                    order_id: response.razorpay_order_id,
                    payment_id: response.razorpay_payment_id,
                    status: 2
                });
            },

            prefill: {
                name: "Test User",
                email: "test@gmail.com",
                contact: "9999999999",
            },

            theme: {
                color: "#ff4252",
            },
        };

        const rzp1 = new Razorpay(options);

        rzp1.on("payment.failed", function (response) {
            console.log(response);
            alert('Payment Failed');

            axios.post("http://localhost:5000/api/frontend/orders/confirm-order", {
                order_id: response.error.metadata.order_id,
                payment_id: response.error.metadata.payment_id,
                status: 3
            });
        });

        rzp1.open();
    };

    return (
        <div>
            <Dialog open={open} onClose={setOpen} className="relative z-10" >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className=" fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                            >
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                >
                                                    <span className="absolute -inset-0.5" />
                                                    <span className="sr-only">Close panel</span>
                                                    <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {getcartitems.map((product) => (
                                                        <li key={product.id} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    alt={product.name}
                                                                    src={`http://localhost:5000/uploads/sales/${product.image}`}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <span>{product.name}</span>
                                                                        </h3>
                                                                        <p className="ml-4">{product.price}</p>

                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Qty {product.quantity}</p>
                                                                    <div class="flex items-center border-gray-100">
                                                                        <span onClick={() => dispatch(updatecartminusqty(product.id))} class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 
                                                duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                                        <input class="h-8 w-8 border bg-white text-center text-xs 
                                                outline-none" type="number" value={product.qty} min="1" />
                                                                        <span onClick={() => dispatch(updatecartaddqty(product.id))} class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 
                                                duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                                                    </div>
                                                                    <div className="flex">
                                                                        <button onClick={() => dispatch(removecart(product.id))} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                            Remove
                                                                        </button>
                                                                        <button
                                                                            onClick={() => dispatch(emptycart())}
                                                                            className="px-4 py-2 text-white bg-blue-500 rounded-md"
                                                                        >
                                                                            EmptyCart
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${subtotal.toFixed(2)}</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                        <div className="mt-6">
                                            <button onClick={(e) => placeOrder(e)}>
                                                Checkout
                                            </button>
                                        </div>
                                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </div>
            </Dialog >

        </div>











    )
}












