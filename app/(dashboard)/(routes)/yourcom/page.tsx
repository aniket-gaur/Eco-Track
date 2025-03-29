"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";

interface Event {
    _id: string;
    fullName: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
    reasonForComplaint: string;
    status: string;
    createdAt: string;
}

export default function Home() {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        async function fetchEvents() {
            const res = await fetch("/api/getFormData");
            const data: Event[] = await res.json();
            setEvents(data);
        }
        fetchEvents();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6 self-start">Your Complaints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                {events.map((event) => (
                    <Card key={event._id} className="bg-white rounded-lg shadow-lg flex flex-col w-full">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-gray-900">Full Name: {event.fullName}</CardTitle>
                            <CardDescription className="text-black mt-1">
                                <span className="block font-medium">Address:</span> {event.address}, {event.city}, {event.state} - {event.pincode}
                            </CardDescription>
                            <CardDescription className={`mt-2 font-medium ${event.status === "pending" ? "text-red-600" : ""} `}>
                                Status: {event.status ? event.status : "In Progress"}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-hidden">
                            <p className="text-black text-sm whitespace-normal break-words">
                                <span className="font-medium">Reason for Complaint:</span> {event.reasonForComplaint}
                            </p>
                        </CardContent>
                        <CardFooter className="text-black text-xs border-t pt-2">
                            Submitted on: {new Date(event.createdAt).toLocaleDateString()}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
