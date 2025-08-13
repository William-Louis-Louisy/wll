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
import LgCompany from "../svg/LgCompany";
import VhsPalSecam from "../svg/VhsPalSecam";
import { cn } from "@/utils/classnames";

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
    <div className="flex items-center justify-center aspect-square bg-[#73D0FF]">
      <div className="vcr-face">
        {/* Power Button */}
        <div
          className="pwr-btn"
          title="Power"
          onClick={() => setScreen({ ...screen, power: !screen.power })}
        >
          <div className="absolute -top-[5px] text-[4px] text-[#0f0f0f] flex items-center">
            <Power size={4} weight="bold" />
          </div>
          <div className="h-[0.5px] w-full bg-[#333333]"></div>
        </div>
        {/* Stop Button */}
        <button title="Stop/Eject" className="stp-btn" onClick={handleStop}>
          <div className="h-[0.5px] w-full bg-[#333333]">
            <div className="absolute -top-[5.5px] left-1 text-[4px] text-[#0f0f0f] flex gap-px items-center">
              <div className="size-[2.5px] bg-[#0f0f0f]" />/
              <EjectSimple size={3} weight="fill" />
            </div>
          </div>
        </button>
        {/* Prog Buttons */}
        <div className="prog-container">
          <div className="absolute -top-[5px] left-1 text-[3px] text-[#0f0f0f] flex items-center gap-px">
            <div className="prog-triangle rotate-90" /> PROG{" "}
            <div className="prog-triangle -rotate-90" />
          </div>
          <div title="Prog Down" className="down-btn">
            <div className="h-[0.5px] w-full bg-[#333333]"></div>
          </div>
          <div title="Prog Up" className="up-btn">
            <div className="h-[0.5px] w-full bg-[#333333]"></div>
          </div>
        </div>
        {/* Rec & Pause Buttons */}
        <div className="rec-container">
          <div className="absolute -top-[5px] -left-px text-[3px] text-[#0f0f0f] flex items-center gap-px">
            <div className="rec-label rotate-90" /> REC
          </div>
          <div title="Record" className="rec-btn">
            <div className="rec-relief"></div>
          </div>
          <button title="Pause" className="pause-btn" onClick={handlePause}>
            <div className="absolute -top-[5px] right-[6px] text-[3px] text-[#0f0f0f] flex items-center gap-px">
              <Pause size={3} weight="fill" />
            </div>
            <div className="h-[0.5px] w-full bg-[#333333]"></div>
          </button>
        </div>

        {/* RGB Bar */}
        <div className="rgb-bg">
          <div className="rgb-bar"></div>
        </div>

        {/* Tank */}
        <div className="tape-tank">
          <LgCompany classnames="absolute top-0 left-18.5" />
          <p className="tank-label">
            NTSC Playback - Long Play & Rec - Easy Graphic Menu - Video Doctor
          </p>
          <div className="tank-angle"></div>
        </div>

        {/* Screen */}
        <div className="vcr-screen">
          <span className="vcr-model">MG25</span>
          {/* Screen Grid */}
          <div className="screen-grid ml-5.5 mt-1.5 mr-8 grid grid-cols-6 gap-y-px justify-items-center p-px">
            {screenLabels.map((label) => (
              <span className="screen-label text-[2px] uppercase" key={label}>
                {label}
              </span>
            ))}
            <span
              className={cn("vcr-led", screen.power ? "vcr-led-on" : "")}
            ></span>
            <span
              className={cn("vcr-led", screen.cstIn ? "vcr-led-on" : "")}
            ></span>
            <span
              className={cn("vcr-led", screen.vcr ? "vcr-led-on" : "")}
            ></span>
            <span
              className={cn("vcr-led", screen.rec ? "vcr-led-on" : "")}
            ></span>
            <span
              className={cn("vcr-led", screen.timer ? "vcr-led-on" : "")}
            ></span>
            <span
              className={cn("vcr-led", screen.standby ? "vcr-led-on" : "")}
            ></span>
          </div>
        </div>

        <div className="playing-container">
          <div className="sec-circle">
            <div className="ter-circle">
              <div className="quart-circle">
                <svg
                  className="absolute rotate-90"
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
                    fill="url(#gradient)"
                    stroke="#0f0f0f"
                    strokeWidth="0.5px"
                  />
                </svg>
                <svg
                  className="absolute -rotate-135"
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
                    fill="url(#gradient)"
                    stroke="#0f0f0f"
                    strokeWidth="0.5px"
                  />
                </svg>
                <div className="quint-circle">
                  <div className="sixth-circle">
                    <button className="vcr-play-btn" onClick={handlePlay}>
                      <Play size={6} color="#0f0f0f" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Rewind
            className="absolute z-50 top-7.5 left-[5px] cursor-pointer"
            size={6}
            color="#0f0f0f"
            weight="fill"
          />
          <FastForward
            className="absolute z-50 top-7.5 right-[5px] cursor-pointer"
            size={6}
            color="#0f0f0f"
            weight="fill"
          />
        </div>

        <div className="sticker-container">
          <div className="clp-sticker">Crystal Live Picture</div>
        </div>

        <VhsPalSecam classnames="absolute z-10 bottom-1.5 right-1" />

        {/* Angles */}
        <div className="vcr-angle-top"></div>
        <div className="vcr-angle-mid"></div>
        <div className="vcr-angle-bottom"></div>
      </div>
    </div>
  );
}
