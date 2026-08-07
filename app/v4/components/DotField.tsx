"use client";

/**
 * DotField
 *
 * Fixed, full-viewport canvas with ~1800 tiny dots that reorganize
 * as the user scrolls through the page. Each section triggers a
 * different formation:
 *
 *  Phase 0 (0.00-0.15)  Chaotic - scattered random drift
 *  Phase 1 (0.15-0.35)  Organizing - dots begin clustering
 *  Phase 2 (0.35-0.55)  Networks - connected node structures
 *  Phase 3 (0.55-0.75)  Architecture - structured grid patterns
 *  Phase 4 (0.75-1.00)  Minimal order - calm, settled system
 *
 * Uses Canvas2D for performance. Respects prefers-reduced-motion.
 */

import { useEffect, useRef, useCallback } from "react";

/* ── Constants ────────────────────────────────────────────────── */
const DOT_COUNT = 1800;
const BASE_SIZE = 0.8;
const MAX_SIZE = 1.4;
const CONNECTION_DISTANCE = 65;
const CONNECTION_OPACITY = 0.04;

/* ── Seeded random for deterministic layout ───────────────────── */
function seeded(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

/* ── Easing ───────────────────────────────────────────────────── */
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/* ── Dot data ─────────────────────────────────────────────────── */
interface Dot {
  /** Random scatter position (normalized 0-1) */
  sx: number;
  sy: number;
  /** Oscillation phase offset */
  phase: number;
  /** Speed multiplier for ambient motion */
  speed: number;
  /** Base opacity */
  opacity: number;
  /** Size multiplier */
  size: number;
  /** Grid target position (normalized 0-1) */
  gx: number;
  gy: number;
  /** Cluster target position (normalized 0-1) */
  cx: number;
  cy: number;
  /** Network node position */
  nx: number;
  ny: number;
}

function createDots(): Dot[] {
  const dots: Dot[] = [];
  const gridCols = Math.ceil(Math.sqrt(DOT_COUNT * 1.5));
  const gridRows = Math.ceil(DOT_COUNT / gridCols);

  for (let i = 0; i < DOT_COUNT; i++) {
    const col = i % gridCols;
    const row = Math.floor(i / gridCols);

    // Scatter positions
    const sx = seeded(i * 7 + 1);
    const sy = seeded(i * 7 + 2);

    // Grid positions - evenly distributed with padding
    const gx = 0.08 + (col / (gridCols - 1)) * 0.84;
    const gy = 0.08 + (row / (gridRows - 1)) * 0.84;

    // Cluster positions - 5 loose clusters
    const clusterIdx = Math.floor(seeded(i * 7 + 3) * 5);
    const clusterCenters = [
      { x: 0.2, y: 0.3 },
      { x: 0.75, y: 0.25 },
      { x: 0.5, y: 0.5 },
      { x: 0.25, y: 0.72 },
      { x: 0.78, y: 0.7 },
    ];
    const cc = clusterCenters[clusterIdx];
    const cx = cc.x + (seeded(i * 7 + 4) - 0.5) * 0.22;
    const cy = cc.y + (seeded(i * 7 + 5) - 0.5) * 0.22;

    // Network node positions - tighter clusters with more structure
    const nodeIdx = Math.floor(seeded(i * 7 + 6) * 8);
    const nodeCenters = [
      { x: 0.15, y: 0.2 }, { x: 0.4, y: 0.15 },
      { x: 0.65, y: 0.22 }, { x: 0.85, y: 0.3 },
      { x: 0.25, y: 0.55 }, { x: 0.5, y: 0.5 },
      { x: 0.72, y: 0.6 }, { x: 0.45, y: 0.8 },
    ];
    const nc = nodeCenters[nodeIdx];
    const nx = nc.x + (seeded(i * 11 + 1) - 0.5) * 0.12;
    const ny = nc.y + (seeded(i * 11 + 2) - 0.5) * 0.12;

    dots.push({
      sx, sy,
      phase: seeded(i * 7 + 7) * Math.PI * 2,
      speed: 0.3 + seeded(i * 7 + 8) * 0.7,
      opacity: 0.15 + seeded(i * 7 + 9) * 0.35,
      size: BASE_SIZE + seeded(i * 7 + 10) * (MAX_SIZE - BASE_SIZE),
      gx, gy,
      cx, cy,
      nx, ny,
    });
  }
  return dots;
}

/* ── Precomputed data ─────────────────────────────────────────── */
const DOTS = createDots();

export default function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const rafRef = useRef<number>(0);
  const dimRef = useRef({ w: 0, h: 0 });

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      progressRef.current = clamp(window.scrollY / scrollHeight, 0, 1);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      dimRef.current = { w, h };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx!.resetTransform();
      ctx!.scale(dpr, dpr);
    }
    resize();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    const prefersReduced =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function draw(ts: number) {
      const { w, h } = dimRef.current;
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      const t = ts / 1000;
      const prog = progressRef.current;
      ctx!.clearRect(0, 0, w, h);

      /*
       * Phase transitions:
       * 0.00-0.15: chaotic scatter
       * 0.15-0.35: clustering
       * 0.35-0.55: network nodes
       * 0.55-0.75: structured grid
       * 0.75-1.00: minimal calm
       */

      // Connection drawing for network phase
      if (prog > 0.30 && prog < 0.65) {
        const connAlpha = prog < 0.35
          ? easeInOut((prog - 0.30) / 0.05)
          : prog > 0.55
            ? 1 - easeInOut((prog - 0.55) / 0.10)
            : 1;

        // Only draw connections for a subset to keep performance
        const step = 12;
        for (let i = 0; i < DOT_COUNT; i += step) {
          const d1 = DOTS[i];
          const x1 = d1.nx * w + Math.sin(t * 0.15 + d1.phase) * 3;
          const y1 = d1.ny * h + Math.cos(t * 0.12 + d1.phase) * 3;

          for (let j = i + step; j < DOT_COUNT; j += step) {
            const d2 = DOTS[j];
            const x2 = d2.nx * w + Math.sin(t * 0.15 + d2.phase) * 3;
            const y2 = d2.ny * h + Math.cos(t * 0.12 + d2.phase) * 3;

            const dist = Math.hypot(x1 - x2, y1 - y2);
            if (dist < CONNECTION_DISTANCE) {
              const alpha = CONNECTION_OPACITY * connAlpha * (1 - dist / CONNECTION_DISTANCE);
              ctx!.beginPath();
              ctx!.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
              ctx!.lineWidth = 0.5;
              ctx!.moveTo(x1, y1);
              ctx!.lineTo(x2, y2);
              ctx!.stroke();
            }
          }
        }
      }

      // Draw dots
      for (let i = 0; i < DOT_COUNT; i++) {
        const d = DOTS[i];

        // Ambient oscillation
        const oscX = Math.sin(t * 0.2 * d.speed + d.phase) * 4;
        const oscY = Math.cos(t * 0.15 * d.speed + d.phase + 1) * 3;

        let x: number, y: number, opacity: number, size: number;

        if (prog <= 0.15) {
          // Phase 0: Chaotic scatter
          x = d.sx * w + oscX * 2;
          y = d.sy * h + oscY * 2;
          opacity = d.opacity * 0.5;
          size = d.size * 0.7;
        } else if (prog <= 0.35) {
          // Phase 1: Clustering
          const tt = easeInOut((prog - 0.15) / 0.20);
          x = lerp(d.sx * w, d.cx * w, tt) + oscX * (1 - tt * 0.5);
          y = lerp(d.sy * h, d.cy * h, tt) + oscY * (1 - tt * 0.5);
          opacity = lerp(d.opacity * 0.5, d.opacity * 0.7, tt);
          size = lerp(d.size * 0.7, d.size * 0.85, tt);
        } else if (prog <= 0.55) {
          // Phase 2: Network nodes
          const tt = easeInOut((prog - 0.35) / 0.20);
          x = lerp(d.cx * w, d.nx * w, tt) + oscX * 0.5;
          y = lerp(d.cy * h, d.ny * h, tt) + oscY * 0.5;
          opacity = lerp(d.opacity * 0.7, d.opacity * 0.85, tt);
          size = lerp(d.size * 0.85, d.size, tt);
        } else if (prog <= 0.75) {
          // Phase 3: Structured grid
          const tt = easeInOut((prog - 0.55) / 0.20);
          x = lerp(d.nx * w, d.gx * w, tt) + oscX * (1 - tt) * 0.3;
          y = lerp(d.ny * h, d.gy * h, tt) + oscY * (1 - tt) * 0.3;
          opacity = lerp(d.opacity * 0.85, d.opacity * 0.4, tt);
          size = lerp(d.size, d.size * 0.6, tt);
        } else {
          // Phase 4: Minimal ordered system - calm breathing
          const breathe = 0.95 + Math.sin(t * 0.3 + d.phase) * 0.05;
          x = d.gx * w + oscX * 0.15;
          y = d.gy * h + oscY * 0.15;
          opacity = d.opacity * 0.3 * breathe;
          size = d.size * 0.5;
        }

        if (opacity < 0.01 || size < 0.1) continue;

        ctx!.globalAlpha = clamp(opacity, 0, 1);
        ctx!.fillStyle = "#ffffff";
        ctx!.beginPath();
        ctx!.arc(x, y, size, 0, Math.PI * 2);
        ctx!.fill();
      }

      ctx!.globalAlpha = 1;

      if (prefersReduced) return;
      rafRef.current = requestAnimationFrame(draw);
    }

    if (prefersReduced) {
      draw(0);
    } else {
      rafRef.current = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

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
      }}
    />
  );
}
