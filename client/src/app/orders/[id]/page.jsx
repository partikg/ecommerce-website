'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import axios from 'axios'

export default function OrderDetail() {

    const params = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {

        if (!params?.id) return;

        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/orders/${params.id}`)
            .then((success) => {
                setData(success.data.order)
            })
            .catch((error) => {
                console.log(error)
            })

    }, [params])

    if (!data) return <p className="text-center mt-10">Order not found</p>;

    const items = data.product_details || data.items || [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'Processing':
                return 'bg-yellow-100 text-yellow-800'

            case 'Shipped':
                return 'bg-blue-100 text-blue-800'

            case 'Delivered':
                return 'bg-green-100 text-green-800'

            default:
                return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="max-w-3xl mx-auto px-6 py-8">

            <Link href="/orders" className="text-gray-600 hover:text-black">
                ← Back to Orders
            </Link>

            {/* order */}
            <div className="border rounded-lg p-5 mt-5 mb-6">

                <h2 className="text-xl font-bold mb-4">
                    Order Info
                </h2>

                <div className="space-y-2">

                    <p>
                        <b>Order ID:</b> {data._id}
                    </p>

                    <p>
                        <b>Total:</b> ₹{data.order_total || data.total || 0}
                    </p>

                    <p>
                        <b>Payment Status:</b>{" "}
                        {data.status === 2 ? "Paid" : "Pending"}
                    </p>

                    <p>
                        <b>Order Status:</b>{" "}
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(data.orderStatus)}`}>
                            {data.orderStatus || (data.status === 2 ? "Processing" : "Pending")}
                        </span>
                    </p>

                </div>
            </div>

            {/* item */}
            <div className="border rounded-lg p-5 mb-6">

                <h2 className="text-xl font-bold mb-4">
                    Items Ordered
                </h2>

                {items.length > 0 ? (
                    <div className="space-y-3">

                        {items.map((item, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-3 border rounded-lg"
                            >

                                <div>
                                    <p className="font-medium">
                                        {item.name || item.product_name || "Product"}
                                    </p>

                                    <p className="text-sm text-gray-500">
                                        Qty: {item.quantity || 1}
                                    </p>
                                </div>

                                <p className="font-semibold">
                                    ₹{item.price || 0}
                                </p>

                            </div>
                        ))}

                    </div>
                ) : (
                    <p className="text-gray-500">No items found</p>
                )}

            </div>

        </div>
    )
}