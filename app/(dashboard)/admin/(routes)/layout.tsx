import AdminSidebar from "@/components/admindash";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <AdminSidebar />


            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <header className="bg-white shadow p-4 flex justify-between items-center">
                    <h1 className="text-lg font-semibold">Admin Dashboard</h1>

                </header>

                {/* Page Content */}
                <main className="p-6 flex-1 bg-gray-100">{children}</main>
            </div>
        </div>
    );
}
