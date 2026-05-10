import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    emptycart,
    removecart,
    updatecartaddqty,
    updatecartminusqty
} from '../features/cart/cartslice';
import { loadRazorpay, handleCheckoutService } from "../utils/payment";
import { useEffect } from 'react';
import Cookies from "universal-cookie";
import { useToast } from '@/context/ToastContext';

export default function CartDrawer({ open, setOpen, profile }) {
    const dispatch = useDispatch();
    const getcartitems = useSelector((state) => state.cart.cart);
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const subtotal = getcartitems.reduce((total, item) => {
        const price = item.price ? parseFloat(item.price.replace('$', '').trim()) : 0;
        return total + (price * item.qty);
    }, 0);

    const cookies = new Cookies();

    useEffect(() => {
        loadRazorpay();
    }, []);

    const handleCheckout = async () => {
        try {
            setLoading(true);

            const token = cookies.get("token");

            if (!token) {
            showToast('Please login first');
            return;
        }
 
        if (!profile) {
            showToast("Profile not loaded.");
            return;
        }
 
        if (getcartitems.length === 0) {
            showToast("Cart is empty");
            return;
        }

            await handleCheckoutService({
                token,
                profile,
                cartItems: getcartitems,
                subtotal,
            });

            showToast('Order placed successfully', 'success');

        } catch (error) {
            showToast('Payment failed!', 'error');
        } finally {
            setLoading(false);
        }
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
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <DialogPanel
                                transition
                                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                            >
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <DialogTitle className="text-lg font-medium text-gray-900">
                                                Shopping cart
                                            </DialogTitle>
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
                                                    {getcartitems.length > 0 ? (
                                                        getcartitems.map((product) => {
                                                            const img = Array.isArray(product.image)
                                                                ? product.image[0]
                                                                : product.image;

                                                            return (
                                                                <li key={product.id} className="flex py-6">
                                                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                        <img
                                                                            src={img}
                                                                            alt={product.name}
                                                                            className="h-full w-full object-cover"
                                                                        />
                                                                    </div>

                                                                    <div className="ml-4 flex flex-1 flex-col">
                                                                        <div>
                                                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                <h3>
                                                                                    <a href={product.href}>{product.name}</a>
                                                                                </h3>
                                                                                <p className="ml-4">₹{product.price}</p>
                                                                            </div>
                                                                            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                        </div>
                                                                        
                                                                        <div className="flex flex-1 items-end justify-between text-sm">
                                                                            <p className="text-gray-500">Qty {product.qty}</p>
                                                                            
                                                                            <div className="flex items-center border-gray-100">
                                                                                <span
                                                                                    onClick={() => dispatch(updatecartminusqty(product.id))}
                                                                                    className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                                                >
                                                                                    −
                                                                                </span>
                                                                                <input
                                                                                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                                                                                    type="number"
                                                                                    value={product.qty}
                                                                                    min="1"
                                                                                    readOnly
                                                                                />
                                                                                <span
                                                                                    onClick={() => dispatch(updatecartaddqty(product.id))}
                                                                                    className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                                                                                >
                                                                                    +
                                                                                </span>
                                                                            </div>
                                                                            
                                                                            <div className="flex">
                                                                                <button
                                                                                    onClick={() => dispatch(removecart(product.id))}
                                                                                    type="button"
                                                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                >
                                                                                    Remove
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </li>
                                                            )
                                                        })
                                                    ) : (
                                                        <li className="py-6 text-center text-gray-500">
                                                            Your cart is empty
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Subtotal</p>
                                            <p>${subtotal.toFixed(2)}</p>
                                        </div>

                                        <div className="mt-6">
                                            <button
                                                onClick={handleCheckout}
                                                disabled={getcartitems.length === 0}
                                                className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {getcartitems.length === 0 ? 'Cart is empty' : 'Checkout'}
                                            </button>
                                        </div>
                                        
                                        <button
                                            onClick={() => dispatch(emptycart())}
                                            className="mt-3 w-full border rounded px-4 py-2 hover:bg-gray-100"
                                        >
                                            Clear Cart
                                        </button>

                                         <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                    type="button"
                                                    onClick={() => setOpen(false)}
                                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                                >
                                                    Continue Shopping
                                                    <span aria-hidden="true"> →</span>
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
