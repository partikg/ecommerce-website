'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Footer from '@/components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromWishlist } from '@/features/wishlist/wishlistslice';
import { useToast } from '@/context/ToastContext';

export default function Page() {

    const dispatch = useDispatch();
    const wishlist = useSelector(state => state.wishlist.wishlist);
    const { showToast } = useToast();
 const [mounted, setMounted] = useState(false);

  useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;
    
    return (

        <div className="max-w-6xl mx-auto px-4 py-6">

            <div>
                <h2 className='text-4xl font-semibold mb-6'>
                    Wishlist
                </h2>

                <div>
                    <div className='flex flex-wrap w-fit'>
                        {wishlist.length > 0 ? (
                            wishlist.map((item) => (
                                <div key={item.id} className="pb-4 m-2 w-[240px]">
    <Link href={`/Salesdetail/${item.id}`}>
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
        onClick={() => {
            dispatch(removeFromWishlist(item.id));
            showToast('Removed from wishlist', 'success');
        }}
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
                </div>

            </div>

            <Footer />

        </div >

    )
}
