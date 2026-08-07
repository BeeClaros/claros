"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

// Flight-path cubic bezier (viewBox 0 0 1000 520)
const P0 = [40, 90];
const P1 = [340, 180];
const P2 = [660, 300];
const P3 = [960, 430];

function bezier(t: number, i: number) {
  const u = 1 - t;
  return (
    u * u * u * P0[i] +
    3 * u * u * t * P1[i] +
    3 * u * t * t * P2[i] +
    t * t * t * P3[i]
  );
}

const PATH_D = `M${P0[0]} ${P0[1]} C${P1[0]} ${P1[1]} ${P2[0]} ${P2[1]} ${P3[0]} ${P3[1]}`;

const PHASES = [
  {
    n: "01",
    title: "Understand",
    text: "We learn how the business works, where time is lost and where better decisions are needed.",
    // stop position in viewBox coords + label placement
    x: 85,
    y: 104,
    place: "below",
  },
  {
    n: "02",
    title: "Prioritise",
    text: "We identify the opportunities with the strongest value and clearest path to delivery.",
    x: 379,
    y: 201,
    place: "above",
  },
  {
    n: "03",
    title: "Implement",
    text: "We build solutions that fit existing teams, processes and systems.",
    x: 649,
    y: 302,
    place: "below",
  },
  {
    n: "04",
    title: "Embed",
    text: "We help people use the solutions and expand what works.",
    x: 924,
    y: 414,
    place: "above",
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.8", "end 0.4"],
  });

  const t = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const beeX = useTransform(t, (v) => bezier(Math.min(Math.max(v, 0), 1), 0));
  const beeY = useTransform(t, (v) => bezier(Math.min(Math.max(v, 0), 1), 1));
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      id="what-we-do"
      className="ae-section"
      style={{ background: "var(--ae-bg-sand)" }}
    >
      <div className="ae-container">
        <div className="ae-reveal" style={{ maxWidth: "44rem" }}>
          <span className="ae-overline">What we do</span>
          <h2 className="ae-section-title" style={{ marginTop: "1.5rem" }}>
            We turn possibilities into a practical plan.
          </h2>
        </div>

        {/* Flight path */}
        <div ref={trackRef} className="wwd-track">
          <svg
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            aria-hidden="true"
            className="wwd-svg"
          >
            {/* base copper route */}
            <path
              d={PATH_D}
              className="ae-flightline"
              stroke="#C66A3D"
              strokeWidth="2"
              opacity="0.55"
            />
            {/* blue progress overlay (drawn on scroll) */}
            <motion.path
              d={PATH_D}
              className="ae-flightline"
              stroke="#3157E3"
              strokeWidth="2.4"
              pathLength={1}
              strokeDasharray="1"
              style={{ strokeDashoffset: dashOffset }}
            />
            {/* stop nodes */}
            {PHASES.map((p) => (
              <g key={p.n}>
                <circle cx={p.x} cy={p.y} r="7" fill="var(--ae-bg-sand)" stroke="#3157E3" strokeWidth="1.6" />
                <circle cx={p.x} cy={p.y} r="2.6" fill="#C66A3D" />
              </g>
            ))}
            {/* travelling bee marker */}
            <motion.g style={{ x: beeX, y: beeY }}>
              <g transform="rotate(24)">
                <path d="M3 -4 C12 -14 24 -12 24 -4 C24 3 12 6 4 1 Z" fill="rgba(231,237,245,0.55)" stroke="#758397" strokeWidth="0.8" />
                <path d="M-3 -4 C-12 -14 -24 -12 -24 -4 C-24 3 -12 6 -4 1 Z" fill="rgba(231,237,245,0.55)" stroke="#758397" strokeWidth="0.8" />
                <ellipse cx="0" cy="4" rx="4.5" ry="11" fill="#162033" />
                <circle cx="0" cy="-7" r="3.5" fill="#162033" />
                <line x1="0" y1="-11" x2="0" y2="16" stroke="#3157E3" strokeWidth="1.4" />
                <circle cx="0" cy="2" r="2" fill="#C66A3D" />
              </g>
            </motion.g>
          </svg>

          {/* phase labels positioned along the path (desktop) */}
          {PHASES.map((p, i) => (
            <div
              key={p.n}
              className={`ae-reveal ae-reveal-${i + 1} wwd-label wwd-${p.place}`}
              style={{
                left: `${(p.x / 1000) * 100}%`,
                top: `${(p.y / 520) * 100}%`,
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span className="ae-index">{p.n}</span>
                <h3 className="wwd-title ae-display">{p.title}</h3>
              </div>
              <p className="ae-body wwd-text">{p.text}</p>
            </div>
          ))}
        </div>

        {/* stacked list (mobile) */}
        <ol className="wwd-list">
          {PHASES.map((p, i) => (
            <li key={p.n} className={`ae-reveal ae-reveal-${i + 1}`}>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span className="ae-index">{p.n}</span>
                <h3 className="wwd-title ae-display">{p.title}</h3>
              </div>
              <p className="ae-body" style={{ marginTop: "0.5rem" }}>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .wwd-track {
          position: relative;
          margin-top: clamp(2.5rem, 5vw, 4rem);
          aspect-ratio: 1000 / 520;
          width: 100%;
        }
        .wwd-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
        .wwd-label {
          position: absolute;
          width: min(22vw, 260px);
          transform: translate(-50%, 0);
        }
        .wwd-below { margin-top: 18px; }
        .wwd-above { transform: translate(-50%, -100%); margin-top: -18px; }
        .wwd-title {
          font-size: clamp(1.15rem, 1.8vw, 1.5rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--ae-text);
          margin: 0;
        }
        .wwd-text { margin-top: 0.5rem; font-size: 0.95rem; }
        .wwd-list { display: none; list-style: none; padding: 0; margin: 2.5rem 0 0; }
        @media (max-width: 860px) {
          .wwd-track { display: none; }
          .wwd-list { display: block; }
          .wwd-list li {
            padding: 1.5rem 0;
            border-top: 1px solid var(--ae-line);
          }
          .wwd-list li:first-child { border-top: none; }
        }
      `}</style>
    </section>
  );
}
