"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PT_ART_OPACITY } from "../art-tokens";

const PHASES = [
  {
    phase: "Phase 01",
    name: "Assessment",
    mask: "assessment",
    desc: "Find where AI creates real value, score what is feasible, and leave with a prioritised roadmap your board can interrogate and your teams can execute.",
    outputs: ["Prioritised portfolio", "Readiness findings", "First-wave backlog"],
    enter: "AI is on the agenda, but there is no credible plan behind it.",
  },
  {
    phase: "Phase 02",
    name: "Implementation",
    mask: "implementation",
    desc: "Design and deliver the selected solutions with your teams - from a validated use case to a working capability in production, owned by the people who use it.",
    outputs: ["Working capability", "Adoption support", "Measured outcomes"],
    enter: "You have a clear use case and need it built, integrated and shipped.",
  },
  {
    phase: "Phase 03",
    name: "Continuous delivery",
    mask: "delivery",
    desc: "Keep improving what you ship: ownership, oversight, enablement, and a pipeline of the next sensible moves - so value compounds instead of fading.",
    outputs: ["Operating cadence", "Guardrails", "Ongoing optimisation"],
    enter: "You have AI in production and need it to keep delivering.",
  },
] as const;

const MASK_CLASSES = {
  assessment: "pt-sketch-mask--assessment",
  implementation: "pt-sketch-mask--implementation",
  delivery: "pt-sketch-mask--delivery",
} as const;

function PhaseRow({
  phase,
  isLast,
}: {
  phase: (typeof PHASES)[number];
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const visualInView = useInView(visualRef, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="phase-row"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Illustration - beside this phase, reveals on scroll */}
      <motion.div
        ref={visualRef}
        className="pt-phase-visual"
        aria-hidden="true"
        initial={{ opacity: 0, x: 40 }}
        animate={visualInView ? { opacity: PT_ART_OPACITY.column, x: 0 } : {}}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className={`pt-sketch-mask pt-sketch-mask--column ${MASK_CLASSES[phase.mask]}`}
        />
      </motion.div>

      {/* Timeline rail */}
      <div className="phase-row-rail">
        <div
          className="pt-dot-pulse"
          style={{
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "var(--pt-accent)",
            flexShrink: 0,
            marginTop: "6px",
          }}
        />
        {!isLast && (
          <motion.div
            style={{
              width: "1px",
              flex: 1,
              minHeight: "100%",
              background:
                "linear-gradient(180deg, var(--pt-accent), var(--pt-line))",
              transformOrigin: "top",
            }}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>

      {/* Content */}
      <div
        className="phase-row-content"
        style={{ paddingBottom: isLast ? "0" : "clamp(3rem, 6vw, 4.5rem)" }}
      >
        <span className="pt-label" style={{ display: "block", marginBottom: "0.5rem" }}>
          {phase.phase}
        </span>
        <h3
          style={{
            fontFamily: "var(--font-pt-display), serif",
            fontSize: "clamp(1.5rem, 2.6vw, 2.125rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            color: "var(--pt-text-primary)",
            lineHeight: 1.15,
            marginBottom: "0.875rem",
          }}
        >
          {phase.name}
        </h3>
        <p className="pt-body" style={{ maxWidth: "34rem", marginBottom: "1.5rem" }}>
          {phase.desc}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
            marginBottom: "1.25rem",
          }}
        >
          {phase.outputs.map((out) => (
            <span
              key={out}
              className="pt-chip"
              style={{
                fontFamily: "var(--font-pt-mono), monospace",
                fontSize: "0.6875rem",
                letterSpacing: "0.06em",
                color: "var(--pt-text-secondary)",
                border: "1px solid var(--pt-line-strong)",
                borderRadius: "999px",
                padding: "5px 12px",
              }}
            >
              {out}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "0.6rem",
            borderLeft: "2px solid var(--pt-accent)",
            paddingLeft: "1rem",
            maxWidth: "34rem",
          }}
        >
          <span
            className="pt-label"
            style={{ color: "var(--pt-text-muted)", flexShrink: 0 }}
          >
            Start here if
          </span>
          <span
            style={{
              fontSize: "0.9375rem",
              color: "var(--pt-text-secondary)",
              fontStyle: "italic",
            }}
          >
            {phase.enter}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headingOpacity = useTransform(scrollYProgress, [0.02, 0.14], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.02, 0.14], [40, 0]);

  return (
    <section
      ref={ref}
      id="journey"
      style={{
        position: "relative",
        background: "var(--pt-bg-primary)",
        paddingBlock: "clamp(5rem, 12vw, 10rem)",
        overflow: "hidden",
      }}
    >
      <div className="pt-aurora" />

      <div className="pt-container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          style={{
            maxWidth: "40rem",
            marginBottom: "clamp(3rem, 6vw, 5rem)",
            opacity: headingOpacity,
            y: headingY,
          }}
        >
          <div className="pt-overline" style={{ marginBottom: "1.5rem" }}>
            How we help
          </div>
          <h2 className="pt-section-heading" style={{ marginBottom: "1.25rem" }}>
            One path.{" "}
            <span style={{ color: "var(--pt-accent)" }}>Enter where you are.</span>
          </h2>
          <p className="pt-lead">
            Assessment, implementation and continuous delivery are one path, not
            three products. We advise and we execute &mdash; you enter at the
            phase that matches where you already are.
          </p>
        </motion.div>

        <div className="journey-phases">
          {PHASES.map((phase, i) => (
            <PhaseRow
              key={phase.name}
              phase={phase}
              isLast={i === PHASES.length - 1}
            />
          ))}
        </div>

        <AnchorLine />
      </div>
    </section>
  );
}

function AnchorLine() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      style={{ marginTop: "clamp(3rem, 6vw, 5rem)", maxWidth: "40rem" }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="pt-statement">
        We don&rsquo;t hand you a strategy and leave.{" "}
        <span style={{ color: "var(--pt-accent)" }}>We stay until it ships.</span>
      </p>
    </motion.div>
  );
}
