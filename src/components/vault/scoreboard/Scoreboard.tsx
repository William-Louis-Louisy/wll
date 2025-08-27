"use client";
import { FeedbackStatus } from "@/types/dartgame.type";
import { cn } from "@/utils/classnames";
import React from "react";
import LabCellWrapper from "@/components/LabCellWrapper";
interface ScoreboardProps {
  sequenceIndex: number;
  totalSequences: number;
  stepIndex: number;
  totalSteps: number;
  elapsedMs: number;
  running: boolean;
  feedback?: FeedbackStatus;
  onReset?: () => void;
}

function formatTime(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  const tenth = Math.floor((ms % 1000) / 100);
  return `${String(min).padStart(2, "0")}:${String(sec).padStart(
    2,
    "0"
  )}.${tenth}`;
}

export default function Scoreboard({
  sequenceIndex,
  totalSequences,
  stepIndex,
  totalSteps,
  elapsedMs,
  running,
  feedback = "",
  onReset,
}: ScoreboardProps) {
  return (
    <LabCellWrapper bgColor="#FFD073">
      <div
        className={cn(
          "pointer-events-auto select-none",
          "flex flex-col items-center w-85 relative",
          "rounded-md p-4 bg-gradient-to-r from-[#1e1e1e] to-[#2b2b2b] text-white shadow-2xl",
          feedback === "success" && "ring-2 ring-green-500 shadow-green-500",
          feedback === "fail" && "ring-2 ring-red-500 shadow-red-500"
        )}
        aria-label="Scoreboard"
      >
        <span className="absolute top-1.5 left-1/2 transform -translate-x-1/2 px-2 font-bebas-neue text-lg text-center bg-gradient-to-r from-[#1e1e1e] to-[#2b2b2b]">
          DartGame Scoreboard
        </span>

        <div className="flex flex-col items-center w-full rounded-sm p-4 border-2">
          <div className="inline-flex items-center justify-between w-full mt-3">
            {/* SEQ */}
            <div className="inline-flex items-center gap-2">
              <div className="flex flex-col items-center justify-center w-fit gap-0.5">
                <span className="text-[10px] uppercase tracking-widest opacity-70">
                  Seq
                </span>
                <span className="text-2xl text-center font-bold font-orbitron flex items-center justify-center tabular-nums rounded-sm border-2 border-white py-1 px-3 size-13">
                  {sequenceIndex + 1}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center w-fit gap-0.5">
                <span className="text-[10px] uppercase tracking-widest opacity-70">
                  Seqs
                </span>
                <span className="text-2xl text-center font-bold font-orbitron flex items-center justify-center tabular-nums rounded-sm border-2 border-white py-1 px-3 size-13">
                  {totalSequences}
                </span>
              </div>
            </div>

            {/* STEP */}
            <div className="inline-flex items-center gap-2">
              <div className="flex flex-col items-center justify-center w-fit gap-0.5">
                <span className="text-[10px] uppercase tracking-widest opacity-70">
                  Step
                </span>
                <span className="text-2xl text-center font-bold font-orbitron flex items-center justify-center tabular-nums rounded-sm border-2 border-white py-1 px-3 size-13">
                  {stepIndex + 1}
                </span>
              </div>
              <div className="flex flex-col items-center justify-center w-fit gap-0.5">
                <span className="text-[10px] uppercase tracking-widest opacity-70">
                  Steps
                </span>
                <span className="text-2xl text-center font-bold font-orbitron flex items-center justify-center tabular-nums rounded-sm border-2 border-white py-1 px-3 size-13">
                  {totalSteps}
                </span>
              </div>
            </div>
          </div>

          {/* TIMER */}
          <div className="flex flex-col items-center justify-center w-full mt-5 gap-0.5">
            <span className="text-[10px] uppercase tracking-widest opacity-70">
              Time
            </span>
            <span
              className={cn(
                "font-mono tabular-nums",
                "flex items-center justify-start",
                "text-3xl md:text-5xl font-orbitron rounded-sm border-2 border-white w-full py-2 px-3",
                running && "text-primary"
              )}
              aria-live="polite"
              aria-atomic="true"
            >
              {formatTime(elapsedMs)}
            </span>
          </div>

          {/* state line + reset */}
          <div className="col-span-3 mt-5 flex items-center justify-between w-full">
            <div
              className={cn(
                "h-1 w-full rounded",
                feedback === "success" && "bg-green-500",
                feedback === "fail" && "bg-red-500",
                feedback === "" && "bg-white/20"
              )}
              aria-hidden
            />
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="ml-3 rounded-xl px-3 py-1 text-[10px] uppercase font-orbitron font-bold bg-white text-black hover:brightness-95 active:scale-95"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>
    </LabCellWrapper>
  );
}
