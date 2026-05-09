'use client'

import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
                data
            );

            console.log("Login Response:", result.data);

            const token = result.data.token;

            if (!token) {
                setError("Token missing from response");
                return;
            }

            // 🔥 decode token (IMPORTANT FIX)
            const decoded = jwtDecode(token);

            console.log("DECODED:", decoded);

            const userId = decoded?.userdata?._id;

            if (!userId) {
                setError("User ID not found in token");
                return;
            }

            // save properly
            cookies.set('token', token, { path: '/' });
            localStorage.setItem('userId', userId);

            console.log("SAVED USER ID:", userId);

            router.push('/');
            return;

        } catch (err) {
            console.log("LOGIN ERROR:", err);

            setError(
                err.response?.data?.message ||
                err.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 border p-6 rounded-lg shadow">

            <h1 className="text-2xl font-bold mb-5 text-center">
                Login
            </h1>

            <form onSubmit={loginHandler}>

                <input name="email" type="email" placeholder="Email"
                    className="w-full p-2 border mb-3" />

                <input name="password" type="password" placeholder="Password"
                    className="w-full p-2 border mb-3" />

                {error && <p className="text-red-500 mb-2">{error}</p>}

                <button className="w-full bg-black text-white p-2">
                    Login
                </button>

            </form>

            <p className="mt-3 text-center">
                <Link href="/register">Register</Link>
            </p>

        </div>
    );
}