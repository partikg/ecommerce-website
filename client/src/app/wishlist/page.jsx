'use client'
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftRotate, faAward, faCashRegister, faHeart, faTruck } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../reduxtoolkit/slices/wishlistslice';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

export default function page() {

    const dispatch = useDispatch();
    const getWishlistItems = useSelector((state) => state.wishlist.wishlist);

    console.log('Current Wishlist:', getWishlistItems);

    // Removing item from wishlist
    const handleRemoveFromWishlist = (itemId) => {
        dispatch(removeFromWishlist(itemId));
    };

    useEffect(() => {
        console.log('Wishlist:', getWishlistItems);
    }, [getWishlistItems]);

    return (

        <div>

            <div className='p-2 pl-5'>Home / My account / Account settings</div>

            <div className='flex  '>

                {/* left side */}
                <div className=''>

                    <div className='bg-gray-300 p-2 m-5'>
                        <div className=' p-1'>Orders&returns</div>
                        <div className=' p-1'>Address book</div>
                        <div className=' p-1'>Account settings</div>
                        <div className=' p-1'>Wishlist <FontAwesomeIcon icon={faHeart} className="" size='1x' /> </div>
                        <div className=' p-1'>Frank's Club</div>
                        <div className=' p-1'>Refer a Friend</div>
                    </div>

                    <div className='bg-gray-300 p-2 m-5'>
                        <div className=' p-1'>Need Help?</div>
                        <div className=' p-1'>Our Member Services team is online daily.</div>
                        <div className=' p-1'>/ Email</div>
                    </div>

                </div>

                {/* wishlist */}
                <div>
                    <h2 className='text-4xl font-semibold m-5'>Wishlist</h2>
                    <div className='flex flex-wrap w-fit'>
                        {getWishlistItems.length > 0 ? (
                            getWishlistItems.map((item) => (
                                <div key={item.id} className='pb-4 m-2 w-[240px]'>
                                    <Link href={`/Salesdetail/${item.id}`} key={item.id}>

                                        <img
                                            className='cursor-pointer h-80 w-full object-cover transition-opacity duration-300 group-hover:opacity-0'
                                            src={`http://localhost:3/uploads/sales/${item.image[0]}`}
                                            alt={item.name}
                                        />
                                        {/* Hovered Product Image */}
                                        {item.image[1] && (
                                            <img
                                                className='absolute top-0 left-0 h-80 w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                                                src={`http://localhost:3/uploads/sales/${item.image[1]}`}
                                                alt={`${item.name} Hover`}
                                            />
                                        )}


                                        <h3 className='mt-2'>{item.name}</h3>
                                        <p>{item.price}</p>
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                        className='text-red-500 hover:text-red-700'
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
