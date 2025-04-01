import mongoose, { Schema, Document } from "mongoose";
import { currentUser } from "@clerk/nextjs/server";

 
export async function getCurrentUserId(): Promise<string | null> {
  const user = await currentUser();
  return user?.id || null;
}


export interface Complaint extends Document {
  fullName:string,
  address:string,
  city:string,
  state:string,
  pincode:string,
  phoneNumber:string,
  reasonForComplaint:string,
  images:string[],
userID:string,
  createdAt:Date
  status:string,


}

const ComplaintSchema:Schema<Complaint> = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    reasonForComplaint: { type: String, required: true },
    images: [{ type: String }],
    userID: { type: String, required: true },
    
    createdAt:{type:Date,default:Date.now , required:true},
    status:{type:String,default:"pending",required:true}
  },
  { timestamps: true }
);



const Complaintmodel= (mongoose.models.Complaint as mongoose.Model<Complaint> )||
  mongoose.model<Complaint>("Complaint", ComplaintSchema);


  export default Complaintmodel;