"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const ENTRY_POINTS = [
  {
    index: "A",
    label: "Unclear landscape",
    text:  "We need to identify the right opportunities",
    detail:
      "You have pressure to act on AI but no clear view of where it creates real value in your business.",
  },
  {
    index: "B",
    label: "Defined use case",
    text:  "We already have a use case",
    detail:
      "You know what you want to build but need a structured path from idea to working implementation.",
  },
  {
    index: "C",
    label: "Pilot to production",
    text:  "We have a pilot that needs to work in practice",
    detail:
      "A proof of concept exists but it has not been integrated into real processes or proven at scale.",
  },
] as const;

function EntryPoint({
  point,
  index,
}: {
  point: (typeof ENTRY_POINTS)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="signal-entry"
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.12, ease: EASE_OUT }}
      style={{ flex: "1 1 0", minWidth: 0 }}
    >
      <div className="signal-entry-label">
        {point.index} - {point.label}
      </div>
      <p
        className="signal-entry-text"
        style={{ marginBottom: "1rem" }}
      >
        {point.text}
      </p>
      <p
        style={{
          fontFamily: "var(--font-signal-sans), sans-serif",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          letterSpacing: "-0.004em",
          color: "var(--signal-text-muted)",
          margin: 0,
        }}
      >
        {point.detail}
      </p>
    </motion.div>
  );
}

export default function WhatClientsBring() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView    = useInView(headerRef, { once: true, margin: "-80px" });

  return (
    <section
      id="assessment"
      className="signal-section signal-bg-solid"
      aria-label="What clients bring"
    >
      <div className="signal-container">
        {/* Label */}
        <motion.span
          className="signal-label"
          style={{ display: "block", marginBottom: "1.5rem", color: "var(--signal-text-faint)" }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          ref={headerRef}
        >
          03 / Entry points
        </motion.span>

        {/* Statement */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "clamp(2rem, 6vw, 8rem)",
            marginBottom: "clamp(3rem, 5vw, 5.5rem)",
            flexWrap: "wrap",
          }}
        >
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE_OUT }}
            style={{
              fontFamily: "var(--font-signal-sans), sans-serif",
              fontSize: "clamp(1.5rem, 2.6vw, 2.375rem)",
              lineHeight: 1.18,
              letterSpacing: "-0.034em",
              fontWeight: 500,
              color: "var(--signal-text-primary)",
              maxWidth: "32rem",
              margin: 0,
              flex: "1 1 20rem",
            }}
          >
            You can bring us an unclear AI landscape, a long list of ideas or
            one use case you are ready to build.
          </motion.p>

          {/* Thin separator + small note on right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.30 }}
            style={{ flex: "0 1 18rem", paddingTop: "0.25rem" }}
          >
            <div style={{ height: "1px", background: "var(--signal-line-subtle)", marginBottom: "1.25rem" }} />
            <p
              className="signal-label"
              style={{ color: "var(--signal-text-faint)", maxWidth: "16rem" }}
            >
              The starting point doesn't change the quality of the outcome.
            </p>
          </motion.div>
        </div>

        {/* Entry point cards */}
        <div
          style={{
            display: "flex",
            gap: "clamp(1rem, 2vw, 1.75rem)",
            alignItems: "stretch",
          }}
        >
          {ENTRY_POINTS.map((point, i) => (
            <EntryPoint key={point.index} point={point} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #assessment [style*="display: flex"][style*="align-items: stretch"] {
            flex-direction: column !important;
          }
          #assessment [style*="display: flex"][style*="flex-wrap: wrap"] {
            flex-direction: column !important;
          }
        }
      `}</style>
    </section>
  );
}
