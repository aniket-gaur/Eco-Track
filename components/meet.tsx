"use client";

import Image from "next/image";
import PhotoSection from "./slider";

const MeetTheTeam = () => {
    return (
        <section className="relative bg-[#E6E6E6] py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800">Empowering Eco-Champions</h2>
                <p className="text-black mt-2 max-w-2xl mx-auto">
                    Join our community of eco-champions and become a catalyst for positive change in your local area.
                </p>
                <button className="mt-6 px-6 py-2 bg-green-700  rounded-full hover:bg-green-800 gap-2   text-white  cursor-pointer">
                    Learn How
                </button>

                {/* Team Members Section */}
                <PhotoSection />
            </div>


        </section>
    );
};

export default MeetTheTeam;
