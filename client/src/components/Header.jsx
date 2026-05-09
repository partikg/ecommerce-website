'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
} from '@headlessui/react'
import {
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { faCartShopping, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import Cookies from 'universal-cookie';
import CartDrawer from './CartDrawer';
import SearchPopover from './SearchPopover';


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [categories, setcategories] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState(null);
    const popoverRef = useRef(null);

    const cookies = new Cookies();
    const token = cookies.get('token');
    const loggedIn = !!token;

    useEffect(() => {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/sales/view`)
            .then((response) => {
                setNewProducts(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching new products:', error);
            });

    }, [])

    // closepopover 
    const handleClosePopover = () => {
        // Programmatically close the Popover
        popoverRef.current?.click();
    };

    // search 
    const handleSearchChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        if (term) {
            // Fetch search results based on the search term
            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/backend/sales/view`, { search: term })
                .then((response) => {
                    console.log(response.data.data);
                    setSearchResults(response.data.data || []);
                })
                .catch((error) => {
                    console.error('Error fetching search results:', error);
                    setSearchResults([]);
                });
        } else {
            setSearchResults([]); // Clear search results if the input is empty
        }
    };

    // logout
    const logoutHandler = () => {
        cookies.remove('token');
        window.location.reload();
    };

    // profile
    useEffect(() => {

        const token = cookies.get('token');
        if (!token) return;

        axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/users/profile`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
            .then((res) => {

                console.log("PROFILE:", res.data);

                const user = res.data.data.userdata;

                setProfile(user);

                localStorage.setItem('userId', user._id);

            })
            .catch((err) => {
                console.log("PROFILE ERROR:", err);
            });

    }, []);


    return (

        <header className="bg-white sticky top-0 left-0 border-b-2 z-50">

            <nav aria-label="Global" className="w-full h-12 flex items-center justify-between">

                {/* left side */}
                <div className='w-full h-12 flex items-center'>

                    {/* logo */}
                    <div className=" h-full px-8 flex cursor-pointer items-center text-gray-900 px-4">
                        <Link href="/" className="items-center">
                            <span className='font-bold text-lg'>PratikWear</span>
                        </Link>
                    </div>


                    {/* nav */}
                    <div className=' flex justify-around h-full w-[400px] cursor-pointer items-center'>

                        {/* sales */}
                        <Link href="/sales" className="cursor-pointer  font-medium text-gray-900">
                            Sales
                        </Link>

                        {/* women */}
                        <Link href="/women" className="cursor-pointer  font-medium text-gray-900">
                            Women
                        </Link>

                        {/* aboutus */}
                        <Link href="/men" className="cursor-pointer  font-medium text-gray-900">
                            Men
                        </Link>

                        {/* ourstory */}
                        <Link href="/our-story" className="cursor-pointer  font-medium text-gray-900">
                            Our Story
                        </Link>

                    </div>

                </div>


                {/* right side */}
                <div className="mr-4 h-full w-[200px] flex justify-around items-center">

                    {/* search */}
                    <SearchPopover newProducts={newProducts} />

                    {/* myaccount */}
                    <Popover
                        className="relative"
                        onMouseEnter={() => setPopoverOpen(true)}
                        onMouseLeave={() => setPopoverOpen(false)}
                    >

                        <Popover.Button
                            ref={popoverRef}
                            className="h-full w-10 flex justify-center items-center cursor-pointer text-gray-900 focus:outline-none"
                        >
                            <FontAwesomeIcon
                                icon={faUser}
                                className="text-lg hover:text-black"
                            />
                        </Popover.Button>

                        <Popover.Panel
                            className="absolute -right-12 top-8 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-30 overflow-hidden"
                        >
                            {({ close }) => (

                                <div>

                                    <div className="bg-black text-white px-5 py-5">

                                        {loggedIn ? (

                                            <div>

                                                <p className="text-sm text-gray-300">
                                                    Welcome back
                                                </p>

                                            </div>

                                        ) : (

                                            <div>

                                                <h2 className="text-lg font-semibold">
                                                    My Account
                                                </h2>

                                                <p className="text-sm text-gray-300 mt-1">
                                                    Login or create account
                                                </p>

                                            </div>

                                        )}

                                    </div>

                                    {/* profile */}
                                    <div className="p-4">

                                        {loggedIn ? (

                                            <div className="space-y-3">

                                                <div className="pb-3 border-b">

                                                    <h2 className="text-lg font-semibold text-gray-900">
                                                        {profile?.name || 'User'}
                                                    </h2>

                                                    <p className="text-sm text-gray-500 mt-1 break-all">
                                                        {profile?.email}
                                                    </p>

                                                </div>

                                                <Link
                                                    href="/wishlist"
                                                    onClick={() => close()}
                                                    className="block px-4 py-3 rounded-lg border hover:bg-gray-100 transition"
                                                >
                                                    Wishlist
                                                </Link>

                                                <Link
                                                    href="/orders"
                                                    onClick={() => close()}
                                                    className="block px-4 py-3 rounded-lg border hover:bg-gray-100 transition"
                                                >
                                                    Orders
                                                </Link>

                                                <button
                                                    onClick={() => {
                                                        close();
                                                        logoutHandler();
                                                    }}
                                                    className="w-full text-left px-4 py-3 rounded-lg border text-red-500 hover:bg-red-50 transition"
                                                >
                                                    Logout
                                                </button>

                                            </div>

                                        ) : (

                                            <div className="space-y-3">

                                                <Link
                                                    href="/login"
                                                    onClick={() => close()}
                                                    className="block text-center bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
                                                >
                                                    Login
                                                </Link>

                                                <Link
                                                    href="/register"
                                                    onClick={() => close()}
                                                    className="block text-center border border-black py-3 rounded-lg hover:bg-gray-100 transition"
                                                >
                                                    Create Account
                                                </Link>

                                            </div>

                                        )}

                                    </div>

                                </div>

                            )}
                        </Popover.Panel>

                    </Popover>

                    {/* fav */}
                    <div className="h-full w-20 flex justify-center items-center cursor-pointer font-medium  text-gray-900">
                        <Link href="/wishlist" >
                            <FontAwesomeIcon icon={faHeart} />
                        </Link>
                    </div>

                    {/* cart */}
                    <div className=' h-full w-20 flex justify-center items-center cursor-pointer font-medium text-gray-900'>
                        <div onClick={() => setOpen(true)} className=" ">
                            <FontAwesomeIcon icon={faCartShopping} className="mr-2" />
                        </div>


                        {/* cart diaglog */}
                        <CartDrawer
                            open={open}
                            setOpen={setOpen}
                            profile={profile}
                        />
                    </div>

                </div>

            </nav>


            {/* for mobile */}
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">

                        {/* logo */}
                        {/* <Link href="/" className="-m-1.5 p-1.5">
                            <img
                                alt=""
                                src="/images/ecommercelogo.png"
                                className="h-8 w-auto"
                            />
                            <span className="text-xl font-semibold text-gray-900">Ecommerce Website</span>
                        </Link> */}



                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>

                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">

                                {/* categories */}
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        categories
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {categories.map((item) => (
                                            <DisclosureButton
                                                key={item.slug}
                                                as="a"
                                                href={`/products/${item.slug}`}
                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.slug}
                                            </DisclosureButton>
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>


                                {/* offers */}
                                <Link href="/offers" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                    Offers
                                </Link>

                                {/* aboutus */}
                                <Link
                                    href="/aboutus"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Aboutus
                                </Link>

                                {/* contactus */}
                                <Link
                                    href="/contactus"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Contactus
                                </Link>

                                {/* company
                                <Link
                                    href="/company"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </Link> */}

                            </div>



                            {/* <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div> */}

                            <div className='py-2'>
                                <Link href="/cart" className="cursor-pointer text-sm font-semibold leading-6 text-gray-900">
                                    cart
                                </Link>
                            </div>

                            <div className='py-2'>
                                <Link href="/account" className="cursor-pointer text-sm font-semibold leading-6 text-gray-900">
                                    account
                                </Link>
                            </div>

                            <div className='py-2'>
                                <Link href="/signup" className="cursor-pointer text-sm font-semibold leading-6 text-gray-900">
                                    signup
                                </Link>
                            </div>


                        </div>
                    </div>
                </DialogPanel>
            </Dialog>

        </header >
    )
}