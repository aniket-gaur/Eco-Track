"use client";



//imports for the component

import { useState } from "react";


import {
    LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


// Define the Bill interface
interface Bill {
    id: number;
    month: string;
    baseAmount: number;
    serviceFee: number;
    tax: number;
    dueDate: string;
    status: "Paid" | "Unpaid" | "Overdue";
    paymentMode?: string;
}
const generateRandomId = () => Math.floor(100000 + Math.random() * 900000);


// Sample Bills Data
const billsData: Bill[] = [
    { id: generateRandomId(), month: "January", baseAmount: 1300, serviceFee: 100, tax: 100, dueDate: "2025-03-20", status: "Paid", paymentMode: "UPI" },
    { id: generateRandomId(), month: "Febuary", baseAmount: 899, serviceFee: 50, tax: 50, dueDate: "2025-03-22", status: "Unpaid" },
    { id: generateRandomId(), month: "March", baseAmount: 500, serviceFee: 50, tax: 50, dueDate: "2025-03-25", status: "Paid", paymentMode: "Credit Card" },
    { id: generateRandomId(), month: "April", baseAmount: 1100, serviceFee: 50, tax: 50, dueDate: "2025-03-15", status: "Overdue" },
];

// Chart Data
const chartData = billsData.map((bill) => ({
    month: bill.month,
    total: bill.baseAmount + bill.serviceFee + bill.tax,
}));


export default function BillingPage() {
    const [selectedBill, setSelectedBill] = useState<Bill | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filters, setFilters] = useState({ date: "", type: "", status: "All" });

    // Open Modal
    const openModal = (bill: Bill) => {
        setSelectedBill(bill);
        setIsModalOpen(true);
    };

    // Close Modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBill(null);
    };

    // Filter Logic
    const filteredBills = billsData.filter((bill) => {
        const matchDate = filters.date ? new Date(bill.dueDate) <= new Date(filters.date) : true;
        const matchType = filters.type ? bill.month.toLowerCase().includes(filters.type.toLowerCase()) : true;
        const matchStatus = filters.status === "All" ? true : bill.status === filters.status;
        return matchDate && matchType && matchStatus;
    });

    return (
        <div className="min-h-screen flex flex-col items-center p-6 ">
            {/* Header */}
            <h2 className="text-3xl font-semibold text-gray-200 mb-6 border-b-2 border-gray-400 pb-2">
                Billing Overview
            </h2>

            <p className="text-gray-100 mb-4">Manage your bills and payments efficiently.</p>




            <div className="flex flex-wrap gap-4 mb-6 w-full max-w-5xl">

                <Input
                    type="date"
                    placeholder="Filter by Due Date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="p-2 border rounded w-full md:w-1/3 text-gray-300 bg-transparent placeholder-gray-100"
                />




                {/* Status Filter */}
                <Select value={filters.status} onValueChange={(value) => setFilters({ ...filters, status: value })}>
                    <SelectTrigger className="w-full md:w-1/3">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 text-white placeholder-white">
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Unpaid">Unpaid</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Table View */}
            <div className="w-full max-w-5xl mb-6">
                <Table className="border rounded-lg overflow-hidden bg-white shadow-md">
                    <TableHeader>
                        <TableRow className="bg-gray-200">
                            <TableHead >BILL ID</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Payment Mode</TableHead>

                            <TableHead >Action</TableHead>




                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredBills.map((bill) => (


                            <TableRow key={bill.id} className="hover:bg-gray-100 cursor-pointer" onClick={() => openModal(bill)}>
                                <TableCell>{bill.id}</TableCell>

                                <TableCell>{bill.month}</TableCell>
                                <TableCell>₹{bill.baseAmount + bill.serviceFee + bill.tax}</TableCell>
                                <TableCell>{bill.dueDate}</TableCell>
                                <TableCell>

                                    <Badge className={`ml-2 rounded-lg ${bill.status === "Paid" ? "bg-green-500 text-white" : bill.status === "Unpaid" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>
                                        {bill.status}
                                    </Badge>








                                </TableCell>
                                <TableCell>{bill.paymentMode || "N/A"}</TableCell>
                                {(bill.status === "Unpaid" || bill.status === "Overdue") && (
                                    <TableCell >

                                        <button



                                            className="mt-2 ml-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-green-700 transition cursor-pointer">
                                            Make Payment
                                        </button>
                                    </TableCell>
                                )}



                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Modal */}
            {isModalOpen && selectedBill && (
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Bill Details</DialogTitle>
                        </DialogHeader>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{selectedBill.month}</h3>


                            <div className="border rounded-lg p-4 bg-gray-50">
                                <p><strong>Base Amount:</strong> ₹{selectedBill.baseAmount}</p>
                                <p><strong>Service Fee:</strong> ₹{selectedBill.serviceFee}</p>
                                <p><strong>Tax:</strong> ₹{selectedBill.tax}</p>
                                <hr className="my-2 border-gray-300" />
                                <p className="text-lg font-semibold"><strong>Total:</strong> ₹{selectedBill.baseAmount + selectedBill.serviceFee + selectedBill.tax}</p>
                            </div>

                            <p className="mt-3"><strong>Due Date:</strong> {selectedBill.dueDate}</p>
                            <p><strong>Status:</strong>
                                <Badge className={`ml-2 ${selectedBill.status === "Paid" ? "bg-green-500 text-white" : selectedBill.status === "Unpaid" ? "bg-yellow-500 text-white" : "bg-red-500 text-white"}`}>
                                    {selectedBill.status}
                                </Badge>
                            </p>
                            {selectedBill.paymentMode && <p><strong>Payment Mode:</strong> {selectedBill.paymentMode}</p>}
                        </div>

                        {/* Close Button */}
                        <div className="flex justify-end mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" onClick={closeModal}>Close</Button>
                            </DialogClose>
                        </div>
                    </DialogContent>
                </Dialog>
            )}



            {/* Chart View */}

            <div className="p-6 w-full max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-300  mb-4">
                    Monthly Bill Total
                </h2>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#ef4444"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>


        </div>
    );
}
