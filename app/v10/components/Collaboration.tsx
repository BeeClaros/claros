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

// Hexagon centered at (cx, cy) with radius r, flat-ish.
function hexPath(cx: number, cy: number, r: number) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";
}

export default function Collaboration() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "center 0.4"],
  });
  const hexDash = useTransform(scrollYProgress, [0, 0.75], [420, 0]);
  const connDash = useTransform(scrollYProgress, [0.4, 1], [120, 0]);

  const centers = [
    { cx: 100, cy: 90 },
    { cx: 300, cy: 90 },
    { cx: 500, cy: 90 },
  ];
  const r = 58;

  return (
    <section
      ref={ref}
      className="v10-section"
      style={{ background: "var(--v10-bg-contrast)" }}
    >
      <div className="v10-container">
        <div className="v10-grid" style={{ rowGap: "2rem" }}>
          <div style={{ gridColumn: "1 / -1", maxWidth: "48rem" }}>
            <div className="v10-overline v10-reveal">Working together</div>
            <h2
              className="v10-section-title v10-reveal v10-reveal-1"
              style={{ marginTop: "1.4rem", maxWidth: "18ch" }}
            >
              One path. Different ways to work together.
            </h2>
          </div>
        </div>

        {/* connected hive cells */}
        <div
          className="v10-reveal v10-reveal-2"
          style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)", width: "100%" }}
        >
          <svg
            viewBox="0 0 600 180"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{ width: "100%", maxWidth: 680, margin: "0 auto", display: "block", overflow: "visible" }}
          >
            {/* connectors */}
            <motion.path
              d={`M ${centers[0].cx + r} ${centers[0].cy} L ${centers[1].cx - r} ${centers[1].cy}`}
              stroke="var(--v10-line-strong)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="120"
              style={{ strokeDashoffset: connDash }}
            />
            <motion.path
              d={`M ${centers[1].cx + r} ${centers[1].cy} L ${centers[2].cx - r} ${centers[2].cy}`}
              stroke="var(--v10-line-strong)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="120"
              style={{ strokeDashoffset: connDash }}
            />
            {/* hexagons */}
            {centers.map((c, i) => (
              <motion.path
                key={i}
                d={hexPath(c.cx, c.cy, r)}
                fill="none"
                stroke="var(--v10-line-strong)"
                strokeWidth="1.5"
                strokeDasharray="420"
                style={{ strokeDashoffset: hexDash }}
              />
            ))}
            {/* lime connection points */}
            <circle cx={centers[0].cx + r} cy={centers[0].cy} r="4" fill="var(--v10-lime)" />
            <circle cx={centers[1].cx - r} cy={centers[1].cy} r="4" fill="var(--v10-lime)" />
            <circle cx={centers[1].cx + r} cy={centers[1].cy} r="4" fill="var(--v10-lime)" />
            <circle cx={centers[2].cx - r} cy={centers[2].cy} r="4" fill="var(--v10-lime)" />
            {/* phase numbers inside cells */}
            {centers.map((c, i) => (
              <text
                key={`t-${i}`}
                x={c.cx}
                y={c.cy + 6}
                textAnchor="middle"
                fill="var(--v10-lime-deep)"
                style={{ fontFamily: "var(--font-v10-mono), monospace", fontSize: "16px", letterSpacing: "0.1em" }}
              >
                0{i + 1}
              </text>
            ))}
          </svg>
        </div>

        {/* phase descriptions */}
        <div className="collab-phases">
          {PHASES.map((p, i) => (
            <div key={p.num} className={`collab-phase v10-reveal v10-reveal-${i + 1}`}>
              <h3
                className="v10-display"
                style={{
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v10-text-primary)",
                }}
              >
                {p.title}
              </h3>
              <p className="v10-body" style={{ marginTop: "0.6rem", fontSize: "0.98rem" }}>
                {p.copy}
              </p>
            </div>
          ))}
        </div>

        <p
          className="v10-lead v10-reveal"
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
