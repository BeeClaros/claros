export interface Particle3DTarget {
  x: number;
  y: number;
  z: number;
  opacity: number;
  radius: number;
  hue: string;
}

export type SwarmState3DName =
  | "scatter"
  | "discover"
  | "focus"
  | "blueprint"
  | "helix"
  | "torus"
  | "converge"
  | "core";

export const SWARM_STATE_3D_ORDER: SwarmState3DName[] = [
  "scatter",
  "discover",
  "focus",
  "blueprint",
  "helix",
  "torus",
  "converge",
  "core",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

// --- State generators ---

/** Opening: particles distributed on a globe surface */
function generateScatter(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(11);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R = Math.min(w, h) * 0.36;
  const targets: Particle3DTarget[] = [];

  for (let i = 0; i < count; i++) {
    // Fibonacci sphere distribution
    const phi = Math.acos(1 - 2 * (i + 0.5) / count);
    const theta = Math.PI * (1 + Math.sqrt(5)) * i;
    const jitter = 0.08;
    const jp = phi + (rng() - 0.5) * jitter;
    const jt = theta + (rng() - 0.5) * jitter * 2;

    const sx = Math.sin(jp) * Math.cos(jt);
    const sy = Math.cos(jp);
    const sz = Math.sin(jp) * Math.sin(jt);

    const dist = R * (0.85 + rng() * 0.3);
    const opacity = 0.12 + rng() * 0.28;
    const bright = rng() > 0.92;

    targets.push({
      x: cx + sx * dist,
      y: cy + sy * dist * 0.7,
      z: sz * dist * 0.6,
      opacity: bright ? opacity + 0.3 : opacity,
      radius: bright ? 1.8 + rng() * 1.2 : 0.9 + rng() * 1,
      hue: bright ? "#A5ABB4" : "#707782",
    });
  }
  return targets;
}

/** Discover: two hemisphere clusters offset in z */
function generateDiscover(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(22);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R = Math.min(w, h) * 0.22;
  const targets: Particle3DTarget[] = [];

  const clusters = [
    { ox: -w * 0.2, oz: 60, hue: "#A5ABB4" as const, bright: true },
    { ox: w * 0.2, oz: -60, hue: "#707782" as const, bright: false },
  ];

  for (let i = 0; i < count; i++) {
    const c = clusters[i % clusters.length];
    const u = rng() * Math.PI * 2;
    const v = Math.acos(2 * rng() - 1);
    const r = R * (0.5 + rng() * 0.6);
    const px = cx + c.ox + Math.sin(v) * Math.cos(u) * r;
    const py = cy + Math.sin(v) * Math.sin(u) * r * 0.7;
    const pz = c.oz + Math.cos(v) * r * 0.5;
    const opacity = c.bright ? 0.3 + rng() * 0.45 : 0.1 + rng() * 0.2;

    targets.push({
      x: px,
      y: py,
      z: pz,
      opacity,
      radius: c.bright ? 1.2 + rng() * 1.2 : 0.8 + rng() * 0.9,
      hue: c.hue,
    });
  }
  return targets;
}

/** Focus: tight bright sphere (signal) + dim scattered cloud */
function generateFocus(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(33);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const targets: Particle3DTarget[] = [];

  const brightCount = Math.floor(count * 0.35);
  const R_bright = Math.min(w, h) * 0.13;
  const R_cloud = Math.min(w, h) * 0.42;

  for (let i = 0; i < count; i++) {
    if (i < brightCount) {
      const u = rng() * Math.PI * 2;
      const v = Math.acos(2 * rng() - 1);
      const r = R_bright * Math.cbrt(rng());
      targets.push({
        x: cx - w * 0.18 + Math.sin(v) * Math.cos(u) * r,
        y: cy + Math.sin(v) * Math.sin(u) * r * 0.8,
        z: 80 + Math.cos(v) * r * 0.6,
        opacity: 0.55 + rng() * 0.45,
        radius: 1.5 + rng() * 2,
        hue: "#C9FF56",
      });
    } else {
      const angle = rng() * Math.PI * 2;
      const dist = R_cloud * (0.3 + Math.pow(rng(), 0.5) * 0.7);
      const vy = (rng() - 0.5) * dist * 0.8;
      targets.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + vy,
        z: (rng() - 0.5) * 120,
        opacity: 0.05 + rng() * 0.12,
        radius: 0.7 + rng() * 0.9,
        hue: "#707782",
      });
    }
  }
  return targets;
}

/** Blueprint: curved 3D ribbon flowing left to right */
function generateBlueprint(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(44);
  const targets: Particle3DTarget[] = [];
  const nodeCount = 6;

  // Node positions on a gentle 3D arc
  const nodes = Array.from({ length: nodeCount }, (_, n) => {
    const t = n / (nodeCount - 1);
    return {
      x: w * 0.1 + t * w * 0.8,
      y: h * 0.5 + Math.sin(t * Math.PI) * h * -0.12,
      z: Math.sin(t * Math.PI * 1.5) * 120,
      hue: (["#A5ABB4", "#A5ABB4", "#67B7FF", "#FF735C", "#A5ABB4", "#C9FF56"] as const)[n],
    };
  });

  for (let i = 0; i < count; i++) {
    const ni = i % nodeCount;
    const node = nodes[ni];
    const isConnector = rng() > 0.65 && ni < nodeCount - 1;

    let px: number, py: number, pz: number;
    if (isConnector) {
      const next = nodes[ni + 1];
      const along = rng();
      px = node.x + (next.x - node.x) * along + (rng() - 0.5) * 8;
      py = node.y + (next.y - node.y) * along + (rng() - 0.5) * 8;
      pz = node.z + (next.z - node.z) * along + (rng() - 0.5) * 12;
    } else {
      const spread = 28 + rng() * 18;
      const angle = rng() * Math.PI * 2;
      px = node.x + Math.cos(angle) * spread;
      py = node.y + Math.sin(angle) * spread;
      pz = node.z + (rng() - 0.5) * 50;
    }

    targets.push({
      x: px,
      y: py,
      z: pz,
      opacity: isConnector ? 0.12 + rng() * 0.15 : 0.4 + rng() * 0.5,
      radius: isConnector ? 0.7 + rng() * 0.5 : 1.3 + rng() * 1.5,
      hue: isConnector ? "#707782" : node.hue,
    });
  }
  return targets;
}

/** Helix: double helix spiral */
function generateHelix(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(55);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const targets: Particle3DTarget[] = [];
  const helixR = Math.min(w, h) * 0.14;
  const helixHeight = h * 0.55;
  const turns = 3;

  for (let i = 0; i < count; i++) {
    const strand = i % 2;
    const t = (i / count) * Math.PI * 2 * turns;
    const yOffset = (i / count - 0.5) * helixHeight;
    const phaseOffset = strand === 0 ? 0 : Math.PI;
    const spread = rng() * 12;
    const spreadAngle = rng() * Math.PI * 2;

    targets.push({
      x: cx + Math.cos(t + phaseOffset) * helixR + Math.cos(spreadAngle) * spread,
      y: cy + yOffset + Math.sin(spreadAngle) * spread * 0.3,
      z: Math.sin(t + phaseOffset) * helixR,
      opacity: 0.4 + rng() * 0.55,
      radius: 1.2 + rng() * 1.4,
      hue: strand === 0 ? "#C9FF56" : "#A5ABB4",
    });
  }
  return targets;
}

/** Torus: ring shape */
function generateTorus(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(66);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const R1 = Math.min(w, h) * 0.26; // major radius
  const R2 = Math.min(w, h) * 0.07; // minor radius
  const targets: Particle3DTarget[] = [];

  for (let i = 0; i < count; i++) {
    const u = (i / count) * Math.PI * 2 + rng() * 0.15;
    const v = rng() * Math.PI * 2;
    const jitter = rng() * 6;

    const px = cx + (R1 + (R2 + jitter) * Math.cos(v)) * Math.cos(u);
    const py = cy + (R2 + jitter) * Math.sin(v) * 0.75;
    const pz = (R1 + (R2 + jitter) * Math.cos(v)) * Math.sin(u);

    const accent = rng() > 0.88;

    targets.push({
      x: px,
      y: py,
      z: pz,
      opacity: accent ? 0.7 + rng() * 0.3 : 0.2 + rng() * 0.35,
      radius: accent ? 2 + rng() * 1.5 : 0.9 + rng() * 1.1,
      hue: accent ? "#67B7FF" : rng() > 0.5 ? "#A5ABB4" : "#707782",
    });
  }
  return targets;
}

/** Converge: three tight spheres side by side */
function generateConverge(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(77);
  const cy = h * 0.5;
  const R = Math.min(w, h) * 0.1;
  const targets: Particle3DTarget[] = [];

  const groups = [
    { cx: w * 0.28, oz: 40, hue: "#C9FF56" as const },
    { cx: w * 0.5, oz: 0, hue: "#67B7FF" as const },
    { cx: w * 0.72, oz: -40, hue: "#FF735C" as const },
  ];

  for (let i = 0; i < count; i++) {
    const g = groups[i % groups.length];
    const u = rng() * Math.PI * 2;
    const v = Math.acos(2 * rng() - 1);
    const r = R * Math.cbrt(rng());

    targets.push({
      x: g.cx + Math.sin(v) * Math.cos(u) * r,
      y: cy + Math.sin(v) * Math.sin(u) * r * 0.8,
      z: g.oz + Math.cos(v) * r * 0.7,
      opacity: 0.45 + rng() * 0.5,
      radius: 1.3 + rng() * 1.6,
      hue: g.hue,
    });
  }
  return targets;
}

/** Core: dense central sphere with outer halo fade */
function generateCore(
  count: number,
  w: number,
  h: number
): Particle3DTarget[] {
  const rng = seededRandom(88);
  const cx = w * 0.5;
  const cy = h * 0.5;
  const targets: Particle3DTarget[] = [];

  const coreCount = Math.floor(count * 0.45);
  const R_core = Math.min(w, h) * 0.11;
  const R_halo = Math.min(w, h) * 0.38;

  for (let i = 0; i < count; i++) {
    const u = rng() * Math.PI * 2;
    const v = Math.acos(2 * rng() - 1);

    if (i < coreCount) {
      const r = R_core * Math.cbrt(rng());
      targets.push({
        x: cx + Math.sin(v) * Math.cos(u) * r,
        y: cy + Math.sin(v) * Math.sin(u) * r * 0.8,
        z: Math.cos(v) * r,
        opacity: 0.6 + rng() * 0.4,
        radius: 1.5 + rng() * 2.2,
        hue: rng() > 0.5 ? "#C9FF56" : "#F3F4F0",
      });
    } else {
      const r = R_halo * (0.35 + Math.pow(rng(), 0.6) * 0.65);
      targets.push({
        x: cx + Math.sin(v) * Math.cos(u) * r,
        y: cy + Math.sin(v) * Math.sin(u) * r * 0.7,
        z: Math.cos(v) * r * 0.5,
        opacity: 0.04 + (1 - r / R_halo) * 0.2,
        radius: 0.6 + rng() * 0.9,
        hue: rng() > 0.85 ? "#A5ABB4" : "#707782",
      });
    }
  }
  return targets;
}

// --- Registry and cache ---

const generators: Record<
  SwarmState3DName,
  (count: number, w: number, h: number) => Particle3DTarget[]
> = {
  scatter: generateScatter,
  discover: generateDiscover,
  focus: generateFocus,
  blueprint: generateBlueprint,
  helix: generateHelix,
  torus: generateTorus,
  converge: generateConverge,
  core: generateCore,
};

const cache3D = new Map<string, Particle3DTarget[]>();

export function getState3DTargets(
  state: SwarmState3DName,
  count: number,
  width: number,
  height: number
): Particle3DTarget[] {
  const key = `${state}-${count}-${Math.round(width)}-${Math.round(height)}`;
  const cached = cache3D.get(key);
  if (cached) return cached;
  const targets = generators[state](count, width, height);
  cache3D.set(key, targets);
  return targets;
}

export function clearState3DCache(): void {
  cache3D.clear();
}
