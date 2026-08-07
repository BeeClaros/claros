/** SVG frontier animation data for hero video capture (1920×1080). */

export const CAPTURE_WIDTH = 1920;
export const CAPTURE_HEIGHT = 1080;
export const CYCLE_DURATION = 18;
export const BLOCK_BUILD = 3.8;

export const PHASE = {
  wireEnd: 1.3,
  dotEnd: 1.75,
  extrudeEnd: 3.8,
} as const;

export type CaptureBlock = {
  cx: number;
  cy: number;
  r: number;
  startAt: number;
  hollow?: boolean;
};

/** Isometric-ish hex paths at the PNG growth edge (bottom-right cluster). */
export const CAPTURE_BLOCKS: CaptureBlock[] = [
  { cx: 1540, cy: 640, r: 52, startAt: 1.0, hollow: true },
  { cx: 1620, cy: 575, r: 54, startAt: 4.5 },
  { cx: 1690, cy: 510, r: 50, startAt: 8.0 },
  { cx: 1580, cy: 495, r: 48, startAt: 11.5 },
  { cx: 1660, cy: 430, r: 46, startAt: 15.0, hollow: true },
];

const HEX_RATIO = 0.54;

export function hexPoints(cx: number, cy: number, r: number): [number, number][] {
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a) * HEX_RATIO]);
  }
  return pts;
}

export function hexPath(cx: number, cy: number, r: number): string {
  const pts = hexPoints(cx, cy, r);
  return "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";
}

export function blockLocalTime(elapsed: number, startAt: number): number {
  let t = elapsed - startAt;
  if (t < 0) t += CYCLE_DURATION;
  return t;
}

export function blockState(elapsed: number, startAt: number) {
  const t = blockLocalTime(elapsed, startAt);

  if (t > CYCLE_DURATION - 0.6) {
    return { visible: false, wire: 0, dot: 0, fill: 0 };
  }

  const building = t <= BLOCK_BUILD;
  const wire = !building ? 0.9 : t < PHASE.wireEnd ? t / PHASE.wireEnd : 0.9;
  const dot =
    !building ? 1 : t < PHASE.wireEnd ? 0 : t < PHASE.dotEnd ? (t - PHASE.wireEnd) / (PHASE.dotEnd - PHASE.wireEnd) : 1;
  const fill =
    !building ? 1 : t < PHASE.dotEnd ? 0 : t < PHASE.extrudeEnd ? (t - PHASE.dotEnd) / (PHASE.extrudeEnd - PHASE.dotEnd) : 1;

  return { visible: wire > 0.02 || fill > 0.02, wire, dot, fill };
}
