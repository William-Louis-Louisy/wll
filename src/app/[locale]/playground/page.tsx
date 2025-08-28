"use client";

import React from "react";
import { motion } from "framer-motion";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { Play } from "@phosphor-icons/react";

export default function Playground() {
  const [isAnimated, setIsAnimated] = React.useState(false);

  const handleToggleAnimation = () => {
    setIsAnimated(!isAnimated);
  };
  return (
    <main>
      <MaxWidthWrapper className="relative h-page mt-16 z-10 grid grid-cols-1 place-items-center px-4">
        <motion.button
          className="absolute top-8 right-8 p-3 border border-background rounded-sm bg-foreground text-background cursor-pointer"
          onClick={handleToggleAnimation}
          whileTap={{ scale: 0.87 }}
        >
          <Play size={24} weight="fill" />
        </motion.button>

        <motion.div
          className="bg-violet-500 p-14 rounded-md font-black text-xl"
          initial={{ scaleX: 0 }}
          animate={isAnimated ? { scaleX: 1 } : {}}
          transition={{
            duration: 2,
            ease: "easeInOut",
            stiffness: 31,
            type: "spring",
          }}
          style={{ transformOrigin: "left" }}
        >
          HELLO
        </motion.div>
      </MaxWidthWrapper>
    </main>
  );
}
