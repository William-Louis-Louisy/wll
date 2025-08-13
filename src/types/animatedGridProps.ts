import * as THREE from "three";

export interface AnimatedGridProps {
  pointer?: [number, number];
  onReady?: () => void;
  // Visual properties
  color?: string | THREE.Color;
  hoverColor?: string | THREE.Color;
  gradient?: boolean;
  opacity?: number;
  // Animation properties
  waveFactor?: number;
  noiseScale?: {
    x: number;
    y: number;
    z?: number;
  };
  timeScale?: number;
  pulseEffect?: boolean;
  // Grid properties
  segmentsX?: number;
  segmentsY?: number;
  lineWidth?: number;
  // Effects
  useRipple?: boolean;
  distanceInfluence?: number;
  rippleSpeed?: number;
  // Advanced features
  shadows?: boolean;
  useBloom?: boolean;
}
