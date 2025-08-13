"use client";
import { IPad } from "@/lib/padSounds";
import { cn } from "@/utils/classnames";

interface MPCPadProps {
  pad: IPad;
  active: boolean;
  onTrigger: (pad: IPad) => void;
}

export default function MPCPad({ pad, active, onTrigger }: MPCPadProps) {
  return (
    <button
      className={cn(
        "relative size-14 m-1 flex items-center justify-center rounded shadow-md",
        active
          ? "bg-orange-600 text-white scale-95"
          : "bg-neutral-800 text-gray-200 hover:bg-orange-800"
      )}
      onClick={() => onTrigger(pad)}
    >
      <div
        className={cn(
          "absolute text-xs bottom-1 right-2 opacity-50",
          active ? "text-orange-300" : "text-orange-500"
        )}
      >
        {pad.key.toUpperCase()}
      </div>
    </button>
  );
}
