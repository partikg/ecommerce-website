'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist, setWishlist, addToWishlist } from '@/features/wishlist/wishlistslice';
import { useToast } from '@/context/ToastContext';
import axios from 'axios';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Page() {
    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const { showToast } = useToast();
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        if (userId) {
            axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/wishlists/${userId}`)
                .then(res => {
                    dispatch(setWishlist(res.data.data || []));
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [userId, dispatch]);

    const handleRemove = (productId) => {
        const removedItem = wishlist.find(item => item.product_id === productId);
        dispatch(removeFromWishlist(productId));
        showToast('Removed from wishlist', 'success');

        axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/wishlists/${userId}/remove`,
            { product_id: productId }
        ).catch(err => {
            if (removedItem) {
                dispatch(addToWishlist(removedItem));
            }
            showToast('Error removing from wishlist', 'error');
        });
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="max-w-6xl mx-auto px-4 py-6">
            <h2 className='text-4xl font-semibold mb-6'>Wishlist</h2>

            <div className='flex flex-wrap w-fit'>
                {wishlist && wishlist.length > 0 ? (
                    wishlist.map((item) => (
                        <div key={item.product_id} className="pb-4 m-2 w-[240px]">
                            <Link href={`/Salesdetail/${item.product_id}`}>
                                {item.image?.[0] && (
                                    <img
                                        src={item.image[0]}
                                        alt={item.name}
                                        className="h-80 w-full object-cover"
                                    />
                                )}
                                <h3 className="mt-2">{item.name}</h3>
                                <p>{item.price}</p>
                            </Link>

                            <button
                                onClick={() => handleRemove(item.product_id)}
                                className="text-red-500 text-sm mt-2"
                            >
                                Remove from Wishlist
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No items in your wishlist.</p>
                )}
            </div>

            <Footer />
        </div>
    )
}