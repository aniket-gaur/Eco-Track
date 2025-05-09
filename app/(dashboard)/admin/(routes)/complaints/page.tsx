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
        <div className="min-h-screen  p-6 flex flex-col items-center">
            <h2 className="text-3xl font-semibold text-gray-300 mb-6">Complaints Received</h2>
            {loading ? (
                <div className="flex justify-center flex-col items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500">


                    </div>
                    <span className="ml-4 text-gray-500">Please Wait it take some time </span>
                </div>
            ) : (
                <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {complaints.map((complaint) => (
                        <Card
                            key={complaint._id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-300 flex flex-col w-full"
                        >
                            <CardHeader className="pb-2 border-b border-gray-100">
                                <CardTitle className="text-xl font-semibold text-gray-800">
                                    <span className="font-semibold">UserName:  {complaint.fullName}</span>
                                </CardTitle>
                                <CardDescription className="text-sm text-gray-600 mt-1">
                                    <span className="font-medium">Address:</span> {complaint.address}, {complaint.city}, {complaint.state} - {complaint.pincode}
                                </CardDescription>

                                <div className="mt-2">
                                    <span
                                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${complaint.status === "Solved"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {complaint.status || "In Progress"}
                                    </span>
                                </div>
                            </CardHeader>

                            <CardContent className="py-4 px-4 border-b border-gray-100 flex-1">
                                <p className="text-sm text-gray-700 whitespace-pre-wrap break-words break-all">
                                    <span className="font-medium">Reason:</span> {complaint.reasonForComplaint}
                                </p>
                            </CardContent>

                            <CardFooter className="px-4 py-3 flex justify-between items-center text-xs text-gray-500">
                                <span>📅 {new Date(complaint.createdAt).toLocaleDateString()}</span>
                                <span className="text-gray-400">📞 {complaint.phoneNumber}</span>
                            </CardFooter>
                        </Card>

                    ))}
                </div>
            )}
        </div>
    );
}
