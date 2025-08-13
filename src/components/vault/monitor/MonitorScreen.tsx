"use client";

import React, { useEffect, useState } from "react";
import { SpeakerSimpleSlash } from "@phosphor-icons/react";
import { cn } from "@/utils/classnames";
import VolumeIndicator from "./VolumeIndicator";

export default function MonitorScreen({
  powered,
  muted,
  menuOpen,
  messageVisible,
  isVideoDisplayed,
  videoRef,
  volume,
}: {
  powered: boolean;
  muted: boolean;
  menuOpen: boolean;
  messageVisible: boolean;
  isVideoDisplayed: boolean;
  videoRef?: React.RefObject<HTMLVideoElement | null> | null;
  volume: number;
}) {
  const [volumeIndicatorVisible, setVolumeIndicatorVisible] = useState(false);

  // Effect pour montrer l'indicateur de volume temporairement quand il change
  useEffect(() => {
    if (!muted) {
      setVolumeIndicatorVisible(true);
      const timer = setTimeout(() => setVolumeIndicatorVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [volume, muted]);

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.volume = volume;
    }
  }, [volume, videoRef]);

  return (
    <div className="monitor-screen">
      {/* Affichage vidéo */}
      {powered && (
        <video
          ref={videoRef}
          className={cn(
            "z-20 absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ease-in-out",
            isVideoDisplayed ? "opacity-100" : "opacity-0"
          )}
          src={"/video/ina_video.mp4"}
          autoPlay={isVideoDisplayed}
          loop
          muted={muted}
        />
      )}
      {/* Noise Effect */}
      {powered && <div className="noise" />}
      {/* Speaker	Icon */}
      {powered && (
        <SpeakerSimpleSlash
          weight="bold"
          className={cn(
            "absolute z-50 bottom-2.5 left-2.5 text-[#6fff00]",
            muted ? "block" : "hidden"
          )}
        />
      )}

      {/* Volume Indicator */}
      {powered && (
        <VolumeIndicator
          volume={volume}
          visible={volumeIndicatorVisible && !muted}
        />
      )}

      {/* Overlay menu */}
      {powered && menuOpen && (
        <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-[#6fff00] text-[#6fff00] text-[6px] uppercase p-2 bg-[#1b1b1b]/90">
          <span>Menu Not Available</span>
        </div>
      )}
      {/* Overlay message */}
      {powered && messageVisible && (
        <div className="absolute z-50 top-2 right-2 text-[#6fff00] text-[6px] uppercase p-2 bg-[#1b1b1b]/90">
          <span>No Signal</span>
        </div>
      )}
    </div>
  );
}
