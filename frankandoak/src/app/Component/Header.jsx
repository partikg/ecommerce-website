'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import axios, { toFormData } from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { faCartShopping, faHeart, faLitecoinSign, faSearch, faSign, faUser } from '@fortawesome/free-solid-svg-icons';
import { emptycart, removecart, updatecartaddqty, updatecartminusqty } from '../reduxtoolkit/slices/cartslice';
import { useRouter, useSearchParams } from 'next/navigation';
import Cookies from 'universal-cookie';


export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [categories, setcategories] = useState([]);
    const [newProducts, setNewProducts] = useState([]);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [popoverOpen, setPopoverOpen] = useState(false);
    const dispatch = useDispatch()
    const getcartitems = useSelector((state) => state.cart.cart)
    const [open, setOpen] = useState(false)
    const [loggedIn, setLoggedIn] = useState(false);
    const [showLoginForm, setShowLoginForm] = useState(true); // State to toggle between login and register form
    const [getlogindata, setgetlogindata] = useState([]);
    let [profile, setprofile] = useState([]);
    const popoverRef = useRef(null);

    useEffect(() => {
        axios.post('http://localhost:3/api/backend/sales/view')
            .then((response) => {
                setNewProducts(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching new products:', error);
            });

    }, [])

    // Calculate subtotal
    const subtotal = getcartitems.reduce((total, item) => {
        // Check if item.price exists and is a string, else default to '0'
        const price = item.price ? parseFloat(item.price.replace('$', '').trim()) : 0;
        return total + (price * item.qty);
    }, 0);


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
            axios.post('http://localhost:3/api/backend/sales/view', { search: term })
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
            const result = await axios.post('http://localhost:3/api/frontend/user/login', data);
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
            const result = await axios.post('http://localhost:3/api/frontend/user/register', data);
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
        axios.post('http://localhost:3/api/frontend/user/profile', '', {
            headers: {
                'authorization': `Bearer ${usertoken}`
            }
        })
            .then((success) => {
                // console.log(success.data.data)
                setprofile(success.data.data.userdata)
            })
            .catch((error) => {
                console.log(error)
            })
    }, []);



    return (

        <header className="bg-white sticky top-0 left-0 border-b-2 z-50">


            <nav aria-label="Global" className="w-full h-12 flex items-center justify-between">

                {/* left side nav */}
                <div className='w-full h-12 flex items-center'>

                    {/* logo */}
                    <div className=" h-full px-8 flex cursor-pointer items-center text-gray-900 px-4">
                        <Link href="/" className="items-center">
                            <span className='font-bold text-lg'>Frank And Oak</span>
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

                        {/* contactus */}
                        <Link href="/ourstory" className="cursor-pointer  font-medium text-gray-900">
                            Our Story
                        </Link>

                    </div>

                </div>


                {/* right side */}
                <div className="mr-4 h-full w-[200px] flex justify-around items-center">

                    {/* Search */}
                    <Popover className="relative">

                        <Popover.Button ref={popoverRef} className="h-full w-10 flex justify-center items-center cursor-pointer font-medium text-gray-900 focus:outline-none">
                            <FontAwesomeIcon icon={faSearch} className="mr-2" />
                        </Popover.Button>

                        <Popover.Panel className="h-full w-full fixed inset-y-10 left-0 z-30 bg-white rounded-lg shadow-lg p-4 ">

                            <h2 className="text-lg font-bold mb-4">Search</h2>
                            <div className="flex items-center mb-4  rounded">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    placeholder="Search..."
                                    className="w-full flex-grow px-3 py-2 rounded-l"
                                />
                                <div className="w-10 flex justify-center items-center text-gray-600 cursor-pointer">
                                    <FontAwesomeIcon icon={faSearch} />
                                </div>
                            </div>

                            {/* Search Results */}
                            <div className='flex flex-col'>
                                <div className='max-h-[300px] overflow-y-auto'>
                                    {searchResults.length > 0 ? (
                                        searchResults.map(product => (
                                            <Link key={product._id} href={`/Salesdetail/${product._id}`} onClick={handleClosePopover}>
                                                <div className="w-[230px]">
                                                    <h4 className="font-semibold">{product.name}</h4>
                                                </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p>No search results found</p>
                                    )}
                                </div>
                            </div>


                            <div className=' flex h-[450px]'>

                                {/* trending searches */}
                                <div className='flex flex-col  h-full w-[400px] p-2 font-semibold'>
                                    <h3 className=" p-2 font-bold">Trending Searches</h3>
                                    <div className='flex flex-wrap p-2'>
                                        <Link href="/sales?type=sweaters" onClick={handleClosePopover}>
                                            <div className="border border-black text-sm p-1 cursor-pointer m-1">
                                                Sweaters</div>
                                        </Link>
                                        <Link href="/sales?type=blazers" onClick={handleClosePopover}>
                                            <div className="border border-black text-sm p-1 cursor-pointer m-1">
                                                Jackets</div>
                                        </Link>
                                        <Link href="/sales?type=top" onClick={handleClosePopover}>
                                            <div className="border border-black text-sm p-1 cursor-pointer m-1">
                                                Tops</div>
                                        </Link>
                                    </div>
                                </div>

                                {/* trending products */}
                                <div className=" h-[450px] w-full  ">
                                    <h3 className="font-bold p-2">Trending Products</h3>
                                    <div className='flex flex-wrap justify-evenly gap-2   max-h-[400px] overflow-y-auto'>
                                        {newProducts.length > 0 ? (
                                            newProducts.slice(0, 8).map(product => (
                                                <Link key={product._id} href={`/Salesdetail/${product._id}`} onClick={handleClosePopover}>
                                                    <div className="w-[230px]">
                                                        <img
                                                            alt={product.name}
                                                            src={Array.isArray(product.image) ? `http://localhost:3/uploads/sales/${product.image[0]}` : `http://localhost:3/uploads/sales/${product.image}`}
                                                            className="cursor-pointer h-[300px] w-[230px] object-cover"
                                                        />
                                                        <h4 className="font-semibold">{product.name}</h4>
                                                    </div>
                                                </Link>
                                            ))
                                        ) : (
                                            <p>No products available</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                        </Popover.Panel>
                    </Popover>



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
                                        <div className="mb-2 text-lg">Hi {profile.name}</div>
                                        <div className="mb-2 text-lg">Points: 1200</div>
                                        <div className="mb-4 text-lg">Tier: Silver</div>
                                        <Link href="/dashboard" className="text-blue-500 block text-lg text-center p-2 rounded hover:bg-gray-200 transition">
                                            View Dashboard
                                        </Link>
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

                        <Dialog open={open} onClose={setOpen} className="relative z-10" >
                            <DialogBackdrop
                                transition
                                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
                            />

                            <div className="fixed inset-0 overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                                        <DialogPanel
                                            transition
                                            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
                                        >
                                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                                    <div className="flex items-start justify-between">
                                                        <DialogTitle className="text-lg font-medium text-gray-900">Shopping cart</DialogTitle>
                                                        <div className="ml-3 flex h-7 items-center">
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpen(false)}
                                                                className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                            >
                                                                <span className="absolute -inset-0.5" />
                                                                <span className="sr-only">Close panel</span>
                                                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className="mt-8">
                                                        <div className="flow-root">
                                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                                {getcartitems.map((product) => (
                                                                    <li key={product.id} className="flex py-6">
                                                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">

                                                                            <img
                                                                                alt={product.name}
                                                                                src={Array.isArray(product.image) ? `http://localhost:3/uploads/sales/${product.image[0]}` : `http://localhost:3/uploads/sales/${product.image}`}
                                                                                className="h-full w-full object-cover object-center"
                                                                            />
                                                                        </div>

                                                                        <div className="ml-4 flex flex-1 flex-col">
                                                                            <div>
                                                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                                                    <h3>
                                                                                        <a href={product.href}>{product.name}</a>
                                                                                    </h3>
                                                                                    <p className="ml-4">{product.price}</p>
                                                                                </div>
                                                                                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                            </div>
                                                                            <div className="flex flex-1 items-end justify-between text-sm">
                                                                                <p className="text-gray-500">Qty {product.quantity}</p>
                                                                                <div class="flex items-center border-gray-100">
                                                                                    <span onClick={() => dispatch(updatecartminusqty(product.id))} class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 
                                                                        duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                                                                                    <input class="h-8 w-8 border bg-white text-center text-xs 
                                                                        outline-none" type="number" value={product.qty} min="1" />
                                                                                    <span onClick={() => dispatch(updatecartaddqty(product.id))} class="cursor-pointer rounded-r bg-gray-100 py-1 px-3 
                                                                        duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                                                                                </div>
                                                                                <div className="flex">
                                                                                    <button onClick={() => dispatch(removecart(product.id))} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                                                                        Remove
                                                                                    </button>
                                                                                    <Link href="#" className=' px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 empty-cart-button mx-2' onClick={() => dispatch(emptycart(product.id))} >
                                                                                        EmptyCart
                                                                                    </Link>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                        <p>Subtotal</p>
                                                        <p>${subtotal.toFixed(2)}</p>
                                                    </div>
                                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                                    <div className="mt-6">
                                                        <a
                                                            href="#"
                                                            className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                        >
                                                            Checkout
                                                        </a>
                                                    </div>
                                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                        <p>
                                                            or{' '}
                                                            <button
                                                                type="button"
                                                                onClick={() => setOpen(false)}
                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            >
                                                                Continue Shopping
                                                                <span aria-hidden="true"> &rarr;</span>
                                                            </button>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </DialogPanel>
                                    </div>
                                </div>
                            </div>
                        </Dialog >

                        {/* cartdialog */}

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