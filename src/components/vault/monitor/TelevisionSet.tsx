import MonitorScreen from "./MonitorScreen";
import MonitorControls from "./MonitorControls";
import LabCellWrapper from "../../LabCellWrapper";
import styles from "../../../styles/TelevisionSet.module.css";
import React, { RefObject, useCallback, useState } from "react";

export default function TelevisionSet({
  isVideoDisplayed,
  videoRef,
}: {
  isVideoDisplayed: boolean;
  videoRef?: RefObject<HTMLVideoElement | null> | null;
}) {
  const [isMuted, setIsMuted] = useState(false);
  const [isPowered, setIsPowered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMessageVisible, setIsMessageVisible] = useState(false);
  const [volume, setVolume] = useState(0.5);

  const adjustVolume = (change: number) => {
    setVolume((prevVolume) => {
      // Limit volume between 0 and 1
      const newVolume = Math.max(0, Math.min(1, prevVolume + change));

      // If volume is greater than 0 and is muted, desactivate the mute mode
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }

      // If volume is 0 and is not muted, activate the mute mode
      if (newVolume === 0 && !isMuted) {
        setIsMuted(true);
      }

      return newVolume;
    });
  };

  // "No Signal" function
  const noSignal = useCallback(() => {
    setIsMessageVisible(true);
    setTimeout(() => setIsMessageVisible(false), 3000);
  }, []);

  return (
    <LabCellWrapper bgColor="#8A73FF">
      <div className={styles["monitor"]}>
        <MonitorScreen
          powered={isPowered}
          muted={isMuted}
          menuOpen={isMenuOpen}
          messageVisible={isMessageVisible}
          isVideoDisplayed={isVideoDisplayed}
          videoRef={videoRef}
          volume={volume}
        />
        <MonitorControls
          powered={isPowered}
          setPowered={setIsPowered}
          muted={isMuted}
          setMuted={setIsMuted}
          menuOpen={isMenuOpen}
          setMenuOpen={setIsMenuOpen}
          triggerNoSignal={noSignal}
          adjustVolume={adjustVolume}
        />
      </div>
    </LabCellWrapper>
  );
}
