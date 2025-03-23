'use client';
import { Button } from "./ui/button";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function HeroSection() {
    const [titleNumber, setTitleNumber] = useState(0);
    const titles = useMemo(() => ["amazing", "new", "wonderful", "efficient", "smart"], []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setTitleNumber((prev) => (prev === titles.length - 1 ? 0 : prev + 1));
        }, 2000);
        return () => clearTimeout(timeoutId);
    }, [titleNumber, titles]);

    return (
        <section className="relative bg-[#2F4F2F] min-h-max overflow-hidden">
            {/* Light Effect */}
            <div className="absolute -top-16 left-1/3 h-50 w-50 bg-green-400 opacity-30 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-16 right-1/4 h-32 w-32 bg-green-500 opacity-30 blur-2xl rounded-full"></div>

            <div className="w-full relative z-10">
                <div className="container mx-auto">
                    <div className="flex gap-6 py-8 lg:py-32 items-center justify-center flex-col">
                        <div>
                            <Button variant="secondary" size="sm" className="gap-4">
                                Read our launch article <MoveRight className="w-4 h-4" />
                            </Button>
                        </div>
                        <div className="flex gap-4 flex-col">
                            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
                                <span className="text-spektr-cyan-50">This is something</span>
                                <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                                    &nbsp;
                                    {titles.map((title, index) => (
                                        <motion.span
                                            key={index}
                                            className="absolute font-semibold text-gray-200"
                                            initial={{ opacity: 0, y: "-100" }}
                                            transition={{ type: "spring", stiffness: 50 }}
                                            animate={
                                                titleNumber === index
                                                    ? {
                                                        y: 0,
                                                        opacity: 1,
                                                    }
                                                    : {
                                                        y: titleNumber > index ? -150 : 150,
                                                        opacity: 0,
                                                    }
                                            }
                                        >
                                            {title}
                                        </motion.span>
                                    ))}
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white max-w-2xl text-center">
                                The concept of Smart Waste Management is revolutionizing urban sanitation by
                                connecting citizens directly with garbage managers through intelligent systems.
                            </p>
                        </div>
                        <div className="flex flex-row gap-3">
                            <Link href="/sign-in">
                                <Button size="lg" className="gap-4 hover:bg-gray-400 cursor-pointer" variant="outline">
                                    Login
                                </Button>

                            </Link>
                            <Link href="/sign-up">

                                <Button size="lg" className="gap-2 bg-green-700 text-white hover:bg-green-800 cursor-pointer">
                                    Sign up here <MoveRight className="w-4 h-4" />
                                </Button>
                            </Link>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
