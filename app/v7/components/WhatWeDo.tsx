"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const STEPS = [
  {
    n: "01",
    title: "Understand",
    body: "We learn how the business works, where time is lost and where better decisions are needed.",
    x: 10,
    y: 64,
  },
  {
    n: "02",
    title: "Prioritise",
    body: "We identify the opportunities with the strongest business value and realistic path to delivery.",
    x: 37,
    y: 30,
  },
  {
    n: "03",
    title: "Implement",
    body: "We build practical solutions that fit existing teams, processes and systems.",
    x: 63,
    y: 58,
  },
  {
    n: "04",
    title: "Embed",
    body: "We help people adopt the solutions and create the foundations to expand what works.",
    x: 90,
    y: 24,
  },
] as const;

// A gentle flight path through the four nodes (percentage coords).
const PATH = `M ${STEPS[0].x} ${STEPS[0].y}
  C 22 ${STEPS[0].y}, 26 ${STEPS[1].y}, ${STEPS[1].x} ${STEPS[1].y}
  C 48 ${STEPS[1].y}, 52 ${STEPS[2].y}, ${STEPS[2].x} ${STEPS[2].y}
  C 74 ${STEPS[2].y}, 78 ${STEPS[3].y}, ${STEPS[3].x} ${STEPS[3].y}`;

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ["start 75%", "end 55%"],
  });

  const beeLeft = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    STEPS.map((s) => `${s.x}%`)
  );
  const beeTop = useTransform(
    scrollYProgress,
    [0, 0.33, 0.66, 1],
    STEPS.map((s) => `${s.y}%`)
  );
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      id="what-we-do"
      className="hv-section"
      style={{ background: "var(--hv-bg-primary)", position: "relative" }}
    >
      <div className="hv-container">
        <div style={{ maxWidth: "46rem" }}>
          <div className="hv-overline hv-reveal">What we do</div>
          <h2 className="hv-section-title hv-reveal hv-reveal-1" style={{ marginTop: "1.5rem" }}>
            From scattered ideas to{" "}
            <span className="hv-accent-text">practical adoption.</span>
          </h2>
        </div>

        {/* Flight path (desktop) */}
        <div
          ref={pathRef}
          className="wwd-path hv-reveal hv-reveal-2"
          style={{
            position: "relative",
            height: "clamp(220px, 26vw, 320px)",
            marginTop: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            aria-hidden="true"
          >
            {/* base line */}
            <path
              d={PATH}
              fill="none"
              stroke="var(--hv-line-strong)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            {/* gold progress line drawn on scroll */}
            <motion.path
              d={PATH}
              fill="none"
              stroke="var(--hv-accent)"
              strokeWidth={1.5}
              vectorEffect="non-scaling-stroke"
              style={{ pathLength: lineProgress }}
            />
            {/* nodes */}
            {STEPS.map((s) => (
              <circle
                key={s.n}
                cx={s.x}
                cy={s.y}
                r={0.9}
                fill="var(--hv-accent-bright)"
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </svg>

          {/* traveling bee (generated) */}
          <motion.div
            style={{
              position: "absolute",
              left: beeLeft,
              top: beeTop,
              transform: "translate(-50%, -50%)",
              x: 0,
              y: 0,
            }}
          >
            <span
              style={{
                position: "relative",
                display: "block",
                width: 52,
                height: 52,
              }}
            >
              <Image
                src="/v7/bee-symbol.png"
                alt=""
                fill
                sizes="52px"
                style={{ objectFit: "contain" }}
              />
            </span>
          </motion.div>

          {/* node labels */}
          {STEPS.map((s) => (
            <div
              key={s.n}
              style={{
                position: "absolute",
                left: `${s.x}%`,
                top: `${s.y}%`,
                transform:
                  s.y < 45
                    ? "translate(-50%, -140%)"
                    : "translate(-50%, 40%)",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              <span className="hv-mono" style={{ color: "var(--hv-accent)", fontSize: "0.7rem", letterSpacing: "0.1em" }}>
                {s.n}
              </span>
            </div>
          ))}
        </div>

        {/* Step descriptions */}
        <div className="hv-grid wwd-steps" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          {STEPS.map((s, i) => (
            <div
              key={s.n}
              className={`wwd-step hv-reveal hv-reveal-${i + 1}`}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem" }}>
                <span className="hv-mono" style={{ color: "var(--hv-accent)", fontSize: "0.8rem" }}>{s.n}</span>
                <h3
                  style={{
                    fontFamily: "var(--font-hv-display), sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "var(--hv-text-primary)",
                    margin: 0,
                  }}
                >
                  {s.title}
                </h3>
              </div>
              <p className="hv-body" style={{ fontSize: "0.9375rem", marginTop: "0.75rem" }}>
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wwd-step { grid-column: span 3; }
        @media (max-width: 900px) {
          .wwd-path { display: none; }
          .wwd-step { grid-column: 1 / -1; padding-left: 1.5rem; border-left: 2px solid var(--hv-line); position: relative; }
          .wwd-step::before {
            content: ''; position: absolute; left: -5px; top: 6px;
            width: 8px; height: 8px; border-radius: 50%; background: var(--hv-accent);
          }
          .wwd-steps { row-gap: 2rem; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .wwd-step { grid-column: span 6; }
        }
      `}</style>
    </section>
  );
}
