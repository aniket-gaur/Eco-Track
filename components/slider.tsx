'use client'

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const photos: string[] = [
    "/images/photo1.jpg",
    "/images/photo2.jpg",
    "/images/photo3.jpg",
    "/images/photo4.jpg",
    "/images/photo5.jpg",
];

export default function PhotoSection() {
    const sliderRef = useRef<HTMLDivElement | null>(null);
    const animationFrameRef = useRef<number | null>(null);

    useEffect(() => {
        const slider = sliderRef.current;
        if (!slider) return;

        const scroll = () => {
            if (slider) {
                slider.scrollLeft += 1;
                if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
                    slider.scrollLeft = 0;
                }
            }
            animationFrameRef.current = requestAnimationFrame(scroll);
        };

        animationFrameRef.current = requestAnimationFrame(scroll);
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <section className="bg-[#f5e7d3] py-10 overflow-hidden">
            <div ref={sliderRef} className="flex space-x-6 px-4 overflow-x-auto scrollbar-hide">
                {photos.concat(photos).map((photo, index) => (
                    <motion.div key={index} className="flex-shrink-0">
                        <Card className="overflow-hidden rounded-2xl shadow-lg w-72">
                            <CardContent className="p-0">
                                <Image
                                    src={photo}
                                    alt={`Photo ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="w-full h-60 object-cover"
                                />
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
