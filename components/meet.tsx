"use client";

import Image from "next/image";
import PhotoSection from "./slider";

const MeetTheTeam = () => {
    return (
        <section className="relative bg-[#f5e7d3] py-16">
            <div className="container mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800">Empowering Eco-Champions</h2>
                <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
                    Join our community of eco-champions and become a catalyst for positive change in your local area.
                </p>
                <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                    Learn How
                </button>

                {/* Team Members Section */}
                <PhotoSection />
            </div>


        </section>
    );
};

export default MeetTheTeam;
