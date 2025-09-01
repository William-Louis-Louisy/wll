"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/utils/classnames";
import { Project } from "@/types/projects.type";
import { ArrowRight } from "@phosphor-icons/react";
import { useLocale, useTranslations } from "next-intl";
import { imageTap, projectImage } from "@/lib/motionVariants";
import React, { useCallback, useEffect, useMemo, useState } from "react";

interface ProjectCardProps {
  project: Project;
}

const arraysEqual = (a: string[], b: string[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

export default function ProjectCard({ project }: ProjectCardProps) {
  const currentLocale = useLocale();
  const t = useTranslations("Projects");
  const images = useMemo(
    () => (project.images ? project.images.slice(0, 3) : []),
    [project.images]
  );
  const isReactNative = useMemo(
    () => project.stack.some((s) => s.name === "React Native"),
    [project.stack]
  );
  const hasMultipleImages = images.length > 1;
  const [orderedImages, setOrderedImages] = useState<string[]>(images);

  useEffect(() => {
    setOrderedImages((prev) => (arraysEqual(prev, images) ? prev : images));
  }, [images]);

  const swapWithFirst = useCallback((index: number) => {
    if (index <= 0) return;
    setOrderedImages((prev) => {
      if (index >= prev.length) return prev;
      const next = [...prev];
      [next[0], next[index]] = [next[index], next[0]];
      return next;
    });
  }, []);

  const onPreviewKeyDown = (index: number) => (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      swapWithFirst(index);
    }
  };

  return (
    <div className="relative min-h-page w-full grid grid-cols-1 lg:grid-cols-3 items-center">
      {/* Mobile version */}
      <div
        className="
          relative h-72 sm:h-full w-full md:hidden
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

      {/* Tablet version */}
      {!isReactNative ? (
        <div className="hidden md:grid lg:hidden w-full gap-2 grid-cols-2">
          {/* Main */}
          {orderedImages[0] && (
            <div className="relative col-span-2 rounded-md overflow-hidden shadow aspect-video">
              <Image
                src={orderedImages[0]}
                alt={`${project.name} image 1`}
                fill
                className="object-contain"
                priority
              />
            </div>
          )}
          {/* Previews */}
          {orderedImages.slice(1).map((src, i) => {
            const realIndex = i + 1;
            return (
              <motion.div
                key={`project-pics-tablet-preview-${realIndex}`}
                role="button"
                tabIndex={0}
                onClick={() => swapWithFirst(realIndex)}
                onKeyDown={onPreviewKeyDown(realIndex)}
                className="relative rounded-md overflow-hidden shadow aspect-video cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Voir l'image ${realIndex + 1} en principal`}
                title="Afficher en principal"
                variants={imageTap}
                initial="initial"
                whileTap="clicked"
              >
                <Image
                  src={src}
                  alt={`${project.name} image ${realIndex + 1}`}
                  fill
                  className={cn(
                    "duration-300",
                    hasMultipleImages ? "object-cover" : "object-contain"
                  )}
                />
              </motion.div>
            );
          })}
        </div>
      ) : (
        // --- React Native project case ---
        <div className="hidden md:flex lg:hidden h-full w-full mt-24 gap-2">
          {images.map((src, idx) => (
            <div
              key={`project-pics-tablet-inline-${idx}`}
              className="relative flex-1 rounded-md overflow-hidden shadow aspect-video"
            >
              <Image
                src={src}
                alt={`${project.name} image ${idx + 1}`}
                fill
                className={cn(
                  hasMultipleImages ? "object-cover" : "object-contain"
                )}
                priority={idx === 0}
              />
            </div>
          ))}
        </div>
      )}

      {/* Desktop version */}
      <motion.div
        className="relative h-80 max-h-192 lg:h-full w-full lg:col-span-2 hidden lg:flex gap-2"
        layout
      >
        {images.map((src, idx) => (
          <motion.div
            key={idx}
            className="relative overflow-hidden w-full shadow"
            layout
            variants={projectImage}
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

      {/* Project description */}
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
