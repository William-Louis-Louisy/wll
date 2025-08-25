import React from "react";
import { cn } from "@/utils/classnames";
import styles from "../../../styles/Walkman.module.css";
import { MusicNoteSimple, Play } from "@phosphor-icons/react";

export default function WalkmanScreen({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className={styles.screenContainerBorder}>
      <div className={styles.screenContainer}>
        {/* Screen */}
        <div
          className={cn(
            styles.walkmanScreen,
            isPlaying
              ? styles.walkmanScreenPlaying
              : styles.walkmanScreenStopped
          )}
        >
          {/* Screen Text */}
          {isPlaying && (
            <>
              <div className={styles.screenText}>
                <Play size={12} />
                <span className={styles.screenPlayText}>PLAY</span>
              </div>

              <MusicNoteSimple size={6} className={styles.screenMusicIcon} />

              <span className={styles.screenSideText}>Side A</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
