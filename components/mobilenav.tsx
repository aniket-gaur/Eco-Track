import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobilesidebar";

export default function MobileNav() {
    return (
        <div className="flex items-center p-4">
            <MobileSidebar />

        </div>
    )
}