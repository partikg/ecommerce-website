'use client'
import React, { useEffect, useState, Suspense } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import {
    addToWishlist,
    removeFromWishlist
} from '../../features/wishlist/wishlistslice';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/context/ToastContext';

export default function Page() {

    const [productsales, setproductsales] = useState([])
    const [salespath, setsalespath] = useState('')
    const searchParams = useSearchParams()
    const [loading, setLoading] = useState(true);
    const { showToast } = useToast();

    const dispatch = useDispatch()

    const wishlist = useSelector(state => state.wishlist.wishlist)

    const [filters, setFilters] = useState({
        gender: '',
        type: '',
        category: ''
    })

    useEffect(() => {
        const category = searchParams.get('category') || ''
        const gender = searchParams.get('gender') || ''

        setFilters(prev => ({
            ...prev,
            category,
            gender
        }))
    }, [searchParams])

    useEffect(() => {
        setLoading(true);

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sales/view`, filters)
            .then((res) => {
                setproductsales(res.data.data || [])
                setsalespath(res.data.imagePath)
            })
            .catch((err) => console.log(err))
            .finally(() => setLoading(false));
    }, [filters])

    return (
        <div className='flex'>

            <Sidebar
                selectedCategory={filters.category}
                selectedType={filters.type}
                selectedGender={filters.gender}

                onCategorySelect={(id) =>
                    setFilters(prev => ({
                        ...prev,
                        category: prev.category === id ? '' : id
                    }))
                }

                onSubcategorySelect={(type) =>
                    setFilters(prev => ({
                        ...prev,
                        type: prev.type === type ? '' : type
                    }))
                }

                onGenderSelect={(gender) =>
                    setFilters(prev => ({
                        ...prev,
                        gender: prev.gender === gender ? '' : gender
                    }))
                }
            />

            {/* products */}
            <div className='flex-1 p-4'>

                <h2 className='text-xl font-semibold mb-4'>Sale</h2>

                <div className='flex flex-wrap'>
                    {loading ? (
                        <LoadingSpinner />
                    ) : productsales.length > 0 ? (
                        productsales.map((data) => (
                            <Link
                                href={`/Salesdetail/${data._id}`}
                                key={data._id}
                                className='pb-4 m-2 w-[245px]'
                            >

                                <div className='relative group'>
                                    <img
                                        className='h-80 w-full object-cover transition-opacity duration-300 group-hover:opacity-0'
                                        src={data.image?.[0]}
                                        alt={data.name}
                                    />

                                    {data.image?.[1] && (
                                        <img
                                            className='absolute top-0 left-0 h-80 w-full object-cover opacity-0 group-hover:opacity-100'
                                            src={data.image[1]}
                                            alt={data.name}
                                        />
                                    )}
                                </div>

                                <div className='mt-2 flex justify-between'>
                                    <span>{data.name}</span>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();

                                            const alreadyExists = wishlist.some(
                                                item => item.id === data._id
                                            );

                                            if (alreadyExists) {
                                                dispatch(removeFromWishlist(data._id));
                                                showToast('Removed from wishlist', 'success');
                                            } else {
                                                dispatch(addToWishlist({
                                                    ...data,
                                                    id: data._id
                                                }));
                                                showToast('Added to wishlist', 'success');
                                            }
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            style={{
                                                color: wishlist.some(item => item.id === data._id)
                                                    ? "red"
                                                    : "gray"
                                            }}
                                        />
                                    </button>
                                </div>

                                <h2 className='mt-1'>{data.price}</h2>

                            </Link>
                        ))
                    ) : (
                        <p>No products found</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default function Page() {
    return (
        <Suspense fallback={<div className='p-4'><LoadingSpinner /></div>}>
            <SalesContent />
        </Suspense>
    )
}