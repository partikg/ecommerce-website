'use client'

import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useToast } from '@/context/ToastContext';

export default function RegisterPage() {

    const router = useRouter();
    const cookies = new Cookies();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { showToast } = useToast();

    const validateForm = (name, email, password) => {
        if (!name || !email || !password) {
            setError('All fields are required');
            return false;
        }

        if (name.length < 2) {
            setError('Name must be at least 2 characters');
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

    const register = async (event) => {
        event.preventDefault();
        setError('');

        const name = event.target.name.value.trim();
        const email = event.target.email.value.trim();
        const password = event.target.password.value;

        if (!validateForm(name, email, password)) {
            return;
        }

        setLoading(true);

        try {
            console.log('Registering with:', { name, email });

            const result = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/register`,
                { name, email, password },
                { timeout: 10000 }
            );

            console.log('Register response:', result.data);

            if ((result.data.success || result.data.status) && result.data.token) {
                console.log('Token received:', result.data.token);

                const token = result.data.token;
                const decoded = jwtDecode(token);
                const userId = decoded?.userdata?._id;

                console.log('Decoded userId:', userId);

                if (userId) {
                    cookies.set('token', token, { path: '/', maxAge: 3600 });
                    localStorage.setItem('userId', userId);
                    localStorage.setItem('token', token);
                    console.log('Token saved, redirecting...');

                    showToast('Registration successful! Redirecting...', 'success');

                    setTimeout(() => {
                        router.replace('/');
                    }, 800);
                    return;
                } else {
                    throw new Error('Could not extract userId from token');
                }
            } else {
                const message = result.data.message || 'Registration failed - no token received';
                console.error('Registration failed:', message);
                setError(message);
                showToast(message, 'error');
            }

        } catch (error) {
            console.error('Registration error:', error);

            let errorMessage = 'Something went wrong';

            if (error.response?.status === 400) {
                errorMessage = error.response.data?.message || 'Email already exists or invalid data';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.message === 'Network Error') {
                errorMessage = 'Network error. Please check your connection.';
            } else if (error.code === 'ECONNABORTED') {
                errorMessage = 'Request timeout. Please try again.';
            } else if (error.message.includes('Could not extract')) {
                errorMessage = 'Invalid token received from server';
            }

            console.error('Final error message:', errorMessage);
            setError(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 border p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-5 text-center">Register</h1>

            {loading ? (
                <LoadingSpinner />
            ) : (
                <form onSubmit={register}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            required
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={loading}
                        />
                        <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm mb-4 p-3 bg-red-50 rounded">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
            )}

            <p className="text-center mt-4">
                <span className="text-gray-600">Already have an account?</span>{' '}
                <Link
                    href="/login"
                    className="text-blue-600 hover:underline font-medium"
                >
                    Login Here
                </Link>
            </p>
        </div>
    );
}