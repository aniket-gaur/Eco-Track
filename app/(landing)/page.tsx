import Header from "@/components/header";
import Slider from "@/components/slider";
import AnimatedSection from "@/components/about"


import { Hero } from "@/components/ui/animated-hero"



export default function HeroDemo() {
    return <>
        <div className="block bg-gray-500 gap-y-5">
            <Header />
            <Hero />

            <div className="gap-y-5 h-[800px]">

                <AnimatedSection />

                <div>
                    <h1 className="text-black text-5xl text-center font-semibold">Our Services</h1>
                    <Slider />

                </div>


            </div>








        </div>

    </>


}

