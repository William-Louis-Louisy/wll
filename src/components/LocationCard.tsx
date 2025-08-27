"use client";
import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image, { StaticImageData } from "next/image";
import { City, HouseLine, Train } from "@phosphor-icons/react";
import { locationCard, locationImage } from "@/lib/motionVariants";

interface LocationCardProps {
  /** Image source for the illustration (Next static import or URL) */
  image: StaticImageData | string;
  /** Preload the image for above-the-fold usage */
  priority: boolean;
}

export default function LocationCard({ image, priority }: LocationCardProps) {
  const t = useTranslations("Location");

  const badges: Array<{
    key: "remote" | "hybrid" | "punctual";
    icon: React.ReactElement;
    extra?: string;
  }> = [
    { key: "remote", icon: <HouseLine size={20} aria-hidden="true" /> },
    {
      key: "hybrid",
      icon: <City size={20} aria-hidden="true" />,
      extra: "lg:col-span-2",
    },
    {
      key: "punctual",
      icon: <Train size={20} aria-hidden="true" />,
      extra: "lg:col-span-3",
    },
  ];

  return (
    <div className="relative mt-12 flex h-118 w-full max-w-md flex-col items-center md:h-136">
      <motion.div
        className="relative w-4/5 h-3/4 p-4 md:p-6 bg-element border border-foreground/5 rounded-2xl shadow-2xl z-0"
        variants={locationCard}
        initial="initial"
        animate="animate"
      >
        <h3 className="absolute top-0 left-1/2 transform -translate-1/2 font-bold font-bebas-neue text-2xl md:text-4xl text-primary text-shadow-xs text-shadow-black">
          {t("title")}
        </h3>
        <ol className="grid grid-cols-1 grid-rows-3 text-pretty text-xs align-text-bottom lg:grid-cols-3 lg:grid-rows-2 lg:gap-2">
          {badges.map(({ key, icon, extra }) => (
            <li key={key} className={`location-badge ${extra ?? ""}`}>
              {icon} {t(key)}
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div
        className="absolute z-10 h-full w-full transform top-[calc(50%+0.75rem)] -translate-y-1/2 lg:top-[calc(25%+1rem)] lg:-translate-y-1/4"
        variants={locationImage}
        initial="initial"
        animate="animate"
      >
        <div className="relative h-full w-full">
          <Image
            fill
            sizes="(min-width:1024px) 560px, (min-width:768px) 75vw, 90vw"
            className="object-contain drop-shadow-2xl"
            priority={priority}
            src={image}
            alt={t("alt")}
            draggable={false}
          />
        </div>
      </motion.div>
    </div>
  );
}
