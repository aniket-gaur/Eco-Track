// components/AnimatedHeroSection.js
'use client';
import { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const AnimatedHeroSection = () => {
    const controls = useAnimation();
    const heroRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start('visible');
                } else {
                    controls.start('hidden');
                }
            },
            { rootMargin: '-100px' }
        );

        if (heroRef.current) {
            observer.observe(heroRef.current);
        }

        return () => {
            if (heroRef.current) {
                observer.unobserve(heroRef.current);
            }
        };
    }, [controls]);

    return (
        <section ref={heroRef} className="relative bg-[#E6E6E6] py-20 h-full overflow-hidden">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                {/* Left Content */}
                <motion.div
                    className="md:w-1/2 p-6"
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { x: -100, opacity: 0 },
                        visible: { x: 0, opacity: 1, transition: { duration: 1 } },
                    }}
                >
                    <img src="\herosectionmain.jpg" alt="Left Image" className="w-full" />
                </motion.div>

                {/* Right Content */}
                <motion.div
                    className="md:w-1/2 p-4 text-center md:text-left"
                    initial="hidden"
                    animate={controls}
                    variants={{
                        hidden: { x: 100, opacity: 0 },
                        visible: { x: 0, opacity: 1, transition: { duration: 1 } },
                    }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">Your Eco-Friendly</h2>
                    <p className="text-lg md:text-xl mb-6">
                        Experience the Future of Waste Management with Our Innovative Track and Discover How It Can Benefit Your Community.
                    </p>
                    <button className="bg-green-700   px-6 py-3 rounded-full hover:bg-green-800 gap-2   text-white  cursor-pointer">
                        Explore Solutions
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default AnimatedHeroSection;

