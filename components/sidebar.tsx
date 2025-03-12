import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Bell, CreditCard, FileText, Inbox, Settings, Shield, User } from "lucide-react";

export default async function SidebarCom() {
    const user = await currentUser();
    console.log(user);
    return (
        <aside className="w-64  bg-[#f3eee4] p-4">
            <div className="flex  items-center gap-3 mb-6">
                <div className="  text-white flex items-center justify-center rounded-full text-xl font-bold">
                    <UserButton />
                </div>
                <div>
                    <h2 className="font-bold text-black">{user?.username}</h2>
                    <p className="text-sm text-black">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
            </div>
            <nav className="space-y-4 h-full">
                <a href="/profile" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><User size={18} /> Profile</a>
                <a href="/admin" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Inbox size={18} /> Admin Pannel</a>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><CreditCard size={18} /> Billings</a>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><FileText size={18} /> Logs</a>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Bell size={18} /> Notifications</a>
                <h3 className="text-sm text-[#4E4E4E] mt-4">Settings</h3>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Settings size={18} /> General Settings</a>
                <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Shield size={18} /> Privacy</a>
            </nav>
        </aside>
    )
}