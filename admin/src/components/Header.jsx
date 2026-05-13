import { Link, useNavigate, useLocation } from "react-router-dom";
import { Cookies } from 'react-cookie';
import { useEffect, useState } from "react";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

    let nav = useNavigate();
    const location = useLocation();
    const cookies = new Cookies();
    const [userProfile, setUserProfile] = useState(null);

    let logout = () => {
        cookies.remove('token')
        nav('/');
        window.location.reload();
    }

    useEffect(() => {
        const usertoken = cookies.get('token');

        if (usertoken && location.pathname !== '/register') {
            axios.post(`${import.meta.env.VITE_API_URL}/api/users/profile`, '', {
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
                        setUserProfile(success.data.data.userdata);
                        console.log(success.data)
                    }
                })
                .catch((error) => {
                    toast.error('errored', error)
                })
        } else {
            if (!usertoken && location.pathname !== '/') {
                nav('/');
            }
        }
    }, [])

    return (
        <div  >
            <ToastContainer />

            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">

                <div className="px-6 py-4 flex justify-between items-center">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Admin Dashboard
                        </h1>
                    </div>

                    <div className="flex items-center gap-6">


                        {userProfile && (
                            <div className="hidden md:flex items-center gap-3">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-gray-900">
                                        {userProfile.name || 'Admin'}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {userProfile.email}
                                    </p>
                                </div>

                                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                                    {userProfile.name?.charAt(0)?.toUpperCase() || 'A'}
                                </div>
                            </div>
                        )}

                        <nav className="hidden md:flex items-center gap-4">
                            <button
                                onClick={logout}
                                className="px-4 py-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition duration-200"
                            >
                                <span className="text-sm font-medium">Logout</span>
                            </button>
                        </nav>

                    </div>

                </div>
            </header >
        </div >
    )
}

export default Header;
