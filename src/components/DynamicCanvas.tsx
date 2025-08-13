"use client";
import React, { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import AnimatedGrid from "./AnimatedGrid";
import { OrbitControls } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

export default function DynamicCanvas({
  pointer,
  onReady,
}: {
  pointer?: [number, number];
  onReady?: () => void;
}) {
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  return (
    <Canvas
      // Configuration du contexte WebGL
      gl={{ antialias: true, alpha: true }}
      // Position et champ de vision de la caméra
      camera={{ position: [5, -25, 120], fov: 55 }}
      onCreated={({ camera }) => {
        camera.position.set(5, -25, 120);
      }}
      // Styles pour positionner en plein écran et désactiver les interactions de souris
      style={{
        position: "absolute",
        inset: 0,
      }}
    >
      {/* 1. Lumières */}
      {/* lumière ambiante douce pour éclairer globalement la scène */}
      <ambientLight intensity={0.4} />
      {/* lumière directionnelle simulant le soleil */}
      <directionalLight position={[10, 20, 10]} intensity={0.5} />

      {/* 2. Effets de post-processing */}
      <EffectComposer>
        <Bloom
          // Seuil de luminance à partir duquel le bloom s’applique
          luminanceThreshold={0.2}
          // Lissage autour du seuil pour un effet plus doux
          luminanceSmoothing={0.9}
          // Résolution verticale de l’effet
          height={300}
          // Intensité de l’effet lumière diffuse
          intensity={1.2}
        />
      </EffectComposer>

      {/* 3. Contrôles de la caméra (debug uniquement) */}
      <OrbitControls
        ref={controls}
        enablePan
        enableZoom
        makeDefault
        enableDamping
        zoomSpeed={1.3}
        minDistance={60}
        maxDistance={90}
        dampingFactor={0.1}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI - Math.PI / 2}
        minAzimuthAngle={-Math.PI / 2}
        maxAzimuthAngle={Math.PI / 2}
      />

      {/* 4. Chargement asynchrone de la grille animée */}
      <Suspense fallback={null}>
        <group rotation={[-Math.PI / 3.5, 0, 0]}>
          <AnimatedGrid
            pointer={pointer}
            onReady={onReady}
            color="var(--element)"
            hoverColor="var(--primary)"
            gradient={true}
            waveFactor={10}
            pulseEffect={true}
            useRipple={true}
            distanceInfluence={15}
            segmentsX={320}
            segmentsY={100}
            opacity={0.4}
          />
        </group>
      </Suspense>
    </Canvas>
  );
}
