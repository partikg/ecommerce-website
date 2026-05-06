'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftRotate, faAward, faCashRegister, faHeart, faTruck } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '@/features/wishlist/wishlistslice';

export default function Page() {

    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.wishlist);

    return (

        <div className="max-w-6xl mx-auto px-4 py-6">

            <div className='flex  '>

                {/* left side */}
                <div className="hidden md:block w-48 mr-6 text-sm">

                    <div className="bg-gray-100 p-4 rounded-lg space-y-2">
                        <div className="font-medium">My Account</div>
                        <div className="text-gray-600 hover:text-black cursor-pointer">Orders</div>
                        <div className="text-gray-600 hover:text-black cursor-pointer">Address</div>
                        <div className="text-black font-semibold flex items-center gap-2">
                            Wishlist <FontAwesomeIcon icon={faHeart} />
                        </div>
                    </div>

                </div>

                {/* wishlist */}
                <div>
                    <h2 className='text-4xl font-semibold m-5'>Wishlist</h2>
                    <div className='flex flex-wrap w-fit'>
                        {wishlist.length > 0 ? (
                            wishlist.map((item) => (
                                <div key={item.id} className='pb-4 m-2 w-[240px]'>
                                    <Link href={`/Salesdetail/${item._id}`} key={item._id}>

                                        <img
                                            className='cursor-pointer h-80 w-full object-cover transition-opacity duration-300 group-hover:opacity-0'

                                            src={item.image[0]}

                                            alt={item.name}
                                        />

                                        {item.image[1] && (
                                            <img
                                                className='absolute top-0 left-0 h-80 w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100'

                                                src={item.image[1]}

                                                alt={`${item.name} Hover`}
                                            />
                                        )}


                                        <h3 className='mt-2'>{item.name}</h3>
                                        <p>{item.price}</p>
                                    </Link>
                                    <button
                                        onClick={() => dispatch(removeFromWishlist(item.id))}
                                        className='text-red-500 text-sm'
                                    >
                                        Remove from Wishlist
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No items in your wishlist.</p>
                        )}
                    </div>
                </div>

            </div>

            <Footer />

        </div >

    )
}
