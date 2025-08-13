"use client";

import React from "react";
import StpBtn from "./StpBtn";
import PlayBtn from "./PlayBtn";
import SonyLogo from "./SonyLogo";
import AutoReverse from "./AutoReverse";
import WalkmanLogo from "./WalkmanLogo";
import WalkmanScreen from "./WalkmanScreen";
import { useAudio } from "@/contexts/AudioContext";

export default function Walkman() {
  const { isPlaying, play, stop } = useAudio();

  return (
    <div className="flex items-center justify-center aspect-square bg-[#73FFB9]">
      <div className="walkman-wrapper">
        <StpBtn stop={stop} />
        <PlayBtn play={play} isPlaying={isPlaying} />
        <div className="walkman-display">
          <SonyLogo />
          <AutoReverse />
          <WalkmanScreen isPlaying={isPlaying} />
          <WalkmanLogo />
        </div>
      </div>
    </div>
  );
}
