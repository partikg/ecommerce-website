'use client';

import { useState, useRef } from 'react';
import { Popover } from '@headlessui/react';
import axios from 'axios';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function SearchPopover({ newProducts }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (!term) {
            setSearchResults([]);
            return;
        }

        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/backend/sales/view`,
                { search: term }
            );

            setSearchResults(res.data.data || []);
        } catch (err) {
            console.error(err);
            setSearchResults([]);
        }
    };

    const clearSearch = () => {
        setSearchTerm('');
        setSearchResults([]);
    };

    return (
        <Popover className="relative">

            {/* search */}
            <Popover.Button className="w-10 flex justify-center items-center">
                <FontAwesomeIcon icon={faSearch} />
            </Popover.Button>

            <Popover.Panel className="fixed inset-0 z-30 bg-black/40 flex justify-center pt-12">

                <div className="bg-white w-full max-w-full rounded-lg shadow-lg p-5 max-h-[60vh] overflow-y-auto">

                    <div className="flex items-center justify-between mb-4 rounded px-3">

                        <div className="flex items-center w-full border">

                            <input
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search products..."
                                className="w-full py-2 outline-none"
                            />

                            <FontAwesomeIcon icon={faSearch} className="text-gray-600 p-2" />

                        </div>

                        {/* close button */}
                        <Popover.Button className="ml-3 flex items-center">
                            <XMarkIcon className="w-6 h-6 text-gray-700" />
                        </Popover.Button>

                    </div>

                    {/* result */}
                    <div className="max-h-[250px] overflow-y-auto">
                        {searchResults.length > 0 ? (
                            searchResults.map((product) => (
                                <Popover.Button key={product._id} as={Link}
                                    href={`/Salesdetail/${product._id}`}
                                    onClick={clearSearch}
                                    className="block p-2 hover:bg-gray-100"
                                >
                                    {product.name}
                                </Popover.Button>
                            ))
                        ) : (
                            <p className="text-gray-500">No results found</p>
                        )}
                    </div>

                    {/* trending products */}
                    <h3 className="font-bold mt-6">Trending</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {newProducts?.slice(0, 6).map((p) => (
                            <Link
                                key={p._id}
                                href={`/Salesdetail/${p._id}`}
                                className="w-[150px]"
                                onClick={clearSearch}
                            >
                                <img
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/sales/${p.image?.[0] || p.image}`}
                                    className="h-[120px] w-full object-cover"
                                />
                                <p className="text-sm">{p.name}</p>
                            </Link>
                        ))}
                    </div>

                </div>
            </Popover.Panel>
        </Popover >
    );
}