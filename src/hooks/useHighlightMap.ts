import { useMemo } from "react";
import { Operator, SectionType, Step } from "@/types/dartgame.type";
import { OPERATOR_COLORS, SECTION_ORDER } from "@/lib/dartboardGame";

export const useHighlightMap = (activeStep: Step) => {
  return useMemo(() => {
    if (!activeStep?.segments) return new Map();

    // Association opérateur -> section
    const operatorToSection = new Map<Operator, SectionType>();
    let sectionIndex = 0;

    activeStep.segments.forEach((seg) => {
      if (
        !operatorToSection.has(seg.operator) &&
        sectionIndex < SECTION_ORDER.length
      ) {
        operatorToSection.set(seg.operator, SECTION_ORDER[sectionIndex++]);
      }
    });

    // Construction de la map des highlights
    const highlightMap = new Map<string, { color: string }>();
    activeStep.segments.forEach((seg) => {
      const sectionType = operatorToSection.get(seg.operator);
      if (sectionType) {
        highlightMap.set(`${seg.value}-${sectionType}`, {
          color: OPERATOR_COLORS[seg.operator],
        });
      }
    });

    return highlightMap;
  }, [activeStep]);
};
