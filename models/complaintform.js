import mongoose from "mongoose";

const ComplaintSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    reasonForComplaint: { type: String, required: true },
    images: [{ type: String }], // Array to store image URLs or Base64
  },
  { timestamps: true }
);

export default mongoose.models.Complaint ||
  mongoose.model("Complaint", ComplaintSchema);
