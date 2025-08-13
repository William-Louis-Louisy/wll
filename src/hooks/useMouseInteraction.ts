import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export const useMouseInteraction = (
  groupRef: React.RefObject<THREE.Group>,
  materialRef: React.RefObject<THREE.LineBasicMaterial>,
  pointer?: [number, number],
  color?: string | THREE.Color,
  hoverColor?: string | THREE.Color
) => {
  const originalColor = useMemo(
    () => new THREE.Color(color || "#1e1e1e"),
    [color]
  );
  const targetColor = useMemo(
    () => new THREE.Color(hoverColor || "#ff8731"),
    [hoverColor]
  );
  const isHovering = useRef(false);

  const { raycaster, pointer: mousePointer } = useThree();

  useFrame(({ camera }) => {
    if (!groupRef.current) return;

    // Handle rotation based on pointer
    if (pointer) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer[1] * 0.05,
        0.1
      );

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer[0] * 0.05,
        0.1
      );
    }

    // Handle material color change on hover
    if (materialRef.current) {
      // Use pointer from useThree instead of deprecated mouse
      raycaster.setFromCamera(mousePointer, camera);
      const intersects = raycaster.intersectObject(groupRef.current, true);

      if (intersects.length > 0) {
        if (!isHovering.current) {
          isHovering.current = true;
        }
        // Smoothly transition to hover color
        materialRef.current.color.lerp(targetColor, 0.1);
      } else if (isHovering.current) {
        isHovering.current = false;
        // Smoothly transition back to original color
        materialRef.current.color.lerp(originalColor, 0.1);
      }
    }
  });
};
