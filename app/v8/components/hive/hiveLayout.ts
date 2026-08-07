import * as THREE from "three";

// ── Constants ──────────────────────────────────────────────────────────────
export const HEX_R = 1.4;   // hex radius (center to vertex)
export const HEX_H = 1.15;  // hex prism height

/**
 * Offset of the entire cluster in world space.
 * Camera at [12,10,12] isometric, camera-right ≈ [+x,-z].
 * This offset positions the cluster in the lower-right portion of the hero.
 */
export const HIVE_OFFSET: [number, number, number] = [11, -0.5, -4];

/**
 * Camera parameters - isometric orthographic view matching the reference image.
 */
export const CAMERA = {
  position: [12, 10, 12] as [number, number, number],
  zoom: 90,
  near: 0.1,
  far: 600,
  lookAt: [11, 2, -1] as [number, number, number],
};

// ── Types ──────────────────────────────────────────────────────────────────
export interface HexData {
  id: string;
  /** Final assembled position in local (group) space. */
  targetPos: THREE.Vector3;
  /** Starting scattered position - always to the right/below, never in text zone. */
  scatterPos: THREE.Vector3;
  /** Starting random rotation (lerps to identity quaternion). */
  qRot: THREE.Quaternion;
  /** Scroll progress value (0-0.65) at which this piece starts assembling. */
  staggerStart: number;
}

// ── Seeded pseudo-random (deterministic - no hydration mismatch) ───────────
function seededRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

// ── Axial → local-space position ──────────────────────────────────────────
// size=HEX_R → adjacent cell centers are sqrt(3)*R apart → cells touch with zero gap.
function axialToLocal(q: number, r: number, layer: number): THREE.Vector3 {
  const x = HEX_R * (Math.sqrt(3) * q + (Math.sqrt(3) / 2) * r);
  const z = HEX_R * (1.5 * r);
  const y = layer * HEX_H;
  return new THREE.Vector3(x, y, z);
}

// ── Build the hex grid ─────────────────────────────────────────────────────
/**
 * Creates the triangular pyramid cluster matching hero-hive-bg.png:
 *
 * Layer 0 (ground, widest): triangular staircase r=0..4
 * Layer 1: smaller triangle r=0..2
 * Layer 2: r=0..1
 * Layer 3: r=0 only (peak)
 *
 * Stagger: front cells (high q, low r, low layer) assemble first.
 * Scatter: pieces start dispersed to the right and behind the cluster -
 *          never crossing into the text zone (left side of canvas).
 */
export function buildHexGrid(): HexData[] {
  // Define the grid cells
  const cells: Array<{ q: number; r: number; layer: number }> = [];

  // Layer 0 - triangular ground floor
  for (let r = 0; r <= 4; r++) {
    for (let q = 0; q <= 5 - r; q++) {
      cells.push({ q, r, layer: 0 });
    }
  }
  // Layer 1
  for (let r = 0; r <= 2; r++) {
    for (let q = 0; q <= 4 - r; q++) {
      cells.push({ q, r, layer: 1 });
    }
  }
  // Layer 2
  for (let r = 0; r <= 1; r++) {
    for (let q = 0; q <= 3 - r; q++) {
      cells.push({ q, r, layer: 2 });
    }
  }
  // Layer 3 (peak)
  cells.push({ q: 0, r: 0, layer: 3 });
  cells.push({ q: 1, r: 0, layer: 3 });

  const total = cells.length;

  // Sort for stagger: front-first = high q + low r + low layer
  // This gives a "building from the front" assembly effect
  const sorted = [...cells].sort(
    (a, b) => b.q - a.q || a.r - b.r || a.layer - b.layer,
  );

  return sorted.map((cell, i) => {
    const rng = seededRng(i * 397 + cell.q * 13 + cell.r * 7 + cell.layer * 31);
    const targetPos = axialToLocal(cell.q, cell.r, cell.layer);

    // Scatter: expand from final position outward and upward
    // Keep scatter to the right/behind to avoid overlapping text zone
    const spread = 4 + (cell.layer + 1) * 2; // higher layers scatter more
    const sx = targetPos.x + (rng() * spread);          // always rightward (+x)
    const sy = targetPos.y + (rng() - 0.3) * spread;    // slightly upward bias
    const sz = targetPos.z + (rng() * spread * 0.6);     // behind cluster (+z = camera away)

    const scatterPos = new THREE.Vector3(sx, sy, sz);

    // Random starting rotation
    const qRot = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        rng() * Math.PI * 3,
        rng() * Math.PI * 3,
        rng() * Math.PI * 3,
      ),
    );

    // Stagger: 0 (first piece) to 0.65 (last piece)
    // The window per piece is 0.35, so last piece completes at 0.65+0.35=1.0
    const staggerStart = 0.65 * (i / (total - 1));

    return {
      id: `hex-${cell.layer}-${cell.r}-${cell.q}`,
      targetPos,
      scatterPos,
      qRot,
      staggerStart,
    };
  });
}
