"use client";

import { useState } from "react";
import Link from "next/link";

export default function JustIn({ products }) {
    const [slide, setSlide] = useState(0);
    const items = 4;

    const next = () => {
        if (slide + items < products.length) {
            setSlide(slide + items);
        }
    };

    const prev = () => {
        if (slide > 0) {
            setSlide(slide - items);
        }
    };

    return (
        <div className="p-8 relative">
            <h2 className="text-2xl font-bold text-center mb-6">
                This Just In
            </h2>

            {/* left arrow */}
            <button
                onClick={prev}
                disabled={slide === 0}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md px-3 py-2 text-xl rounded-full disabled:opacity-30"
            >
                ←
            </button>

            {/* products */}
            <div className="flex justify-center gap-6">
                {products.slice(slide, slide + items).map((p) => {
                    const img = Array.isArray(p.image) ? p.image[0] : p.image;

                    return (
                        <Link
                            key={p._id}
                            href={`/Salesdetail/${p._id}`}
                            className="text-center group"
                        >
                            <img
                                src={`http://localhost:5000/uploads/sales/${img}`}
                                className="h-[350px] w-[260px] object-cover"
                            />
                            <p className="mt-2 font-medium">{p.name}</p>
                        </Link>
                    );
                })}
            </div>

            {/* right arrow */}
            <button
                onClick={next}
                disabled={slide + items >= products.length}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md px-3 py-2 text-xl rounded-full disabled:opacity-30"
            >
                →
            </button>
        </div>
    );
}