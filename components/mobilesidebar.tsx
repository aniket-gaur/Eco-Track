'use client'
import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

import { useEffect, useState } from "react";

import Sidebar from "./sidebar";

export default function MobileSidebar() {
    const [isMounted, setisMounted] = useState(false);
    useEffect(() => {
        setisMounted(true);
    }, [])
    if (!isMounted) {
        return null;
    }
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu />


                </Button>
            </SheetTrigger>
            <SheetContent side={"left"} className="p-1">
                <Sidebar />
            </SheetContent>

        </Sheet>

    );
}