"use client";

import Image from "next/image";

const Footer = () => {
    return (
        <footer className="bg-[#3e5b3d] text-white py-12">
            <div className="container mx-auto px-6 lg:px-20">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo & Copyright */}
                    <div className="flex flex-col items-start">
                        <Image
                            src="/Screenshot 2025-03-08 020212.png" // Replace with your actual logo path
                            alt="EcoTidy Logo"
                            width={40}
                            height={40}
                        />
                        <p className="text-sm mt-4">&copy; 2025 EcoTidy, Inc.</p>
                        <p className="text-sm">All rights reserved.</p>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Blog</a></li>
                            <li><a href="#" className="hover:underline">FAQs</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                            <li><a href="#" className="hover:underline">Partners</a></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h3 className="font-semibold mb-4">Connect</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Twitter</a></li>
                            <li><a href="#" className="hover:underline">Facebook</a></li>
                            <li><a href="#" className="hover:underline">Instagram</a></li>
                            <li><a href="#" className="hover:underline">LinkedIn</a></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Mission</a></li>
                            <li><a href="#" className="hover:underline">Vision</a></li>
                            <li><a href="#" className="hover:underline">Values</a></li>
                            <li><a href="#" className="hover:underline">Careers</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
