'use client'
import Footer from '@/components/Footer';
import { addtocart } from '@/features/cart/cartslice';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

export default function Page() {

    const params = useParams();
    const [product, setProduct] = useState([]);

    const dispatch = useDispatch()

    useEffect(() => {
        if (params?.id) {
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/sales/details/` + params.id)
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

    return (

        <div>
            <div className='max-w-6xl mx-auto px-4 py-10'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                    {/* images */}
                    <div className='grid grid-cols-2 gap-4'>
                        {product.image && product.image.length > 0 ? (
                            product.image.map((img, index) => (

                                <img key={index}
                                    src={img}
                                    className='w-full h-[350px] object-cover'
                                />

                            ))
                        ) : (

                            <img
                                src="/placeholder-image.png"
                                alt="Placeholder"
                                className="w-full h-[350px] object-cover"
                            />

                        )}
                    </div>


                    {/* details  */}
                    <div className='flex flex-col justify-center'>

                        <h1 className='text-3xl font-semibold mb-2'>{product.name}</h1>
                        <p className=' text-base font-normal '>{product.gender}</p>
                        <p className='text-2xl font-bold text-red-500 mb-4'>{product.price}</p>
                        <p className='text-gray-700 mb-6'>description:{product.description}</p>

                        <button
                            onClick={() => {
                                dispatch(addtocart(product));
                                alert("added to cart");
                            }}
                            className='bg-black text-white py-3 rounded-md'>
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div >

            <Footer />

        </div >
    )
}
