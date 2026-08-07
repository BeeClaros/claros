/** Interpolate across evenly-spaced keyframe values. */
export function lerpKeyframes(values: readonly number[], t: number): number {
  const clamped = Math.max(0, Math.min(1, t));
  const span = values.length - 1;
  if (span <= 0) return values[0] ?? 0;

  const pos = clamped * span;
  const i = Math.floor(pos);
  const f = pos - i;
  const a = values[Math.min(i, span)]!;
  const b = values[Math.min(i + 1, span)]!;
  return a + (b - a) * f;
}

export function flightCycle(progress: number, laps = 8): number {
  return (progress * laps) % 1;
}

export const WING_LEFT = [-18, 16, -18] as const;
export const WING_RIGHT = [18, -16, 18] as const;
export const BODY_Y = [0, 2, -1, 0] as const;

export function wingLeftRotate(p: number, laps: number) {
  return lerpKeyframes(WING_LEFT, flightCycle(p, laps));
}

export function wingRightRotate(p: number, laps: number) {
  return lerpKeyframes(WING_RIGHT, flightCycle(p, laps));
}

export function bodyBobY(p: number, laps: number) {
  return lerpKeyframes(BODY_Y, flightCycle(p, laps));
}
