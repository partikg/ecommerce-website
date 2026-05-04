import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faArrowLeftRotate, faAward, faCashRegister } from "@fortawesome/free-solid-svg-icons";

export default function Footer() {
    return (
        <div>
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
                            <h2 className=' text-white text-xl font-semibold p-2'>PratikWear Club</h2>
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
                            <h4 className='text-white '>PratikWear</h4>

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
                            <h4 className=' text-white py-2'>PratikWear Club</h4>
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
        </div>
    )
}
