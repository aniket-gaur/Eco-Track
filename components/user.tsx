import { UserButton } from "@clerk/nextjs";

export default function UserComponent() {
    return (
        <div className="flex justify-end">
            <UserButton />
        </div>
    )
}