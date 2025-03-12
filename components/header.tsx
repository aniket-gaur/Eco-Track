'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import CustomButton from './dashboardbut';

export default function Navbar() {
    return (
        <nav className=" bg-[#f5e7d3] p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center text-black font-semibold text-lg">
                    <span className="mr-2">⚙</span> EcoTrack
                </Link>

                <div className="flex items-center space-x-6">
                    {/* Navigation Links with Hover Underline */}
                    <Link href="/" className="text-black hover:text-green-950 relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-950 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                        Home
                    </Link>
                    <Link href="/about" className="text-black hover:text-green-950 relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-950 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                        About
                    </Link>
                    <Link href="/services" className="text-black hover:text-green-950 relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-950 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                        Services
                    </Link>
                    <Link href="/contact" className="text-black hover:text-green-950 relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-950 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                        Contact
                    </Link>
                </div>

                {/* Button */}
                <CustomButton />
                {/* Mobile Menu Button */}
                <button className="md:hidden text-gray-500">
                    <Menu size={24} />
                </button>
            </div>
        </nav>
    );
}
