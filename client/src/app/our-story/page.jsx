import Footer from '@/components/Footer'
import React from 'react'

export default function page() {
    return (
        <div>

            {/* our story */}
            <div className="relative h-[80vh] md:h-screen">
                <img
                    className="h-full w-full object-cover"
                    src="https://cdn.shopify.com/s/files/1/0553/7100/6130/t/12/assets/ourstorytopv21-1638308615192.jpg?v=1638308650"
                    alt=""
                />

                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center px-4">
                    <img
                        className="h-12 mb-4"
                        src="https://cdn.shopify.com/s/files/1/0530/9517/0219/t/8/assets/pf-0598662a--Emblemsimple1white.svg?v=1613140901"
                    />

                    <h1 className="text-4xl md:text-7xl font-bold">Our Story</h1>
                    <p className="text-xl md:text-2xl mt-2">Crafted with purpose. Built for everyday life.</p>
                    <p className="text-xl md:text-2xl">Designed for those who value comfort, style, and simplicity</p>
                </div>
            </div>


            {/* para */}
            <div className=' h-[400px] flex justify-center items-center'>
                <p className='text-xl font-semibold  w-[920px] text-center'>We believe clothing should do more than just look good—it should feel right, last longer, and fit seamlessly into your everyday life. Our mission is to create thoughtfully designed products that combine comfort, quality, and modern style. Every piece we build reflects our commitment to simplicity, durability, and conscious choices that make a difference.</p>
            </div>

            {/* how it all started */}
            <div className="py-20 px-6 md:px-20 flex flex-col md:flex-row items-center gap-10">

                <img
                    className="w-full md:w-1/2 h-[400px] md:h-[600px] object-cover rounded-lg"
                    src="/sales/how it started.webp"
                />

                <div className="md:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-semibold mb-4">
                        How it all started
                    </h2>

                    <p className="mb-3 text-gray-700">
                        Our journey began with a simple idea: create clothing that people actually enjoy wearing every day.
                    </p>
                    <p className="mb-3 text-gray-700">
                        What started as a small collection has grown into a brand focused on delivering clean design, reliable quality, and effortless style. We wanted to remove the noise from fashion and focus on what truly matters—fit, comfort, and confidence.
                    </p>
                    <p className="mb-3 text-gray-700">
                        Today, we continue to evolve, but our core remains the same: make better products for better everyday living.
                    </p>

                    <h4 className="mt-4 font-medium">The PratikWear team</h4>
                </div>
            </div>

            {/* our values */}
            <div className="py-20 px-6 md:px-20">
                <h1 className="text-3xl md:text-5xl font-semibold mb-10">
                    Our values
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

                    <div>
                        <h2 className="font-medium text-lg">We design products that are simple, functional, and built to last—no unnecessary complexity, just thoughtful design.</h2>
                        <p className="text-sm text-gray-600 mt-2">
                            We believe in growing together with our customers by listening, improving, and creating experiences that matter.
                        </p>
                    </div>

                    Every product is crafted with attention to detail, ensuring durability, comfort, and long-term value.
                    We keep things real—no over-promising, no shortcuts. Just honest products made with care.
                </div>
            </div>

            {/* Our achievements */}
            <div className="bg-orange-100 py-20 px-6 md:px-20 flex flex-col md:flex-row gap-10">

                <div className="md:w-1/2">
                    <h1 className="text-3xl md:text-5xl font-semibold">
                        Our 2023 achievements
                    </h1>
                    <p className="mt-4 text-gray-700">
                        Happy Customers
                        Trusted by customers who value quality and comfort.
                    </p>
                </div>

                <div className="md:w-1/2 grid gap-6">

                    <div>
                        <h1 className="text-4xl font-bold">100+ Products</h1>
                        <p className="font-medium">A growing collection designed for everyday wear across all styles.</p>
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">Fast Delivery</h1>
                        <p className="font-medium">Reliable shipping with quick turnaround times across regions.</p>
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">Customer First</h1>
                        <p className="font-medium">We continuously improve based on real customer feedback and needs.</p>
                    </div>

                    <div>
                        <h1 className="text-4xl font-bold">Quality Checked</h1>
                        <p className="font-medium">Every product goes through basic quality checks before reaching you.</p>
                    </div>

                </div>

            </div>

            {/* footer */}
            <Footer />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Londrina+Outline&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

        </div >
    )
}
