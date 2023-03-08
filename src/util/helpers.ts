export function removeDuplicatePoints(
  arr: { x: number; y: number; z: number }[]
) {
  const uniquePoints = new Map(
    arr.map((item) => [[`${item.x}${item.y}${item.z}`], item])
  );
  return [...uniquePoints.values()];
}

export function degToRad(deg: number) {
  return (deg * Math.PI) / 180;
}

type Grid = {
  cols?: number;
  rows?: number;
  margin?: number;
  cellGap?: number;
  canvas?: {
    w: number;
    h: number;
  };
};

type Point = {
  pos: { x: number; y: number };
  w: number;
  h: number;
};

/**
 * Utility function to create a list of grid points.
 * Returns a list of points for a 10x10 grid of 600px x 600px canvas
 * with no margin and no gaps between points by default.
 *
 */

export function createGrid2({
  cols = 10,
  rows = 10,
  canvas = { w: 600, h: 600 },
  margin = 0,
  cellGap = 0,
}: Grid): Point[] {
  const numCells = cols * rows;
  const grid_w = canvas.w - margin * 2;
  const grid_h = canvas.h - margin * 2;
  const cell_w = grid_w / cols;
  const cell_h = grid_h / rows;

  const pts = [];

  for (let i = 0; i < numCells; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);

    const w = cell_w - cellGap;
    const h = cell_h - cellGap;

    const x = col * cell_w + margin + cellGap * 0.5;
    const y = row * cell_h + margin + cellGap * 0.5;

    pts.push({
      pos: { x, y },
      w,
      h,
    });
  }
  return pts;
}
