"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import StageCanvas from "./StageCanvas";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const STAGES = [
  {
    number:  "01",
    label:   "Find",
    phase:   0.42, // clustering - opportunities being identified
    desc:    "Understand the business and identify where AI can make a meaningful difference.",
    accent:  false,
    nodeLabel: "Opportunity mapping",
  },
  {
    number:  "02",
    label:   "Build",
    phase:   0.78, // workflow - implementation underway
    desc:    "Design and implement the selected solution around the real workflow.",
    accent:  true,
    nodeLabel: "Selected use case",
  },
  {
    number:  "03",
    label:   "Improve",
    phase:   0.94, // stable - operational capability
    desc:    "Measure performance and continue improving the capability over time.",
    accent:  false,
    nodeLabel: "Operational capability",
  },
] as const;

function StageItem({
  stage,
  index,
}: {
  stage: (typeof STAGES)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.14, ease: EASE_OUT }}
      className="signal-stage"
      style={{ flex: "1 1 0", minWidth: 0 }}
    >
      {/* Visual - mini particle canvas */}
      <div
        style={{
          height: "176px",
          borderRadius: "var(--signal-radius-large)",
          overflow: "hidden",
          background: "var(--signal-bg-elevated)",
          border: stage.accent
            ? "1px solid rgba(213, 255, 79, 0.14)"
            : "1px solid var(--signal-line-subtle)",
          position: "relative",
        }}
      >
        <StageCanvas phase={stage.phase} />

        {/* Node label overlay */}
        <div
          style={{
            position: "absolute",
            bottom: "0.75rem",
            right: "0.875rem",
          }}
        >
          <span
            className="signal-label"
            style={{
              color: stage.accent
                ? "var(--signal-accent)"
                : "var(--signal-text-faint)",
            }}
          >
            {stage.nodeLabel}
          </span>
        </div>
      </div>

      {/* Text content */}
      <div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", marginBottom: "0.625rem" }}>
          <span className="signal-stage-number">{stage.number}</span>
          <span
            className="signal-stage-name"
            style={{ color: stage.accent ? "var(--signal-accent)" : "var(--signal-text-primary)" }}
          >
            {stage.label}
          </span>
        </div>

        {/* Thin accent line under name */}
        <div
          style={{
            height: "1px",
            width: stage.accent ? "2.5rem" : "1.5rem",
            background: stage.accent
              ? "var(--signal-accent)"
              : "var(--signal-line-visible)",
            marginBottom: "1rem",
            transition: "width 0.4s",
          }}
        />

        <p className="signal-stage-desc">{stage.desc}</p>
      </div>
    </motion.div>
  );
}

export default function WhatWeDo() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="approach"
      className="signal-section signal-bg-glass"
      aria-label="How we work"
    >
      <div className="signal-container">
        {/* Section header */}
        <div ref={headerRef} style={{ marginBottom: "clamp(3.5rem, 6vw, 6rem)" }}>
          <motion.span
            className="signal-label"
            style={{ display: "block", marginBottom: "1.5rem", color: "var(--signal-text-faint)" }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            02 / Approach
          </motion.span>

          <motion.h2
            className="signal-headline-section"
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE_OUT }}
          >
            How we work
          </motion.h2>
        </div>

        {/* Three stages */}
        <div
          style={{
            display: "flex",
            gap: "clamp(1.5rem, 3vw, 3rem)",
            alignItems: "flex-start",
          }}
        >
          {STAGES.map((stage, i) => (
            <StageItem key={stage.label} stage={stage} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #approach [style*="display: flex"] {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
