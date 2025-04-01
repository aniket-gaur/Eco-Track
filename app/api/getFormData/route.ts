import { currentUser } from "@clerk/nextjs/server";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

export async function GET() {
    const user = await currentUser();
    let  phoneNumber = user?.phoneNumbers[0]?.phoneNumber || "";
    phoneNumber = phoneNumber.replace(/^\+91/, "");
    

    try {
        await client.connect();
        const database = client.db("test");
        const collection = database.collection("complaints");
        // Query by phoneNumber or userId
        const data = await collection.find({phoneNumber: phoneNumber})
.toArray();

        console.log(data);
        console.log("User's phone number:", phoneNumber);


        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    } finally {
        await client.close();
    }
}