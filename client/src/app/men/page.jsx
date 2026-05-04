'use client'
import { faArrowLeftRotate, faAward, faCashRegister, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Brr from '@/components/Brr';
import FeaturedCategories from '@/components/FeaturedCategories';
import FeaturesBar from '@/components/FeaturesBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import JustIn from '@/components/JustIn';

export default function page() {

    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/sales/view`)
            .then((response) => {
                const menProducts = response.data.data.filter(
                    (item) => item.gender === 'men'
                );
                setNewProducts(menProducts);
            })
            .catch((error) => {
                console.error('Error fetching new products:', error);
            });
    }, []);


    return (
        <div>
            <Hero />
            <FeaturesBar />
            <FeaturedCategories gender="men" />
            <JustIn products={newProducts} />
            <Brr products={newProducts} />
            <Footer />
        </div>
    )
}
