import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();
  console.log(user.id);

  try {
    let address = user.publicMetadata?.address || {
      country: "",
      city: "",
      pincode: "",
    };

    return new Response(JSON.stringify({ address }), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
