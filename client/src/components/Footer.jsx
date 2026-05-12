'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTruck,
    faArrowLeftRotate,
    faAward,
    faCashRegister,
    faEnvelope,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import {
    faInstagram,
    faFacebook,
    faTiktok,
    faPinterest,
    faTwitter,
} from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
    return (
        <footer className="bg-black text-white">

            {/* Newsletter and Contact */}
            <div className="border-b border-gray-800">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 lg:p-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-3">Stay in Touch</h3>
                        <p className="text-gray-300 mb-6">
                            Discover new arrivals, exclusive offers, and the latest fashion trends.
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-center">
                                <p className="text-sm font-semibold text-yellow-400">New Arrivals</p>
                            </div>

                            <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-center">
                                <p className="text-sm font-semibold text-yellow-400">Exclusive Deals</p>
                            </div>

                            <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-center">
                                <p className="text-sm font-semibold text-yellow-400">Style Tips</p>
                            </div>

                            <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-center">
                                <p className="text-sm font-semibold text-yellow-400">Trending Now</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-2xl font-bold mb-3">Connect With Us</h3>
                        <p className="text-gray-300 mb-6">
                            Follow us for updates, offers, and latest collections.
                        </p>

                        <div className="flex gap-6 mb-8">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-yellow-400 transition text-2xl"
                            >
                                <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-yellow-400 transition text-2xl"
                            >
                                <FontAwesomeIcon icon={faTiktok} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-yellow-400 transition text-2xl"
                            >
                                <FontAwesomeIcon icon={faFacebook} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-yellow-400 transition text-2xl"
                            >
                                <FontAwesomeIcon icon={faPinterest} />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-yellow-400 transition text-2xl"
                            >
                                <FontAwesomeIcon icon={faTwitter} />
                            </a>
                        </div>

                        <div className="space-y-2 text-sm">
                            <a
                                href="tel:+919999999999"
                                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition"
                            >
                                <FontAwesomeIcon
                                    icon={faPhone}
                                    className="text-yellow-400"
                                />
                                +91 99999 99999
                            </a>

                            <a
                                href="mailto:support@pratikwear.com"
                                className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 transition"
                            >
                                <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className="text-yellow-400"
                                />
                                support@pratikwear.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="border-b border-gray-800">
                <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6 lg:p-8">
                    <div>
                        <h4 className="font-bold text-lg mb-4">PratikWear</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#">Who We Are</Link></li>
                            <li><Link href="#">Our Story</Link></li>
                            <li><Link href="#">Sustainability</Link></li>
                            <li><Link href="#">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#">Women</Link></li>
                            <li><Link href="#">Men</Link></li>
                            <li><Link href="#">New Arrivals</Link></li>
                            <li><Link href="#">Sale</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#">Contact Us</Link></li>
                            <li><Link href="#">Shipping Info</Link></li>
                            <li><Link href="#">Returns & Exchanges</Link></li>
                            <li><Link href="#">FAQ</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-lg mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-300">
                            <li><Link href="#">Privacy Policy</Link></li>
                            <li><Link href="#">Terms & Conditions</Link></li>
                            <li><Link href="#">Refund Policy</Link></li>
                            <li><Link href="#">Cookies</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Payment Methods */}
            <div className="border-b border-gray-800">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-6 lg:p-8">
                    <div>
                        <h4 className="font-bold text-sm mb-4 text-gray-400 uppercase tracking-wider">
                            We Accept
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {['Visa', 'Mastercard', 'PayPal', 'UPI', 'Razorpay'].map(
                                (method) => (
                                    <div
                                        key={method}
                                        className="px-4 py-2 bg-gray-900 border border-gray-700 rounded text-xs font-medium text-gray-300"
                                    >
                                        {method}
                                    </div>
                                )
                            )}
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-sm mb-4 text-gray-400 uppercase tracking-wider">
                            Certified
                        </h4>
                        <div className="flex flex-wrap gap-3">
                            {['🔒 SSL Secure', '🌱 Eco-Friendly', '✓ Trusted Store'].map(
                                (cert) => (
                                    <div
                                        key={cert}
                                        className="px-4 py-2 bg-gray-900 border border-gray-700 rounded text-xs font-medium text-gray-300"
                                    >
                                        {cert}
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="bg-gray-950 px-6 lg:px-8 py-6">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-400">
                    <p>© 2026 PratikWear. All rights reserved.</p>

                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-yellow-400 transition">
                            Privacy
                        </Link>
                        <Link href="#" className="hover:text-yellow-400 transition">
                            Terms
                        </Link>
                        <Link href="#" className="hover:text-yellow-400 transition">
                            Cookies
                        </Link>
                    </div>

                </div>
            </div>
        </footer>
    );
}