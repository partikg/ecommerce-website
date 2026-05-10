
'use client';

import { useEffect, useState } from 'react';

const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500',
        warning: 'bg-yellow-500'
    }[type];

    return (
        <div className={`${bgColor} text-white px-6 py-3 rounded-lg shadow-lg fixed bottom-4 right-4 z-50`}>
            {message}
        </div>
    );
};

export default Toast;