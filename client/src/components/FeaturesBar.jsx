'use client';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faArrowLeftRotate, faAward, faCashRegister } from "@fortawesome/free-solid-svg-icons";

export default function FeaturesBar() {
    const features = [
        {
            icon: faTruck,
            title: "Free Shipping",
            description: "On orders over $99"
        },
        {
            icon: faArrowLeftRotate,
            title: "Free Returns",
            description: "Keep what you love"
        },
        {
            icon: faAward,
            title: "Earn Points",
            description: "Rewards program"
        },
        {
            icon: faCashRegister,
            title: "Pay Later",
            description: "Klarna available"
        }
    ];

    return (
        <div className="bg-black border-y border-gray-800">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-6 max-w-7xl mx-auto">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-900 transition group cursor-pointer"
                    >
                        <div className="text-yellow-400 text-2xl flex-shrink-0 group-hover:scale-110 transition">
                            <FontAwesomeIcon icon={feature.icon} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-white text-sm font-semibold group-hover:text-yellow-400 transition">
                                {feature.title}
                            </p>
                            <p className="text-gray-400 text-xs">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}