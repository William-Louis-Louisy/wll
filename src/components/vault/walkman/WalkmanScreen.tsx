import { cn } from "@/utils/classnames";
import { MusicNoteSimple, Play } from "@phosphor-icons/react";
import React from "react";

export default function WalkmanScreen({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="screen-container-border">
      <div className="screen-container">
        {/* Screen */}
        <div
          className={cn(
            "walkman-screen relative",
            isPlaying
              ? "bg-primary inset-shadow-orange-800"
              : "bg-yellow-900 inset-shadow-yellow-950"
          )}
        >
          {/* Screen Text */}
          {isPlaying && (
            <>
              <div className="screen-text">
                <Play size={12} />
                <span className="font-orbitron font-light text-[10px] text-yellow-900">
                  PLAY
                </span>
              </div>

              <MusicNoteSimple
                size={6}
                className="absolute top-[3px] left-[3px] "
              />

              <span className="absolute top-[3px] right-[3px] font-orbitron font-medium text-[6px] leading-1.5 text-yellow-900">
                Side A
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
