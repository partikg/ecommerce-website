'use client'

import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/context/ToastContext';

export default function LoginPage() {
    const router = useRouter();
    const cookies = new Cookies();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const validateForm = (email, password) => {
        if (!email || !password) {
            setError('Email and password are required');
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            return false;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return false;
        }

        return true;
    };

    const loginHandler = async (event) => {
        event.preventDefault();
        setError('');

        const email = event.target.email.value.trim();
        const password = event.target.password.value;

        if (!validateForm(email, password)) {
            return;
        }

        setLoading(true);

        try {
            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
                { email, password },
                { timeout: 10000 }
            );

            if (!result.data.token) {
                throw new Error('Token missing from response');
            }

            const decoded = jwtDecode(result.data.token);
            const userId = decoded?.userdata?._id;

            if (!userId) {
                throw new Error('Invalid user data in token');
            }

            cookies.set('token', result.data.token, { path: '/', maxAge: 3600 });
            localStorage.setItem('userId', userId);

            showToast('Login successful!', 'success');
            setTimeout(() => router.push('/'), 1000);

        } catch (err) {
            console.error('Login error:', err);

            let errorMessage = 'Something went wrong';

            if (err.response?.status === 401) {
                errorMessage = 'Invalid email or password';
            } else if (err.response?.data?.message) {
                errorMessage = err.response.data.message;
            } else if (err.message === 'Network Error') {
                errorMessage = 'Network error. Please check your connection.';
            } else if (err.code === 'ECONNABORTED') {
                errorMessage = 'Request timeout. Please try again.';
            }

            setError(errorMessage);
            showToast('Invalid email or password', 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 border p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-5 text-center">Login</h1>



            {loading ? (
                <LoadingSpinner />
            ) : (
                <form onSubmit={loginHandler}>
                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white p-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            )}

            <p className="mt-3 text-center text-sm">
                {"Don't forget your password"}{' '}
                <Link href="/register" className="text-blue-600 hover:underline">
                    Register here
                </Link>
            </p>

        </div>
    );
}