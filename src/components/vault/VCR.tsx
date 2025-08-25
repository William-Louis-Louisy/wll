"use client";

import React, { useState } from "react";
import {
  EjectSimple,
  FastForward,
  Pause,
  Play,
  Power,
  Rewind,
} from "@phosphor-icons/react";
import { cn } from "@/utils/classnames";
import LgCompany from "../svg/LgCompany";
import VhsPalSecam from "../svg/VhsPalSecam";
import LabCellWrapper from "../LabCellWrapper";
import styles from "../../styles/VCR.module.css";

const screenLabels = ["power", "cst.in", "vcr", "rec", "timer", "standby"];

export default function VCR({
  play,
  pause,
  stop,
}: {
  play: () => void;
  pause: () => void;
  stop: () => void;
}) {
  const [screen, setScreen] = useState({
    power: false,
    isStopped: true,
    prog: 1,
    isPlaying: false,
    isRewinding: false,
    isFastForwarding: false,
    isPaused: false,
    cstIn: false,
    vcr: false,
    rec: false,
    timer: false,
    standby: false,
  });

  const handlePlay = () => {
    if (screen.power) {
      play();
    }
  };

  const handlePause = () => {
    if (screen.power) {
      pause();
    }
  };

  const handleStop = () => {
    if (screen.power) {
      stop();
    }
  };

  return (
    <LabCellWrapper bgColor="#73D0FF">
      <div className={styles.vcrFace}>
        {/* Power Button */}
        <div
          className={styles.pwrBtn}
          title="Power"
          onClick={() => setScreen({ ...screen, power: !screen.power })}
        >
          <div className={styles.powerLabel}>
            <Power size={4} weight="bold" />
          </div>
          <div className={styles.btnDivider}></div>
        </div>

        {/* Stop Button */}
        <button
          title="Stop/Eject"
          className={styles.stpBtn}
          onClick={handleStop}
        >
          <div className={styles.btnDivider}>
            <div className={styles.stopLabel}>
              <div className={styles.stopSquare} />/
              <EjectSimple size={3} weight="fill" />
            </div>
          </div>
        </button>

        {/* Prog Buttons */}
        <div className={styles.progContainer}>
          <div className={styles.progLabel}>
            <div className={cn(styles.progTriangle, styles.rotate90)} /> PROG{" "}
            <div className={cn(styles.progTriangle, styles.rotateNeg90)} />
          </div>
          <div title="Prog Down" className={styles.downBtn}>
            <div className={styles.btnDivider}></div>
          </div>
          <div title="Prog Up" className={styles.upBtn}>
            <div className={styles.btnDivider}></div>
          </div>
        </div>

        {/* Rec & Pause Buttons */}
        <div className={styles.recContainer}>
          <div className={styles.recLabelText}>
            <div className={cn(styles.recLabel, styles.rotate90)} /> REC
          </div>
          <div title="Record" className={styles.recBtn}>
            <div className={styles.recRelief}></div>
          </div>
          <button
            title="Pause"
            className={styles.pauseBtn}
            onClick={handlePause}
          >
            <div className={styles.pauseLabel}>
              <Pause size={3} weight="fill" />
            </div>
            <div className={styles.btnDivider}></div>
          </button>
        </div>

        {/* RGB Bar */}
        <div className={styles.rgbBg}>
          <div className={styles.rgbBar}></div>
        </div>

        {/* Tank */}
        <div className={styles.tapeTank}>
          <LgCompany classnames="absolute top-0 left-18.5" />
          <p className={styles.tankLabel}>
            NTSC Playback - Long Play & Rec - Easy Graphic Menu - Video Doctor
          </p>
          <div className={styles.tankAngle}></div>
        </div>

        {/* Screen */}
        <div className={styles.vcrScreen}>
          <span className={styles.vcrModel}>MG25</span>
          {/* Screen Grid */}
          <div className={styles.screenGrid}>
            {screenLabels.map((label) => (
              <span className={styles.screenLabel} key={label}>
                {label}
              </span>
            ))}
            <span
              className={cn(styles.vcrLed, screen.power ? styles.vcrLedOn : "")}
            ></span>
            <span
              className={cn(styles.vcrLed, screen.cstIn ? styles.vcrLedOn : "")}
            ></span>
            <span
              className={cn(styles.vcrLed, screen.vcr ? styles.vcrLedOn : "")}
            ></span>
            <span
              className={cn(styles.vcrLed, screen.rec ? styles.vcrLedOn : "")}
            ></span>
            <span
              className={cn(styles.vcrLed, screen.timer ? styles.vcrLedOn : "")}
            ></span>
            <span
              className={cn(
                styles.vcrLed,
                screen.standby ? styles.vcrLedOn : ""
              )}
            ></span>
          </div>
        </div>

        <div className={styles.playingContainer}>
          <div className={styles.secCircle}>
            <div className={styles.terCircle}>
              <div className={styles.quartCircle}>
                <svg
                  className={styles.rotate90}
                  style={{ position: "absolute" }}
                  viewBox="0 0 52 52"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#616162" />
                      <stop offset="100%" stopColor="#59595a" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M26,26 L26,0 A26,26 0 0,1 44.384,7.616 Z"
                    fill="url(#gradient2)"
                    stroke="#0f0f0f"
                    strokeWidth="0.5px"
                  />
                </svg>
                <svg
                  className={styles.rotateNeg135}
                  style={{ position: "absolute" }}
                  viewBox="0 0 52 52"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient
                      id="gradient2"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#616162" />
                      <stop offset="100%" stopColor="#59595a" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M26,26 L26,0 A26,26 0 0,1 44.384,7.616 Z"
                    fill="url(#gradient2)"
                    stroke="#0f0f0f"
                    strokeWidth="0.5px"
                  />
                </svg>
                <div className={styles.quintCircle}>
                  <div className={styles.sixthCircle}>
                    <button className={styles.vcrPlayBtn} onClick={handlePlay}>
                      <Play size={6} color="#0f0f0f" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Rewind
            className={styles.rewindBtn}
            size={6}
            color="#0f0f0f"
            weight="fill"
          />
          <FastForward
            className={styles.fastForwardBtn}
            size={6}
            color="#0f0f0f"
            weight="fill"
          />
        </div>

        <div className={styles.stickerContainer}>
          <div className={styles.clpSticker}>Crystal Live Picture</div>
        </div>

        <VhsPalSecam classnames="absolute z-10 bottom-1.5 right-1" />

        {/* Angles */}
        <div className={styles.vcrAngleTop}></div>
        <div className={styles.vcrAngleMid}></div>
        <div className={styles.vcrAngleBottom}></div>
      </div>
    </LabCellWrapper>
  );
}
