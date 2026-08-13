"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion, type Variants } from "framer-motion";

const PILLARS = [
  {
    title: "AI Strategy",
    copy: "Focused assessment of where AI can create measurable business value, what it requires and what to prioritise first.",
    mark: "strategy",
  },
  {
    title: "Product Transformation",
    copy: "AI built into your products, workflows and systems. Practical solutions designed for how your teams already work.",
    mark: "product",
  },
  {
    title: "Process Transformation",
    copy: "Reduce repetitive work, improve operational visibility and support better decisions where AI can make a meaningful difference.",
    mark: "process",
  },
  {
    title: "People & AI Culture",
    copy: "Training, adoption and change support designed around the teams using the solution. We build adoption into delivery from the start.",
    mark: "people",
  },
];

function PillarMark({ type }: { type: string }) {
  const s = { width: 36, height: 36 } as const;
  const stroke = "var(--v8-text-primary)";
  switch (type) {
    case "strategy":
      return (
        <svg {...s} viewBox="0 0 36 36" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <path d="M18 4 L18 32 M4 18 L32 18" />
          <circle cx="18" cy="18" r="3.4" fill="var(--v8-lime)" stroke="none" />
        </svg>
      );
    case "product":
      return (
        <svg {...s} viewBox="0 0 36 36" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <path d="M18 3 L31 10.5 L31 25.5 L18 33 L5 25.5 L5 10.5 Z" />
          <circle cx="18" cy="18" r="3.2" fill="var(--v8-lime)" stroke="none" />
        </svg>
      );
    case "process":
      return (
        <svg {...s} viewBox="0 0 36 36" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <path d="M3 28 C 12 23, 16 10, 33 7" />
          <circle cx="33" cy="7" r="2.8" fill="var(--v8-lime)" stroke="none" />
        </svg>
      );
    case "people":
    default:
      return (
        <svg {...s} viewBox="0 0 36 36" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <circle cx="8" cy="18" r="4" />
          <circle cx="28" cy="8" r="4" />
          <circle cx="28" cy="28" r="4" />
          <path d="M12 16 L24 10 M12 20 L24 26" />
          <circle cx="8" cy="18" r="1.6" fill="var(--v8-lime)" stroke="none" />
        </svg>
      );
  }
}

const EASE = [0.22, 1, 0.36, 1] as const;

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1, margin: "0px 0px -40px 0px" });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const intro: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: live ? 0.1 : 0 } },
  };
  const fade: Variants = {
    hidden: live ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: live ? 0.7 : 0, ease: EASE },
    },
  };

  return (
    <section
      ref={ref}
      id="what-we-do"
      style={{ background: "var(--v8-bg-secondary)" }}
    >
      <div
        className="v8-container"
        style={{ paddingTop: "clamp(5rem, 11vw, 10rem)", paddingBottom: "clamp(5rem, 11vw, 10rem)" }}
      >
        <motion.div
          variants={intro}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ maxWidth: "42rem" }}
        >
          <motion.h2
            className="v8-section-title"
            variants={fade}
            style={{
              maxWidth: "26ch",
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
            }}
          >
            AI creates value when it solves the{" "}
            <span style={{ color: "var(--v8-lime-deep)" }}>
              right business problems.
            </span>
          </motion.h2>
          <motion.p
            className="v8-lead"
            variants={fade}
            style={{ marginTop: "1.5rem", maxWidth: "38rem" }}
          >
            We work across strategy, products, processes and people — especially
            where AI activity is fragmented, priorities are unclear or
            implementation needs to move beyond isolated experiments.
          </motion.p>
        </motion.div>

        <motion.div
          className="wwd-grid"
          variants={intro}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {PILLARS.map((pillar) => (
            <motion.div
              key={pillar.title}
              className="wwd-card"
              variants={fade}
            >
              <div style={{ marginBottom: "1.25rem" }}>
                <PillarMark type={pillar.mark} />
              </div>
              <h3
                className="v8-display"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v8-text-primary)",
                }}
              >
                {pillar.title}
              </h3>
              <p
                className="v8-body"
                style={{ marginTop: "0.7rem", fontSize: "0.98rem" }}
              >
                {pillar.copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .wwd-grid {
          margin-top: clamp(3rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(2rem, 4vw, 3.5rem);
        }
        .wwd-card {
          padding: clamp(1.5rem, 3vw, 2.25rem);
          border-top: 1px solid var(--v8-line);
        }
        @media (max-width: 720px) {
          .wwd-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
