import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Bell, CreditCard, FileText, Inbox, LogOut, Settings, Shield, User } from "lucide-react";

export default async function SidebarCom() {
    const user = await currentUser();

    return (
        <aside className="w-64 h-full bg-gradient-to-b from-green-900 to-green-700 text-white p-5 flex flex-col">
            {/* Profile Section */}
            <UserInfo user={user} />

            {/* Navigation */}
            <nav className="space-y-2 flex-1 mt-4">
                <NavItem href="/dashboard" icon={<User size={18} />} text="Profile" />
                <NavItem href="/complaint" icon={<Inbox size={18} />} text="Complaints" />
                <NavItem href="#" icon={<CreditCard size={18} />} text="Billings" />
                <NavItem href="/contact" icon={<FileText size={18} />} text="Contact" />
                <NavItem href="#" icon={<Bell size={18} />} text="Notifications" />

                {/* Settings Section */}
                <h3 className="text-sm text-white mt-4">Settings</h3>
                <NavItem href="#" icon={<Settings size={18} />} text="General Settings" />
                <NavItem href="/" icon={<LogOut size={18} />} text="Logout" />
            </nav>
        </aside>
    );
}

// Reusable UserInfo Component - Adjusted for Same Line Layout
const UserInfo = ({ user }: { user: any }) => (
    <div className="flex items-center gap-2  pl-2 border border-gray-300 rounded-lg p-3 bg-green-800/30">
        <UserButton />
        <div className="flex flex-col ">
            <h2 className="font-semibold text-white">{user?.username || "User"}</h2>
            <p className="text-sm text-gray-300">{user?.primaryEmailAddress?.emailAddress || "user@example.com"}</p>
        </div>
    </div>
);

// Reusable NavItem Component
const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
    <a
        href={href}
        className="flex items-center gap-2 p-2 rounded-lg text-gray-200 hover:text-white hover:bg-green-800 transition duration-300"
    >
        {icon}
        <span>{text}</span>
    </a>
);
