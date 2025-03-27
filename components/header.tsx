'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import CustomButton from './dashboardbut';

export default function Navbar() {
    return (
        <nav className="bg-[#2F4F2F] p-4 shadow-md  ">
            <div className="container mx-auto flex justify-between items-center">

                <Link href="/" className="flex items-center text-white font-semibold text-lg">
                    <span className="mr-2 c">⚙</span> EcoTrack
                </Link>

                <div className="flex items-center space-x-6">

                    <Link href="/" className="text-white hover: relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-900 before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                        Home
                    </Link>
                    <Link href="/" className="text-white hover: relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-900   before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                        About
                    </Link>
                    <Link href="/services" className="text-white hove: relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-900  before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
                        Services
                    </Link>
                    <Link href="/contact" className="text-white  hover:relative before:content-[''] before:absolute before:w-full before:h-0.5 before:bottom-0 before:left-0 before:bg-green-900  before:scale-x-0 before:transition-transform before:duration-300 hover:before:scale-x-100">
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
