'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function My_orders() {
    const [data, setData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/order/orders`)
            .then((success) => {
                const myOrders = success.data.filter(
                    order => order.user === localStorage.getItem('userId')
                )
                setData(myOrders)
            })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing': return 'bg-yellow-100 text-yellow-800'
            case 'Shipped': return 'bg-blue-100 text-blue-800'
            case 'Delivered': return 'bg-green-100 text-green-800'
            case 'Cancelled': return 'bg-red-100 text-red-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">

            <Link href="/"
                className="inline-flex items-center text-sm text-gray-500 hover:text-black mb-6">

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16l-4-4m0 0l4-4m-4 4h18">
                    </path>
                </svg>

                <span className="ml-1 font-bold text-lg">Back</span>
            </Link>

            <h1 className="text-3xl font-bold mb-6">My Orders</h1>

            {data.length === 0 ? (
                <p className="text-gray-500">No orders found</p>
            ) : (
                data.map((order) => (
                    <div key={order._id}
                        onClick={() => router.push(`/orders/${order._id}`)}
                        className="flex justify-between items-center p-5 mb-4 border rounded-lg cursor-pointer hover:shadow-md transition">
                        <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
                            Order ID: {order._id}
                        </h5>
                        <p className="text-body">Total: ${order.total}</p>
                        <p className="text-body">Payment: {order.paymentStatus}</p>
                        <p className={`text-body ${getStatusColor(order.orderStatus)}`}>{order.orderStatus}</p>
                        <p className="text-body">Items: {order.items.length}</p>
                    </div>

                ))
            )}

        </div >
    )
}
