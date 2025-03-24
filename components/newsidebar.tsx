"use client"
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/nextjs";

import { Montserrat } from "next/font/google";

import Link from "next/link";
import { usePathname } from "next/navigation";




const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });
interface Route {
    label: string;
    href: string;
    color?: string;
    icon: React.ElementType;
}

interface SidebarProps {
    routes: Route[];
}


export default function Sidebar1({ routes }: SidebarProps) {

    const pathnames = usePathname();
    const { isLoaded, isSignedIn, user } = useUser()
    return (
        <div className=" pt-10 w-64 h-screen bg-gradient-to-b from-green-900 to-green-700 text-white p-5 flex flex-col">
            <div className="px-3 py-2 flex-1">
                <Link href='/dashboard' className="flex items-center pl-3 mb-14">

                    <h1 className={cn("text-2xl font-bold", montserrat.className)}>


                        <UserInfo user={user} />
                    </h1>

                </Link>
                <div className="space-y-1 ">
                    {routes.map((route) => {
                        return (<Link href={route.href} key={route.label} className={cn("text-sm group flex p-3 w-70 justify-start font-medium cursor-pointer  hover:text-white hover:bg-white/10 rounded-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100 hover:bg-grey-500 ...", pathnames === route.href ? "text-white bg-white/10" : "text-zinc-400")}>
                            <div className="flex items-center   flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        </Link>)
                    })}


                </div>
            </div>

        </div>

    );
}

const UserInfo = ({ user }: { user: any }) => (
    <div className="flex items-center gap-2  pl-2 border border-gray-300 rounded-lg p-3 bg-green-800/30">
        <UserButton />

        <div className="flex flex-col ">
            <h2 className="font-semibold text-white">{user?.username || "User"}</h2>
            <p className="text-sm text-gray-300">{user?.primaryEmailAddress?.emailAddress || "user@example.com"}</p>
        </div>
    </div>
);