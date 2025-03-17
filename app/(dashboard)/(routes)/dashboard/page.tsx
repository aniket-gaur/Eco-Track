import MyProfile from "@/components/myprofile";
import { currentUser } from "@clerk/nextjs/server";



export default async function ProfilePage() {
    const user = await currentUser();
    console.log(user);

    const userData = {
        name: `${user?.firstName || "User"} ${user?.lastName || ""}`,
        role: `${user?.role || "User"}`,

        email: `${user?.primaryEmailAddress?.emailAddress || "user@example.com"}`,
        phone: "(+62) 821 2554-5846",
        dob: "12-10-1990",
        firstName: `${user?.firstName || "User"}`,
        lastName: ` ${user?.lastName || ""}`,
        country: "United Kingdom",
        city: "Leeds, East London",
        postalCode: "ERT 1254",
        profileImage: `${user?.imageUrl}`,

    };

    return <MyProfile user={userData} />;
}
