"use client";

/**
 * ParticleCanvas
 *
 * Fixed, full-viewport canvas behind all page content. Scroll progress
 * (0 → 1 mapped from page top to ~65% scrolled) drives six animation
 * phases that visualise the consultancy's core process:
 *
 *  Phase 0  (0.00-0.20)  All signals scattered - broad landscape
 *  Phase 1  (0.20-0.38)  Weak signals fade - signal/noise separation
 *  Phase 2  (0.38-0.56)  Survivors cluster - opportunity grouping
 *  Phase 3  (0.56-0.70)  One cluster selected - prioritised use case
 *  Phase 4  (0.70-0.85)  Selected becomes a workflow - implementation
 *  Phase 5  (0.85-1.00)  Stable operational capability - steady state
 *
 * Colours follow the signal-theme palette strictly.
 * Respects prefers-reduced-motion (renders a single static frame).
 */

import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

/* ── Types ────────────────────────────────────────────────────── */
type PType = "idle" | "priority" | "system" | "human";

interface Particle {
  id: number;
  scatterX: number; // normalized 0-1
  scatterY: number;
  clusterId: 0 | 1 | 2;
  strength: number; // 0-1 - lower values fade in phase 1
  baseSize: number; // px
  phase: number; // oscillation offset
  type: PType;
}

interface PState {
  x: number; // world px
  y: number;
  opacity: number;
  size: number;
  rgb: string; // "R, G, B" for rgba()
}

/* ── Constants ────────────────────────────────────────────────── */
const N = 88;
const SELECTED_CLUSTER = 1;

/** Cluster centres in normalized 0-1 coords */
const CENTERS: Array<{ x: number; y: number }> = [
  { x: 0.21, y: 0.42 },
  { x: 0.60, y: 0.50 },
  { x: 0.82, y: 0.30 },
];

const TYPE_RGB: Record<PType, string> = {
  idle:     "242, 243, 238",
  priority: "213, 255, 79",
  system:   "101, 175, 255",
  human:    "255, 121, 95",
};

/* ── Seeded pseudo-random (deterministic) ─────────────────────── */
function sr(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

/* ── Easing helpers ───────────────────────────────────────────── */
function easeOut(t: number, exp = 3): number {
  return 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), exp);
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

/* ── Particle generation ──────────────────────────────────────── */
function makeParticles(): Particle[] {
  return Array.from({ length: N }, (_, i) => {
    const clusterId = (Math.floor(sr(i * 11 + 3) * 3)) as 0 | 1 | 2;
    const inSelected = clusterId === SELECTED_CLUSTER;

    let type: PType = "idle";
    const roll = sr(i * 11 + 7);
    if (inSelected) {
      if (roll < 0.14)      type = "priority";
      else if (roll < 0.38) type = "system";
      else if (roll < 0.52) type = "human";
    } else {
      if (roll < 0.04) type = "priority";
    }

    return {
      id:       i,
      scatterX: sr(i * 11 + 1) * 0.94 + 0.03,
      scatterY: sr(i * 11 + 2) * 0.82 + 0.06,
      clusterId,
      strength: sr(i * 11 + 4),
      baseSize: 0.7 + sr(i * 11 + 5) * 1.1,
      phase:    sr(i * 11 + 6) * Math.PI * 2,
      type,
    };
  });
}

/* Cluster-local offsets (deterministic per particle) */
function clusterOff(p: Particle, scale: number): { dx: number; dy: number } {
  return {
    dx: (sr(p.id * 17 + 8) * 0.07 - 0.035) * scale,
    dy: (sr(p.id * 17 + 9) * 0.07 - 0.035) * scale,
  };
}

/* ── Workflow positions for the selected cluster ──────────────── */
function makeWorkflowPositions(selected: Particle[]): Array<{ x: number; y: number }> {
  const cx = CENTERS[SELECTED_CLUSTER].x;
  const cy = CENTERS[SELECTED_CLUSTER].y;

  return selected.map((_, i) => {
    const col = i % 5;
    const row = Math.floor(i / 5);
    return {
      x: cx - 0.19 + (col / 4) * 0.38,
      y: cy - 0.09 + row * 0.09,
    };
  });
}

/* ── Precomputed data ─────────────────────────────────────────── */
const PARTICLES = makeParticles();
const SEL_PARTICLES = PARTICLES.filter((p) => p.clusterId === SELECTED_CLUSTER);
const WF_POSITIONS = makeWorkflowPositions(SEL_PARTICLES);

/* ── Component ────────────────────────────────────────────────── */
export default function ParticleCanvas() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const rafRef      = useRef<number | null>(null);

  /* Scroll → animation progress (0 → 1 over first 65% of page) */
  const { scrollYProgress } = useScroll();
  const animProgress = useTransform(scrollYProgress, [0, 0.65], [0, 1]);

  useMotionValueEvent(animProgress, "change", (v) => {
    progressRef.current = clamp01(v);
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    /* ── Resize ─────────────────────────────────────────────── */
    function resize() {
      if (!canvas) return;
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width  = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx!.resetTransform();
      ctx!.scale(dpr, dpr);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(document.documentElement);

    /* ── Particle state calculator ──────────────────────────── */
    function getState(p: Particle, prog: number, t: number): PState {
      if (W === 0 || H === 0) return { x: 0, y: 0, opacity: 0, size: 0, rgb: "" };

      const cx = CENTERS[p.clusterId].x * W;
      const cy = CENTERS[p.clusterId].y * H;
      const sx = p.scatterX * W;
      const sy = p.scatterY * H;
      const off = clusterOff(p, W);
      const offY = clusterOff(p, H);

      /* Ambient oscillation */
      const amb  = Math.sin(t * 0.28 + p.phase) * 5;
      const ambY = Math.cos(t * 0.22 + p.phase) * 4;

      /* Survival: strength < 0.35 → fade out in phase 1 */
      const survives = p.strength >= 0.35;
      let fadeMult = 1;
      if (!survives) {
        if      (prog < 0.20) fadeMult = 1;
        else if (prog < 0.38) fadeMult = easeOut(1 - (prog - 0.20) / 0.18);
        else                  fadeMult = 0;
      }

      let x: number, y: number, opacity: number, size: number, rgb: string;
      rgb = TYPE_RGB[p.type];

      /* ── Phase 0: Scattered (0 → 0.38) ─── */
      if (prog <= 0.38) {
        x = sx + amb;
        y = sy + ambY;
        const baseOp =
          p.type === "idle"     ? 0.18 :
          p.type === "priority" ? 0.55 : 0.38;
        opacity = baseOp * fadeMult;
        size    = p.baseSize + (p.type !== "idle" ? 0.4 : 0);
      }
      /* ── Phase 1: Clustering (0.38 → 0.56) ─── */
      else if (prog <= 0.56) {
        const tt = easeOut((prog - 0.38) / 0.18);
        x = lerp(sx, cx + off.dx, tt)  + amb  * (1 - tt * 0.6);
        y = lerp(sy, cy + offY.dy, tt) + ambY * (1 - tt * 0.6);
        const baseOp = p.type === "idle" ? 0.22 : 0.50;
        opacity = baseOp * fadeMult;
        size    = p.baseSize;
      }
      /* ── Phase 2: Selection (0.56 → 0.70) ─── */
      else if (prog <= 0.70) {
        const tt = easeOut((prog - 0.56) / 0.14);
        x = cx + off.dx  + amb  * 0.5;
        y = cy + offY.dy + ambY * 0.5;

        if (p.clusterId === SELECTED_CLUSTER) {
          opacity = lerp(0.50, 0.88, tt) * fadeMult;
          size    = p.baseSize * lerp(1, 1.4, tt);
          /* Idle particles in selected cluster shift toward accent */
          rgb     = p.type === "idle" ? "213, 255, 79" : TYPE_RGB[p.type];
        } else {
          opacity = lerp(0.22, 0.07, tt) * fadeMult;
          size    = p.baseSize;
        }
      }
      /* ── Phase 3: Workflow (0.70 → 0.85) ─── */
      else if (prog <= 0.85) {
        const tt = easeOut((prog - 0.70) / 0.15);

        if (p.clusterId === SELECTED_CLUSTER) {
          const idx = SEL_PARTICLES.indexOf(p);
          const wp  = WF_POSITIONS[idx];
          const startX = cx + off.dx;
          const startY = cy + offY.dy;
          x = lerp(startX, wp.x * W, tt) + amb  * (1 - tt) * 0.3;
          y = lerp(startY, wp.y * H, tt) + ambY * (1 - tt) * 0.3;
          opacity = lerp(0.88, 0.90, tt) * fadeMult;
          size    = p.baseSize * lerp(1.4, 1.55, tt);
          rgb     = p.type === "idle" ? "213, 255, 79" : TYPE_RGB[p.type];
        } else {
          x = cx + off.dx  + amb  * 0.3;
          y = cy + offY.dy + ambY * 0.3;
          opacity = lerp(0.07, 0.04, tt) * fadeMult;
          size    = p.baseSize * 0.8;
        }
      }
      /* ── Phase 4: Stable (0.85 → 1.0) ─── */
      else {
        if (p.clusterId === SELECTED_CLUSTER) {
          const idx = SEL_PARTICLES.indexOf(p);
          const wp  = WF_POSITIONS[idx];
          x = wp.x * W + amb * 0.3;
          y = wp.y * H + ambY * 0.3;
          const breathe = 0.92 + Math.sin(t * 0.4 + p.phase) * 0.08;
          opacity = 0.90 * breathe * fadeMult;
          size    = p.baseSize * 1.55;
          rgb     = p.type === "idle" ? "213, 255, 79" : TYPE_RGB[p.type];
        } else {
          x = cx + off.dx  + amb  * 0.25;
          y = cy + offY.dy + ambY * 0.25;
          opacity = 0.04 * fadeMult;
          size    = p.baseSize * 0.7;
        }
      }

      return { x, y, opacity: clamp01(opacity), size, rgb };
    }

    /* ── Connection lines ───────────────────────────────────── */
    function drawConnections(states: PState[], prog: number) {
      if (prog < 0.56) return;
      const connAlpha = easeOut((prog - 0.56) / 0.14);

      /* Intra-cluster connections */
      for (let c = 0; c < 3; c++) {
        const cps = PARTICLES.filter(
          (p) => p.clusterId === c && p.strength >= 0.35
        );
        const isSel = c === SELECTED_CLUSTER;
        const maxDist = isSel ? 110 : 90;
        const lineRgb = isSel ? "213, 255, 79" : "242, 243, 238";
        const baseOp  = isSel ? 0.18 : 0.06;

        for (let i = 0; i < cps.length; i++) {
          for (let j = i + 1; j < cps.length; j++) {
            const s1 = states[cps[i].id];
            const s2 = states[cps[j].id];
            const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
            if (dist > maxDist) continue;

            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(${lineRgb}, ${baseOp * connAlpha})`;
            ctx!.lineWidth   = isSel ? 0.8 : 0.5;
            ctx!.moveTo(s1.x, s1.y);
            ctx!.lineTo(s2.x, s2.y);
            ctx!.stroke();
          }
        }
      }

      /* Sequential workflow connections */
      if (prog > 0.70) {
        const wfAlpha = easeOut((prog - 0.70) / 0.15);
        for (let i = 0; i < SEL_PARTICLES.length - 1; i++) {
          const s1 = states[SEL_PARTICLES[i].id];
          const s2 = states[SEL_PARTICLES[i + 1].id];
          const dist = Math.hypot(s1.x - s2.x, s1.y - s2.y);
          if (dist > 130) continue;

          ctx!.beginPath();
          ctx!.strokeStyle = `rgba(213, 255, 79, ${0.15 * wfAlpha})`;
          ctx!.lineWidth   = 0.7;
          ctx!.moveTo(s1.x, s1.y);
          ctx!.lineTo(s2.x, s2.y);
          ctx!.stroke();
        }
      }
    }

    /* ── Particle renderer ──────────────────────────────────── */
    function drawParticle(p: Particle, s: PState, prog: number) {
      if (s.opacity < 0.005 || s.size < 0.1) return;

      ctx!.save();
      ctx!.globalAlpha = s.opacity;

      /* Soft halo for non-idle or selected cluster particles */
      const hasHalo =
        p.type !== "idle" ||
        (p.clusterId === SELECTED_CLUSTER && prog >= 0.56);

      if (hasHalo) {
        const haloR = Math.min(s.size * 5, 8);
        const grad  = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, haloR);
        const hRgb  =
          p.clusterId === SELECTED_CLUSTER && prog >= 0.56
            ? p.type === "idle" ? "213, 255, 79" : s.rgb
            : s.rgb;
        grad.addColorStop(0, `rgba(${hRgb}, 0.22)`);
        grad.addColorStop(1, `rgba(${hRgb}, 0)`);
        ctx!.globalAlpha = s.opacity * 0.5;
        ctx!.fillStyle   = grad;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, haloR, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.globalAlpha = s.opacity;
      }

      /* Core dot */
      ctx!.fillStyle = `rgba(${s.rgb}, 1)`;
      ctx!.beginPath();
      ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx!.fill();

      ctx!.restore();
    }

    /* ── Main draw loop ─────────────────────────────────────── */
    function draw(ts: number) {
      if (W === 0 || H === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const t    = ts / 1000;
      const prog = progressRef.current;

      ctx!.clearRect(0, 0, W, H);

      /* Pre-compute all states once per frame */
      const states = PARTICLES.map((p) => getState(p, prog, t));

      drawConnections(states, prog);
      PARTICLES.forEach((p) => drawParticle(p, states[p.id], prog));

      rafRef.current = requestAnimationFrame(draw);
    }

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      draw(0);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.88,
      }}
    />
  );
}
