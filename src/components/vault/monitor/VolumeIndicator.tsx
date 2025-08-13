import React from "react";
import { cn } from "@/utils/classnames";

export default function VolumeIndicator({
  volume,
  visible,
}: {
  volume: number;
  visible: boolean;
}) {
  const activeBarCount = Math.ceil(volume * 10);

  return (
    <div
      className={cn(
        "absolute z-50 bottom-2.5 left-8 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="flex gap-0.5 items-center">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={cn(
              "w-1 h-3 border border-[#6fff00]",
              index < activeBarCount ? "bg-[#6fff00]" : "bg-transparent"
            )}
          />
        ))}
        <span className="text-[#6fff00] text-sm ml-1.5">
          {(volume * 100).toFixed(0)}
        </span>
      </div>
    </div>
  );
}
