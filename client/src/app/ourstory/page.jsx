import { faArrowLeftRotate, faAward, faCashRegister, faTruck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <div>

            {/* our story */}
            <div >
                <div className='relative'>
                    <img className='h-screen' src="https://cdn.shopify.com/s/files/1/0553/7100/6130/t/12/assets/ourstorytopv21-1638308615192.jpg?v=1638308650" alt="" />
                    {/* <img className='cursor-pointer h-80 w-full object-cover' src={salespath + data.image} alt={data.name} /> */}
                    <span className=' absolute top-[30px] left-2 h-[35px] w-[200px]  text-white  text-sm font-medium'>Our beginnings
                    </span>
                    <span className=' absolute top-[70px] left-2 h-[35px] w-[200px]  text-white  text-sm font-medium'>Our values
                    </span>
                    <span className=' absolute top-[110px] left-2 h-[35px] w-[200px]  text-white  text-sm font-medium'>Our sustainability goals
                    </span>
                    <span className=' absolute top-[150px] left-2 h-[35px] w-[200px]  text-white  text-sm font-medium'>Our community & partners
                    </span>
                    <div className=' absolute top-[180px] left-[450px] h-[300px] w-[500px]'>
                        <img className='h-[60px] w-full text-center ' src="https://cdn.shopify.com/s/files/1/0530/9517/0219/t/8/assets/pf-0598662a--Emblemsimple1white.svg?v=1613140901" alt="" />
                        <h2 className=' h-[100px] text-8xl text-white text-center'>Our Story</h2>
                        <p className=' h-[50px]   text-white p-1 text-3xl font-semibold text-center'>Designed in Canada.</p>
                        <p className='h-[50px] text-white p-1 text-3xl font-semibold text-center'>Inspire Better Living.</p>
                    </div>
                </div>

            </div>

            {/* para */}
            <div className=' h-[400px] flex justify-center items-center'>
                <p className='text-xl font-semibold  w-[920px] text-center'>We believe in considering the impact of the choices we make every day and view those choices as an opportunity to better ourselves. Our purpose is to Inspire a Better way of Living by creating conscious products that last through time. By marrying innovation with eco-friendly processes, we strive to help shape a cleaner, healthier, and more mindful world where human progress is in harmony with the planet's well-being.</p>
            </div>

            {/* how it all started */}
            <div className='h-[700px] p-10  flex '>

                <div className='  '>
                    <img className=' w-[600px]  h-[600px]' src="sales/how it started.webp" alt="" />
                </div>

                <div className=' w-[600px] flex items-center'>
                    <div className='p-8'>
                        <h2 className=' p-5 font-medium text-5xl'>How it all started</h2>

                        <p className='ml-2 p-2'>Frank And Oak was founded in Montreal in 2012, with a mission to create an apparel brand that would speak to a new generation of creatives and entrepreneurs.</p>
                        <p className='ml-2 p-2'>What once started as a favourite in Montreal’s Mile End quickly blossomed into one of Canada’s leading lifestyle brands and digital retailers.</p>
                        <p className='ml-2 p-2'>A certified B Corp, Frank And Oak is now a leader in sustainable fashion and using innovative fabrics from nature to make products that are thoughtfully designed to help you live better, enjoy more, and feel good in everything you wear.</p>
                        <h4 className='ml-2 p-5 font-medium'>The Frank And Oak team</h4>

                    </div>
                </div>

            </div>

            {/* our values */}
            <div className='h-[500px]  p-20 '>
                <h1 className=' text-6xl m-5 font-semibold'>Our values</h1>
                <div className=' flex justify-evenly m-5 space-x-5'>

                    <div className=' w-[800px]'>
                        <h2 className=' text-xl font-medium py-2'>Act with purpose</h2>
                        <p className=' text-sm py-2'>We design durable products that blend timeless style with functional features that help lay the foundation for better living.</p>
                    </div>

                    <div className=' w-[800px]'>
                        <h2 className='  text-xl font-medium py-2'>Create communities</h2>
                        <p className=' text-sm py-2'>We bring together a community of passionate and diverse individuals who want to be part of something bigger.</p>
                    </div>

                    <div className=' w-[800px]'>
                        <h2 className='  text-xl font-medium py-2'>Inspire innovation</h2>
                        <p className=' text-sm py-2'>We are a forward-thinking brand that delivers cutting-edge products to fit our customers' modern and evolving lifestyles.

                        </p>
                    </div>

                    <div className=' w-[800px]'>
                        <h2 className='  text-xl font-medium py-2'>Be authentic</h2>
                        <p className=' text-sm py-2'>We are driven by passion, not ego. We recognize and celebrate our individuality, strengths, and even weaknesses, but remain humble and open to continuous improvement.</p>
                    </div>

                </div>


            </div>

            {/* Our achievements */}
            <div className='h-[1500px]  bg-orange-100 flex  p-28'>

                <div className=' w-[700px]  p-5'>
                    <h1 className=' text-6xl font-medium'>Our 2023 achievements</h1>
                    <p className=' py-5'>
                        By adopting circularity and innovation as our design philosophy, we strive to help shape a better, more mindful world where human progress is in harmony with the planet’s well-being. After years of work, reflection, and challenges, and in line with our pledge for transparency, we are proud to share our progress and the significant milestones we’ve reached so far.
                    </p>
                    <p className=' text-2xl'>Read the full report</p>

                </div>

                <div className=' w-[700px] p-5 space-y-8'>

                    <div className=''>
                        <h1 style={{ fontFamily: 'Londrina Outline, sans-serif' }} className=' text-5xl font-semibold'>100%</h1>
                        <p className=' text-xl font-medium py-2'>of our assortment is responsible.</p>
                        <p className=' py-2'>For us, that means all our products either contain low-impact, cruelty-free, organic, biodegradable, or recycled fibres, or are manufactured using industry-leading technologies and processes. </p>
                    </div>

                    <div className=''>
                        <h1 style={{ fontFamily: 'Londrina Outline, sans-serif' }} className=' text-5xl font-semibold'>Less than 0.5%</h1>
                        <p className=' text-xl font-medium py-2'>of our products feature virgin polyester.</p>
                        <p className=' py-2'>We have (almost) eliminated the use of virgin polyester and replaced it with recycled polyester. </p>
                    </div>

                    <div className=''>
                        <h1 style={{ fontFamily: 'Londrina Outline, sans-serif' }} className=' text-5xl font-semibold'>100%</h1>
                        <p className=' text-xl font-medium py-2'>of our denim collection is designed to be circular.</p>
                        <p className=' py-2'>All our denim styles are designed to be easily recycled. This means we craft them using conscious materials, salvaged fibres, and zero rivets.  </p>
                    </div>

                    <div className=''>
                        <h1 style={{ fontFamily: 'Londrina Outline, sans-serif' }} className=' text-5xl font-semibold'>Over 70%</h1>
                        <p className=' text-xl font-medium py-2'>of our styles are made using mono-fibres and bi-fibres.</p>
                        <p className=' py-2'>The more fibres are mixed together in a garment, the harder it will be to recycle. That is why we strive to keep the percentage of multi-fibre pieces to less than 30% of our collection.</p>
                    </div>

                    <div className=''>
                        <h1 style={{ fontFamily: 'Londrina Outline, sans-serif' }} className=' text-5xl font-semibold'>More than 40%</h1>
                        <p className=' text-xl font-medium py-2'>of our deliveries were carbon-neutral in 2023.</p>
                        <p className=' py-2'>Since October 2022, we have been working with our warehousing and last-mile logistics partner, GoBolt, to make our deliveries carbon neutral. Last year, they delivered more than 40% of our packages. 15% of these deliveries were done by Electric Vehicle (EV), and the rest was offset by sequestering carbon.</p>
                    </div>

                    <div className=''>
                        <h1 style={{ fontFamily: 'Londrina Outline, sans-serif' }} className=' text-5xl font-semibold'>Code of Conduct</h1>
                        <p className=' text-xl font-medium py-2'>We require all our manufacturing partners to sign our Code of Conduct.</p>
                        <p className=' py-2'>As part of our commitment to transparency and accountability, we adhere to the highest standards of fair labour practices and environmental protection. That is why we require our partners to have completed, or be in the process of completing, compliance audits conducted by international organizations such as BSCI (Business Social Compliance Initiative) and WRAP (Worldwide Responsible Accredited Production). </p>
                    </div>

                </div>

            </div>

            {/* footer */}
            <footer>

                <div className=' bg-black h-[1000px] w-full '>

                    <div className=' h-[200px] flex justify-evenly text-center py-10'>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faTruck} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Free Shipping</h2>
                            <p className=' text-white text-sm font-medium p-2'>ON orders over $99</p>
                        </div>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faArrowLeftRotate} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Free Returns</h2>
                            <p className=' text-white text-sm font-medium p-2'>Only keep what you love.</p>
                        </div>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faAward} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Frank's Club</h2>
                            <p className=' text-white text-sm font-medium p-2'>Earn points and get rewards.</p>
                        </div>

                        <div className=' w-[250px] '>
                            <FontAwesomeIcon icon={faCashRegister} className="mr-2 text-white p-10" size='2xl' />
                            <h2 className=' text-white text-xl font-semibold p-2'>Buy Now, Pay Later</h2>
                            <p className=' text-white text-sm font-medium p-2'>Select Klarna at checkout.</p>
                        </div>

                    </div>

                    <div className=' h-[800px] flex justify-evenly items-center p-5 '>

                        <div className=' w-[200px] h-[440px]'>
                            <FontAwesomeIcon icon={faAward} className=" text-white " size='5x' />
                            <h4 className='text-white '>Frank&co</h4>

                        </div>

                        <div className=' w-[180px] h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium' >Our Story</h4>
                            <h4 className=' text-white py-2'>Who we are</h4>
                            <h4 className=' text-white py-2'>Sustainable practices</h4>
                            <h4 className=' text-white py-2'>Design Ideology</h4>
                            <h4 className=' text-white py-2'>Fabrics</h4>
                            <h4 className=' text-white py-2'>Circular denim™</h4>
                            <h4 className=' text-white py-2'>Partners and factories</h4>
                        </div>

                        <div className=' w-[180px] h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium'>Discover</h4>
                            <h4 className=' text-white py-2'>Gift Cards</h4>
                            <h4 className=' text-white py-2'>Frank's Club</h4>
                            <h4 className=' text-white py-2'>Give $15, Get $15</h4>
                            <h4 className=' text-white py-2'>Affiliate</h4>
                            <h4 className=' text-white py-2'>Blog</h4>
                            <h4 className=' text-white py-2'>Work with us</h4>
                            <h4 className=' text-white py-2'>Our Stores</h4>
                        </div>

                        <div className=' w-[180px]  h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium'>Customer Care</h4>
                            <h4 className=' text-white py-2'>Shipping Information</h4>
                            <h4 className=' text-white py-2'>Returns & Exchanges</h4>
                            <h4 className=' text-white py-2'>Coupon Codes</h4>
                            <h4 className=' text-white py-2'>F.A.Q.</h4>
                            <h4 className=' text-white py-2'>Terms & Conditions</h4>
                            <h4 className=' text-white py-2'>Refund Policy</h4>
                            <h4 className=' text-white py-2'>Privacy Policy</h4>
                            <h4 className=' text-white py-2'>Accessibility Statement</h4>
                            <h4 className=' text-white py-2'>Customer Data Requests</h4>

                        </div>

                        <div className=' w-[400px] h-[440px]'>
                            <h4 className=' text-white py-2 text-lg font-medium'>Stay in touch</h4>
                            <p className=' text-white py-2'>Join our newsletter and stay in the know about new collections, outfit inspiration, sales, and more.</p>
                        </div>

                    </div>

                </div>

            </footer>

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Londrina+Outline&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />

        </div >
    )
}
