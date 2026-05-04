import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Sidebar({
    onSubcategorySelect,
    onCategorySelect,
    onGenderSelect,
    selectedCategory,
    selectedType,
    selectedGender
}) {

    const [categories, setCategories] = useState([])
    const [types, setTypes] = useState([]);

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/categories/view`)
            .then(res => setCategories(res.data.data))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/sales/view`)
            .then(res => {
                const uniqueTypes = [...new Set(res.data.data.map(p => p.type))];
                setTypes(uniqueTypes);
            })
            .catch(err => console.log(err));
    }, []);

    return (
        <div className='w-[260px] h-[calc(100vh-80px)] sticky top-20 bg-white border-r flex flex-col'>

            <div className='p-4 border-b'>
                <h2 className='text-lg font-semibold'>Filters</h2>
            </div>

            <div className='flex-1 overflow-y-auto p-4 space-y-6'>

                {/* category */}
                <div>
                    <h3 className='font-medium mb-3'>Category</h3>

                    {categories.map(cat => (
                        <div key={cat._id} className='flex items-center gap-2 mb-2'>
                            <input
                                type="checkbox"
                                checked={selectedCategory === cat._id}
                                onChange={() => onCategorySelect(cat._id)}
                            />
                            <span>{cat.name}</span>
                        </div>
                    ))}
                </div>

                <hr />

                {/* type */}
                <div>
                    <h3 className='font-medium mb-3'>Type</h3>

                    {types.map(type => (
                        <div key={type} className='flex items-center gap-2 mb-2'>
                            <input
                                type="checkbox"
                                checked={selectedType === type}
                                onChange={() => onSubcategorySelect(type)}
                            />
                            <span className='capitalize'>{type}</span>
                        </div>
                    ))}
                </div>

                <hr />

                {/* gender */}
                <div>
                    <h3 className='font-medium mb-3'>Gender</h3>

                    {['men', 'women', 'unisex'].map(g => (
                        <div key={g} className='flex items-center gap-2 mb-2'>
                            <input
                                type="checkbox"
                                checked={selectedGender === g}
                                onChange={() => onGenderSelect(g)}
                            />
                            <span className='capitalize'>{g}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* clear */}
            <div className='p-4 border-t'>
                <button
                    onClick={() => {
                        onCategorySelect('');
                        onSubcategorySelect('');
                        onGenderSelect('');
                    }}
                    className='w-full bg-black text-white py-2 rounded hover:bg-gray-800'
                >
                    Clear Filters
                </button>
            </div>

        </div>
    )
}