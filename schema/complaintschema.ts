
import * as z from "zod";

const complaintSchema = z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City must be at least 2 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    pincode: z.string().length(6, "Pincode must be exactly 6 digits"),
    phoneNumber: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid phone number"),
    reasonForComplaint: z.string().min(10, "Reason must be at least 10 characters"),
    images: z.array(z.string()).max(3, "You can upload a maximum of 3 images"),
    
    
    
});

export default complaintSchema;