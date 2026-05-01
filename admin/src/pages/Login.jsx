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

        axios.post('http://localhost:3/api/frontend/user/login', data)
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
        <div>
            <ToastContainer />

            <h2 className="text-2xl text-center font-semibold mb-4">Login</h2>

            <div className="bg-white border border-gray-200 rounded-lg shadow-md max-w-max mx-auto">

                <form onSubmit={loginhandler}>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"

                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"

                        />
                    </div>

                    {/* Submit Button */}
                    <div className='text-center'>
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>

                </form>
            </div>

            {/* register */}
            <div className='text-center mt-4'>
                <span className="text-gray-600">Not registered ? </span>
                <Link
                    to="/Register"
                    className="text-blue-600 hover:text-blue-800 underline font-medium transition duration-200">
                    Register Here
                </Link>
            </div>

        </div >
    )
}
