"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { City, HouseLine, Train } from "@phosphor-icons/react";

interface LocationCardProps {
  image: string;
  priority: boolean;
}

export default function LocationCard({ image, priority }: LocationCardProps) {
  const t = useTranslations("Location");
  const cardAnimation = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
  };
  const imageAnimation = {
    initial: { opacity: 0, translateY: "50%", scale: 0 },
    animate: { opacity: 1, translateY: "0%", scale: 1 },
  };

  return (
    <div className="relative w-full max-w-md h-118 md:h-136 mt-12 flex flex-col items-center">
      <motion.div
        className="relative w-4/5 h-3/4 p-4 md:p-6 bg-element border border-foreground/5 rounded-2xl shadow-2xl z-0"
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.6 }}
        variants={cardAnimation}
        initial="initial"
        animate="animate"
      >
        <h3 className="absolute top-0 left-1/2 transform -translate-1/2 font-bold font-bebas-neue text-2xl md:text-4xl text-primary text-shadow-xs text-shadow-black">
          {t("title")}
        </h3>
        <ol className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 lg:gap-2 text-pretty text-xs align-text-bottom">
          <li className="location-badge">
            <HouseLine size={20} /> {t("remote")}
          </li>
          <li className="location-badge lg:col-span-2">
            <City size={20} /> {t("hybrid")}
          </li>
          <li className="location-badge lg:col-span-3">
            <Train size={20} /> {t("punctual")}
          </li>
        </ol>
      </motion.div>

      <motion.div
        className="absolute w-full h-full top-[calc(50%+0.75rem)] -translate-y-1/2 lg:top-[calc(25%+1rem)] transform lg:-translate-y-1/4 z-10"
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.3 }}
        variants={imageAnimation}
        initial="initial"
        animate="animate"
      >
        <div className="relative w-full h-full">
          <Image
            className="w-full h-full object-contain drop-shadow-2xl"
            priority={priority}
            src={image}
            alt={t("alt")}
            width={560}
            height={560}
          />
        </div>
      </motion.div>
    </div>
  );
}
