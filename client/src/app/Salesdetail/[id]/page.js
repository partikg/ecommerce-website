'use client'
import { addtocart, emptycart, removecart, updatecartaddqty, updatecartminusqty } from '@/app/reduxtoolkit/slices/cartslice';
import { addToWishlist } from '@/app/reduxtoolkit/slices/wishlistslice';
import { faArrowLeftRotate, faAward, faCashRegister, faHeart, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Link from 'next/link';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function page() {

    const params = useParams();
    const [product, setProduct] = useState([]);

    useEffect(() => {
        console.log(params);
        if (params?.id) {
            axios.post('http://localhost:3/api/backend/sales/details/' + params.id)
                .then((response) => {
                    setProduct(response.data.data);
                    console.log('Product data:', response.data.data);
                    console.log(response.data.data);
                })
                .catch((error) => {
                    console.log('Error fetching product details:', error);
                });
        }
    }, [params?.id]);



    const dispatch = useDispatch()

    const getcartitems = useSelector((state) => state.cart.cart)
    console.log(getcartitems)


    const [open, setOpen] = useState(false)

    // Calculate subtotal
    const subtotal = getcartitems.reduce((total, item) => {
        // as price has $73.99 
        const price = parseFloat(item.price.replace('$', '').trim());
        return total + (price * item.qty);
    }, 0); // starting from 0




    return (

        <div>
            <div className='  h-screen'>

                <div className=' flex'>

                    {/* images */}
                    <div className=' h-full w-[60%] flex flex-wrap justify-start'>
                        {product.image && product.image.length > 0 ? (
                            product.image.map((img, index) => (
                                <div key={index} className='w-1/2 p-2'>
                                    <img
                                        src={`http://localhost:3/uploads/sales/${img}`}
                                        alt={product.name}
                                        className=' w-[400px] h-full object-cover'
                                    />
                                </div>
                            ))
                        ) : (
                            <div className='w-1/2 p-2'>
                                <img
                                    src="/placeholder-image.png" // Fallback image in case no image exists
                                    alt="Placeholder"
                                    className=" w-[400px] h-full object-cover"
                                />
                            </div>
                        )}
                    </div>



                    {/* details  */}
                    <div className=' flex-1 p-2'>

                        <p className=' text-base underline font-normal '>Home / {product.gender} / Sale </p>
                        <h2 className=' text-2xl font-medium my-4'>{product.name}</h2>
                        <p className=' text-lg text-red-600'>{product.price}</p>
                        <p className=' text-md my-4'>description:{product.description}</p>
                        <p className=' text-md my-4'>qty:{product.qty}</p>

                        <div className="flex items-center space-x-4 mt-4">
                            <button
                                onClick={() => { dispatch(addtocart(product)); setOpen(true); }}
                                className='bg-black w-[80%] h-[60px] text-white'>
                                Add to Cart
                            </button>
                            <button onClick={(e) => {
                                e.preventDefault();
                                dispatch(addToWishlist(product));
                            }}>
                                <FontAwesomeIcon
                                    icon={faHeart}
                                    className='border border-black py-4 px-4 text-xl'
                                />
                            </button>
                        </div>

                    </div>

                </div>

            </div >




            {/* cart */}
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
                                                                    src={Array.isArray(product.image) ? `http://localhost:3/uploads/sales/${product.image[0]}` : `http://localhost:3/uploads/sales/${product.image}`}
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


            {/* footer */}
            <footer>

                <div className=' bg-black h-[1000px] w-full '>

                    <div className=' h-[200px] flex justify-evenly text-center py-10'>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faTruck} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Free Shipping</h2>
                            <p className=' text-white text-sm font-medium p-2'>ON orders over $99</p>
                        </div>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faArrowLeftRotate} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Free Returns</h2>
                            <p className=' text-white text-sm font-medium p-2'>Only keep what you love.</p>
                        </div>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faAward} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Frank's Club</h2>
                            <p className=' text-white text-sm font-medium p-2'>Earn points and get rewards.</p>
                        </div>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faCashRegister} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Buy Now, Pay Later</h2>
                            <p className=' text-white text-sm font-medium p-2'>Select Klarna at checkout.</p>
                        </div>

                    </div>

                    <div className=' h-[800px] flex justify-evenly items-center p-5 '>

                        <div className=' w-[200px] h-[440px]'>
                            <FontAwesomeIcon icon={faAward} className=" text-white " size='5x' />
                            <h4 className='text-white '>Frank&co</h4>

                        </div>

                        <div className=' w-[180px] h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium' >Our Story</h4>
                            <h4 className=' text-white py-2'>Who we are</h4>
                            <h4 className=' text-white py-2'>Sustainable practices</h4>
                            <h4 className=' text-white py-2'>Design Ideology</h4>
                            <h4 className=' text-white py-2'>Fabrics</h4>
                            <h4 className=' text-white py-2'>Circular denim™</h4>
                            <h4 className=' text-white py-2'>Partners and factories</h4>
                        </div>

                        <div className=' w-[180px] h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium'>Discover</h4>
                            <h4 className=' text-white py-2'>Gift Cards</h4>
                            <h4 className=' text-white py-2'>Frank's Club</h4>
                            <h4 className=' text-white py-2'>Give $15, Get $15</h4>
                            <h4 className=' text-white py-2'>Affiliate</h4>
                            <h4 className=' text-white py-2'>Blog</h4>
                            <h4 className=' text-white py-2'>Work with us</h4>
                            <h4 className=' text-white py-2'>Our Stores</h4>
                        </div>

                        <div className=' w-[180px]  h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium'>Customer Care</h4>
                            <h4 className=' text-white py-2'>Shipping Information</h4>
                            <h4 className=' text-white py-2'>Returns & Exchanges</h4>
                            <h4 className=' text-white py-2'>Coupon Codes</h4>
                            <h4 className=' text-white py-2'>F.A.Q.</h4>
                            <h4 className=' text-white py-2'>Terms & Conditions</h4>
                            <h4 className=' text-white py-2'>Refund Policy</h4>
                            <h4 className=' text-white py-2'>Privacy Policy</h4>
                            <h4 className=' text-white py-2'>Accessibility Statement</h4>
                            <h4 className=' text-white py-2'>Customer Data Requests</h4>

                        </div>

                        <div className=' w-[400px] h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium'>Stay in touch</h4>
                            <p className=' text-white py-2'>Join our newsletter and stay in the know about new collections, outfit inspiration, sales, and more.</p>
                        </div>

                    </div>

                </div>

            </footer>

        </div >
    )
}
