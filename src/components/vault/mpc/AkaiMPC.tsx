"use client";
import { IPad, pads } from "@/lib/padSounds";
import { useEffect, useState } from "react";
import MPCPad from "./MPCPad";
import LabCellWrapper from "@/components/LabCellWrapper";

export default function AkaiMPC() {
  const [activePad, setActivePad] = useState<IPad | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const playSound = (pad: IPad) => {
    const audio = new Audio(pad.sound);
    audio.currentTime = 0;
    audio.play();
    setActivePad(pad);
    setActiveKey(pad.key);
    setTimeout(() => {
      setActiveKey(null);
    }, 150);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const pad = pads.find((p) => p.key === key);
      if (pad) playSound(pad);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <LabCellWrapper bgColor="#A2FF73">
      <div className="flex flex-col justify-between items-center rounded-xl size-85 p-4 bg-gradient-to-r from-[#CED6DE] from-10% via-[#ACBAC8] via-80% to-[#CED6DE] to-95% shadow-2xl">
        <div className="flex flex-col w-full">
          {/* Screen that displays the active pad */}
          <div className="inline-flex items-start justify-between w-full">
            <span className="text-sm text-[#E02B27] font-black">AKAI</span>
            <div className="flex items-center justify-center w-30 rounded-md border-3 border-[#707070]">
              <div className="bg-amber-700 w-full py-1 px-2.5 text-[10px] uppercase text-orange-300 font-orbitron">
                {activePad?.label || "-------"}
              </div>
            </div>
            <span className="text-sm text-[#E02B27] font-bold">MPC</span>
          </div>
        </div>

        <div className="size-fit grid grid-cols-4 gap-0.5">
          {pads.map((pad) => (
            <MPCPad
              key={pad.id}
              pad={pad}
              active={activeKey === pad.key}
              onTrigger={playSound}
            />
          ))}
        </div>
      </div>
    </LabCellWrapper>
  );
}
