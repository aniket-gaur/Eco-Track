'use client'

import { useClerk } from "@clerk/nextjs";
import { CheckCircle, Pencil, User, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface UserProfileProps {
    user: {
        name: string;
        role: string;
        location: string;
        email: string;
        phone: string;
        dob: string;
        firstName: string;
        lastName: string;
        country: string;
        city: string;
        postalCode: string;
        profileImage: string;
        isVerified: boolean;
        houseNo: string;
    };
}

// resuable component for displaying user information
const InfoRow = ({ label, value }: { label: string; value: string | number }) => (
    <p className="text-sm">
        <span className="font-semibold text-gray-700 dark:text-gray-300">{label}:</span> {value}
    </p>
);

export default function MyProfile({ user }: UserProfileProps) {
    // Function to redirect to user profile 
    const { redirectToUserProfile } = useClerk();

    return (
        <div className="max-w-4xl mx-auto p-4 bg-[#f6f6f6] dark:bg-gray-800 rounded-lg shadow-md">
            <div className="p-4 border-b border-green-800 mb-4">
                <h1 className="text-green-800 text-2xl font-semibold dark:text-green-400">My Profile</h1>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-lg transition-shadow flex items-center gap-4">
                <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-20 h-20 rounded-full border-2 border-green-600"
                />
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold dark:text-white">{user.name}</h2>
                        {user.isVerified && <CheckCircle size={18} className="text-green-500" />}
                    </div>
                    <p className="text-sm text-black dark:text-gray-300">{user.role}</p>
                    <p className="text-sm text-black dark:text-gray-300">{user.email}</p>
                </div>
            </div>

            {/* Personal Information */}
            <section className="bg-white dark:bg-gray-900 p-6 mt-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                        <User size={18} /> Personal Information
                    </h3>
                    <Button
                        onClick={() => redirectToUserProfile()}
                        className="text-green-500 hover:text-green-700"
                        variant="ghost"
                    >
                        <Pencil size={18} />
                    </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoRow label="First Name" value={user.firstName} />
                    <InfoRow label="Last Name" value={user.lastName} />
                    <InfoRow label="Email Address" value={user.email} />
                    <InfoRow label="Phone Number" value={user.phone} />
                    <InfoRow label="Complaints Registered" value={3} />
                    <InfoRow label="User Role" value={user.role} />
                </div>
            </section>

            {/* Address */}
            <section className="bg-white dark:bg-gray-900 p-6 mt-6 rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-white">
                        <MapPin size={18} /> Address
                    </h3>
                    <Link href="/data">
                        <Button className="text-green-500 hover:text-green-700" variant="ghost">
                            <Pencil size={18} />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <InfoRow label="House No" value={user.houseNo} />
                    <InfoRow label="Country" value={user.country} />
                    <InfoRow label="City" value={user.city} />
                    <InfoRow label="Postal Code" value={user.postalCode} />
                </div>
            </section>
        </div>
    );
}
