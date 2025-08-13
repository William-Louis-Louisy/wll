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
    <div className="monitor-controls">
      {/* Bouton Power + LED */}
      <div className="flex items-center gap-2.5">
        <div className="monitor-power-brd">
          <button
            className={cn(
              "monitor-power",
              powered
                ? "border-0 border-transparent inset-shadow-xs"
                : "border-[0.5px] border-[#0f0f0f]"
            )}
            onClick={() => setPowered(!powered)}
            aria-label={powered ? "Power Off" : "Power On"}
          >
            <Power color="#0f0f0f" size={12} weight="bold" />
          </button>
        </div>
        <div
          className={cn(
            "monitor-led",
            powered
              ? "bg-red-700"
              : "bg-gradient-to-l from-[#616162] to-[#59595a]"
          )}
        ></div>
      </div>
      {/* Secondary Buttons */}
      <div className="flex items-center gap-2.5">
        {/* Mute */}
        <button
          className="monitor-btn"
          onClick={() => setMuted(!muted)}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          <SpeakerSimpleSlash color="#2e2a25" size={6} weight="bold" />
        </button>
        {/* Menu */}
        <button
          className="monitor-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <List color="#2e2a25" size={6} weight="bold" />
        </button>
        {/* Channel */}
        <div className="double-btn">
          <button
            className="monitor-btn"
            onClick={triggerNoSignal}
            aria-label="Channel Down"
          >
            <Triangle
              className="rotate-180"
              color="#2e2a25"
              size={6}
              weight="fill"
            />
          </button>
          <button
            className="monitor-btn"
            onClick={triggerNoSignal}
            aria-label="Channel Up"
          >
            <Triangle color="#2e2a25" size={6} weight="fill" />
          </button>
        </div>
        {/* Volume */}
        <div className="double-btn">
          <button
            className="monitor-btn"
            onClick={() => adjustVolume(-0.1)}
            aria-label="Volume Down"
          >
            <Minus color="#2e2a25" size={8} weight="bold" />
          </button>
          <button
            className="monitor-btn"
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
