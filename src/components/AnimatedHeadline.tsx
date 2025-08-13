"use client";
import { motion } from "framer-motion";

export default function AnimatedHeadline({
  sentence,
  onComplete,
}: {
  sentence: string;
  onComplete: () => void;
}) {
  const words = sentence.split(" ");
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.5,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, rotateX: 90 },
    show: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "tween",
        duration: 0.3, // ⌛ chaque mot/caractère s’anime en 0.3 s
        ease: [0.4, 0.0, 0.2, 1], // ou "easeOut", etc.
      },
    },
  };

  return (
    <motion.h2
      className="max-w-3xl flex flex-wrap"
      data-text={sentence}
      variants={container}
      initial="hidden"
      animate="show"
      style={{ whiteSpace: "normal" }}
      onAnimationComplete={onComplete}
    >
      {words.map((word, wi) => (
        <motion.span key={wi} className="inline-block mr-4" variants={child}>
          {Array.from(word).map((char, i) => (
            <motion.span key={i} variants={child}>
              {char}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.h2>
  );
}
