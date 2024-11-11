import axios, { toFormData } from "axios"
import { Link, useNavigate } from "react-router-dom";

export default function Register() {

    let nav = useNavigate();

    let register = (event) => {
        event.preventDefault();
        let form = new FormData(event.target);
        let data = {
            name: form.get('regname'),
            email: form.get('regemail'),
            mobileno: form.get('regmobileno'),
            password: form.get('regpassword'),
        }

        if (form.get('regimage') != '') {
            data.image = form.get('regimage');
        }

        axios.post('http://localhost:3/api/frontend/user/register', toFormData(data))
            .then((success) => {
                console.log(success.data)
                if (success.data.status == true) {
                    nav('/');
                    console.log(success.data)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

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
