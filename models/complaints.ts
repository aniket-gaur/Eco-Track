import mongoose ,{Schema ,Document}from "mongoose";

export interface ComplaintView  extends Document {

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


const ComplaintSchema:Schema<ComplaintView> = new mongoose.Schema(
  {
    fullName: String, 
    address:  String,
    city: String,
    state:  String,
    pincode:  String,
    phoneNumber: String,
    reasonForComplaint: String, 
    images: [{ String }],
    createdAt:Date,
    status:String
  },
  
);

const ComplaintViewmodel= (mongoose.models.Complaint as mongoose.Model<ComplaintView> )|| mongoose.model<ComplaintView>("ComplaintView", ComplaintSchema);

export default ComplaintViewmodel;