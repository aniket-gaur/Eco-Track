"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const features = [
    {
        title: "Eco-Friendly App",
        description:
            "Discover how our user-friendly app can streamline your waste management, empowering you to make a real impact.",
        buttonText: "Download Now",
        icon: "/icons/eco-app.svg", // Replace with actual icon path
    },
    {
        title: "Green Icon",
        description:
            "Our intuitive app features make recycling and composting a breeze, helping you adopt sustainable habits.",
        buttonText: "Learn More",
        icon: "/icons/green-icon.svg", // Replace with actual icon path
    },
    {
        title: "App Icon",
        description:
            "Stay connected with our app and join the movement towards a cleaner, greener world.",
        buttonText: "Get the App",
        icon: "/icons/app-icon.svg", // Replace with actual icon path
    },
];

const AboutSection = () => {
    return (
        <section className="bg-[#fdf9f0] py-16">
            <div className="container mx-auto text-center">
                {/* Title */}
                <h2 className="text-3xl font-bold text-gray-800">
                    Empowering Sustainable Communities
                </h2>
                <p className="text-lg text-gray-600 mt-3 max-w-2xl mx-auto">
                    Our mission is to revolutionize waste management by providing
                    innovative and eco-friendly solutions that help communities.
                </p>

                {/* Card Section */}
                <div className="flex flex-wrap justify-center gap-8 mt-12">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.2 }} // Pop-up effect on hover
                            transition={{ type: "spring", stiffness: 150 }}
                        >
                            <Card className="w-80 p-6 shadow-lg bg-white text-center">
                                <CardContent className="flex flex-col items-center space-y-4">
                                    <img
                                        src={feature.icon}
                                        alt={feature.title}
                                        className="w-12 h-12 bg-green-700 p-2 rounded-md"
                                    />
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-500">{feature.description}</p>
                                    <button className="text-green-700 font-semibold">
                                        {feature.buttonText}
                                    </button>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
