'use client'
import Brr from '@/components/Brr';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturesBar from '@/components/FeaturesBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import JustIn from '@/components/JustIn';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function page() {

    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/sales/view`)
            .then((response) => {
                const womenProducts = response.data.data.filter(
                    (item) => item.gender === 'women'
                );
                setNewProducts(womenProducts);
            })
            .catch((error) => {
                console.error('Error fetching new products:', error);
            });
    }, []);

    return (
        <div>
            <Hero />
            <FeaturesBar />
            <FeaturedCategories gender="women" />
            <JustIn products={newProducts} />
            <Brr products={newProducts} />
            <Footer />
        </div >
    )
}
