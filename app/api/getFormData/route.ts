import { currentUser } from "@clerk/nextjs/server";
import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGO_URI || "";
const client = new MongoClient(uri);

export async function GET() {
    const user = await currentUser();
    console.log(user);
    
    try {
        await client.connect();
        const database =  client.db("test");
        // Use a valid collection name
        const collection = database.collection("complaints");

        const data = await collection.find({}).toArray();
        console.log(data);
        
        return NextResponse.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    } finally {
        await client.close();
    }
}