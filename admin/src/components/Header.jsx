import { Link, useNavigate, useLocation } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { useEffect } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

    let nav = useNavigate();
    const location = useLocation();
    const cookies = new Cookies();
    let logout = () => {
        cookies.remove('token')
        nav('/');
        window.location.reload(); // Force a page reload to reset auth state
    }

    useEffect(() => {
        const usertoken = cookies.get('token');

        if (usertoken && location.pathname !== '/register') {
            axios.post('http://localhost:3/api/frontend/user/profile', '', {
                headers: {
                    'authorization': `Bearer ${usertoken}`
                }
            })
                .then((success) => {
                    if (success.data.token_error == true) {
                        cookies.remove('token');
                        nav('/');
                    }
                    else {
                        console.log(success.data)
                    }
                })
                .catch((error) => {
                    toast.error('errored', error)
                })
        } else {
            // If token doesn't exist, redirect to login
            if (!usertoken && location.pathname !== '/') {
                nav('/');
            }
        }
    }, [])

    return (
        <div  >
            <header className="bg-gray-800 text-white p-4 shadow-md sticky top-0 z-50" >
                <ToastContainer />
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-semibold">Admin Panel</h1>
                    <nav>
                        <ul className="flex space-x-6">
                            <li>
                                <Link to={'/profile'} className="hover:text-gray-300 transition duration-200">Profile</Link>
                            </li>
                            {/* <li>
                                <Link to={'/'} className="hover:text-gray-300 transition duration-200">Login</Link>
                            </li> */}
                            <li>
                                <Link to={'/'} onClick={() => logout()} className="hover:text-gray-300 transition duration-200">Logout</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header >
        </div >
    )
}

export default Header;
