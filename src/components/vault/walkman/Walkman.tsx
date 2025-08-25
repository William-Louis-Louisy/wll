"use client";

import React from "react";
import StpBtn from "./StpBtn";
import PlayBtn from "./PlayBtn";
import SonyLogo from "./SonyLogo";
import AutoReverse from "./AutoReverse";
import WalkmanLogo from "./WalkmanLogo";
import WalkmanScreen from "./WalkmanScreen";
import { useAudio } from "@/contexts/AudioContext";
import styles from "../../../styles/Walkman.module.css";
import LabCellWrapper from "@/components/LabCellWrapper";

export default function Walkman() {
  const { isPlaying, play, stop } = useAudio();

  return (
    <LabCellWrapper bgColor="#73FFB9">
      <div className={styles.walkmanWrapper}>
        <StpBtn stop={stop} />
        <PlayBtn play={play} isPlaying={isPlaying} />
        <div className={styles.walkmanDisplay}>
          <SonyLogo />
          <AutoReverse />
          <WalkmanScreen isPlaying={isPlaying} />
          <WalkmanLogo />
        </div>
      </div>
    </LabCellWrapper>
  );
}
