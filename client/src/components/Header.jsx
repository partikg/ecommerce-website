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
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import axios, { toFormData } from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { faCartShopping, faHeart, faLitecoinSign, faSearch, faSign, faUser } from '@fortawesome/free-solid-svg-icons';
import { useRouter, useSearchParams } from 'next/navigation';
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
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true);
    const [getlogindata, setgetlogindata] = useState([]);
    let [profile, setprofile] = useState(null);
    const popoverRef = useRef(null);

    useEffect(() => {
        axios.post('http://localhost:5000/api/backend/sales/view')
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
            axios.post('http://localhost:5000/api/backend/sales/view', { search: term })
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

    // login 
    const router = useRouter();
    const cookies = new Cookies();
    const loginHandler = async (event) => {
        event.preventDefault();

        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        };
        console.log("Submitting login data:", data)


        try {
            const result = await axios.post('http://localhost:5000/api/frontend/user/login', data);
            if (result.data.status === true) {
                console.log("Login successful, token received:", result.data.token);
                cookies.set('token', result.data.token);
                setLoggedIn(true);
            } else {
                console.log("Login failed:", result.data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    useEffect(() => {
        const token = cookies.get('token');
        // console.log("Token in cookies:", token);
        if (token) {
            console.log("Redirecting to / as token exists.");
            setLoggedIn(true);
        }
    }, []);

    // logout
    const logoutHandler = () => {
        cookies.remove('token');
        setLoggedIn(false);
    };

    // register 
    const register = async (event) => {
        event.preventDefault();
        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        };

        console.log("Submitting registration data:", data);
        setgetlogindata(data);

        try {
            const result = await axios.post('http://localhost:5000/api/frontend/user/register', data);
            if (result.data.status === true) {
                console.log("Registration successful");
                setShowLoginForm(true);
                router.push('/');
            } else {
                console.log("Registration failed:", result.data.message);
            }
        } catch (error) {
            console.error("Registration error:", error);
        }
    };

    // profile
    useEffect(() => {
        const usertoken = cookies.get('token');

        if (!usertoken) return;

        axios.post(
            'http://localhost:5000/api/frontend/user/profile',
            {},
            {
                headers: {
                    Authorization: `Bearer ${usertoken}`
                }
            }
        )
            .then((res) => {
                console.log("PROFILE API:", res.data);
                setprofile(res.data.data.userdata);
            })
            .catch((err) => {
                console.log("PROFILE ERROR:", err);
            });

    }, [loggedIn]);

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
                    <Popover className="relative" onMouseEnter={() => setPopoverOpen(true)} onMouseLeave={() => setPopoverOpen(false)}>
                        <Popover.Button ref={popoverRef} className="h-full w-10 flex justify-center items-center cursor-pointer font-medium text-gray-900 focus:outline-none">
                            <FontAwesomeIcon icon={faUser} />
                        </Popover.Button>

                        <Popover.Panel
                            className="absolute -left-32 top-8 w-64 bg-white rounded-lg shadow-lg z-30 max-h-[90vh] overflow-y-auto"
                            onMouseEnter={() => setPopoverOpen(true)}
                            onMouseLeave={() => setPopoverOpen(false)}
                        >
                            <h2 className="text-lg font-bold mb-2 bg-gray-300 p-2 text-center rounded-t-lg">My Account</h2>
                            <div className="text-black bg-gray-100 p-4">
                                {loggedIn ? (
                                    <>
                                        <div className="mb-2 text-lg">
                                            Hi {profile?.name || "User"}
                                        </div>
                                        <hr className="my-2" />
                                        <Link href="/wishlist" className="text-gray-700 mb-1 block hover:text-blue-500">
                                            Wishlist
                                        </Link>
                                        <Link href="/orders" className="text-gray-700 mb-1 block hover:text-blue-500">
                                            Orders & Returns
                                        </Link>
                                        <Link href="/address-book" className="text-gray-700 mb-1 block hover:text-blue-500">
                                            Address Book
                                        </Link>
                                        <Link href="/account-settings" className="text-gray-700 mb-2 block hover:text-blue-500">
                                            Account Settings
                                        </Link>
                                        <button className="text-red-500 mt-2 w-full text-lg" onClick={logoutHandler}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>

                                        {/* login */}
                                        {showLoginForm ? (
                                            <>
                                                <h2 className="text-lg font-bold mb-2 text-center">Login</h2>
                                                <form onSubmit={loginHandler}>
                                                    <div className="mb-4">
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            required
                                                            className="w-full px-3 py-2 border rounded-md"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            required
                                                            className="w-full px-3 py-2 border rounded-md"
                                                        />
                                                    </div>
                                                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">Login</button>
                                                </form>
                                                <p className="text-center mt-4">
                                                    <span className="text-gray-600">Not registered?</span>{' '}
                                                    <a onClick={() => setShowLoginForm(false)} className="text-blue-600 cursor-pointer hover:underline">Register Here</a>
                                                </p> </>
                                        ) : (
                                            <>
                                                {/* register */}
                                                <h2 className="text-lg font-bold mb-2 text-center">Register</h2>
                                                <form onSubmit={register}>
                                                    <div className="mb-4">
                                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            required
                                                            className="w-full px-3 py-2 border rounded-md"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            required
                                                            className="w-full px-3 py-2 border rounded-md"
                                                        />
                                                    </div>
                                                    <div className="mb-4">
                                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                                                        <input
                                                            type="password"
                                                            id="password"
                                                            name="password"
                                                            required
                                                            className="w-full px-3 py-2 border rounded-md"
                                                        />
                                                    </div>
                                                    <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md">Register</button>
                                                </form>
                                                <p className="text-center mt-4">
                                                    <span className="text-gray-600">Already have an account?</span>{' '}
                                                    <a onClick={() => setShowLoginForm(true)} className="text-blue-600 cursor-pointer hover:underline">Login Here</a>
                                                </p>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
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