
'use client';

export default function LoadingSpinner() {
    return (
        <div className="flex items-center justify-center p-8">
            <div className="animate-spin">
                <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </div>
        </div>
    );
}
