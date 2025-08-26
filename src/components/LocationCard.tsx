import React from "react";
import Image from "next/image";

interface LocationCardProps {
  alt: string;
  image: string;
  priority: boolean;
  description: string;
}

export default function LocationCard({
  alt,
  image,
  priority,
  description,
}: LocationCardProps) {
  return (
    <div className="relative w-full max-w-md h-120 mt-12 flex flex-col items-center">
      <div className="relative w-4/5 h-1/2 p-8 md:p-7 bg-element border border-foreground/5 rounded-2xl shadow-2xl z-0">
        <p className="text-pretty font-bebas-neue leading-tight tracking-wide">
          {description}
        </p>
      </div>

      <div className="absolute w-full h-full top-1/2 transform -translate-y-1/2 z-10">
        <div className="relative w-full h-full">
          <Image
            className="w-full h-full object-contain drop-shadow-2xl"
            priority={priority}
            src={image}
            alt={alt}
            width={560}
            height={560}
          />
        </div>
      </div>
    </div>
  );
}
