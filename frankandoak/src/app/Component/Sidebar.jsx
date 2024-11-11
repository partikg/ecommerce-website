import React, { useState } from 'react'

export default function Sidebar({ onSubcategorySelect }) {

    let subcategory = (type) => {
        onSubcategorySelect(type); // Call the parent function with the selected type
    };

    return (
        <div className='w-[280px] h-screen sticky top-12 left-0 flex-shrink-0'>

            <div className='p-2'>

                <div className='flex items-center h-28'>
                    <div>
                        <h2 className='underline px-2 text-sm  w-40 ml-4'>Home / Women</h2>
                        <h2 className='font-medium text-lg px-2  w-40 ml-4'>Sale</h2>
                    </div>
                </div>

                <hr className='mx-4' />

                <div className='overflow-y-auto h-[370px]' >

                    {/* subcategory */}
                    <div className=' px-2 text-sm m-4'>

                        <h2 className='font-medium text-base'>Subcategory</h2>

                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('top')} className='size-5' type="checkbox" />
                            <h3>Tops</h3>
                        </div>

                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('blouses')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Blouses</span>
                        </div>

                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('sweaters')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Sweaters</span>
                        </div>

                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('pants')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Pants</span>
                        </div>


                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('jeans')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Jeans</span>
                        </div>


                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('blazers')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Blazers</span>
                        </div>


                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('shorts')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Shorts</span>
                        </div>


                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('skirts')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Skirts</span>
                        </div>


                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('dresses')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Dresses</span>
                        </div>


                        <div className='my-3  flex items-center space-x-2'>
                            <input onClick={() => subcategory('accessories')} className='size-5' type="checkbox" />
                            <span className='mx-2'>Accessories</span>
                        </div>

                    </div>

                    <hr className='mx-4' />

                    {/* size */}
                    <div className=''>
                        <h2 className='font-medium  mt-5'>Size</h2>
                        <input type="number" value={23} />
                    </div>

                    <hr className='border-black border text-black m-2' />

                    {/* Colour */}
                    <div className='border border-black'>
                        <h2 className='font-medium  mt-5'>Colour</h2>
                        <input type="number" value={23} />
                    </div>

                    <hr className='border-black border text-black m-2' />

                    {/* Price */}
                    <div className='border border-black'>
                        <h2 className='font-medium  mt-5'>Price</h2>
                        <input type="number" value={23} />
                    </div>

                    <hr className='border-black border text-black m-2' />

                    {/* %Off */}
                    <div className='border border-black'>
                        <h2 className='font-medium  mt-5'>%Off</h2>
                        <input type="number" value={23} />
                    </div>

                    <hr className='border-black border text-black m-2' />

                    {/* size */}
                    <div className='border border-black'>
                        <h2 className='font-medium  mt-5'>Size</h2>
                        <input type="number" value={23} />
                    </div>

                    <hr className='border-black border text-black m-2' />

                    {/* Featured */}
                    <div className='border border-black'>
                        <h2 className='font-medium  mt-5'>Featured</h2>
                        <input type="number" value={23} />
                    </div>
                    <div className='border border-black'>
                        <h2 className='font-light  mt-5'>New In</h2>
                        <input type="number" value={23} />
                    </div>
                    <div className='border border-black'>
                        <h2 className='font-light  mt-5'>Best Sellers</h2>
                        <input type="number" value={23} />
                    </div>
                    <div className='border border-black'>
                        <h2 className='font-light  mt-5'>The Skyline</h2>
                        <input type="number" value={23} />
                    </div>
                    <div className='border border-black'>
                        <h2 className='font-light  mt-5'>Workwear</h2>
                        <input type="number" value={23} />
                    </div>
                    <div className='border border-black'>
                        <h2 className='font-light  mt-5'>Sale</h2>
                        <input type="number" value={23} />
                    </div>

                    <hr className='border-black border text-black m-2' />

                    {/* size */}
                    <div className='border border-black'>
                        <h2 className='font-medium  mt-5'>Size</h2>
                        <input type="number" value={23} />
                    </div>
                </div>





            </div>


        </div>
    )
}
