export interface SlotPosition {
  x: number; // percentage (0 - 100)
  y: number; // percentage (0 - 100)
  centerPort: "top" | "bottom" | "left" | "right";
  nodePort: "top" | "bottom" | "left" | "right";
}

export const CENTER_SLOT: { x: number; y: number } = {
  x: 50,
  y: 45,
};

const PRESET_SLOTS: Record<number, SlotPosition[]> = {
  1: [
    { x: 78, y: 45, centerPort: "right", nodePort: "left" },
  ],
  2: [
    { x: 22, y: 45, centerPort: "left", nodePort: "right" },
    { x: 78, y: 45, centerPort: "right", nodePort: "left" },
  ],
  3: [
    { x: 24, y: 22, centerPort: "top", nodePort: "bottom" },
    { x: 76, y: 22, centerPort: "top", nodePort: "bottom" },
    { x: 50, y: 76, centerPort: "bottom", nodePort: "top" },
  ],
  4: [
    { x: 23, y: 22, centerPort: "top", nodePort: "bottom" },
    { x: 77, y: 22, centerPort: "top", nodePort: "bottom" },
    { x: 23, y: 68, centerPort: "bottom", nodePort: "top" },
    { x: 77, y: 68, centerPort: "bottom", nodePort: "top" },
  ],
  // 5 satellite nodes (matches exact layout in reference UI image)
  5: [
    { x: 24, y: 22, centerPort: "top", nodePort: "right" },
    { x: 76, y: 22, centerPort: "top", nodePort: "left" },
    { x: 22, y: 55, centerPort: "left", nodePort: "right" },
    { x: 50, y: 76, centerPort: "bottom", nodePort: "top" },
    { x: 78, y: 55, centerPort: "right", nodePort: "left" },
  ],
  6: [
    { x: 22, y: 20, centerPort: "top", nodePort: "right" },
    { x: 50, y: 16, centerPort: "top", nodePort: "bottom" },
    { x: 78, y: 20, centerPort: "top", nodePort: "left" },
    { x: 20, y: 54, centerPort: "left", nodePort: "right" },
    { x: 50, y: 78, centerPort: "bottom", nodePort: "top" },
    { x: 80, y: 54, centerPort: "right", nodePort: "left" },
  ],
  7: [
    { x: 22, y: 18, centerPort: "top", nodePort: "right" },
    { x: 50, y: 16, centerPort: "top", nodePort: "bottom" },
    { x: 78, y: 18, centerPort: "top", nodePort: "left" },
    { x: 18, y: 48, centerPort: "left", nodePort: "right" },
    { x: 82, y: 48, centerPort: "right", nodePort: "left" },
    { x: 26, y: 76, centerPort: "bottom", nodePort: "top" },
    { x: 74, y: 76, centerPort: "bottom", nodePort: "top" },
  ],
  8: [
    { x: 20, y: 18, centerPort: "top", nodePort: "right" },
    { x: 50, y: 15, centerPort: "top", nodePort: "bottom" },
    { x: 80, y: 18, centerPort: "top", nodePort: "left" },
    { x: 16, y: 46, centerPort: "left", nodePort: "right" },
    { x: 84, y: 46, centerPort: "right", nodePort: "left" },
    { x: 20, y: 76, centerPort: "bottom", nodePort: "top" },
    { x: 50, y: 80, centerPort: "bottom", nodePort: "top" },
    { x: 80, y: 76, centerPort: "bottom", nodePort: "top" },
  ],
};

/**
 * Returns slot percentage positions for n satellite nodes (up to 8).
 * If n > 8, warns and falls back to 8 positions.
 */
export function getSlots(n: number): SlotPosition[] {
  if (n <= 0) return [];

  if (n > 8) {
    console.warn(
      `[getSlots] Category has ${n} satellite nodes, which exceeds the supported 8-node layout preset. Rendering first 8.`
    );
    return PRESET_SLOTS[8];
  }

  return PRESET_SLOTS[n] || PRESET_SLOTS[5];
}
