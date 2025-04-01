import { currentUser } from "@clerk/nextjs/server";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

export async function GET() {
    const user = await currentUser(); 
    type Address = { pincode?: string };
    type PublicMetadata = { address?: Address };
    const publicMetadata = user?.publicMetadata as PublicMetadata;
    const pincode: string = publicMetadata?.address?.pincode || "city";
console.log(pincode);

    try {
        await client.connect();
        const database = client.db("test");
        const collection = database.collection("complaints");
        // Query by phoneNumber or userId

 

        const data = await collection.find({pincode: pincode})
.toArray();

        console.log(data);
        console.log("admin pincode :", pincode);


        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    } finally {
        await client.close();
    }
}