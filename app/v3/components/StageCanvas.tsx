"use client";

/**
 * StageCanvas
 *
 * A compact canvas showing a fixed phase of the particle system.
 * Uses the same visual language as ParticleCanvas but is self-contained,
 * runs its own gentle ambient animation, and is driven by a static
 * `phase` value (0-1) rather than scroll.
 *
 * Phases used in WhatWeDo:
 *  Find    → phase ~0.42 (clustering)
 *  Build   → phase ~0.78 (workflow)
 *  Improve → phase ~0.94 (stable)
 */

import { useEffect, useRef } from "react";

type PType = "idle" | "priority" | "system" | "human";

interface MiniParticle {
  id: number;
  sx: number; // scatter x (normalized)
  sy: number;
  clusterId: 0 | 1;
  strength: number;
  size: number;
  phase: number;
  type: PType;
}

const TYPE_RGB: Record<PType, string> = {
  idle:     "242, 243, 238",
  priority: "213, 255, 79",
  system:   "101, 175, 255",
  human:    "255, 121, 95",
};

function sr(s: number) {
  const x = Math.sin(s + 1) * 10000;
  return x - Math.floor(x);
}

function easeOut(t: number) {
  const tt = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - tt, 3);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

const N_MINI = 38;

function makeMiniParticles(): MiniParticle[] {
  return Array.from({ length: N_MINI }, (_, i) => {
    const clusterId = (Math.floor(sr(i * 13 + 3) * 2)) as 0 | 1;
    const inSel = clusterId === 1;
    let type: PType = "idle";
    const roll = sr(i * 13 + 7);
    if (inSel) {
      if (roll < 0.18)      type = "priority";
      else if (roll < 0.42) type = "system";
      else if (roll < 0.56) type = "human";
    }
    return {
      id:        i,
      sx:        sr(i * 13 + 1) * 0.88 + 0.06,
      sy:        sr(i * 13 + 2) * 0.80 + 0.08,
      clusterId,
      strength:  sr(i * 13 + 4),
      size:      0.65 + sr(i * 13 + 5) * 0.9,
      phase:     sr(i * 13 + 6) * Math.PI * 2,
      type,
    };
  });
}

const MINI_PARTICLES = makeMiniParticles();
const MINI_SEL = MINI_PARTICLES.filter((p) => p.clusterId === 1);

/* Cluster centres for the mini canvas */
const MINI_CENTERS = [
  { x: 0.28, y: 0.50 },
  { x: 0.72, y: 0.48 },
];

function getWorkflowPos(idx: number, total: number): { x: number; y: number } {
  const cols = Math.min(total, 5);
  const col  = idx % cols;
  const row  = Math.floor(idx / cols);
  return {
    x: 0.14 + (col / Math.max(cols - 1, 1)) * 0.72,
    y: 0.38 + row * 0.16,
  };
}

interface StageCanvasProps {
  /** 0-1 - which animation phase to render */
  phase: number;
  width?: number;
  height?: number;
}

export default function StageCanvas({ phase, width = 340, height = 200 }: StageCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = width;
    let H = height;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      W = rect.width  || width;
      H = rect.height || height;
      canvas.width  = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx!.resetTransform();
      ctx!.scale(dpr, dpr);
    }
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    function getPos(p: MiniParticle, t: number) {
      const prog = phase;
      const cx   = MINI_CENTERS[p.clusterId].x * W;
      const cy   = MINI_CENTERS[p.clusterId].y * H;
      const sx   = p.sx * W;
      const sy   = p.sy * H;
      const offX = (sr(p.id * 19 + 8) * 0.10 - 0.05) * W;
      const offY = (sr(p.id * 19 + 9) * 0.10 - 0.05) * H;
      const amb  = Math.sin(t * 0.25 + p.phase) * 3;
      const ambY = Math.cos(t * 0.20 + p.phase) * 2;

      const survives = p.strength >= 0.35;
      let fadeMult = 1;
      if (!survives) {
        if      (prog < 0.20) fadeMult = 1;
        else if (prog < 0.38) fadeMult = easeOut(1 - (prog - 0.20) / 0.18);
        else                  fadeMult = 0;
      }

      let x: number, y: number, opacity: number, size: number, rgb: string;
      rgb = TYPE_RGB[p.type];

      if (prog <= 0.38) {
        x = sx + amb; y = sy + ambY;
        opacity = (p.type === "idle" ? 0.20 : 0.50) * fadeMult;
        size    = p.size;
      } else if (prog <= 0.56) {
        const tt = easeOut((prog - 0.38) / 0.18);
        x = lerp(sx, cx + offX, tt) + amb * (1 - tt * 0.5);
        y = lerp(sy, cy + offY, tt) + ambY * (1 - tt * 0.5);
        opacity = (p.type === "idle" ? 0.22 : 0.52) * fadeMult;
        size    = p.size;
      } else if (prog <= 0.70) {
        const tt = easeOut((prog - 0.56) / 0.14);
        x = cx + offX + amb * 0.4;
        y = cy + offY + ambY * 0.4;
        if (p.clusterId === 1) {
          opacity = lerp(0.52, 0.88, tt) * fadeMult;
          size    = p.size * lerp(1, 1.4, tt);
          rgb     = p.type === "idle" ? "213, 255, 79" : rgb;
        } else {
          opacity = lerp(0.22, 0.07, tt) * fadeMult;
          size    = p.size;
        }
      } else if (prog <= 0.85) {
        const tt = easeOut((prog - 0.70) / 0.15);
        if (p.clusterId === 1) {
          const idx = MINI_SEL.indexOf(p);
          const wp  = getWorkflowPos(idx, MINI_SEL.length);
          const stX = cx + offX;
          const stY = cy + offY;
          x = lerp(stX, wp.x * W, tt) + amb * (1 - tt) * 0.3;
          y = lerp(stY, wp.y * H, tt) + ambY * (1 - tt) * 0.3;
          opacity = lerp(0.88, 0.90, tt) * fadeMult;
          size    = p.size * lerp(1.4, 1.55, tt);
          rgb     = p.type === "idle" ? "213, 255, 79" : rgb;
        } else {
          x = cx + offX + amb * 0.3;
          y = cy + offY + ambY * 0.3;
          opacity = lerp(0.07, 0.04, tt) * fadeMult;
          size    = p.size * 0.8;
        }
      } else {
        if (p.clusterId === 1) {
          const idx = MINI_SEL.indexOf(p);
          const wp  = getWorkflowPos(idx, MINI_SEL.length);
          x = wp.x * W + amb * 0.25;
          y = wp.y * H + ambY * 0.25;
          const breathe = 0.92 + Math.sin(t * 0.38 + p.phase) * 0.08;
          opacity = 0.90 * breathe * fadeMult;
          size    = p.size * 1.55;
          rgb     = p.type === "idle" ? "213, 255, 79" : rgb;
        } else {
          x = cx + offX + amb * 0.2;
          y = cy + offY + ambY * 0.2;
          opacity = 0.04 * fadeMult;
          size    = p.size * 0.7;
        }
      }

      return { x, y, opacity: Math.max(0, Math.min(1, opacity)), size, rgb };
    }

    function draw(ts: number) {
      if (W === 0 || H === 0) { rafRef.current = requestAnimationFrame(draw); return; }
      const t = ts / 1000;
      ctx!.clearRect(0, 0, W, H);

      /* Connection lines */
      if (phase > 0.56) {
        const ca = easeOut((phase - 0.56) / 0.14);
        for (const p of MINI_PARTICLES.filter(p => p.clusterId === 1 && p.strength >= 0.35)) {
          for (const q of MINI_PARTICLES.filter(p => p.clusterId === 1 && p.strength >= 0.35)) {
            if (p.id >= q.id) continue;
            const s1 = getPos(p, t);
            const s2 = getPos(q, t);
            const d  = Math.hypot(s1.x - s2.x, s1.y - s2.y);
            if (d > 90) continue;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(213, 255, 79, ${0.16 * ca})`;
            ctx!.lineWidth   = 0.7;
            ctx!.moveTo(s1.x, s1.y);
            ctx!.lineTo(s2.x, s2.y);
            ctx!.stroke();
          }
        }
        if (phase > 0.70) {
          const wa = easeOut((phase - 0.70) / 0.15);
          for (let i = 0; i < MINI_SEL.length - 1; i++) {
            const s1 = getPos(MINI_SEL[i], t);
            const s2 = getPos(MINI_SEL[i + 1], t);
            if (Math.hypot(s1.x - s2.x, s1.y - s2.y) > 100) continue;
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(213, 255, 79, ${0.14 * wa})`;
            ctx!.lineWidth   = 0.6;
            ctx!.moveTo(s1.x, s1.y);
            ctx!.lineTo(s2.x, s2.y);
            ctx!.stroke();
          }
        }
      }

      /* Particles */
      for (const p of MINI_PARTICLES) {
        const s = getPos(p, t);
        if (s.opacity < 0.005) continue;

        ctx!.save();
        ctx!.globalAlpha = s.opacity;

        if (p.type !== "idle" || (p.clusterId === 1 && phase >= 0.56)) {
          const hR   = Math.min(s.size * 5, 7);
          const hRgb = p.clusterId === 1 && phase >= 0.56
            ? (p.type === "idle" ? "213, 255, 79" : s.rgb)
            : s.rgb;
          const g    = ctx!.createRadialGradient(s.x, s.y, 0, s.x, s.y, hR);
          g.addColorStop(0, `rgba(${hRgb}, 0.20)`);
          g.addColorStop(1, `rgba(${hRgb}, 0)`);
          ctx!.globalAlpha = s.opacity * 0.45;
          ctx!.fillStyle   = g;
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, hR, 0, Math.PI * 2);
          ctx!.fill();
          ctx!.globalAlpha = s.opacity;
        }

        ctx!.fillStyle = `rgba(${s.rgb}, 1)`;
        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx!.fill();
        ctx!.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) draw(0);
    else rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, width, height]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
