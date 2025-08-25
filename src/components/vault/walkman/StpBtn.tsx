"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../../styles/Walkman.module.css";

export default function StpBtn({ stop }: { stop: () => void }) {
  const [isStopPressed, setIsStopPressed] = useState(false);
  const stopVariants = {
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
      onPointerDown={() => setIsStopPressed(true)}
      onPointerUp={() => {
        setIsStopPressed(false);
        stop();
      }}
      onPointerLeave={() => setIsStopPressed(false)}
      className={styles.walkmanStop}
      variants={stopVariants}
      animate={isStopPressed ? "pressed" : "released"}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{ cursor: "pointer", userSelect: "none" }}
    />
  );
}
