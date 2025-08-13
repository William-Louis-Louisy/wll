import { CONFIG } from "@/lib/dartboardGame";

export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const calculateTextPosition = (angle: number, radius: number) => ({
  x: CONFIG.centerX + radius * Math.cos(angle),
  y: CONFIG.centerY + radius * Math.sin(angle),
});
