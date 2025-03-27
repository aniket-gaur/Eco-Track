
import mongoose from "mongoose";

 type connectionObject={
  isConnected?:number
 }
const connection:connectionObject={

}

async function dbconnect():Promise<void>{
  if(connection.isConnected){
    console.log("already connected");
    return;
  }
try{
 const db =await  mongoose.connect(process.env.MONGODB_URI||"",{});
 const readyState=db.connections[0].readyState
 console.log("db connnected");
 console.log(readyState);
 
}catch(err){
  console.log(err);
  process.exit();
  
}

}

export default dbconnect;