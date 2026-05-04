"use client";

import { useState } from "react";
import Link from "next/link";

export default function Brr({ products = [] }) {
    const [index, setIndex] = useState(0);
    const items = 4;

    const next = () => {
        if (index + items < products.length) {
            setIndex(index + 1);
        }
    };

    const prev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    const visible = products.slice(index, index + items);

    return (
        <div className="bg-[#AEE9D1] py-6 px-6">
            <div className="flex items-center gap-6 relative">

                {/* left side */}
                <div className="w-[250px] flex-shrink-0">
                    <img
                        src="/sales/brr.webp"
                        className="h-[300px] w-full object-cover rounded-md"
                    />
                    <h2 className="mt-2 text-xl font-semibold text-center">
                        Brrrrr!
                    </h2>
                </div>

                {/* products */}
                <div className="flex gap-5 overflow-hidden w-full">

                    {visible.map((p) => {
                        const img = Array.isArray(p.image) ? p.image[0] : p.image;

                        return (
                            <Link
                                key={p._id}
                                href={`/Salesdetail/${p._id}`}
                                className="min-w-[200px]"
                            >
                                <img
                                    src={`http://localhost:5000/uploads/sales/${img}`}
                                    className="h-[260px] w-full object-cover"
                                />
                                <p className="mt-2 text-sm font-medium">
                                    {p.name}
                                </p>
                            </Link>
                        );
                    })}

                </div>

                {/* arrow */}
                <button
                    onClick={prev}
                    className="absolute left-[260px] bg-white shadow px-2 py-1 rounded-full"
                    disabled={index === 0}
                >
                    ←
                </button>

                <button
                    onClick={next}
                    className="absolute right-2 bg-white shadow px-2 py-1 rounded-full"
                    disabled={index + items >= products.length}
                >
                    →
                </button>

            </div>
        </div>
    );
}