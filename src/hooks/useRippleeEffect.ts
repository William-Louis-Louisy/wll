import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface RipplePoint {
  x: number;
  y: number;
  startTime: number;
  strength: number;
  speed: number;
}

export const useRippleEffect = (
  geometryRef: React.RefObject<THREE.BufferGeometry>,
  pointer: [number, number] | undefined,
  viewport: { width: number; height: number },
  distanceInfluence: number,
  rippleSpeed: number,
  enabled: boolean = true
) => {
  const [ripples, setRipples] = useState<RipplePoint[]>([]);
  const lastClick = useRef<number>(0);

  // Handle mouse clicks to create ripples
  useEffect(() => {
    // Only add event listener if ripple effect is enabled
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      // Convert screen coordinates to normalized device coordinates
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Add new ripple
      setRipples((current) => [
        ...current.slice(-5), // Keep only the last 5 ripples
        {
          x: x * viewport.width,
          y: y * viewport.height,
          startTime: Date.now(),
          strength: 1 + Math.random() * 0.5,
          speed: rippleSpeed * (0.8 + Math.random() * 0.4),
        },
      ]);

      lastClick.current = Date.now();
    };

    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [viewport, rippleSpeed, enabled]);

  // Apply ripple effect
  useFrame(() => {
    // Skip all ripple processing if not enabled or no ripples
    if (!enabled || !geometryRef.current || ripples.length === 0) return;

    const now = Date.now();
    const positionAttribute = geometryRef.current.attributes.position;
    const array = positionAttribute.array as Float32Array;

    // Remove old ripples
    if (ripples.length > 0 && now - ripples[0].startTime > 3000) {
      setRipples((current) => current.slice(1));
    }

    // Apply all active ripples
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      const y = array[i + 1];

      // Current z value (preserve wave animation)
      let z = array[i + 2];

      // Add ripple effect from all active ripples
      ripples.forEach((ripple) => {
        const timeSinceStart = (now - ripple.startTime) / 1000;
        if (timeSinceStart < 3) {
          // Calculate distance from ripple center
          const dx = x - ripple.x;
          const dy = y - ripple.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Calculate ripple wave (expanding circle)
          const waveRadius = timeSinceStart * ripple.speed;
          const waveWidth = 5;

          if (Math.abs(distance - waveRadius) < waveWidth) {
            // Points on the ripple wave
            const amplitude =
              ripple.strength * Math.max(0, 1 - timeSinceStart / 3);
            const influence = Math.exp(
              -Math.pow(distance - waveRadius, 2) / (2 * waveWidth * waveWidth)
            );
            z += amplitude * influence * distanceInfluence;
          }
        }
      });

      array[i + 2] = z;
    }

    positionAttribute.needsUpdate = true;
  });
};
