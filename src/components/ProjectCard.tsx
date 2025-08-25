"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/classnames";
import { Project } from "@/types/projects.type";
import { ArrowRight } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";

interface ProjectCardProps {
  project: Project;
}

const imageVariants = {
  initial: {
    flex: 1,
    zIndex: 1,
  },
  hover: {
    flex: 16,
    zIndex: 5,
    transition: {
      type: "tween",
      stiffness: 200,
      damping: 50,
      mass: 1,
    },
  },
  hoverMobile: {
    flex: 1,
    zIndex: 5,
    scale: 0.98,
    transition: {
      type: "tween",
      stiffness: 200,
      damping: 50,
      mass: 1,
    },
  },
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const currentLocale = useLocale();
  const t = useTranslations("Projects");
  const images = project.images?.slice(0, 3) || [];

  const isReactNative = project.stack.some(
    (stack) => stack.name === "React Native"
  );

  const hasMultipleImages = images.length > 1;

  return (
    <div className="relative min-h-page w-full grid grid-cols-1 lg:grid-cols-3 items-center">
      <div
        className="
          relative h-72 w-full lg:hidden
          flex flex-nowrap gap-2
          overflow-x-auto snap-x snap-mandatory
          lg:scrollbar-none
        "
      >
        {images.map((src, idx) => (
          <div
            key={`project-pics-${idx}`}
            className="relative overflow-hidden w-full flex-shrink-0 snap-start"
          >
            <Image
              src={src}
              alt={`${project.name} image ${idx + 1}`}
              fill
              className="object-contain"
              priority={idx === 0}
            />
          </div>
        ))}
      </div>
      <motion.div
        className="relative h-80 max-h-192 lg:h-full w-full lg:col-span-2 hidden lg:flex gap-2"
        layout
      >
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden w-full shadow"
            layout
            variants={imageVariants}
            initial="initial"
            whileHover={isReactNative ? "hoverMobile" : "hover"}
          >
            <Image
              src={src}
              alt={`${project.name} image ${idx + 1}`}
              fill
              className={cn(
                "duration-700",
                hasMultipleImages
                  ? "object-contain lg:object-cover object-left hover:object-center"
                  : "object-contain object-center"
              )}
              priority={idx === 0}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Description du projet */}
      <div className="flex flex-col items-start justify-center gap-4 px-4 lg:pl-6 lg:col-span-1 mt-4 lg:mt-0 mb-8 lg:mb-0">
        <p className="font-bold text-xl">{project.name}</p>
        <p className="font-medium text-pretty">
          {currentLocale === "en"
            ? project.short_description
            : project.short_description_fr}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          {project.stack.map((stack) => (
            <div
              key={stack._id}
              className="flex items-center gap-1 bg-element p-1 rounded-md"
            >
              {stack.icon && (
                <Image
                  className="object-cover"
                  src={stack.icon}
                  alt={stack.name}
                  width={24}
                  height={24}
                />
              )}
              <p className="text-xs">{stack.name}</p>
            </div>
          ))}
        </div>
        {project.link && (
          <div className="inline-flex w-full justify-end">
            <Link
              href={project.link}
              className="inline-flex items-center gap-2 mt-4 px-8 py-2.5 bg-primary text-background text-sm font-semibold rounded-md hover:bg-secondary duration-300 ease-in-out transition-colors"
            >
              {t("visit")} <ArrowRight size={18} weight="bold" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
