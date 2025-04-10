





import AdminSidebar from "@/components/adminside";


import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, Music4Icon, Settings, VideoIcon } from "lucide-react";




export default function DashboardLayout({ children }: { children: React.ReactNode }) {


    return (




        <div className="h-full relative bg-[radial-gradient(circle,_#2F4F2F,_#243D24,_#192B19)]">
            <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80]">
                <AdminSidebar />
            </div>

            <div className="flex-1 flex flex-col">

                <main className="p-6 flex-1 md:pl-72">{children}</main>
            </div>
        </div>

    );
}
