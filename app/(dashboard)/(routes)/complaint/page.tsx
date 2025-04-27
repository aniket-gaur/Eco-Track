"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import complaintSchema from "@/schema/complaintschema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Image from "next/image";




export default function ComplaintForm() {
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const [fileError, setFileError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // ✅ React Hook Form setup with Zod
    const {
        register,
        // Removed onSubmit to avoid conflict
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm({
        resolver: zodResolver(complaintSchema),
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);

            if (uploadedFiles.length + newFiles.length > 3) {
                setFileError("You can upload a maximum of 3 images.");
                return;
            }

            setFileError(null);
            const updatedFiles = [...uploadedFiles, ...newFiles].slice(0, 3);
            setUploadedFiles(updatedFiles);
            setValue("images", updatedFiles.map(file => file.name));
        }
    };

    const removeImage = (index: number) => {
        const updatedFiles = uploadedFiles.filter((_, i) => i !== index);
        setUploadedFiles(updatedFiles);
        setValue("images", updatedFiles.map(file => file.name));
    };

    const onSubmit = async (data: any) => {
        setLoading(true);

        try {
            const res = await fetch("/api/form-data", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (res.ok) {
                // After form submission success, call the email API
                const emailRes = await fetch("/api/sendConfirmation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        userEmail: "ayushgaur3008@gmail.com", // TODO: get real email (currently form has phone but not email?)
                        userName: data.fullName,
                        complaintId: Math.random().toString(36).substring(2, 10), // fake complaint ID, ideally from backend
                    }),
                });

                if (emailRes.ok) {
                    console.log("Confirmation email sent successfully!");
                } else {
                    console.error("Failed to send confirmation email.");
                }

                alert("Complaint submitted successfully!");

                // Reset form
                setUploadedFiles([]);
                setValue("images", []);
                setValue("fullName", "");
                setValue("address", "");
                setValue("city", "");
                setValue("state", "");
                setValue("pincode", "");
                setValue("phoneNumber", "");
                setValue("reasonForComplaint", "");

            } else {
                alert("Failed to submit complaint.");
            }
        } catch (error) {
            console.error("Error submitting complaint:", error);
            alert("Something went wrong!");
        }

        setLoading(false);
    };

    return (
        <Card className="max-w-2xl mx-auto shadow-xl rounded-lg border border-gray-200 bg-[#F6F6F6]">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold etxt text-green-800">Complaint Form</CardTitle>
            </CardHeader>
            <CardContent>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-1">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                            id="fullName"
                            {...register("fullName")}
                            placeholder="Enter your name"
                            className="border border-green-300 p-3 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition-all"
                        />
                        {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
                    </div>

                    {/* Address */}
                    <div className="space-y-1">
                        <Label htmlFor="address">Address</Label>
                        <Input
                            id="address"
                            {...register("address")}
                            placeholder="Enter your address"
                            className="border border-green-300  p-3 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition-all"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    {/* City & State */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="city">City</Label>
                            <Input
                                id="city"
                                {...register("city")}
                                placeholder="City"
                                className="border border-green-300 p-3 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition-all"
                            />
                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="state">State</Label>
                            <Input
                                id="state"
                                {...register("state")}
                                placeholder="State"
                                className="border border-green-300 p-3 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition-all"
                            />
                            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                        </div>
                    </div>

                    {/* Pincode & Phone Number */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <Label htmlFor="pincode">Pincode</Label>
                            <Input
                                id="pincode"
                                {...register("pincode")}
                                placeholder="Pincode"
                                className="border border-green-300 p-3 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition-all"
                            />
                            {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="phoneNumber">Phone Number</Label>
                            <Input
                                id="phoneNumber"
                                {...register("phoneNumber")}
                                placeholder="Phone Number"
                                className="border border-green-300 p-3 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition-all"
                            />
                            {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
                        </div>
                    </div>

                    {/* Reason for Complaint */}
                    <div className="space-y-1">
                        <Label htmlFor="reasonForComplaint">Reason for Complaint</Label>
                        <Textarea
                            id="reasonForComplaint"
                            {...register("reasonForComplaint")}
                            placeholder="Explain your complaint..."
                            className="border border-green-300 p-3 rounded-md focus:border-green-600 focus:ring-2 focus:ring-green-400 transition-all"
                        />
                        {errors.reasonForComplaint && <p className="text-red-500 text-sm">{errors.reasonForComplaint.message}</p>}
                    </div>



                    {/* File Upload */}
                    <div className="space-y-1">
                        <Label htmlFor="files">Upload Photos (Max: 3)</Label>
                        <Input id="files" type="file" className=" border border-green-300 p-3 rounded-md " multiple accept="image/*" onChange={handleFileChange} />
                        {fileError && <p className="text-red-500 text-sm">{fileError}</p>}
                    </div>

                    {/* Uploaded Image Preview */}
                    {uploadedFiles.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mt-3">
                            {uploadedFiles.map((file, index) => (
                                <div key={index} className="relative w-24 h-24 border rounded-lg overflow-hidden">
                                    <Image
                                        src={URL.createObjectURL(file)}
                                        alt={`Uploaded file ${index + 1}`}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                    <button
                                        onClick={() => removeImage(index)}
                                        className="absolute top-1 right-1 bg-red-600 text-white text-xs px-1 rounded-full"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-lg font-semibold py-2 cursor-pointer">
                        {loading ? "Submitting..." : "Submit"}
                    </Button>
                </form>
            </CardContent>
        </Card >
    );
}
