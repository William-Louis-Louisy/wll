"use client";

import { motion } from "framer-motion";
import MaxWidthWrapper from "./MaxWidthWrapper";

const getAnimation = (custom: number) => ({
  opacity: 1,
  pathLength: 1,
  y: 0,
  transition: {
    duration: 1.2,
    delay: custom * 0.3,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "reverse" as const,
  },
});

const initial = { opacity: 0, pathLength: 0, y: -20 };

export default function BrandLoader() {
  return (
    <MaxWidthWrapper className="flex flex-col items-center justify-center w-full min-h-page absolute inset-0">
      <motion.svg
        version="1.2"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 463 193"
        height="56"
        initial="initial"
        animate="animate"
      >
        <motion.path
          custom={2}
          initial={initial}
          animate={getAnimation(2)}
          id="triangle"
          fill="var(--primary)"
          d="m384.8 6l-80.8 180-45.9-180z"
        />
        <motion.path
          custom={0}
          initial={initial}
          animate={getAnimation(0)}
          id="bar 1"
          fill="var(--primary)"
          d="m78 6.1l85.4-0.1 46.8 180h-86.6z"
        />
        <motion.path
          custom={1}
          initial={initial}
          animate={getAnimation(1)}
          id="bar 2"
          fill="var(--primary)"
          d="m168 6.1l85.5-0.1 46.7 180h-86.6z"
        />
      </motion.svg>
    </MaxWidthWrapper>
  );
}
