import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Cookies } from 'react-cookie';
import { useEffect } from 'react';

export default function Login() {

    let nav = useNavigate();
    const cookies = new Cookies();

    let loginhandler = (event) => {
        event.preventDefault();

        var data = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, data)
            .then((result) => {
                if (result.data.status == true) {
                    nav('/home');
                    cookies.set('token', result.data.token)
                }
                else {
                    toast.error(result.data.message)
                }
            })
            .catch((error) => {
                toast.error('something gone wrong')
                console.log(error)
            })
    }

    useEffect(() => {
        var token = cookies.get('token')

        if (token != undefined) {
            nav('/home')
        }
    }, [])

    return (

        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4">
            <ToastContainer />

            <div className="w-full max-w-md">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
                    <p className="text-blue-100">Sign in to your account</p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-8">
                    <form onSubmit={loginhandler} className="space-y-3">

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2" htmlFor="email">
                                Email Address</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2" htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>

                    </form>
                </div>

                {/* register */}
                <div className="text-center mt-6">
                    <p className="text-white">
                        Don't have an account?{' '}
                        <Link
                            to="/register"
                            className="font-semibold text-blue-100 hover:text-white transition"
                        >
                            Register Here
                        </Link>
                    </p>
                </div>

            </div>

        </div >
    )
}
