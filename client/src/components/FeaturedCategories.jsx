"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";

export default function FeaturedCategories({ gender }) {
    const [categories, setCategories] = useState([]);
    const [imagePath, setImagePath] = useState("");

    useEffect(() => {
        axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/categories/view`)
            .then((res) => {
                let data = res.data.data;

                // OPTIONAL filter (only if your DB supports gender in categories)
                if (gender) {
                    data = data.filter(
                        (cat) => !cat.gender || cat.gender === gender
                    );
                }

                setCategories(data);
                setImagePath(res.data.imagePath);
            })
            .catch((err) => console.log(err));
    }, [gender]);

    return (
        <div className="p-5">
            <h2 className="text-2xl font-bold">Featured Categories</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-5">

                {categories.map((cat) => (
                    <Link
                        key={cat._id}
                        href={
                            gender
                                ? `/sales?category=${cat._id}&gender=${gender}`
                                : `/sales?category=${cat._id}`
                        }
                        className="text-center"
                    >
                        <img
                            src={`${imagePath}${cat.image}`}
                            className="h-[400px] w-[300px] object-cover rounded-md"
                        />
                        <h4 className="mt-2 font-medium">{cat.name}</h4>
                    </Link>
                ))}

            </div>
        </div>
    );
}