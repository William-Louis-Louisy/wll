"use client";

import { cn } from "@/utils/classnames";
import VolumeIndicator from "./VolumeIndicator";
import React, { useEffect, useState } from "react";
import { SpeakerSimpleSlash } from "@phosphor-icons/react";
import styles from "../../../styles/TelevisionSet.module.css";

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
    <div className={styles["monitor-screen"]}>
      {powered && (
        <video
          ref={videoRef}
          className={cn(
            styles["video"],
            isVideoDisplayed
              ? styles["video--visible"]
              : styles["video--hidden"]
          )}
          src={"/video/ina_video.mp4"}
          autoPlay={isVideoDisplayed}
          loop
          muted={muted}
        />
      )}

      {powered && <div className={styles["noise"]} />}

      {powered && (
        <SpeakerSimpleSlash
          weight="bold"
          className={cn(
            styles["mute-icon"],
            muted ? styles["visible"] : styles["hidden"]
          )}
        />
      )}

      {powered && (
        <VolumeIndicator
          volume={volume}
          visible={volumeIndicatorVisible && !muted}
        />
      )}

      {powered && menuOpen && (
        <div className={cn(styles["overlay"], styles["overlay--menu"])}>
          <span>Menu Not Available</span>
        </div>
      )}

      {powered && messageVisible && (
        <div className={cn(styles["overlay"], styles["overlay--message"])}>
          <span>No Signal</span>
        </div>
      )}
    </div>
  );
}
