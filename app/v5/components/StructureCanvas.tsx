"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";

/**
 * StructureCanvas - Architectural Blueprint System
 *
 * A scroll-driven SVG composition of fine lines, grid structures,
 * reference points, measurement annotations and coordinate markers.
 *
 * At progress=0 elements are scattered and disconnected.
 * At progress=1 they align into a precise architectural grid with
 * full connections, labels and measurement marks - representing
 * the consultancy's work of bringing structure to complexity.
 */

interface Node {
  id: number;
  sx: number;
  sy: number;
  ox: number;
  oy: number;
  label?: string;
  size?: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

const LABELS = [
  "Business priority",
  "Process",
  "Data readiness",
  "People",
  "Risk assessment",
  "Value mapping",
];

const MEASUREMENTS = [
  { from: 0, to: 1, label: "scope" },
  { from: 0, to: 4, label: "depth" },
  { from: 3, to: 7, label: "risk" },
];

export default function StructureCanvas({
  progress = 0,
  className = "",
}: {
  progress?: number;
  className?: string;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dims, setDims] = useState({ w: 540, h: 480 });

  const updateDims = useCallback(() => {
    if (svgRef.current) {
      const rect = svgRef.current.getBoundingClientRect();
      if (rect.width > 10 && rect.height > 10) {
        setDims({ w: rect.width, h: rect.height });
      }
    }
  }, []);

  useEffect(() => {
    updateDims();
    window.addEventListener("resize", updateDims);
    return () => window.removeEventListener("resize", updateDims);
  }, [updateDims]);

  const { w, h } = dims;

  const COLS = 5;
  const ROWS = 4;
  const margin = Math.min(w, h) * 0.12;
  const gapX = (w - margin * 2) / (COLS - 1);
  const gapY = (h - margin * 2) / (ROWS - 1);

  const nodes: Node[] = useMemo(() => {
    const result: Node[] = [];
    let id = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const angle = seededRandom(id * 7 + 3) * Math.PI * 2;
        const dist = (seededRandom(id * 13 + 5) * 0.5 + 0.3) * Math.min(w, h) * 0.38;
        result.push({
          id,
          sx: w / 2 + Math.cos(angle) * dist * (0.5 + seededRandom(id * 19) * 0.5),
          sy: h / 2 + Math.sin(angle) * dist * (0.5 + seededRandom(id * 23) * 0.5),
          ox: margin + c * gapX,
          oy: margin + r * gapY,
          label: id < LABELS.length ? LABELS[id] : undefined,
          size: id < LABELS.length ? 3.5 : 2,
        });
        id++;
      }
    }
    return result;
  }, [w, h, margin, gapX, gapY]);

  const connections = useMemo(() => {
    const lines: Array<{ from: number; to: number; weight: number }> = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        if (c < COLS - 1) lines.push({ from: idx, to: idx + 1, weight: 0.8 });
        if (r < ROWS - 1) lines.push({ from: idx, to: idx + COLS, weight: 0.8 });
        if (c < COLS - 1 && r < ROWS - 1) lines.push({ from: idx, to: idx + COLS + 1, weight: 0.3 });
      }
    }
    return lines;
  }, []);

  const t = Math.max(0, Math.min(1, progress));
  const et = easeOutCubic(t);

  const gridOpacity = et * 0.12;
  const axisOpacity = 0.05 + et * 0.2;
  const measureOpacity = Math.max(0, (et - 0.4) / 0.6) * 0.5;

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${w} ${h}`}
      fill="none"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <clipPath id="canvas-clip">
          <rect x={0} y={0} width={w} height={h} />
        </clipPath>
      </defs>

      <g clipPath="url(#canvas-clip)">
        {/* Background dot grid */}
        {gridOpacity > 0.01 && (
          <g opacity={gridOpacity}>
            {Array.from({ length: Math.ceil(w / 28) * Math.ceil(h / 28) }).map((_, i) => {
              const col = i % Math.ceil(w / 28);
              const row = Math.floor(i / Math.ceil(w / 28));
              return (
                <circle
                  key={`dot-${i}`}
                  cx={col * 28 + 14}
                  cy={row * 28 + 14}
                  r={0.6}
                  fill="#171717"
                />
              );
            })}
          </g>
        )}

        {/* Axis lines */}
        <g opacity={axisOpacity}>
          {/* Vertical axes at grid columns */}
          {Array.from({ length: COLS }).map((_, c) => {
            const x = margin + c * gapX;
            return (
              <g key={`ax-v-${c}`}>
                <line
                  x1={x} y1={margin - 20} x2={x} y2={margin + (ROWS - 1) * gapY + 20}
                  stroke="#171717" strokeWidth={0.4} strokeDasharray="2 6"
                />
                {/* Tick marks */}
                {Array.from({ length: ROWS }).map((_, r) => (
                  <line
                    key={`tick-${c}-${r}`}
                    x1={x - 3} y1={margin + r * gapY}
                    x2={x + 3} y2={margin + r * gapY}
                    stroke="#171717" strokeWidth={0.6}
                  />
                ))}
              </g>
            );
          })}
          {/* Horizontal axes at grid rows */}
          {Array.from({ length: ROWS }).map((_, r) => {
            const y = margin + r * gapY;
            return (
              <line
                key={`ax-h-${r}`}
                x1={margin - 20} y1={y} x2={margin + (COLS - 1) * gapX + 20} y2={y}
                stroke="#171717" strokeWidth={0.4} strokeDasharray="2 6"
              />
            );
          })}
        </g>

        {/* Connection lines */}
        {connections.map((conn, i) => {
          const a = nodes[conn.from];
          const b = nodes[conn.to];
          const x1 = lerp(a.sx, a.ox, et);
          const y1 = lerp(a.sy, a.oy, et);
          const x2 = lerp(b.sx, b.ox, et);
          const y2 = lerp(b.sy, b.oy, et);
          const lineProgress = Math.max(0, Math.min(1, (et - i * 0.008) * 1.5));

          return (
            <line
              key={`c-${i}`}
              x1={x1} y1={y1}
              x2={lerp(x1, x2, lineProgress)}
              y2={lerp(y1, y2, lineProgress)}
              stroke="#171717"
              strokeWidth={conn.weight > 0.5 ? 0.6 : 0.3}
              opacity={0.06 + et * conn.weight * 0.18}
            />
          );
        })}

        {/* Measurement annotations - appear when structured */}
        {measureOpacity > 0.01 && MEASUREMENTS.map((m, i) => {
          const a = nodes[m.from];
          const b = nodes[m.to];
          const ax = lerp(a.sx, a.ox, et);
          const ay = lerp(a.sy, a.oy, et);
          const bx = lerp(b.sx, b.ox, et);
          const by = lerp(b.sy, b.oy, et);
          const isHorizontal = Math.abs(bx - ax) > Math.abs(by - ay);
          const offset = 18 + i * 8;

          if (isHorizontal) {
            const y = Math.min(ay, by) - offset;
            return (
              <g key={`m-${i}`} opacity={measureOpacity}>
                <line x1={ax} y1={y} x2={bx} y2={y} stroke="#1A6B5A" strokeWidth={0.5} />
                <line x1={ax} y1={y - 3} x2={ax} y2={y + 3} stroke="#1A6B5A" strokeWidth={0.5} />
                <line x1={bx} y1={y - 3} x2={bx} y2={y + 3} stroke="#1A6B5A" strokeWidth={0.5} />
                <text
                  x={(ax + bx) / 2} y={y - 5}
                  fill="#1A6B5A" fontSize={7.5}
                  fontFamily="var(--font-ed-mono), monospace"
                  textAnchor="middle" letterSpacing="0.1em"
                  style={{ textTransform: "uppercase" }}
                >
                  {m.label}
                </text>
              </g>
            );
          } else {
            const x = Math.max(ax, bx) + offset;
            return (
              <g key={`m-${i}`} opacity={measureOpacity}>
                <line x1={x} y1={ay} x2={x} y2={by} stroke="#1A6B5A" strokeWidth={0.5} />
                <line x1={x - 3} y1={ay} x2={x + 3} y2={ay} stroke="#1A6B5A" strokeWidth={0.5} />
                <line x1={x - 3} y1={by} x2={x + 3} y2={by} stroke="#1A6B5A" strokeWidth={0.5} />
                <text
                  x={x + 6} y={(ay + by) / 2 + 2}
                  fill="#1A6B5A" fontSize={7.5}
                  fontFamily="var(--font-ed-mono), monospace"
                  letterSpacing="0.1em"
                  style={{ textTransform: "uppercase" }}
                >
                  {m.label}
                </text>
              </g>
            );
          }
        })}

        {/* Nodes */}
        {nodes.map((n) => {
          const x = lerp(n.sx, n.ox, et);
          const y = lerp(n.sy, n.oy, et);
          const r = n.size || 2;
          const hasLabel = !!n.label;
          const accentColor = hasLabel ? "#1A6B5A" : "#171717";

          return (
            <g key={`n-${n.id}`}>
              {/* Crosshair on labelled nodes */}
              {hasLabel && (
                <>
                  <line
                    x1={x - 8} y1={y} x2={x + 8} y2={y}
                    stroke={accentColor} strokeWidth={0.4}
                    opacity={0.3 + et * 0.4}
                  />
                  <line
                    x1={x} y1={y - 8} x2={x} y2={y + 8}
                    stroke={accentColor} strokeWidth={0.4}
                    opacity={0.3 + et * 0.4}
                  />
                </>
              )}

              {/* Node dot */}
              <circle
                cx={x} cy={y} r={r}
                fill={hasLabel ? accentColor : "#171717"}
                opacity={hasLabel ? 0.5 + et * 0.5 : 0.15 + et * 0.25}
              />

              {/* Outer ring on labelled nodes */}
              {hasLabel && (
                <circle
                  cx={x} cy={y} r={r + 4}
                  fill="none" stroke={accentColor}
                  strokeWidth={0.4}
                  opacity={0.15 + et * 0.25}
                />
              )}

              {/* Labels */}
              {hasLabel && (
                <g opacity={0.15 + et * 0.75}>
                  <line
                    x1={x + r + 5} y1={y}
                    x2={x + r + 14} y2={y}
                    stroke={accentColor} strokeWidth={0.4}
                  />
                  <text
                    x={x + r + 17} y={y + 3}
                    fill="#5B5B56" fontSize={8}
                    fontFamily="var(--font-ed-mono), monospace"
                    letterSpacing="0.1em"
                    style={{ textTransform: "uppercase", fontWeight: 500 }}
                  >
                    {n.label}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Corner coordinates */}
        <g opacity={0.1 + et * 0.2}>
          <text
            x={margin - 16} y={margin - 10}
            fill="#5B5B56" fontSize={7}
            fontFamily="var(--font-ed-mono), monospace"
            letterSpacing="0.06em"
          >
            0.0, 0.0
          </text>
          <text
            x={margin + (COLS - 1) * gapX - 4} y={margin + (ROWS - 1) * gapY + 18}
            fill="#5B5B56" fontSize={7}
            fontFamily="var(--font-ed-mono), monospace"
            letterSpacing="0.06em"
            textAnchor="end"
          >
            {COLS - 1}.0, {ROWS - 1}.0
          </text>
          {/* Reference frame corners */}
          <path
            d={`M ${margin - 8} ${margin + 12} L ${margin - 8} ${margin - 8} L ${margin + 12} ${margin - 8}`}
            stroke="#5B5B56" strokeWidth={0.5} fill="none"
          />
          <path
            d={`M ${margin + (COLS - 1) * gapX + 8} ${margin + (ROWS - 1) * gapY - 12} L ${margin + (COLS - 1) * gapX + 8} ${margin + (ROWS - 1) * gapY + 8} L ${margin + (COLS - 1) * gapX - 12} ${margin + (ROWS - 1) * gapY + 8}`}
            stroke="#5B5B56" strokeWidth={0.5} fill="none"
          />
        </g>

        {/* Row/column labels */}
        <g opacity={Math.max(0, (et - 0.3) / 0.7) * 0.3}>
          {Array.from({ length: COLS }).map((_, c) => (
            <text
              key={`cl-${c}`}
              x={margin + c * gapX}
              y={margin + (ROWS - 1) * gapY + 28}
              fill="#5B5B56" fontSize={6.5}
              fontFamily="var(--font-ed-mono), monospace"
              letterSpacing="0.06em"
              textAnchor="middle"
            >
              {String.fromCharCode(65 + c)}
            </text>
          ))}
          {Array.from({ length: ROWS }).map((_, r) => (
            <text
              key={`rl-${r}`}
              x={margin - 18}
              y={margin + r * gapY + 3}
              fill="#5B5B56" fontSize={6.5}
              fontFamily="var(--font-ed-mono), monospace"
              letterSpacing="0.06em"
              textAnchor="middle"
            >
              {r + 1}
            </text>
          ))}
        </g>
      </g>
    </svg>
  );
}
