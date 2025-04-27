import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Bell, Contact, CreditCard, DatabaseIcon, FileText, Inbox, LogOut, PersonStanding, Settings, Shield, User } from "lucide-react";
import { FaRegAddressBook } from "react-icons/fa";

export default async function AdminSidebar() {
    const user = await currentUser();


    return (
        <aside className="pt-10 w-64 h-screen bg-gradient-to-b from-green-900 to-green-700 text-white p-5 flex flex-col">

            <UserInfo user={user} />

            {/* Navigation */}
            <nav className="space-y-2 flex-1 mt-4">
                <NavItem href="/dashboard" icon={<User size={18} />} text="Profile" />
                <NavItem href="/admin/statistics" icon={<DatabaseIcon size={18} />} text="Statistics" />
                <NavItem href="/admin/complaints" icon={<CreditCard size={18} />} text="Recieved" />
                {/* <NavItem href="/contacts" icon={<Contact size={18} />} text="Contact" /> */}



                {/* Settings Section */}
                <h3 className="text-sm text-white mt-4">Settings</h3>
                <NavItem href="https://epic-sloth-92.accounts.dev/user" icon={<PersonStanding size={18} />} text=" Personal Information" />
                <NavItem href="/data" icon={<FaRegAddressBook size={18} />} text=" Address" />
                <NavItem href="/" icon={<LogOut size={18} />} text="Logout" />
            </nav>
        </aside>
    );
}


const UserInfo = ({ user }: { user: any }) => (
    <div className="flex items-center gap-2  pl-1 border border-gray-300 rounded-lg p-3 bg-green-800/30">
        <UserButton />

        <div className="flex flex-col ">
            <h2 className="font-semibold text-white">{user?.username || "User"}</h2>
            <p className="text-sm text-gray-300">{user?.primaryEmailAddress?.emailAddress || "user@example.com"}</p>
        </div>
    </div>
);


const NavItem = ({ href, icon, text }: { href: string; icon: React.ReactNode; text: string }) => (
    <a
        href={href}
        className="flex items-center gap-2 p-2 rounded-lg text-gray-200 hover:text-white hover:bg-green-800 transition duration-300"
    >
        {icon}
        <span>{text}</span>
    </a>
);
