import React from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { stackLogos } from "@/lib/stackLogo";
import StackGrid from "./StackGrid";
import { leftFadeIn } from "@/lib/motionVariants";

// ----- Types -----
type LogoItem = Readonly<{ id: string | number; title: string; url: string }>;
type StackGridData = ReadonlyArray<LogoItem>;
type StackedColumns = ReadonlyArray<StackGridData>;

// ----- Animation constants -----
const DURATION_SECONDS = 70;
const AMPLITUDE = 15;
const CENTER_OFFSET = -37.5;

// Build vertical keyframes depending on column parity.
const getYKeyframes = (
  isEven: boolean,
  center = CENTER_OFFSET,
  amp = AMPLITUDE
): string[] =>
  isEven
    ? [
        `${center}%`,
        `${center + amp}%`,
        `${center}%`,
        `${center - amp}%`,
        `${center}%`,
      ]
    : [
        `${center}%`,
        `${center - amp}%`,
        `${center}%`,
        `${center + amp}%`,
        `${center}%`,
      ];

export default function ScrewedContentPanel() {
  const prefersReducedMotion = useReducedMotion();

  // If the user prefers reduced motion, render the static grid instead of animations.
  if (prefersReducedMotion) {
    return <StackGrid />;
  }

  const logos = stackLogos as StackedColumns;

  return (
    <motion.div
      className="relative h-84 w-full lg:h-full"
      initial="initial"
      whileInView="inView"
      viewport={{ amount: 0.3, once: true }}
      variants={leftFadeIn}
    >
      <div className="absolute inset-x-0 inset-y-0 lg:inset-y-4">
        <div className="flex size-full items-center justify-center overflow-hidden bg-[#292929] md:rounded-2xl">
          <div className="size-200 shrink-0 scale-50 sm:scale-75 lg:scale-100">
            <div className="relative grid size-full rotate-x-55 rotate-y-0 -rotate-z-25 grid-cols-3 gap-8 transform-3d">
              {logos.map((column, colIdx) => {
                const isEven = colIdx % 2 === 0;
                const yKeyframes = getYKeyframes(isEven);

                return (
                  <motion.div
                    key={colIdx}
                    className="flex flex-col gap-8 will-change-transform"
                    initial={{ y: `${CENTER_OFFSET}%` }}
                    animate={{ y: yKeyframes }}
                    transition={{
                      duration: DURATION_SECONDS,
                      ease: "linear",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    {column.map(({ id, title, url }) => (
                      <div
                        key={id}
                        className="relative p-8 aspect-square bg-element rounded-md"
                      >
                        <Image
                          src={url}
                          alt={title}
                          width={168}
                          height={168}
                          sizes="(min-width:1024px) 168px, (min-width:640px) 126px, 96px"
                          unoptimized
                        />
                        <span className="absolute bottom-1.5 right-2 text-center text-alternative font-bebas-neue font-bold leading-8 text-3xl">
                          {title}
                        </span>
                      </div>
                    ))}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
