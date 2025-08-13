"use client";
import { motion } from "framer-motion";

export default function PlayBtn({
  play,
  isPlaying,
}: {
  play: () => void;
  isPlaying: boolean;
}) {
  const playVariants = {
    pressed: {
      top: "-0.25rem",
      height: "0.25rem",
    },
    released: {
      top: "-1rem",
      height: "1rem",
    },
  };
  return (
    <motion.div
      onClick={play}
      className="walkman-button"
      variants={playVariants}
      animate={isPlaying ? "pressed" : "released"}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ cursor: "pointer", userSelect: "none" }}
    />
  );
}
