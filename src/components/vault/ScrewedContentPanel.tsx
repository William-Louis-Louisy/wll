import { stackLogos } from "@/lib/stackLogo";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";

export default function ScrewedContentPanel() {
  return (
    <div className="relative max-3xl:h-84 w-full h-full">
      <div className="absolute inset-0 -mx-px">
        <div className="overflow-hidden bg-[#292929] md:rounded-2xl flex size-full items-center justify-center">
          <div className="size-200 shrink-0 scale-50 sm:scale-75 lg:scale-100">
            <div className="relative grid size-full rotate-x-55 rotate-y-0 -rotate-z-25 grid-cols-3 gap-8 transform-3d">
              {stackLogos.map((column, colIdx) => {
                const isEven = colIdx % 2 === 0;
                const centerOffset = -37.5;

                return (
                  <motion.div
                    key={colIdx}
                    className="flex flex-col gap-8 will-change-transform"
                    initial={{ y: `${centerOffset}%` }}
                    animate={{
                      y: isEven
                        ? [
                            `${centerOffset}%`,
                            `${centerOffset + 15}%`,
                            `${centerOffset}%`,
                            `${centerOffset - 15}%`,
                            `${centerOffset}%`,
                          ]
                        : [
                            `${centerOffset}%`,
                            `${centerOffset - 15}%`,
                            `${centerOffset}%`,
                            `${centerOffset + 15}%`,
                            `${centerOffset}%`,
                          ],
                    }}
                    transition={{
                      duration: 70,
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
    </div>
  );
}
