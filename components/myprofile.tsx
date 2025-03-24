'use client'

import { useClerk } from "@clerk/nextjs";
import { CheckCircle, Pencil } from "lucide-react";
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

export default function MyProfile({ user }: UserProfileProps) {

    const { redirectToUserProfile } = useClerk();

    console.log(user.role)

    return (
        <div className="max-w-4xl mx-auto p-4 bg-[#F6F6F6] rounded-lg shadow-md">

            <div className="p-4 border-b border-green-800 mb-4">
                <h1 className="text-green-800 text-2xl font-semibold">My Profile</h1>
            </div>


            <div className="bg-white p-6 rounded-lg shadow flex items-center gap-4">
                <img src={user.profileImage} alt="Profile" className="w-20 h-20 rounded-full border-2 border-green-600" />
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        {user.isVerified && (
                            <CheckCircle size={18} className="text-green-500" />
                        )}
                    </div>
                    <p className="text-1xl text-black">{user.role}</p>
                    <p className="text-1xl text-black">{user.email}</p>
                </div>
            </div>

            {/* Personal Information */}
            <div className="bg-white p-6 mt-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                    <Button onClick={() => redirectToUserProfile()} className="text-orange-500 hover:text-orange-700">
                        <Pencil size={18} />
                    </Button>
                </div>
                <div className="grid grid-cols-2 gap-6 text-sm">
                    <p><strong className="text-gray-700">First Name:</strong> {user.firstName}</p>
                    <p><strong className="text-gray-700">Last Name:</strong> {user.lastName}</p>
                    <p><strong className="text-gray-700">Email Address:</strong> {user.email}</p>
                    <p><strong className="text-gray-700">Phone Number:</strong> {user.phone}</p>
                    <p><strong className="text-gray-700">Tickets Generated:</strong> 12</p>

                    <p><strong className="text-gray-700">User Role:</strong> {user.role}</p>
                </div>
            </div>

            {/* Address */}
            <div className="bg-white p-6 mt-6 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Address</h3>

                    <Link href="/data">
                        <Button className="text-orange-500 hover:text-orange-700">
                            <Pencil size={18} />
                        </Button>

                    </Link>

                </div>
                <div className="grid grid-cols-2 gap-6 text-sm">
                    <p><strong className="text-gray-700">House No:-:</strong> {user.houseNo}</p>
                    <p><strong className="text-gray-700">Country:</strong> {user.country}</p>
                    <p><strong className="text-gray-700">City:</strong> {user.city}</p>
                    <p><strong className="text-gray-700">Postal Code:</strong> {user.postalCode}</p>
                </div>

            </div>
        </div>
    );
}
