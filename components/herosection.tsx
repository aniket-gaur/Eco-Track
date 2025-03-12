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
        <section className="bg-[#fdf9f0] py-12">
            <div className="container mr-2 mx-auto flex flex-col md:flex-row items-center gap-8">
                {/* Left Content - Animated Hero Text */}
                <div className="md:w-1/2 text-center md:text-left">
                    <Button variant="secondary" size="sm" className="gap-4  bg-white mb-4">
                        Read our launch article <MoveRight className="w-4 h-4" />
                    </Button>
                    <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter font-regular">
                        <span className="text-green-800">This is something</span>
                        <span className="relative flex w-full justify-start md:pb-4 md:pt-1">
                            &nbsp;
                            {titles.map((title, index) => (
                                <motion.span
                                    key={index}
                                    className="absolute font-semibold"
                                    initial={{ opacity: 0, y: "-100" }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                    animate={{
                                        y: titleNumber === index ? 0 : titleNumber > index ? -150 : 150,
                                        opacity: titleNumber === index ? 1 : 0,
                                    }}
                                >
                                    {title}
                                </motion.span>
                            ))}
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl leading-relaxed tracking-tight max-w-2xl text-green-800">
                        The concept of Smart Waste Management is revolutionizing urban sanitation by
                        connecting citizens directly with garbage managers through intelligent systems.
                    </p>
                    <div className="flex flex-row gap-3 mt-4">
                        <Link href="/sign-in">

                            <Button size="lg" className="gap-4 bg-[#f5e7d3] border-1 border-black hover:bg-[#e9d2b2] cursor-pointer" variant="outline">
                                Login
                            </Button>


                        </Link>
                        <Link href="/sign-up">

                            <Button size="lg" className="gap-4 bg-green-700 text-white hover:bg-green-800 cursor-pointer">
                                Sign up here <MoveRight className="w-4 h-4" />
                            </Button>

                        </Link>


                    </div>
                </div>

                {/* Right Image */}
                <div className="md:w-1/2">
                    <img src="/Screenshot 2025-03-08 010937.png" alt="Eco-friendly waste management" className="w-full" />
                </div>
            </div>
        </section>
    );
}
