"use client";
import React from "react";
import { motion } from "framer-motion";
import { gradualSpacing } from "@/lib/motionVariants";

export default function GradualSpacingTitle({ text }: { text: string }) {
  return (
    <h1>
      {text.split("").map((char, i) => (
        <motion.span
          variants={gradualSpacing}
          key={i}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.3, delay: i * 0.05 }}
        >
          {char === " " ? <span>&nbsp;</span> : char}
        </motion.span>
      ))}
    </h1>
  );
}
