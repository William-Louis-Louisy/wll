import React, { RefObject, useCallback, useState } from "react";
import MonitorScreen from "./monitor/MonitorScreen";
import MonitorControls from "./monitor/MonitorControls";

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
      // Limiter le volume entre 0 et 1
      const newVolume = Math.max(0, Math.min(1, prevVolume + change));

      // Si le volume devient > 0 et que la vidéo était muette, désactiver le mode muet
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
      }

      // Si le volume devient 0, activer le mode muet
      if (newVolume === 0 && !isMuted) {
        setIsMuted(true);
      }

      return newVolume;
    });
  };

  // Fonction "No Signal"
  const noSignal = useCallback(() => {
    setIsMessageVisible(true);
    setTimeout(() => setIsMessageVisible(false), 3000);
  }, []);

  return (
    <div className="flex items-center justify-center aspect-square bg-[#8A73FF]">
      <div className="monitor">
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
    </div>
  );
}
