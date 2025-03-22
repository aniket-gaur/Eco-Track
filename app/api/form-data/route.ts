import { connectToDatabase } from "../../../lib/mongodb";
import Complaint from '../../../models/complaintform'

export default async function handler(req:any, res:any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectToDatabase();
    const { fullName, address, city, state, pincode, phoneNumber, reasonForComplaint, images } = req.body;

    if (!fullName || !address || !city || !state || !pincode || !phoneNumber || !reasonForComplaint) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (images && images.length > 3) {
      return res.status(400).json({ error: "You can upload a maximum of 3 images" });
    }

    const complaintEntry = new Complaint({
      fullName,
      address,
      city,
      state,
      pincode,
      phoneNumber,
      reasonForComplaint,
      images,
    });

    await complaintEntry.save();
    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
