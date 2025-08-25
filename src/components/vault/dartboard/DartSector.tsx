"use client";
import React, { useMemo } from "react";
import { BOARD_COLORS } from "@/lib/dartboardGame";
import { DartSectorProps } from "@/types/dartgame.type";
import {
  calculateTextPosition,
  toRadians,
  fmt,
} from "@/utils/dartgameGeometry";

export default function DartSector({
  config,
  numberValue,
  startAngle,
  endAngle,
  colorIndex,
  highlight,
  onOuterClick,
}: DartSectorProps) {
  const { type, innerRadius, outerRadius } = config;

  // Calculs géométriques (les angles restent en number, normal)
  const angle1Rad = toRadians(startAngle);
  const angle2Rad = toRadians(endAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  // Points du secteur (=> strings stabilisées)
  const points = useMemo(
    () => ({
      inner1: calculateTextPosition(angle1Rad, innerRadius),
      outer1: calculateTextPosition(angle1Rad, outerRadius),
      outer2: calculateTextPosition(angle2Rad, outerRadius),
      inner2: calculateTextPosition(angle2Rad, innerRadius),
    }),
    [angle1Rad, angle2Rad, innerRadius, outerRadius]
  );

  // Couleur du secteur (inchangé)
  const fillColor = useMemo(() => {
    if (highlight) return highlight.color;
    switch (type) {
      case "double":
      case "triple":
        return BOARD_COLORS.special.doubleTriple[colorIndex];
      case "outer":
        return BOARD_COLORS.special.outer;
      default:
        return BOARD_COLORS.alternating[colorIndex];
    }
  }, [highlight, type, colorIndex]);

  // Construction du path SVG avec rayons formatés
  const pathData = useMemo(
    () =>
      [
        `M ${points.inner1.x} ${points.inner1.y}`,
        `L ${points.outer1.x} ${points.outer1.y}`,
        `A ${fmt(outerRadius)} ${fmt(outerRadius)} 0 ${largeArcFlag} 1 ${
          points.outer2.x
        } ${points.outer2.y}`,
        `L ${points.inner2.x} ${points.inner2.y}`,
        `A ${fmt(innerRadius)} ${fmt(innerRadius)} 0 ${largeArcFlag} 0 ${
          points.inner1.x
        } ${points.inner1.y}`,
        "Z",
      ].join(" "),
    [points, innerRadius, outerRadius, largeArcFlag]
  );

  const pathElement = (
    <path d={pathData} fill={fillColor} stroke="#333" strokeWidth="1" />
  );

  if (type === "outer") {
    const midAngle = (angle1Rad + angle2Rad) / 2;
    const textRadius = (innerRadius + outerRadius) / 2;
    const textPos = calculateTextPosition(midAngle, textRadius);

    return (
      <g
        onClick={() => onOuterClick?.(numberValue)}
        className="cursor-pointer transition-all duration-200 hover:brightness-200"
        role="button"
        aria-label={`Cible numéro ${numberValue}`}
      >
        {pathElement}
        <text
          x={textPos.x}
          y={textPos.y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#FFFFFF"
          className="text-sm font-bold select-none pointer-events-none"
        >
          {numberValue}
        </text>
      </g>
    );
  }

  return React.cloneElement(pathElement, {
    key: `${type}-${numberValue}`,
  });
}
