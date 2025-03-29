import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface Complaint extends Document {
  fullName:string,
  address:string,
  city:string,
  state:string,
  pincode:string,
  phoneNumber:string,
  reasonForComplaint:string,
  images:string[],
  createdAt:Date
  status:string


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
    createdAt:{type:Date,default:Date.now , required:true},
    status:{type:String,default:"pending",required:true}
  },
  { timestamps: true }
);



const Complaintmodel= (mongoose.models.Complaint as mongoose.Model<Complaint> )||
  mongoose.model<Complaint>("Complaint", ComplaintSchema);


  export default Complaintmodel;