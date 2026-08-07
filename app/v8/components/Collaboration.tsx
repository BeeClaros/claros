"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PHASES = [
  {
    num: "01",
    title: "Assessment",
    copy: "Understand the current position and decide what to do.",
  },
  {
    num: "02",
    title: "Implementation",
    copy: "Build and introduce the highest-value solutions.",
  },
  {
    num: "03",
    title: "Continuous adoption",
    copy: "Measure outcomes, support teams and expand what works.",
  },
];

/** Perimeter of a regular hex with radius r (side length = r). */
const HEX_LEN = 360;
const CONN_LEN = 120;

// Hexagon centered at (cx, cy) with radius r - pointy-top, starts at left side
// so the stroke builds left → right around the cell.
function hexPath(cx: number, cy: number, r: number) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    // Start at 150° (upper-left) and walk clockwise around the perimeter
    const a = (Math.PI / 3) * i + (5 * Math.PI) / 6;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";
}

export default function Collaboration() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  // Starts once the section is well into view; finishes around mid-section
  // so strokes stay deliberate without lingering into the copy below.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "center 0.45"],
  });

  // Hex outlines - each stroke takes a generous slice of progress
  const hex0Dash = useTransform(scrollYProgress, [0.08, 0.32], [HEX_LEN, 0]);
  const hex1Dash = useTransform(scrollYProgress, [0.40, 0.64], [HEX_LEN, 0]);
  const hex2Dash = useTransform(scrollYProgress, [0.72, 0.96], [HEX_LEN, 0]);
  const hexDashes = [hex0Dash, hex1Dash, hex2Dash];

  // Connectors draw after the cell on their left finishes
  const conn0Dash = useTransform(scrollYProgress, [0.30, 0.40], [CONN_LEN, 0]);
  const conn1Dash = useTransform(scrollYProgress, [0.62, 0.72], [CONN_LEN, 0]);
  const connDashes = [conn0Dash, conn1Dash];

  // Phase numbers fade in as each hex closes
  const num0Op = useTransform(scrollYProgress, [0.24, 0.34], [0, 1]);
  const num1Op = useTransform(scrollYProgress, [0.56, 0.66], [0, 1]);
  const num2Op = useTransform(scrollYProgress, [0.88, 0.98], [0, 1]);
  const numOps = [num0Op, num1Op, num2Op];

  // Lime dots appear with their connector
  const dots0Op = useTransform(scrollYProgress, [0.30, 0.38], [0, 1]);
  const dots1Op = useTransform(scrollYProgress, [0.62, 0.70], [0, 1]);

  const centers = [
    { cx: 100, cy: 90 },
    { cx: 300, cy: 90 },
    { cx: 500, cy: 90 },
  ];
  const r = 58;

  return (
    <section
      ref={ref}
      className="v8-section"
      style={{ background: "var(--v8-bg-contrast)" }}
    >
      <div className="v8-container">
        <div className="v8-grid" style={{ rowGap: "2rem" }}>
          <div style={{ gridColumn: "1 / -1", maxWidth: "48rem" }}>
            <div className="v8-overline v8-reveal">Working together</div>
            <h2
              className="v8-section-title v8-reveal v8-reveal-1"
              style={{ marginTop: "1.4rem", maxWidth: "18ch" }}
            >
              One path. Different ways to work together.
            </h2>
          </div>
        </div>

        {/* connected hive cells - stroke builds left → right */}
        <div
          className="v8-reveal v8-reveal-2"
          style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)", width: "100%" }}
        >
          <svg
            viewBox="0 0 600 180"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{
              width: "100%",
              maxWidth: 680,
              margin: "0 auto",
              display: "block",
              overflow: "visible",
            }}
          >
            {/* connectors */}
            <motion.path
              d={`M ${centers[0].cx + r} ${centers[0].cy} L ${centers[1].cx - r} ${centers[1].cy}`}
              stroke="var(--v8-line-strong)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={CONN_LEN}
              style={{ strokeDashoffset: connDashes[0] }}
            />
            <motion.path
              d={`M ${centers[1].cx + r} ${centers[1].cy} L ${centers[2].cx - r} ${centers[2].cy}`}
              stroke="var(--v8-line-strong)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={CONN_LEN}
              style={{ strokeDashoffset: connDashes[1] }}
            />

            {/* hexagons - sequential stroke draw */}
            {centers.map((c, i) => (
              <motion.path
                key={i}
                d={hexPath(c.cx, c.cy, r)}
                fill="none"
                stroke="var(--v8-line-strong)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={HEX_LEN}
                style={{ strokeDashoffset: hexDashes[i] }}
              />
            ))}

            {/* lime connection points */}
            <motion.circle
              cx={centers[0].cx + r}
              cy={centers[0].cy}
              r="4"
              fill="var(--v8-lime)"
              style={{ opacity: dots0Op }}
            />
            <motion.circle
              cx={centers[1].cx - r}
              cy={centers[1].cy}
              r="4"
              fill="var(--v8-lime)"
              style={{ opacity: dots0Op }}
            />
            <motion.circle
              cx={centers[1].cx + r}
              cy={centers[1].cy}
              r="4"
              fill="var(--v8-lime)"
              style={{ opacity: dots1Op }}
            />
            <motion.circle
              cx={centers[2].cx - r}
              cy={centers[2].cy}
              r="4"
              fill="var(--v8-lime)"
              style={{ opacity: dots1Op }}
            />

            {/* phase numbers inside cells */}
            {centers.map((c, i) => (
              <motion.text
                key={`t-${i}`}
                x={c.cx}
                y={c.cy + 6}
                textAnchor="middle"
                fill="var(--v8-lime-deep)"
                style={{
                  fontFamily: "var(--font-v8-mono), monospace",
                  fontSize: "16px",
                  letterSpacing: "0.1em",
                  opacity: numOps[i],
                }}
              >
                0{i + 1}
              </motion.text>
            ))}
          </svg>
        </div>

        {/* phase descriptions */}
        <div className="collab-phases">
          {PHASES.map((p, i) => (
            <div key={p.num} className={`collab-phase v8-reveal v8-reveal-${i + 1}`}>
              <h3
                className="v8-display"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v8-text-primary)",
                }}
              >
                {p.title}
              </h3>
              <p className="v8-body" style={{ marginTop: "0.6rem", fontSize: "0.98rem" }}>
                {p.copy}
              </p>
            </div>
          ))}
        </div>

        <p
          className="v8-lead v8-reveal"
          style={{ marginTop: "clamp(2.5rem, 5vw, 3.5rem)", maxWidth: "44rem" }}
        >
          We can lead the work directly or support an existing internal AI, data
          or transformation team.
        </p>
      </div>

      <style>{`
        .collab-phases {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
        }
        @media (max-width: 720px) {
          .collab-phases { grid-template-columns: 1fr; row-gap: 2rem; }
        }
      `}</style>
    </section>
  );
}
