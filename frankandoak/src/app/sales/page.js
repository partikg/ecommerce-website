'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../Component/Sidebar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { addtocart } from '../reduxtoolkit/slices/cartslice'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Headersection from '../Component/Headersection'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeftRotate, faAward, faCashRegister, faHeart, faTruck } from '@fortawesome/free-solid-svg-icons'
import { addToWishlist } from '../reduxtoolkit/slices/wishlistslice'

export default function page() {

    let [productsales, setproductsales] = useState([])
    let [salespath, setsalespath] = useState('')

    const router = useRouter();
    const dispatch = useDispatch()
    const searchparams = useSearchParams();

    useEffect(() => {
        const gender = searchparams.get('gender') || '';
        const type = searchparams.get('type') || '';

        axios.post('http://localhost:3/api/backend/sales/view', { gender: gender, type: type })
            .then((success) => {
                console.log(success.data)
                setproductsales(success.data.data)
                setsalespath(success.data.imagePath)
            })
            .catch((error) => {
                console.log(error);
            })

    }, [searchparams])

    let genderfilter = (gender) => {
        axios.post('http://localhost:3/api/backend/sales/view', {
            gender: gender
        })
            .then((success) => {
                console.log(success.data)
                setproductsales(success.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    let filterBySubcategory = (type) => {
        axios.post('http://localhost:3/api/backend/sales/view', {
            type: type
        })
            .then((success) => {
                console.log(success.data)
                setproductsales(success.data.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }




    return (

        <div>
            <div className='flex'>
                <Sidebar onSubcategorySelect={filterBySubcategory} />

                <div >

                    {/* women and men */}
                    <div className='flex py-2'>
                        <div onClick={() => genderfilter('women')} className='cursor-pointer m-2 max-w-xs'>
                            <img className='hover:scale-105 duration-300 h-52 w-full object-cover' src="sales/Women_s_320x.webp" alt='' />
                            <h4>Women's</h4>
                        </div>

                        <div onClick={() => genderfilter('men')} className='cursor-pointer m-2 max-w-xs'>
                            <img className='hover:scale-105 duration-300 h-52 w-full object-cover' src="sales/Men_s_320x.webp" alt='' />
                            <h4>Men's</h4>
                        </div>
                    </div>

                    <hr />

                    {/* sale */}
                    <h2 className='m-2 py-2 font-medium text-xl'>Sale</h2>

                    <div className='flex flex-wrap'>
                        {productsales.length > 0 ? (
                            productsales.map((data) => (
                                <Link href={`/Salesdetail/${data._id}`} key={data._id} className='pb-4 m-2 w-[245px]'>
                                    <div className='relative group'>
                                        {/* Main Product Image with Hover Transition */}
                                        <img
                                            className='cursor-pointer h-80 w-full object-cover transition-opacity duration-300 group-hover:opacity-0'
                                            src={`${salespath}${data.image[0]}`}
                                            alt={data.name}
                                        />
                                        {/* Hovered Product Image */}
                                        {data.image[1] && (
                                            <img
                                                className='absolute top-0 left-0 h-80 w-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100'
                                                src={`${salespath}${data.image[1]}`}
                                                alt={`${data.name} Hover`}
                                            />
                                        )}
                                        <span className='absolute top-2 left-2 bg-white text-red-500 p-1 text-xs'>-28%</span>
                                        <span className='absolute top-2 right-2 bg-black text-white p-1 text-xs'>New</span>
                                    </div>

                                    {/* Product Name and Wishlist */}
                                    <div className='cursor-pointer mt-2 w-full flex items-center justify-between'>
                                        <span>{data.name}</span>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(addToWishlist(data));
                                            }}
                                        >
                                            <FontAwesomeIcon icon={faHeart} className='text-gray-500 hover:text-red-500' />
                                        </button>
                                    </div>

                                    {/* Product Price */}
                                    <h2 className='cursor-pointer mt-2 w-fit'>{data.price}</h2>
                                </Link>
                            ))
                        ) : (
                            <p>No products found.</p>
                        )}
                    </div>



                </div>

            </div >


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

        </div>



    )
}
