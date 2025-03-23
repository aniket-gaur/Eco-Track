"use client";

import { motion } from "framer-motion";
import { ArrowRight, MoveRight } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function CustomButton() {
    return (


        <Link href="/dashboard">

            {/* <button className="relative flex items-center gap-1 px-4 py-2 bg-green-600 text-white text-lg font-semibold rounded-lg transition-all duration-300 hover:bg-green-850 cursor-pointer">
                Dashboard
                <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }} // Full 360-degree spin on hover
                    transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth animation
                >
                    <ArrowRight size={18} />
                </motion.span>
            </button> */}

            <Button size="lg" className="gap-2 bg-green-700 text-white hover:bg-green-800 cursor-pointer">
                DashBoard
                <motion.span
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }} // Full 360-degree spin on hover
                    transition={{ duration: 0.4, ease: "easeInOut" }} // Smooth animation
                >
                    <ArrowRight size={18} />
                </motion.span>
            </Button>


        </Link>

    );
}
