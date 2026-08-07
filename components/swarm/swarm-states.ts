export interface ParticleTarget {
  x: number;
  y: number;
  opacity: number;
  radius: number;
  hue: string;
}

export type SwarmStateName =
  | "noise"
  | "pattern"
  | "priority"
  | "workflow"
  | "operatingSystem"
  | "feedback";

export const SWARM_STATE_ORDER: SwarmStateName[] = [
  "noise",
  "pattern",
  "priority",
  "workflow",
  "operatingSystem",
  "feedback",
];

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return s / 2147483647;
  };
}

function generateNoise(
  count: number,
  width: number,
  height: number
): ParticleTarget[] {
  const rng = seededRandom(42);
  const targets: ParticleTarget[] = [];
  for (let i = 0; i < count; i++) {
    targets.push({
      x: rng() * width,
      y: rng() * height,
      opacity: 0.15 + rng() * 0.35,
      radius: 1 + rng() * 1.5,
      hue: "#707782",
    });
  }
  return targets;
}

function generatePattern(
  count: number,
  width: number,
  height: number
): ParticleTarget[] {
  const rng = seededRandom(101);
  const targets: ParticleTarget[] = [];
  const clusterCount = 6;
  const clusters: { cx: number; cy: number }[] = [];

  for (let c = 0; c < clusterCount; c++) {
    clusters.push({
      cx: width * 0.15 + (rng() * width * 0.7),
      cy: height * 0.15 + (rng() * height * 0.7),
    });
  }

  for (let i = 0; i < count; i++) {
    const cluster = clusters[i % clusterCount];
    const spread = 40 + rng() * 80;
    const angle = rng() * Math.PI * 2;
    const dist = rng() * spread;
    targets.push({
      x: cluster.cx + Math.cos(angle) * dist,
      y: cluster.cy + Math.sin(angle) * dist,
      opacity: 0.2 + rng() * 0.4,
      radius: 1 + rng() * 1.5,
      hue: "#A5ABB4",
    });
  }
  return targets;
}

function generatePriority(
  count: number,
  width: number,
  height: number
): ParticleTarget[] {
  const rng = seededRandom(202);
  const targets: ParticleTarget[] = [];

  const brightClusters = [
    { cx: width * 0.3, cy: height * 0.35, bright: true },
    { cx: width * 0.65, cy: height * 0.5, bright: true },
  ];
  const fadedClusters = [
    { cx: width * 0.15, cy: height * 0.7 },
    { cx: width * 0.8, cy: height * 0.25 },
    { cx: width * 0.5, cy: height * 0.75 },
    { cx: width * 0.85, cy: height * 0.7 },
  ];
  const allClusters = [...brightClusters, ...fadedClusters];

  for (let i = 0; i < count; i++) {
    const ci = i % allClusters.length;
    const cluster = allClusters[ci];
    const isBright = ci < brightClusters.length;
    const spread = isBright ? 30 + rng() * 50 : 50 + rng() * 90;
    const angle = rng() * Math.PI * 2;
    const dist = rng() * spread;

    targets.push({
      x: cluster.cx + Math.cos(angle) * dist,
      y: cluster.cy + Math.sin(angle) * dist,
      opacity: isBright ? 0.5 + rng() * 0.5 : 0.08 + rng() * 0.15,
      radius: isBright ? 1.5 + rng() * 1.5 : 0.8 + rng() * 1,
      hue: isBright ? "#C9FF56" : "#707782",
    });
  }
  return targets;
}

function generateWorkflow(
  count: number,
  width: number,
  height: number
): ParticleTarget[] {
  const rng = seededRandom(303);
  const targets: ParticleTarget[] = [];
  const nodeCount = 6;
  const nodes: { cx: number; cy: number; hue: string }[] = [];

  for (let n = 0; n < nodeCount; n++) {
    const t = n / (nodeCount - 1);
    const hues = [
      "#A5ABB4",
      "#A5ABB4",
      "#67B7FF",
      "#FF735C",
      "#A5ABB4",
      "#C9FF56",
    ];
    nodes.push({
      cx: width * 0.1 + t * width * 0.8,
      cy: height * 0.5 + Math.sin(t * Math.PI) * height * -0.08,
      hue: hues[n],
    });
  }

  for (let i = 0; i < count; i++) {
    const ni = i % nodeCount;
    const node = nodes[ni];
    const spread = 20 + rng() * 35;
    const angle = rng() * Math.PI * 2;
    const dist = rng() * spread;

    const isConnector = rng() > 0.7 && ni < nodeCount - 1;
    let px: number, py: number;
    if (isConnector) {
      const next = nodes[ni + 1];
      const along = rng();
      px = node.cx + (next.cx - node.cx) * along + (rng() - 0.5) * 10;
      py = node.cy + (next.cy - node.cy) * along + (rng() - 0.5) * 10;
    } else {
      px = node.cx + Math.cos(angle) * dist;
      py = node.cy + Math.sin(angle) * dist;
    }

    targets.push({
      x: px,
      y: py,
      opacity: isConnector ? 0.15 + rng() * 0.2 : 0.3 + rng() * 0.5,
      radius: isConnector ? 0.8 + rng() * 0.5 : 1.2 + rng() * 1.5,
      hue: isConnector ? "#707782" : node.hue,
    });
  }
  return targets;
}

function generateOperatingSystem(
  count: number,
  width: number,
  height: number
): ParticleTarget[] {
  const rng = seededRandom(404);
  const targets: ParticleTarget[] = [];
  const cx = width * 0.5;
  const cy = height * 0.5;
  const armCount = 6;
  const maxRadius = Math.min(width, height) * 0.36;

  for (let i = 0; i < count; i++) {
    const roll = rng();

    if (roll < 0.38) {
      const angle = rng() * Math.PI * 2;
      const dist = Math.pow(rng(), 1.6) * 60;
      targets.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        opacity: 0.5 + rng() * 0.45,
        radius: 1.3 + rng() * 2,
        hue: roll < 0.12 ? "#C9FF56" : "#F3F4F0",
      });
    } else {
      const arm = Math.floor(rng() * armCount);
      const armAngle = (arm / armCount) * Math.PI * 2 - Math.PI / 2;
      const along = Math.pow(rng(), 0.65);
      const dist = 55 + along * maxRadius;
      const perp = (rng() - 0.5) * 16 * (1 - along * 0.4);
      const px =
        cx +
        Math.cos(armAngle) * dist +
        Math.cos(armAngle + Math.PI / 2) * perp;
      const py =
        cy +
        Math.sin(armAngle) * dist +
        Math.sin(armAngle + Math.PI / 2) * perp;

      targets.push({
        x: px,
        y: py,
        opacity: 0.1 + (1 - along) * 0.38,
        radius: 0.9 + rng() * 1.2,
        hue: rng() > 0.88 ? "#67B7FF" : "#A5ABB4",
      });
    }
  }
  return targets;
}

function generateFeedback(
  count: number,
  width: number,
  height: number
): ParticleTarget[] {
  const rng = seededRandom(505);
  const targets: ParticleTarget[] = [];
  const cx = width * 0.5;
  const cy = height * 0.5;

  for (let i = 0; i < count; i++) {
    const ring = rng();
    let angle: number, dist: number, hue: string, opacity: number;

    if (ring < 0.25) {
      angle = rng() * Math.PI * 2;
      dist = rng() * 45;
      hue = "#C9FF56";
      opacity = 0.4 + rng() * 0.5;
    } else if (ring < 0.6) {
      angle = rng() * Math.PI * 2;
      dist = 60 + rng() * 100;
      hue = "#A5ABB4";
      opacity = 0.2 + rng() * 0.35;
    } else {
      angle = rng() * Math.PI * 2;
      dist = 110 + rng() * 150;
      const curveBack = Math.sin(angle * 3) * 0.3;
      dist *= 1 + curveBack;
      hue = rng() > 0.85 ? "#67B7FF" : "#707782";
      opacity = 0.1 + rng() * 0.25;
    }

    targets.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      opacity,
      radius: 1 + rng() * 1.5,
      hue,
    });
  }
  return targets;
}

const generators: Record<
  SwarmStateName,
  (count: number, w: number, h: number) => ParticleTarget[]
> = {
  noise: generateNoise,
  pattern: generatePattern,
  priority: generatePriority,
  workflow: generateWorkflow,
  operatingSystem: generateOperatingSystem,
  feedback: generateFeedback,
};

const cache = new Map<string, ParticleTarget[]>();

export function getStateTargets(
  state: SwarmStateName,
  count: number,
  width: number,
  height: number
): ParticleTarget[] {
  const key = `${state}-${count}-${Math.round(width)}-${Math.round(height)}`;
  const cached = cache.get(key);
  if (cached) return cached;

  const targets = generators[state](count, width, height);
  cache.set(key, targets);
  return targets;
}

export function clearStateCache(): void {
  cache.clear();
}
