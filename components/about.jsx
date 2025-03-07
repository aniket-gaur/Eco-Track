// components/AnimatedSection.js
"use client";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const AnimatedSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const variants = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
    hidden: { opacity: 0, x: "-100%" },
  };

  const variantsRight = {
    visible: { opacity: 1, x: 0, transition: { duration: 0.9 } },
    hidden: { opacity: 0, x: "100%" },
  };

  return (
    <div ref={ref} className="relative overflow-hidden h-96">
      <motion.div
        variants={variants}
        initial="hidden"
        animate={controls}
        className="absolute left-0 top-0 w-1/2 h-[800px] bg-blue-200 p-5"
      >
        Left Content
      </motion.div>
      <motion.div
        variants={variantsRight}
        initial="hidden"
        animate={controls}
        className="absolute right-0 top-0 w-1/2 h-[800px] 
         bg-red-200 p-5"
      >
        Right Content
      </motion.div>
    </div>
  );
};

export default AnimatedSection;
