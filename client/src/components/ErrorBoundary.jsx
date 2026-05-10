
'use client';

import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error caught:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="max-w-md mx-auto mt-20 p-6 border border-red-300 rounded-lg bg-red-50">
                    <h2 className="text-xl font-bold text-red-800 mb-4">Something went wrong</h2>
                    <p className="text-red-600 mb-4">{this.state.error?.message}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
