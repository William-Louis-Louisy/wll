import React from "react";
import {
  List,
  Plus,
  Minus,
  Power,
  Triangle,
  SpeakerSimpleSlash,
} from "@phosphor-icons/react";
import { cn } from "@/utils/classnames";
import styles from "../../../styles/TelevisionSet.module.css";

export default function MonitorControls({
  powered,
  setPowered,
  muted,
  setMuted,
  menuOpen,
  setMenuOpen,
  triggerNoSignal,
  adjustVolume,
}: {
  powered: boolean;
  setPowered: (value: boolean) => void;
  muted: boolean;
  setMuted: (value: boolean) => void;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
  triggerNoSignal: () => void;
  adjustVolume: (change: number) => void;
}) {
  return (
    <div className={styles["monitor-controls"]}>
      {/* Power + LED */}
      <div className={styles["controls-row"]}>
        <div className={styles["monitor-power-brd"]}>
          <button
            className={cn(
              styles["monitor-power"],
              powered
                ? styles["monitor-power--on"]
                : styles["monitor-power--off"]
            )}
            onClick={() => setPowered(!powered)}
            aria-label={powered ? "Power Off" : "Power On"}
          >
            <Power color="#0f0f0f" size={12} weight="bold" />
          </button>
        </div>
        <div
          className={cn(
            styles["monitor-led"],
            powered ? styles["monitor-led--on"] : styles["monitor-led--off"]
          )}
        />
      </div>

      {/* Buttons */}
      <div className={styles["controls-row"]}>
        {/* Mute */}
        <button
          className={styles["monitor-btn"]}
          onClick={() => setMuted(!muted)}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          <SpeakerSimpleSlash color="#2e2a25" size={6} weight="bold" />
        </button>

        {/* Menu */}
        <button
          className={styles["monitor-btn"]}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <List color="#2e2a25" size={6} weight="bold" />
        </button>

        {/* Channel */}
        <div className={styles["double-btn"]}>
          <button
            className={styles["monitor-btn"]}
            onClick={triggerNoSignal}
            aria-label="Channel Down"
          >
            <Triangle
              className={styles["rotate-180"]}
              color="#2e2a25"
              size={6}
              weight="fill"
            />
          </button>
          <button
            className={styles["monitor-btn"]}
            onClick={triggerNoSignal}
            aria-label="Channel Up"
          >
            <Triangle color="#2e2a25" size={6} weight="fill" />
          </button>
        </div>

        {/* Volume */}
        <div className={styles["double-btn"]}>
          <button
            className={styles["monitor-btn"]}
            onClick={() => adjustVolume(-0.1)}
            aria-label="Volume Down"
          >
            <Minus color="#2e2a25" size={8} weight="bold" />
          </button>
          <button
            className={styles["monitor-btn"]}
            onClick={() => adjustVolume(0.1)}
            aria-label="Volume Up"
          >
            <Plus color="#2e2a25" size={8} weight="bold" />
          </button>
        </div>
      </div>
    </div>
  );
}
