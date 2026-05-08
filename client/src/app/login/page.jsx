'use client'

import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {

    const router = useRouter();
    const cookies = new Cookies();

    const [error, setError] = useState('');

    const loginHandler = async (event) => {

        event.preventDefault();

        setError('');

        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        };

        try {

            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/frontend/user/login`,
                data
            );

            if (result.data.status) {

                cookies.set('token', result.data.token);

                router.push('/');

            } else {

                setError(result.data.message || 'Invalid email or password');

            }

        } catch (err) {

            setError(
                err.response?.data?.message || 'Something went wrong'
            );

        }

    };

    return (

        <div className="max-w-md mx-auto mt-20 border p-6 rounded-lg shadow">

            <h1 className="text-2xl font-bold mb-5 text-center">
                Login
            </h1>

            <form onSubmit={loginHandler}>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>

                    <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Password:
                    </label>

                    <input
                        type="password"
                        name="password"
                        required
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-md"
                >
                    Login
                </button>

            </form>

            <p className="text-center mt-4">
                <span className="text-gray-600">
                    Don't have an account?
                </span>{' '}

                <Link
                    href="/register"
                    className="text-blue-600 hover:underline"
                >
                    Register Here
                </Link>
            </p>

        </div>

    )

}