import {
  SWARM_STATE_3D_ORDER,
  getState3DTargets,
  clearState3DCache,
  type Particle3DTarget,
} from "./swarm-states-3d";

export interface Particle3D {
  // world position
  x: number;
  y: number;
  z: number;
  // visual
  opacity: number;
  radius: number;
  hue: string;
  // motion
  vx: number;
  vy: number;
  vz: number;
  delay: number;
}

export interface SwarmEngine3DConfig {
  particleCount: number;
  lerpSpeed: number;
  pointerRadius: number;
  pointerStrength: number;
  driftStrength: number;
  fov: number;
  shadowOpacity: number;
}

const DEFAULT_CONFIG: SwarmEngine3DConfig = {
  particleCount: 600,
  lerpSpeed: 0.022,
  pointerRadius: 130,
  pointerStrength: 0.35,
  driftStrength: 0.12,
  fov: 550,
  shadowOpacity: 0.06,
};

export class SwarmEngine3D {
  particles: Particle3D[] = [];
  private config: SwarmEngine3DConfig;
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

  constructor(config?: Partial<SwarmEngine3DConfig>) {
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
    const targets = getState3DTargets(
      "scatter",
      this.config.particleCount,
      this.width,
      this.height
    );

    for (let i = 0; i < this.config.particleCount; i++) {
      const t: Particle3DTarget = targets[i] || {
        x: rng() * this.width,
        y: rng() * this.height,
        z: (rng() - 0.5) * 200,
        opacity: 0.15,
        radius: 1,
        hue: "#707782",
      };
      this.particles.push({
        x: t.x,
        y: t.y,
        z: t.z,
        opacity: t.opacity,
        radius: t.radius,
        hue: t.hue,
        vx: 0,
        vy: 0,
        vz: 0,
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
    clearState3DCache();
  }

  setStateIndex(index: number): void {
    this.stateIndex = Math.max(
      0,
      Math.min(index, SWARM_STATE_3D_ORDER.length - 1)
    );
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
    const ceilState = Math.min(
      floorState + 1,
      SWARM_STATE_3D_ORDER.length - 1
    );
    const blend = this.stateIndex - floorState;

    const fromName = SWARM_STATE_3D_ORDER[floorState];
    const toName = SWARM_STATE_3D_ORDER[ceilState];

    const fromTargets = getState3DTargets(
      fromName,
      this.config.particleCount,
      this.width,
      this.height
    );
    const toTargets = getState3DTargets(
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

      const tx = from.x + (to.x - from.x) * blend;
      const ty = from.y + (to.y - from.y) * blend;
      const tz = from.z + (to.z - from.z) * blend;
      const to_opacity = from.opacity + (to.opacity - from.opacity) * blend;
      const to_radius = from.radius + (to.radius - from.radius) * blend;

      const effectiveLerp = lerpSpeed * (1 - p.delay * 0.45);

      p.x += (tx - p.x) * effectiveLerp;
      p.y += (ty - p.y) * effectiveLerp;
      p.z += (tz - p.z) * effectiveLerp;
      p.opacity += (to_opacity - p.opacity) * effectiveLerp;
      p.radius += (to_radius - p.radius) * effectiveLerp;
      p.hue = blend < 0.5 ? from.hue : to.hue;

      // Gentle drift in early scatter state
      if (this.stateIndex < 0.5) {
        p.vx += (Math.random() - 0.5) * driftStrength;
        p.vy += (Math.random() - 0.5) * driftStrength;
        p.vz += (Math.random() - 0.5) * driftStrength * 0.5;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vz *= 0.94;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;
      }

      // Pointer repulsion (screen-space projection)
      if (this.pointerActive) {
        const proj = this.project(p.x, p.y, p.z);
        const dx = proj.sx - this.pointerX;
        const dy = proj.sy - this.pointerY;
        const distSq = dx * dx + dy * dy;
        const radiusSq = pointerRadius * pointerRadius;
        if (distSq < radiusSq && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const force = (1 - dist / pointerRadius) * pointerStrength;
          p.x += (dx / dist) * force * 1.2;
          p.y += (dy / dist) * force * 1.2;
          p.z += (Math.random() - 0.5) * force * 20;
        }
      }
    }
  }

  /** Project world coords to screen coords using perspective */
  private project(
    wx: number,
    wy: number,
    wz: number
  ): { sx: number; sy: number; f: number } {
    const { fov } = this.config;
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    const f = fov / (fov + wz);
    return {
      sx: cx + (wx - cx) * f,
      sy: cy + (wy - cy) * f,
      f,
    };
  }

  private render(): void {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Sort back-to-front (painter's algorithm) for correct depth overlap
    const sorted = this.particles
      .map((p, i) => ({ p, i }))
      .sort((a, b) => a.p.z - b.p.z);

    // Draw shadow layer first (cluster centroid shadow)
    this.drawShadow(sorted.map((s) => s.p));

    // Draw particles
    for (const { p } of sorted) {
      if (p.opacity < 0.02) continue;
      const { sx, sy, f } = this.project(p.x, p.y, p.z);
      const r = p.radius * Math.max(f, 0.15);
      const alpha = p.opacity * Math.min(Math.max(f, 0.25), 1.1);
      if (alpha < 0.02 || r < 0.1) continue;

      this.ctx.globalAlpha = Math.min(alpha, 1);
      this.ctx.fillStyle = p.hue;
      this.ctx.beginPath();
      this.ctx.arc(sx, sy, r, 0, Math.PI * 2);
      this.ctx.fill();
    }

    this.ctx.globalAlpha = 1;
  }

  /** Draw a soft elliptical shadow below the particle cluster centroid */
  private drawShadow(particles: Particle3D[]): void {
    if (!this.ctx) return;
    const { shadowOpacity } = this.config;
    if (shadowOpacity <= 0) return;

    // Find centroid of visible particles
    let sumX = 0, sumY = 0, count = 0;
    for (const p of particles) {
      if (p.opacity < 0.1) continue;
      const { sx, sy } = this.project(p.x, p.y, p.z);
      sumX += sx;
      sumY += sy;
      count++;
    }
    if (count === 0) return;

    const cx = sumX / count;
    const cy = sumY / count;

    // Shadow offset below the centroid
    const shadowY = cy + this.height * 0.12;
    const shadowRx = this.width * 0.22;
    const shadowRy = this.height * 0.04;

    const grad = this.ctx.createRadialGradient(
      cx,
      shadowY,
      0,
      cx,
      shadowY,
      shadowRx
    );
    grad.addColorStop(0, `rgba(0,0,0,${shadowOpacity * 1.6})`);
    grad.addColorStop(0.4, `rgba(0,0,0,${shadowOpacity})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");

    this.ctx.save();
    this.ctx.scale(1, shadowRy / shadowRx);
    this.ctx.globalAlpha = 1;
    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(cx, shadowY * (shadowRx / shadowRy), shadowRx, 0, Math.PI * 2);
    this.ctx.fill();
    this.ctx.restore();
  }

  renderStatic(): void {
    if (!this.ctx) return;

    const stateIdx = Math.round(this.stateIndex);
    const stateName = SWARM_STATE_3D_ORDER[stateIdx];
    const targets = getState3DTargets(
      stateName,
      this.config.particleCount,
      this.width,
      this.height
    );

    this.ctx.clearRect(0, 0, this.width, this.height);

    const sorted = [...targets].sort((a, b) => a.z - b.z);

    for (const t of sorted) {
      if (t.opacity < 0.02) continue;
      const { sx, sy, f } = this.project(t.x, t.y, t.z);
      const r = t.radius * Math.max(f, 0.15);
      const alpha = t.opacity * Math.min(Math.max(f, 0.25), 1.1);
      if (alpha < 0.02 || r < 0.1) continue;

      this.ctx.globalAlpha = Math.min(alpha, 1);
      this.ctx.fillStyle = t.hue;
      this.ctx.beginPath();
      this.ctx.arc(sx, sy, r, 0, Math.PI * 2);
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
