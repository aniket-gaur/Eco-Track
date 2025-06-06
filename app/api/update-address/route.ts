import { clerkClient } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";

export async function POST(req:any) {
  const user = await currentUser();
  const client = await clerkClient();
  console.log(user);

  if (!user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const userId = user.id;
  const { country , city, pincode, house } = await req.json();

  if (!country || !city || !pincode || !house) {
    return new Response(JSON.stringify({ error: "All fields are required" }), {
      status: 400,
    });
  }

  // ✅ Fetch existing metadata
  let existingMetadata = user.publicMetadata || {};
  console.log(clerkClient);
 

  // ✅ Append the new address data directly to publicMetadata
  existingMetadata.address = { country, city, pincode, house };

  // ✅ Update Clerk publicMetadata
  await client.users.updateUserMetadata(userId, {
    publicMetadata: existingMetadata,
  });

  return new Response(
    JSON.stringify({ message: "User address updated successfully" }),
    { status: 200 }
  );
}
