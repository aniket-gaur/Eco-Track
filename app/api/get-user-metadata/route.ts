import { currentUser } from "@clerk/nextjs/server";
import { Interface } from "readline";

 type address = {
  country: string;
  city: string;
  pincode: string;
  house: string;
};

export async function GET(): Promise<Response> {
  const user = await currentUser();

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const address: address = (user.publicMetadata?.address as address) || {
      country: "",
      city: "",
      pincode: "",
      house:""
    };

    return new Response(JSON.stringify({ address }), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
