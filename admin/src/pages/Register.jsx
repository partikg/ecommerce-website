import axios, { toFormData } from "axios"
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

    let nav = useNavigate();

    let register = (event) => {
        event.preventDefault();

        const form = new FormData(event.target);

        axios.post(
            `${import.meta.env.VITE_API_URL}/api/users/register`,
            {
                name: form.get("regname"),
                email: form.get("regemail"),
                password: form.get("regpassword")
            }
        )
            .then((res) => {
                toast.success(res.data.message)
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response?.data || err.message);
                toast.error(result.data.message)
            });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-3">
            <ToastContainer />

            <div className="w-full max-w-md">

                <div className="text-center mb-2">
                    <h1 className="text-3xl font-bold text-white ">Admin Panel</h1>
                    <p className="text-blue-100">Create your account</p>
                </div>

                <div className="bg-white rounded-lg shadow-xl p-4">
                    <form onSubmit={register} className="space-y-2">

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2" htmlFor="name">
                                Full Name
                            </label>
                            <input
                                type="text"
                                id="regname"
                                name="regname"
                                placeholder="Enter your name"
                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2" htmlFor="email"> Email Address</label>
                            <input
                                type="email"
                                id="regemail"
                                name="regemail"
                                placeholder="Enter your email"

                            />
                        </div>

                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2" htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="regpassword"
                                name="regpassword"
                                placeholder="Enter your password"

                            />
                        </div>

                        <div className='text-center'>
                            <button type="submit" className="submit-btn">Submit</button>
                        </div>

                    </form>

                </div>

                <div className='text-center mt-2'>
                    <span className="text-gray-600">go back to </span>
                    <Link
                        to="/"
                        className="text-blue-600 hover:text-blue-800 underline font-medium transition duration-200">
                        Login page
                    </Link>
                </div>

            </div>
        </div>
    )
}
