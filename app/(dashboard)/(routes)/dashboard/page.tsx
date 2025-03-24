import MyProfile from "@/components/myprofile";
import { currentUser } from "@clerk/nextjs/server";



export default async function ProfilePage() {
    const user = await currentUser();
    console.log(user);



    const city: string = user?.publicMetadata?.address ? user.publicMetadata.address.city || "city" : "city";
    const country: string = user?.publicMetadata?.address ? user.publicMetadata.address.country || "city" : "city";
    const pincode: string = user?.publicMetadata?.address ? user.publicMetadata.address.pincode || "city" : "city";
    const houseNo: string = user?.publicMetadata?.address ? user.publicMetadata.address.house || "city" : "city";




    const userData = {
        name: `${user?.firstName || "User"} ${user?.lastName || ""}`,
        role: `${user?.publicMetadata?.role || "User"}`,

        email: `${user?.primaryEmailAddress?.emailAddress || "user@example.com"}`,
        phone: `${user?.primaryPhoneNumber?.phoneNumber}`,
        dob: "12-10-1990",
        firstName: `${user?.firstName || "User"}`,
        lastName: ` ${user?.lastName || ""}`,
        houseNo: houseNo,
        country: country,
        city: city,
        postalCode: pincode,
        profileImage: `${user?.imageUrl}`,

    };

    return <MyProfile user={userData} />;
}
