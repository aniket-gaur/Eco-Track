





import Sidebar from "@/components/sidebar";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {

    return (




        <div className="h-full relative  bg-gradient-to-b from-[#173b17] to-[#86bb1d]">
            <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80]">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">

                <main className="p-6 flex-1 md:pl-72">{children}</main>
            </div>
        </div>

    );
}
