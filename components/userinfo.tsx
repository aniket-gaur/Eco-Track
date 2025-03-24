import { UserButton } from "@clerk/nextjs";

export default function UserInfo({ user }: { user: any }) {
    <div className="flex items-center gap-2  pl-2 border border-gray-300 rounded-lg p-3 bg-green-800/30">
        <UserButton />
        <div className="flex flex-col ">
            <h2 className="font-semibold text-white">{user?.username || "User"}</h2>
            <p className="text-sm text-gray-300">{user?.primaryEmailAddress?.emailAddress || "user@example.com"}</p>
        </div>
    </div>
};

