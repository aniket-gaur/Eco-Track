import { NextResponse } from "next/server";
import dbconnect from "@/lib/mongodb";
import Complaint from "@/models/complaintform";

export async function POST(req: Request) {
  try {
    await dbconnect();
    const body = await req.json(); 
    console.log(body.fullName);
    console.log(body.address);
    console.log(body.city);
    console.log(body.state);
    console.log(body.pincode);
    console.log(body.phoneNumber);
    console.log(body.reasonForComplaint);
    

    
    

    const { fullName, address, city, state, pincode, phoneNumber, reasonForComplaint ,images } = body;

    if (!fullName ||  !address || !city || !state || !pincode || !phoneNumber || !reasonForComplaint || !images ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (images && images.length > 3) {
      return NextResponse.json({ error: "You can upload a maximum of 3 images" }, { status: 400 });
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
    return NextResponse.json({ message: "Complaint submitted successfully" }, { status: 201 });

  } catch (error) {
    console.error("Error submitting complaint:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
