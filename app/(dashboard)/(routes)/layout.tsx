

import SidebarCom from "@/components/sidebar";
import { useParams } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex">
            {/* Sidebar - Sticky */}
            <div className=" h-screen sticky top-0">
                <SidebarCom />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">



                {/* Page Content */}
                <main className="p-6 flex-1 bg-[radial-gradient(circle,_#2F4F2F,_#243D24,_#192B19)]">{children}</main>
            </div>
        </div>
    );
}
