import { Operator, SectionType, SectorConfig } from "@/types/dartgame.type";

const TARGET_DIAMETER = 340;
const TARGET_RADIUS = TARGET_DIAMETER / 2;

// Rayon réellement dessiné (l'anneau le plus externe)
const BASE_OUTER_DRAWN_RADIUS = 190;
const SCALE = TARGET_RADIUS / BASE_OUTER_DRAWN_RADIUS; // ≈ 0.8947368421

export const CONFIG = {
  centerX: TARGET_RADIUS,
  centerY: TARGET_RADIUS,
  totalSections: 20,
  boardRadius: TARGET_RADIUS, // utile si tu t’en sers pour width/height du SVG
  get anglePerSection() {
    return 360 / this.totalSections;
  },
} as const;

export const OPERATOR_COLORS: Record<Operator, string> = {
  "+": "#73D0FF",
  "-": "#FFD073",
  "*": "#FF73FF",
  "/": "#8A73FF",
} as const;

export const DARTBOARD_NUMBERS = [
  20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5,
] as const;

export const BOARD_COLORS = {
  alternating: ["#3b3a3d", "#e8e8e8"] as const,
  special: {
    doubleTriple: ["#7a7a7a", "#bcb0b0"] as const,
    outer: "#3b3a3d",
    bullseye: "#3b3a3d",
    innerBull: "#7a7a7a",
  },
} as const;

// Helper pour scaler proprement
const s = (n: number) => Number((n * SCALE).toFixed(2));

export const SECTOR_CONFIGS: readonly SectorConfig[] = [
  { type: "outer", innerRadius: s(162), outerRadius: s(190) },
  { type: "double", innerRadius: s(150), outerRadius: s(162) },
  { type: "inner", innerRadius: s(100), outerRadius: s(150) },
  { type: "triple", innerRadius: s(88), outerRadius: s(100) },
  { type: "single", innerRadius: s(20), outerRadius: s(88) },
] as const;

export const SECTION_ORDER: readonly SectionType[] = [
  "single",
  "triple",
  "inner",
  "double",
] as const;

export const BULL_RADII = {
  bull: s(20), // 17.89…
  innerBull: s(8), // 7.16…
} as const;

export const feedbackContent = {
  success: {
    title: "Séquence réussie !",
    message: "La prochaine séquence va commencer dans",
  },
  fail: {
    title: "Mauvaise réponse, recommence !",
    message: "La prochaine séquence va commencer dans",
  },
};
