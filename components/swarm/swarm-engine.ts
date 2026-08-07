import {
  SWARM_STATE_ORDER,
  getStateTargets,
  clearStateCache,
} from "./swarm-states";

export interface Particle {
  x: number;
  y: number;
  opacity: number;
  radius: number;
  hue: string;
  vx: number;
  vy: number;
  delay: number;
}

export interface SwarmEngineConfig {
  particleCount: number;
  lerpSpeed: number;
  pointerRadius: number;
  pointerStrength: number;
  driftStrength: number;
}

const DEFAULT_CONFIG: SwarmEngineConfig = {
  particleCount: 600,
  lerpSpeed: 0.025,
  pointerRadius: 120,
  pointerStrength: 0.3,
  driftStrength: 0.15,
};

export class SwarmEngine {
  particles: Particle[] = [];
  private config: SwarmEngineConfig;
  private width = 0;
  private height = 0;
  private stateIndex = 0;
  private pointerX = -1000;
  private pointerY = -1000;
  private pointerActive = false;
  private reducedMotion = false;
  private animId: number | null = null;
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private isVisible = true;
  private isPageVisible = true;
  private dpr = 1;

  constructor(config?: Partial<SwarmEngineConfig>) {
    this.config = { ...DEFAULT_CONFIG, ...config };
  }

  init(canvas: HTMLCanvasElement, reducedMotion: boolean): void {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { alpha: true });
    this.reducedMotion = reducedMotion;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.resize();
    this.initParticles();

    if (!reducedMotion) {
      this.startLoop();
    } else {
      this.renderStatic();
    }
  }

  private initParticles(): void {
    const rng = this.seededRandom(7);
    this.particles = [];
    const targets = getStateTargets(
      "noise",
      this.config.particleCount,
      this.width,
      this.height
    );

    for (let i = 0; i < this.config.particleCount; i++) {
      const t = targets[i] || {
        x: rng() * this.width,
        y: rng() * this.height,
        opacity: 0.2,
        radius: 1,
        hue: "#707782",
      };
      this.particles.push({
        x: t.x,
        y: t.y,
        opacity: t.opacity,
        radius: t.radius,
        hue: t.hue,
        vx: 0,
        vy: 0,
        delay: rng() * 0.8,
      });
    }
  }

  resize(): void {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = rect.width * this.dpr;
    this.canvas.height = rect.height * this.dpr;
    this.ctx?.scale(this.dpr, this.dpr);
    clearStateCache();
  }

  setStateIndex(index: number): void {
    this.stateIndex = Math.max(0, Math.min(index, SWARM_STATE_ORDER.length - 1));
    if (this.reducedMotion) {
      this.renderStatic();
    }
  }

  setPointer(x: number, y: number): void {
    if (this.reducedMotion) return;
    this.pointerX = x;
    this.pointerY = y;
    this.pointerActive = true;
  }

  clearPointer(): void {
    this.pointerActive = false;
  }

  setVisibility(visible: boolean): void {
    this.isVisible = visible;
    if (visible && !this.reducedMotion && !this.animId) {
      this.startLoop();
    }
  }

  setPageVisibility(visible: boolean): void {
    this.isPageVisible = visible;
    if (visible && !this.reducedMotion && !this.animId) {
      this.startLoop();
    }
  }

  private startLoop(): void {
    if (this.animId) return;
    const loop = () => {
      if (!this.isVisible || !this.isPageVisible) {
        this.animId = null;
        return;
      }
      this.update();
      this.render();
      this.animId = requestAnimationFrame(loop);
    };
    this.animId = requestAnimationFrame(loop);
  }

  stop(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
      this.animId = null;
    }
  }

  private update(): void {
    const floorState = Math.floor(this.stateIndex);
    const ceilState = Math.min(floorState + 1, SWARM_STATE_ORDER.length - 1);
    const blend = this.stateIndex - floorState;

    const fromName = SWARM_STATE_ORDER[floorState];
    const toName = SWARM_STATE_ORDER[ceilState];

    const fromTargets = getStateTargets(
      fromName,
      this.config.particleCount,
      this.width,
      this.height
    );
    const toTargets = getStateTargets(
      toName,
      this.config.particleCount,
      this.width,
      this.height
    );

    const { lerpSpeed, pointerRadius, pointerStrength, driftStrength } =
      this.config;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const from = fromTargets[i % fromTargets.length];
      const to = toTargets[i % toTargets.length];

      const targetX = from.x + (to.x - from.x) * blend;
      const targetY = from.y + (to.y - from.y) * blend;
      const targetOpacity = from.opacity + (to.opacity - from.opacity) * blend;
      const targetRadius = from.radius + (to.radius - from.radius) * blend;

      const effectiveLerp = lerpSpeed * (1 - p.delay * 0.5);

      p.x += (targetX - p.x) * effectiveLerp;
      p.y += (targetY - p.y) * effectiveLerp;
      p.opacity += (targetOpacity - p.opacity) * effectiveLerp;
      p.radius += (targetRadius - p.radius) * effectiveLerp;
      p.hue = blend < 0.5 ? from.hue : to.hue;

      if (this.stateIndex < 0.5) {
        p.vx += (Math.random() - 0.5) * driftStrength;
        p.vy += (Math.random() - 0.5) * driftStrength;
        p.vx *= 0.95;
        p.vy *= 0.95;
        p.x += p.vx;
        p.y += p.vy;
      }

      if (this.pointerActive) {
        const dx = p.x - this.pointerX;
        const dy = p.y - this.pointerY;
        const distSq = dx * dx + dy * dy;
        const radiusSq = pointerRadius * pointerRadius;
        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / pointerRadius) * pointerStrength;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }
    }
  }

  private render(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (p.opacity < 0.02) continue;

      this.ctx.globalAlpha = p.opacity;
      this.ctx.fillStyle = p.hue;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
  }

  renderStatic(): void {
    if (!this.ctx) return;

    const stateIdx = Math.round(this.stateIndex);
    const stateName = SWARM_STATE_ORDER[stateIdx];
    const targets = getStateTargets(
      stateName,
      this.config.particleCount,
      this.width,
      this.height
    );

    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < targets.length; i++) {
      const t = targets[i];
      if (t.opacity < 0.02) continue;
      this.ctx.globalAlpha = t.opacity;
      this.ctx.fillStyle = t.hue;
      this.ctx.beginPath();
      this.ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
  }

  destroy(): void {
    this.stop();
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
  }

  private seededRandom(seed: number): () => number {
    let s = seed;
    return () => {
      s = (s * 16807 + 0) % 2147483647;
      return s / 2147483647;
    };
  }
}
