"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Complaint {
    _id: string;
    fullName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    phoneNumber: string;
    reasonForComplaint: string;
    status: string;
    createdAt: string;
}

export default function RecievedComplaintsPage() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchComplaints() {
            setLoading(true);
            const res = await fetch("/api/getFormadmin");
            const data: Complaint[] = await res.json();
            console.log(data);
            setComplaints(data);
            setLoading(false);
        }
        fetchComplaints();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Complaints Received</h2>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
                </div>
            ) : (
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {complaints.map((complaint) => (
                        <Card key={complaint._id} className="bg-white rounded-lg shadow-lg flex flex-col w-full">
                            <CardHeader>
                                <CardTitle className="text-lg font-bold text-gray-900">Full Name: {complaint.fullName}</CardTitle>
                                <CardDescription className="text-black mt-1">
                                    <span className="block font-medium">Address:</span> {complaint.address}, {complaint.city}, {complaint.state} - {complaint.pincode}
                                </CardDescription>
                                <CardDescription className={`mt-2 font-medium ${complaint.status === "Solved" ? "text-green-600" : "text-red-500"} `}>
                                    Status: {complaint.status ? complaint.status : "In Progress"}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden">
                                <p className="text-black text-sm whitespace-normal break-words">
                                    <span className="font-medium">Reason for Complaint:</span> {complaint.reasonForComplaint}
                                </p>
                            </CardContent>
                            <CardFooter className="text-black text-xs border-t pt-2">
                                Submitted on: {new Date(complaint.createdAt).toLocaleDateString()}
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
