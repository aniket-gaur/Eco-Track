
import { Bell, Settings, User, Inbox, CreditCard, FileText, Shield } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { currentUser, EmailAddress } from "@clerk/nextjs/server";

export default async function Dashboard() {
    const user = await currentUser();
    console.log(user);

    return (
        <div className="flex h-screen bg-[#FAF3E0]">
            {/* Sidebar */}
            <aside className="w-64 bg-[#EADBC8] p-4">
                <div className="flex items-center gap-3 mb-6">
                    <div className="  text-white flex items-center justify-center rounded-full text-xl font-bold">
                        <UserButton />
                    </div>
                    <div>
                        <h2 className="font-bold text-[#1B5E20]">{user?.username}</h2>
                        <p className="text-sm text-[#4E4E4E]">{user?.primaryEmailAddress?.emailAddress}</p>
                    </div>
                </div>
                <nav className="space-y-4">
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><User size={18} /> Profile</a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Inbox size={18} /> Inbox</a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><CreditCard size={18} /> Billings</a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><FileText size={18} /> Logs</a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Bell size={18} /> Notifications</a>
                    <h3 className="text-sm text-[#4E4E4E] mt-4">Settings</h3>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Settings size={18} /> General Settings</a>
                    <a href="#" className="flex items-center gap-2 p-2 hover:bg-[#DCC7AA] rounded text-[#1B5E20]"><Shield size={18} /> Privacy</a>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4 text-[#1B5E20]">Dashboard</h1>

            </main>
        </div>
    );
}
