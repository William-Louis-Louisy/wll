import * as THREE from "three";

interface GridGeometry {
  positions: Float32Array;
  indices: Uint16Array;
  colors?: Float32Array;
}

export const createGridGeometry = (
  width: number,
  height: number,
  segmentsX: number,
  segmentsY: number,
  gradient: boolean = false,
  offsetX: number = 0.6,
  offsetY: number = 0.4
): GridGeometry => {
  const positions: number[] = [];
  const indices: number[] = [];
  const colors: number[] = [];

  const baseColor = new THREE.Color("#474747");
  const endColor = new THREE.Color("#070707");

  // Create vertices
  for (let y = 0; y <= segmentsY; y++) {
    for (let x = 0; x <= segmentsX; x++) {
      const xPos = (x / segmentsX - offsetX) * width;
      const yPos = (y / segmentsY - offsetY) * height;

      positions.push(xPos, yPos, 0);

      if (gradient) {
        // Calculate gradient color
        const normalizedY = y / segmentsY;
        const mixedColor = new THREE.Color().lerpColors(
          baseColor,
          endColor,
          normalizedY
        );
        colors.push(mixedColor.r, mixedColor.g, mixedColor.b);
      }
    }
  }

  // Create line indices
  for (let y = 0; y < segmentsY; y++) {
    for (let x = 0; x < segmentsX; x++) {
      const i = y * (segmentsX + 1) + x;
      // Horizontal line
      indices.push(i, i + 1);
      // Vertical line
      indices.push(i, i + segmentsX + 1);
    }
  }

  return {
    positions: new Float32Array(positions),
    indices: new Uint16Array(indices),
    colors: gradient ? new Float32Array(colors) : undefined,
  };
};
