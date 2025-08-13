import { Step } from "@/types/dartgame.type";

export function evaluateStep(step: Step): number {
  return step.segments.reduce((acc, seg) => {
    switch (seg.operator) {
      case "+":
        return acc + seg.value;
      case "-":
        return acc - seg.value;
      case "*":
        return acc * seg.value;
      case "/":
        return acc / seg.value;
    }
  }, 0);
}
