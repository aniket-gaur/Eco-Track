

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
                <main className="p-6 flex-1 bg-white">{children}</main>
            </div>
        </div>
    );
}
