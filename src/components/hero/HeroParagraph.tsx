"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { paragraphSlideIn } from "@/lib/motionVariants";

export default function HeroParagraph() {
  const t = useTranslations("HomePage");

  return (
    <motion.p
      className="w-full font-orbitron md:text-lg leading-7"
      variants={paragraphSlideIn}
      initial="initial"
      animate="animate"
    >
      {t.rich("description", {
        name: (chunks) => (
          <span className="text-primary font-bold">{chunks}</span>
        ),
      })}
    </motion.p>
  );
}
