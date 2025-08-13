"use client";
import { cn } from "@/utils/classnames";
import LabCellWrapper from "../LabCellWrapper";

export default function Cassette({ isPlaying }: { isPlaying: boolean }) {
  return (
    <LabCellWrapper bgColor="#A2FF73">
      <div className="cassette-wrapper">
        <div className="cassette-screws">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="screw" />
          ))}
        </div>
        <div className="cassette-screws-t">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="screw" />
          ))}
        </div>

        <div className="cassette-label">
          <span className="border-1 border-gray-700 font-bold text-gray-700 py-0.5 rounded-xs px-1">
            A
          </span>

          <span className="bottom-0.5 absolute left-2 font-black font-space-grotesk text-sm text-gray-700 tracking-tighter">
            STEREO
          </span>

          <div className="arrow"></div>
        </div>

        <div className="cassette-color-bar-t" />
        <div className="cassette-color-bar-b" />

        <div className="cassette-window">
          <div className="reel-container">
            <div className={cn("tape-spoolbar", isPlaying ? "spin" : "")}>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div className={cn("tape-spoolbar", isPlaying ? "spin" : "")}>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>

          <div className="absolute left-2 flex flex-col items-start">
            <span className="font-light tracking-tighter text-[6px]">NR</span>
            <span className="mt-0.5 font-light tracking-tighter leading-1.5 text-[6px] inline-flex items-center gap-0.5">
              <div className="size-1.5 aspect-square border-1"></div>
              Yes
            </span>
            <span className="mt-0.5 font-light tracking-tighter leading-1.5 text-[6px] inline-flex items-center gap-0.5">
              <div className="size-1.5 aspect-square border-1"></div>
              No
            </span>
          </div>
          <div className="absolute right-2 flex flex-col items-end">
            <span className="font-black font-space-grotesk italic text-2xl leading-6">
              90
            </span>
            <span className="font-light tracking-tighter text-[7px]">
              2 X 45 MIN
            </span>
            <span className="font-light tracking-tighter text-[7px]">
              LOW NOISE
            </span>
          </div>
        </div>

        <div className="cassette-ridges" />

        <div className="cassette-footer-bg"></div>
        <div className="cassette-footer"></div>
      </div>
    </LabCellWrapper>
  );
}
