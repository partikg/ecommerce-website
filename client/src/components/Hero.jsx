'use client';
import Link from "next/link";

export default function Hero() {

    return (
        <div className="relative w-full overflow-hidden">

            <video
                className="h-[500px] w-full object-cover"
                muted
                loop
                autoPlay
                src="https://cdn.shopify.com/videos/c/o/v/c6710b4309ca491f8f1351fdb8936d01.mp4"
            />

            <div className="absolute inset-0 bg-black/40" />

            <div className="absolute inset-0 flex flex-col justify-between items-center px-4 py-8">

                <div className="flex flex-col items-center text-white z-10">

                    <h1 className="text-6xl md:text-8xl font-bold text-center leading-tight mb-2">
                        The Fall Sale
                    </h1>
                    <h2 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mb-8">
                        25% Off Everything
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-6 mt-8">
                        <Link
                            href="/sales?gender=women"
                            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-yellow-300 transition transform hover:scale-105 duration-300 shadow-lg text-lg"
                        >
                            Shop Women
                        </Link>
                        <Link
                            href="/sales?gender=men"
                            className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-yellow-300 transition transform hover:scale-105 duration-300 shadow-lg text-lg"
                        >
                            Shop Men
                        </Link>
                        <Link
                            href="/sales"
                            className="px-10 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-black transition duration-300 text-lg"
                        >
                            Shop All
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}