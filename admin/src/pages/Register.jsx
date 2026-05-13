import axios, { toFormData } from "axios"
import { Link, useNavigate } from "react-router-dom";

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
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response?.data || err.message);
            });
    };

    return (
        <div>

            <h2 className="text-2xl text-center font-semibold mb-4">Register</h2>

            <div className="bg-white border border-gray-200 rounded-lg shadow-md  max-w-max mx-auto">

                <form onSubmit={register}>

                    {/* Name Field */}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="regname"
                            name="regname"
                            placeholder="Enter your name"

                        />
                    </div>

                    {/* Email Field */}
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="regemail"
                            name="regemail"
                            placeholder="Enter your email"

                        />
                    </div>

                    {/* Mobileno Field */}
                    <div className="form-group">
                        <label htmlFor="password">Mobileno:</label>
                        <input
                            type="number"
                            id="regmobileno"
                            name="regmobileno"
                            placeholder="Enter your mobileno"

                        />
                    </div>

                    {/* Image Field */}
                    <div className="form-group">
                        <label htmlFor="password">Profile Photo:</label>
                        <input
                            type="file"
                            id="regimage"
                            name="regimage"
                            placeholder="give your Profile Photo"

                        />
                    </div>

                    {/* Password Field */}
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="regpassword"
                            name="regpassword"
                            placeholder="Enter your password"

                        />
                    </div>

                    {/* Submit Button */}
                    <div className='text-center'>
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>

                </form>

            </div>

            <div className='text-center mt-4'>
                <span className="text-gray-600">go back to </span>
                <Link
                    to="/"
                    className="text-blue-600 hover:text-blue-800 underline font-medium transition duration-200">
                    Login page
                </Link>
            </div>

        </div>
    )
}
