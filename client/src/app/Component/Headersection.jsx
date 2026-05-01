import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftRotate, faAward, faCashRegister, faTruck, faInstagram } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

export default function Headersection() {

    const [newProducts, setNewProducts] = useState([]);

    const [currentSlide, setCurrentSlide] = useState(0);

    const itemsPerPage = 4;
    const brrItemsPerPage = 3;
    const searchparams = useSearchParams();

    useEffect(() => {
        const justIn = searchparams.get('justIn') || '';  // Extracting justIn from searchparams
        const daysAgo = searchparams.get('daysAgo') || '';  // Extracting daysAgo from searchparams
        const type = searchparams.get('type') || '';  // Extracting type from searchparams

        axios.post('http://localhost:3/api/backend/sales/view', { justIn, daysAgo, type })
            .then((response) => {
                setNewProducts(response.data.data.slice(0, 8)); // Access the correct data from response
                console.log(response.data.data.slice(0, 8)); // Log it for debugging
            })
            .catch((error) => {
                console.error('Error fetching new products:', error);
            });


    }, []);

    const nextSlide = () => {
        if (currentSlide + itemsPerPage < newProducts.length) {
            setCurrentSlide(currentSlide + itemsPerPage);
        }
    };

    // Function to handle previous slide
    const prevSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - itemsPerPage);
        }
    };

    const nextBrrSlide = () => {
        if (currentSlide + brrItemsPerPage < newProducts.length) {
            setCurrentSlide(currentSlide + brrItemsPerPage);
        }
    };

    const prevBrrSlide = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - brrItemsPerPage);
        }
    };

    return (

        <div>
            {/* video */}
            <div className="relative">

                <video className="h-[500px] w-full object-cover " muted loop autoPlay src="https://cdn.shopify.com/videos/c/o/v/c6710b4309ca491f8f1351fdb8936d01.mp4">
                </video>

                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
                    <div className="text-center text-white font-medium text-8xl m-2">The Fall <span style={{ fontFamily: 'Playfair Display' }}>Sale</span>
                    </div>
                    <div className="text-center text-white font-medium text-7xl m-2">25% off everything*
                    </div>
                    <div className="flex m-4 justify-evenly w-[500px]">
                        <Link href="/sales?gender=women" className="cursor-pointer border border-2 font-medium text-lg text-white border-white py-2 px-14  text-center">Women</Link>
                        <Link href="/sales?gender=men" className="cursor-pointer border border-2 font-medium text-lg text-white border-white py-2 px-16  text-center">Men</Link>
                    </div>
                </div>

                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet" />

            </div >

            {/* black line  */}
            <div className="bg-black  h-10 flex justify-center" >
                <div className=" w-[1000px] h-full text-white text-sm font-normal flex justify-evenly items-center">
                    <div >
                        <FontAwesomeIcon icon={faTruck} className="mr-2" />
                        Free Shipping over $99
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faArrowLeftRotate} className="mr-2" />
                        Free Returns
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faAward} className="mr-2" />
                        Earn Points
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faCashRegister} className="mr-2" />
                        Buy Now, Pay Later
                    </div>
                </div>
            </div>

            {/* Featured Categories */}
            <div className='h-[600px]'>
                <h2 className=' h-20 text-2xl font-bold p-5'>Featured Categories</h2>

                <div className=' flex justify-evenly' >
                    <Link href="/sales?gender=women&type=sweaters">
                        <img src="sales/sweater2womrn.webp" className='cursor-pointer h-[400px] w-[300px]  object-cover  ' alt="" />
                        <h4 className=' font-semibold'>Womens Sweaters</h4>
                    </Link>

                    <Link href="/sales?gender=women&type=blazers">
                        <img src="sales/blazers3women.webp" className='cursor-pointer h-[400px] w-[300px] object-cover  ' alt="" />
                        <h4 className=' font-semibold'>Womens Jackets</h4>

                    </Link>

                    <Link href="/sales?gender=men&type=sweaters">
                        <img src="sales/sweater3.webp" className='cursor-pointer h-[400px] w-[300px] object-cover  ' alt="" />
                        <h4 className=' font-semibold'>Mens Sweaters</h4>

                    </Link>

                    <Link href="/sales?gender=men&type=blazers">
                        <img src="sales/blazers1.webp" className='cursor-pointer h-[400px] w-[300px] object-cover  ' alt="" />
                        <h4 className=' font-semibold'>Mens Jackets</h4>

                    </Link>
                </div>
            </div>

            {/* This Just In */}
            <div className=' h-[600px]'>
                <h2 className='h-20 text-2xl font-bold p-5'>This Just In</h2>
                <div className='flex justify-evenly'>
                    <button onClick={prevSlide} disabled={currentSlide === 0} className="text-2xl font-bold p-3">←</button>

                    {newProducts.length > 0 ? (
                        newProducts.slice(currentSlide, currentSlide + itemsPerPage).map(product => (
                            <Link key={product._id} href={`/Salesdetail/${product._id}`}>
                                <img
                                    alt={product.name}
                                    src={Array.isArray(product.image) ? `http://localhost:3/uploads/sales/${product.image[0]}` : `http://localhost:3/uploads/sales/${product.image}`}
                                    className="cursor-pointer h-[400px] w-[300px] object-cover"
                                />
                                <h4 className='font-semibold'>{product.name}</h4>
                            </Link>
                        ))

                    ) : (
                        <div className="text-center w-full">No new products available</div>
                    )}
                    <button onClick={nextSlide} disabled={currentSlide + itemsPerPage >= newProducts.length} className="text-2xl font-bold p-3">→</button>

                </div>
            </div>

            {/* brr */}
            <div className='' style={{ backgroundColor: '#AEE9D1' }}>

                <div className=' flex w-full h-[700px] py-3 px-10'>
                    <img src="sales/brr.webp" className='' alt="" />
                    <div className='flex flex-col justify-center items-center  w-full'>
                        <h2 className=' w-[400px] h-10 text-3xl font-semibold p-2 border-black '>Brrrrr!</h2>
                        <p className=' w-[400px] h-20 text-xl font-normal p-2 border-black'>Go from cold to cozy with our selection of responsible knits.</p>

                        <div className=' w-[400px] flex justify-between p-2 m-2'>
                            <button onClick={prevBrrSlide} disabled={currentSlide === 0} className="text-2xl font-bold p-3">←</button>

                            {newProducts.length > 0 ? (
                                newProducts.slice(currentSlide, currentSlide + brrItemsPerPage).map(product => (
                                    <div key={product._id} className='flex flex-col items-center'>
                                        <Link key={product._id} href={`/Salesdetail/${product._id}`}>
                                            <img
                                                alt={product.name}
                                                src={Array.isArray(product.image) ? `http://localhost:3/uploads/sales/${product.image[0]}` : `http://localhost:3/uploads/sales/${product.image}`}
                                                className="cursor-pointer h-[180px] w-[80px] object-cover"
                                            />
                                            <h4 className='font-semibold'>{product.name}</h4>
                                        </Link>
                                    </div>

                                ))

                            ) : (
                                <div className="text-center w-full">No new products available</div>
                            )}
                            <button onClick={nextBrrSlide} disabled={currentSlide + itemsPerPage >= newProducts.length} className="text-2xl font-bold p-3">→</button>


                        </div>
                        <div className='text-lg font-semibold underline'><Link href="/sales?type=sweaters">Shop Now
                        </Link></div>
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

        </div >








    )
}
