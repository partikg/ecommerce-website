'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {

    const router = useRouter();
    const [error, setError] = useState('');

    const register = async (event) => {

        event.preventDefault();

        setError('');

        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value
        };

        try {

            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/frontend/user/register`,
                data
            );

            if (result.data.status) {

                router.push('/login');

            } else {

                setError(result.data.message || 'Invalid email or password');

            }

        } catch (error) {
            setError(
                error.response?.data?.message || 'Something went wrong'
            );
        }

    };

    return (

        <div className="max-w-md mx-auto mt-20">

            <h1 className="text-2xl font-bold mb-5">
                Register
            </h1>

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

                {error && (
                    <p className="text-red-500 text-sm mb-4">
                        {error}
                    </p>
                )}

                <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Register</button>

            </form>
            <p className="text-center mt-4">
                <span className="text-gray-600">Already have an account?</span>{' '}
                <Link
                    href="/login"
                    className="text-blue-600 hover:underline"
                >
                    Login Here
                </Link>
            </p>

        </div>

    )

}