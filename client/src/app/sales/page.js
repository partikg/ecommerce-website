'use client'
import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import axios from 'axios'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from 'next/navigation'
import { addToWishlist } from '../../utils/wishlist';

export default function Page() {

    const [productsales, setproductsales] = useState([])
    const [salespath, setsalespath] = useState('')
    const searchParams = useSearchParams();
    const [wishlistIds, setWishlistIds] = useState([]);

    const [filters, setFilters] = useState({
        gender: '',
        type: '',
        category: ''
    });

    useEffect(() => {
        const category = searchParams.get('category') || '';
        const gender = searchParams.get('gender') || '';

        const updatedFilters = {
            category,
            gender,
            type: ''
        };

    }, [searchParams]);

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/sales/view`, filters)
            .then((res) => {
                setproductsales(res.data.data || []);
                setsalespath(res.data.imagePath);
            })
            .catch((err) => console.log(err));
    }, [filters]);

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlistIds(list.map(i => i._id));
    }, []);

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
                    {productsales.length > 0 ? (
                        productsales.map((data) => (
                            <Link href={`/Salesdetail/${data._id}`} key={data._id} className='pb-4 m-2 w-[245px]'>

                                <div className='relative group'>
                                    <img
                                        className='h-80 w-full object-cover transition-opacity duration-300 group-hover:opacity-0'
                                        src={`${salespath}${data.image?.[0]}`}
                                        alt={data.name}
                                    />

                                    {data.image?.[1] && (
                                        <img
                                            className='absolute top-0 left-0 h-80 w-full object-cover opacity-0 group-hover:opacity-100'
                                            src={`${salespath}${data.image[1]}`}
                                        />
                                    )}
                                </div>

                                <div className='mt-2 flex justify-between'>
                                    <span>{data.name}</span>

                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            addToWishlist(data);
                                            setWishlistIds(prev => [...prev, data._id]);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faHeart}
                                            style={{
                                                color: wishlistIds.includes(data._id) ? "red" : "gray"
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