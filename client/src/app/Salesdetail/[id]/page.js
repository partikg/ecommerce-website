'use client'
import Footer from '@/components/Footer';
import { addtocart } from '@/features/cart/cartslice';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/context/ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {
    addToWishlist,
    removeFromWishlist
} from '@/features/wishlist/wishlistslice';

export default function Page() {

    const params = useParams();
    const dispatch = useDispatch();
    const { showToast } = useToast();
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);

    const wishlist = useSelector(state => state.wishlist.wishlist)

    useEffect(() => {
    if (!params?.id) return;

    setProduct({});
    setQty(1);

    axios
        .post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/sales/details/${params.id}`
        )
        .then((response) => {
            setProduct(response.data.data);
        })
        .catch((error) => {
            console.log('Error fetching product details:', error);
        });
}, [params?.id]);

     const isWishlisted = wishlist.some(
        item => item.id === product._id
    );

    const handleWishlist = (e) => {
        e.preventDefault();

        if (isWishlisted) {
            dispatch(removeFromWishlist(product._id));
            showToast('Removed from wishlist', 'success');
        } else {
            dispatch(
                addToWishlist({
                    ...product,
                    id: product._id
                })
            );
            showToast('Added to wishlist', 'success');
        }
    };

    const handleAddToCart = () => {
        dispatch(
            addtocart({
                ...product,
                qty
            })
        );

        showToast('Added to cart', 'success');
    };

    return (

        <div>
            <div className='max-w-6xl mx-auto px-4 py-10'>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                    {/* images */}
                    <div className='grid grid-cols-2 gap-4'>
                        {product.image?.length > 0 &&
                            product.image.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={product.name}
                                    className='w-full h-[350px] object-cover'
                                />
                            ))
                        }
                    </div>


                    {/* details  */}
                    <div className='flex flex-col justify-center'>

                         <h1 className="text-3xl font-semibold mb-2">
                            {product.name}
                        </h1>

                        <p className="text-base font-normal">
                            {product.gender}
                        </p>
                        
                          <p className="text-2xl font-bold text-red-500 mb-4">
                            {product.price}
                        </p>

                        <p className="text-gray-700 mb-6">
                            Description: {product.description}
                        </p>

                        <div className="flex items-center gap-4 mb-4">
                            <button onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                            <span>{qty}</span>
                            <button onClick={() => setQty(qty + 1)}>+</button>
                        </div>

                          <button
                            onClick={handleWishlist}
                            className="mb-4 w-fit"
                        >
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="text-2xl"
                                style={{
                                    color: isWishlisted
                                        ? 'red'
                                        : 'gray'
                                }}
                            />
                        </button>

                        <button
                            onClick={handleAddToCart}
                            className="bg-black text-white py-3 px-6 rounded-md"
                        >
                            Add to Cart
                        </button>

                    </div>
                </div>
            </div >

            <Footer />

        </div >
    )
}
