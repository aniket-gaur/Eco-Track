import { NextResponse } from "next/server";
import dbconnect from "@/lib/mongodb";
import Complaint ,{getCurrentUserId}from "@/models/complaintform";

export async function POST(req: Request) {
  try {
    await dbconnect();
    const body = await req.json();  
    const userId = await getCurrentUserId();

    
    

    const { fullName, address, city, state, pincode, phoneNumber, reasonForComplaint ,images } = body;

    if (!fullName ||  !address || !city || !state || !pincode || !phoneNumber || !reasonForComplaint || !images ) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (images && images.length > 3) {
      return NextResponse.json({ error: "You can upload a maximum of 3 images" }, { status: 400 });
    }
    

     

     

    const complaintData={
      ...body,
      userID: userId,
    }
    console.log(complaintData);
    
    const complaintEntry = new Complaint(complaintData);

    await complaintEntry.save();
    return NextResponse.json({ message: "Complaint submitted successfully" }, { status: 201 });

  } catch (error) {
    console.error("Error submitting complaint:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
