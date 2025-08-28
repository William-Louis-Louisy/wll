"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { pictureRollIn } from "@/lib/motionVariants";

export default function HeroPicture() {
  return (
    <motion.div
      variants={pictureRollIn}
      initial="initial"
      animate="animate"
      className="p-4 md:p-0"
    >
      <Image
        src="https://ucarecdn.com/b8524ef2-ea21-473a-bcc7-414cdf2cc134/avatarWLL.png"
        alt="Photo de l'auteur"
        priority
        width={560}
        height={560}
      />
    </motion.div>
  );
}
