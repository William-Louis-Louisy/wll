"use client";

import * as THREE from "three";
import { createNoise2D, createNoise3D } from "simplex-noise";
import { useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import { createGridGeometry } from "@/utils/createGrid";
import { useWaveAnimation } from "@/hooks/useWaveAnimation";
import { useMouseInteraction } from "@/hooks/useMouseInteraction";
import { useRippleEffect } from "@/hooks/useRippleeEffect";
import { AnimatedGridProps } from "@/types/animatedGridProps";

export default function AnimatedGrid({
  pointer,
  onReady,
  color = "#1e1e1e",
  hoverColor = "#ff8731",
  gradient = false,
  opacity = 0.3,
  waveFactor = 7,
  noiseScale = { x: 0.03, y: 0.01, z: 0.02 },
  timeScale = 0.4,
  pulseEffect = false,
  segmentsX = 380,
  segmentsY = 120,
  lineWidth = 1,
  useRipple = false,
  distanceInfluence = 12,
  rippleSpeed = 30,
  shadows = false,
}: AnimatedGridProps) {
  // Initialize noise generators
  const noise2D = useMemo(() => createNoise2D(), []);
  const noise3D = useMemo(() => createNoise3D(), []);

  // References
  const geometryRef = useRef<THREE.BufferGeometry>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const materialRef = useRef<THREE.LineBasicMaterial>(null!);

  const { viewport } = useThree();

  // Create grid geometry
  const gridGeometry = useMemo(() => {
    return createGridGeometry(
      viewport.width * 2,
      viewport.height * 2,
      segmentsX,
      segmentsY,
      gradient
    );
  }, [viewport, segmentsX, segmentsY, gradient]);

  // Apply animations
  useWaveAnimation(
    geometryRef,
    noise2D,
    noise3D,
    waveFactor,
    noiseScale,
    timeScale,
    pulseEffect
  );

  useMouseInteraction(groupRef, materialRef, pointer, color, hoverColor);

  // Apply ripple effect if enabled
  useRippleEffect(
    geometryRef,
    pointer,
    viewport,
    distanceInfluence,
    rippleSpeed,
    useRipple // Pass the boolean flag to control activation
  );

  // Call onReady when component mounts
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  return (
    <group ref={groupRef} castShadow={shadows} receiveShadow={shadows}>
      <lineSegments>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={gridGeometry.positions.length / 3}
            array={gridGeometry.positions}
            itemSize={3}
            args={[gridGeometry.positions, 3]}
          />
          <bufferAttribute
            attach="index"
            count={gridGeometry.indices.length}
            array={gridGeometry.indices}
            itemSize={1}
            args={[gridGeometry.indices, 1]}
          />
          {gradient && gridGeometry.colors && (
            <bufferAttribute
              attach="attributes-color"
              count={gridGeometry.colors.length / 3}
              array={gridGeometry.colors}
              itemSize={3}
              args={[gridGeometry.colors, 3]}
            />
          )}
        </bufferGeometry>
        <lineBasicMaterial
          ref={materialRef}
          color={color}
          transparent
          opacity={opacity}
          linewidth={lineWidth}
          vertexColors={gradient}
        />
      </lineSegments>
    </group>
  );
}
