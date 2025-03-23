"use client";

import Image from "next/image";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useState } from "react";
import { Switch } from "./ui/switch";


const Footer = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <footer className="bg-[#3e5b3d] text-white py-12 relative overflow-hidden">
            {/* Light Effects */}
            <div className="absolute left-1/4 top-1/3 w-[300px] h-[300px] bg-green-400 opacity-20 blur-[100px] -z-10"></div>
            <div className="absolute right-1/4 bottom-1/3 w-[400px] h-[400px] bg-green-500 opacity-25 blur-[140px] -z-10"></div>

            <div className="container mx-auto px-6 lg:px-20 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Stay Connected */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Stay Connected</h3>
                    <p className="text-sm mb-4">Join our newsletter for the latest updates and exclusive offers.</p>
                    <div className="flex items-center bg-gray-300 rounded-full px-4 py-2 w-full max-w-xs">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent outline-none flex-grow text-black placeholder-black"
                        />
                        <button className="text-black text-lg">➤</button>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Services</a></li>
                        <li><a href="#" className="hover:underline">Products</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Contact Us */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Contact Us</h3>
                    <p className="text-sm">123 Innovation Street</p>
                    <p className="text-sm">Tech City, TC 12345</p>
                    <p className="text-sm">Phone: (123) 456-7890</p>
                    <p className="text-sm">Email: hello@example.com</p>
                </div>

                {/* Follow Us & Dark Mode Toggle */}
                <div>
                    <h3 className="font-semibold text-lg mb-3">Follow Us</h3>
                    <div className="flex gap-4 text-xl">
                        <a href="#" className="hover:text-gray-400"><FaFacebookF /></a>
                        <a href="#" className="hover:text-gray-400"><FaTwitter /></a>
                        <a href="#" className="hover:text-gray-400"><FaInstagram /></a>
                        <a href="#" className="hover:text-gray-400"><FaLinkedin /></a>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
