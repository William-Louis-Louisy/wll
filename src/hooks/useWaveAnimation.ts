import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { createNoise2D, createNoise3D } from "simplex-noise";

export const useWaveAnimation = (
  geometryRef: React.RefObject<THREE.BufferGeometry>,
  noise2D: ReturnType<typeof createNoise2D>,
  noise3D: ReturnType<typeof createNoise3D>,
  waveFactor: number,
  noiseScale: { x: number; y: number; z?: number },
  timeScale: number,
  pulseEffect: boolean = false
) => {
  const pulseAmplitude = useRef(1);

  useFrame(({ clock }) => {
    if (!geometryRef.current) return;

    const time = clock.getElapsedTime() * timeScale;
    const positionAttribute = geometryRef.current.attributes.position;
    const array = positionAttribute.array as Float32Array;

    // Calculate pulse if enabled
    if (pulseEffect) {
      pulseAmplitude.current = 0.6 + Math.sin(time * 0.8) * 0.4;
    }

    // Update z coordinates with noise
    for (let i = 0; i < array.length; i += 3) {
      const x = array[i];
      const y = array[i + 1];

      let z;
      if (noiseScale.z) {
        // Use 3D noise for more complex patterns
        z = noise3D(
          x * noiseScale.x + time,
          y * noiseScale.y + time,
          time * noiseScale.z
        );
      } else {
        // Use standard 2D noise
        z = noise2D(x * noiseScale.x + time, y * noiseScale.y + time);
      }

      array[i + 2] =
        z * waveFactor * (pulseEffect ? pulseAmplitude.current : 1);
    }

    positionAttribute.needsUpdate = true;
  });
};
