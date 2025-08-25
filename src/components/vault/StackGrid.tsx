import React from "react";
import Image from "next/image";
import { simpleStackData } from "@/lib/stackLogo";

export default function StackGrid() {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 h-fit">
        {simpleStackData.map((logo) => (
          <div
            key={logo.id}
            className="relative size-24 p-3 bg-element rounded-md shadow-md hover:shadow-xl duration-150"
          >
            <Image src={logo.url} alt={logo.title} width={56} height={56} />
            <span className="absolute bottom-1.5 right-2 text-center text-alternative font-bebas-neue leading-4">
              {logo.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
