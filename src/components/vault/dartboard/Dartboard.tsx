"use client";
import {
  BOARD_COLORS,
  CONFIG,
  DARTBOARD_NUMBERS,
  SECTOR_CONFIGS,
  BULL_RADII,
} from "@/lib/dartboardGame";
import DartSector from "./DartSector";
import React, { JSX, useMemo } from "react";
import { DartboardProps } from "@/types/dartgame.type";
import { useHighlightMap } from "@/hooks/useHighlightMap";

export default function Dartboard({
  onOuterClick,
  activeStep,
  feedback,
}: DartboardProps): JSX.Element {
  const highlightMap = useHighlightMap(activeStep);

  const sectors = useMemo(() => {
    const result: JSX.Element[] = [];

    DARTBOARD_NUMBERS.forEach((numberValue, index) => {
      const startAngle =
        index * CONFIG.anglePerSection - 90 - CONFIG.anglePerSection / 2;
      const endAngle = startAngle + CONFIG.anglePerSection;
      const colorIndex = index % 2;

      SECTOR_CONFIGS.forEach((config) => {
        const highlight = highlightMap.get(`${numberValue}-${config.type}`);

        result.push(
          <DartSector
            key={`${config.type}-${numberValue}`}
            config={config}
            numberValue={numberValue}
            startAngle={startAngle}
            endAngle={endAngle}
            colorIndex={colorIndex}
            highlight={highlight}
            onOuterClick={config.type === "outer" ? onOuterClick : undefined}
          />
        );
      });
    });

    return result;
  }, [highlightMap, onOuterClick]);

  return (
    <div className="relative w-full h-full">
      {feedback && (
        <div className="absolute z-30 bg-element/75 size-85 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      )}

      <svg
        width={CONFIG.boardRadius * 2}
        height={CONFIG.boardRadius * 2}
        className="absolute flex items-center justify-center z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        role="img"
        aria-label="Cible de fléchettes interactive"
      >
        {sectors}

        {/* Bullseye */}
        <circle
          cx={CONFIG.centerX}
          cy={CONFIG.centerY}
          r={BULL_RADII.bull}
          fill={BOARD_COLORS.special.bullseye}
          stroke="#333"
          strokeWidth="2"
        />
        <circle
          cx={CONFIG.centerX}
          cy={CONFIG.centerY}
          r={BULL_RADII.innerBull}
          fill={BOARD_COLORS.special.innerBull}
          stroke="#333"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
