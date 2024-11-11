'use client'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { emptycart, removecart, updatecartaddqty, updatecartminusqty } from '../reduxtoolkit/slices/cartslice'
// import useRazorpay from "react-razorpay";
// import axios from 'axios'

import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        price: '$90.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        price: '$32.00',
        quantity: 1,
        imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        imageAlt:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    },
    // More products...
]

export default function page() {

    const getcartitems = useSelector((state) => state.cart.cart)
    console.log(getcartitems)
    const dispatch = useDispatch()

    const [open, setOpen] = useState(true)

    // Calculate subtotal
    const subtotal = getcartitems.reduce((total, item) => {
        // as price has $73.99 
        const price = parseFloat(item.price.replace('$', '').trim());
        return total + (price * item.qty);
    }, 0); // starting from 0


    // const [Razorpay] = useRazorpay();

    // const placeOrder = () => {
    //     const shippingDetails = {
    //         address: "testing address"
    //     }
    //     const userId = 1001;
    //     const productDetails = getcartitems.map(
    //         (c) => {
    //             return {
    //                 productId: c.id,
    //                 qty: c.qty,
    //                 price: c.price,
    //                 total: c.qty * c.price,
    //             }
    //         }
    //     )

    //     axios.post(
    //         "http://localhost:3/api/frontend/orders/place-order",
    //         {
    //             user_id: userId,
    //             product_details: productDetails,
    //             order_total: 5000,
    //             shipping_details: shippingDetails,
    //         }
    //     ).then(
    //         (success) => {
    //             console.log(success)
    //             if (success.data.data.status) {
    //                 openPaymentPopUp(success.data.data.id, success.data.data);
    //             } else {
    //                 console.log('Unable to place order');
    //             }
    //         }
    //     ).catch(
    //         () => {

    //         }
    //     )
    // }


    // const openPaymentPopUp = (order_id, razorpayOrder) => {
    //     const options = {
    //         key: "rzp_test_7xIni0RPTlUpmY", // Enter the Key ID generated from the Dashboard
    //         amount: razorpayOrder.amount * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //         currency: "INR",
    //         name: "WsCube Tech",
    //         description: "upskillingBharat",
    //         image: "https://www.wscubetech.com/images/wscube-tech-logo.svg",
    //         order_id: razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
    //         handler: function (response) {

    //             console.log(response)
    //             alert('success')
    //             axios.post("http://localhost:3/api/frontend/orders/confirm-order",
    //                 { order_id: response.razorpay_order_id, payment_id: response.razorpay_payment_id, status: 2 }
    //             ).then(
    //                 (success) => {
    //                     if (success.data.status) {
    //                         // navigator(`/order-summary/${success.data.order_id}/true`);
    //                         // dispatcher(emptyCart());
    //                     } else {
    //                         // notify(success.data.msg, "error");
    //                     }
    //                 }
    //             ).catch(
    //                 (error) => {
    //                     notify("Client error", "error");
    //                 }
    //             )
    //         },
    //         prefill: {
    //             name: "sandeep Bhati",
    //             email: "sandeep@gmail.com",
    //             contact: "price",
    //         },
    //         theme: {
    //             color: "#ff4252",
    //         },
    //     };



    //     const rzp1 = new Razorpay(options);

    //     rzp1.on("payment.failed", function (response) {

    //         console.log(response);
    //         alert('error')
    //         axios.post("http://localhost:3/api/frontend/orders/confirm-order",
    //             { order_id: response.razorpay_order_id, payment_id: response.razorpay_payment_id, status: 3 }
    //         ).then(
    //             (success) => {
    //                 if (success.data.status) {
    //                     // navigator(`/order-summary/${success.data.order_id}/true`);
    //                     // dispatcher(emptyCart());
    //                 } else {
    //                     // notify(success.data.msg, "error");
    //                 }
    //             }
    //         ).catch(
    //             (error) => {
    //                 notify("Client error", "error");
    //             }
    //         )
    //         // axios.post("http://localhost:5000/order/razorpay-transaction-handle",
    //         //         { amount: razorpayOrder.amount, razorpay_response: response.error.metadata, order_id }
    //         //     ).then(
    //         //         (success) => {
    //         //             notify(success.data.msg, "error");
    //         //             console.clear();
    //         //         }
    //         //     ).catch(
    //         //         (error) => {
    //         //             console.clear();
    //         //             console.log(error.message);
    //         //             notify("Client error", "error");
    //         //         }
    //         //     )
    //         //     // alert(response.error.code);
    //         //     // alert(response.error.description);
    //         //     // alert(response.error.source);
    //         //     // alert(response.error.step);
    //         //     // alert(response.error.reason);
    //         //     // alert(response.error.metadata.order_id);
    //         //     // alert(response.error.metadata.payment_id);
    //     });

    //     rzp1.open();
    // }


    return (
        <div>
            <Dialog open={open} onClose={setOpen} className="relative z-10" >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
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
                                                                    src={`http://localhost:3/uploads/sales/${product.image}`}
                                                                    className="h-full w-full object-cover object-center"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href={product.href}>{product.name}</a>
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
                                                                        <Link href="#" className=' px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 empty-cart-button mx-2' onClick={() => dispatch(emptycart(product.id))} >
                                                                            EmptyCart
                                                                        </Link>
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
                                            <a
                                                href="#"
                                                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout
                                            </a>
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












