"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Copy } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Authority {
    name: string;
    designation: string;
    contact: string;
    email: string;
    city: string;
    state: string;
    pincode: string;
    photo?: string;
}

const authoritiesData: Authority[] = [
    {
        name: "Anruag Tripathi",
        designation: "District Commissioner",
        contact: "+91 9876543210",
        email: "johndoe@gov.in",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "226022",
        photo: "/images/john_doe.jpg"
    },
    {
        name: "Arjun Maurya",
        designation: "Municipal Officer",
        contact: "+91 8765432109",
        email: "janesmith@gov.in",
        city: "Lucknow",
        state: "Uttar Pradesh",
        pincode: "226022",
        photo: "/images/jane_smith.jpg"
    },
    {
        name: "Raj Patel",
        designation: "Police Commissioner",
        contact: "+91 7654321098",
        email: "rajpatel@gov.in",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        photo: "/images/raj_patel.jpg"
    },
];

const ContactPage = () => {
    const [filteredAuthorities, setFilteredAuthorities] = useState<Authority[]>([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const filterAuthorities = (pincode: string) => {
        if (pincode.length !== 6 || isNaN(Number(pincode))) {
            setError("Pincode must be exactly 6 digits.");
            setFilteredAuthorities([]);
            return;
        }
        setError("");
        setLoading(true);
        setTimeout(() => {
            const filtered = authoritiesData.filter(
                (authority) => authority.pincode === pincode
            );
            setFilteredAuthorities(filtered);
            setLoading(false);
        }, 500);
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearch(value);
        filterAuthorities(value);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 w-full">
            <ToastContainer position="top-right" autoClose={3000} />
            <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">Contact Authorities</h2>
            <input
                type="text"
                placeholder="Search by pincode"
                value={search}
                onChange={handleSearchChange}
                className="mb-2 p-2 border border-gray-600 rounded-md w-full max-w-sm"
            />
            {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
            {loading ? (
                <p className="text-gray-600 text-center">Searching...</p>
            ) : filteredAuthorities.length > 0 ? (
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <h3 className="text-lg font-medium text-gray-700 mb-4 col-span-full text-center">
                        Authorities for Pincode {search}
                    </h3>
                    {filteredAuthorities.map((authority, index) => (
                        <Card key={index} className="shadow-md rounded-lg bg-gray-400/10 border-[#0c924f] overflow-hidden w-full transition-transform transform hover:scale-105 ">
                            <CardHeader className="flex flex-col items-center text-center p-4">
                                <Image
                                    src={authority.photo || "/images/default.jpg"}
                                    alt={authority.name}
                                    width={80}
                                    height={80}
                                    className="rounded-full"
                                />
                                <CardTitle className="text-xl font-semibold text-green-700 mt-1">{authority.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-gray-600 text-center p-1">
                                <p className="text-black font-semibold">{authority.designation}</p>
                                <div className="flex items-center justify-center space-x-2 p-1">
                                    <p className="text-black">📞 {authority.contact}</p>
                                    <button onClick={() => copyToClipboard(authority.contact)}>
                                        <Copy className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-center space-x-2">
                                    <p className="text-blue-600">✉️ {authority.email}</p>
                                    <button onClick={() => copyToClipboard(authority.email)}>
                                        <Copy className="w-4 h-4 mx-2 text-gray-500 hover:text-gray-700" />
                                    </button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-gray-600 text-center">No authorities found for this pincode.</p>
            )}
        </div>
    );
};

export default ContactPage;
