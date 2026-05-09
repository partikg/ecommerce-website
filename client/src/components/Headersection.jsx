"use client";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Hero from './Hero';
import FeaturesBar from './FeaturesBar';
import FeaturedCategories from './FeaturedCategories';
import JustIn from './JustIn';
import Brr from './Brr';
import Footer from './Footer';

export default function Headersection() {

    const [newProducts, setNewProducts] = useState([]);
    const searchparams = useSearchParams();

    useEffect(() => {
        const justIn = searchparams.get('justIn') || '';
        const daysAgo = searchparams.get('daysAgo') || '';
        const type = searchparams.get('type') || '';

        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sales/view`, {
            justIn,
            daysAgo,
            type
        })
            .then((response) => {

                const data = response?.data?.data;

                if (Array.isArray(data)) {
                    setNewProducts(data.slice(0, 8));
                } else {
                    setNewProducts([]);
                }

            })
            .catch((error) => {
                console.log("API not ready yet:", error);
                setNewProducts([]);
            });

    }, [searchparams]);

    return (

        <div>
            <Hero />
            <FeaturesBar />
            <FeaturedCategories />
            <JustIn products={newProducts} />
            <Brr products={newProducts} />
            <Footer />
        </div >

    )
}
