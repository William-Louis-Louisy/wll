import { CONFIG } from "@/lib/dartboardGame";

export const PREC = 3;
export const fmt = (n: number, p: number = PREC) =>
  Number.isFinite(n) ? (Number.isInteger(n) ? String(n) : n.toFixed(p)) : "0";

export const toRadians = (degrees: number): number => (degrees * Math.PI) / 180;

export const calculateTextPosition = (angle: number, radius: number) => {
  const x = CONFIG.centerX + radius * Math.cos(angle);
  const y = CONFIG.centerY + radius * Math.sin(angle);
  return { x: fmt(x), y: fmt(y) };
};
