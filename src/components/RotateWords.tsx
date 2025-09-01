"use client";
import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";

interface RotateWordsProps {
  words: string[];
}

export default function RotateWords({ words }: RotateWordsProps) {
  const [index, setIndex] = useState(0);
  const t = useTranslations("Contact");
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 1000);
    // Clean up interval on unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-foreground/65">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="font-bold"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.2 }}
        >
          {t(`cases.${words[index]}`)}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
