"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PHASES = [
  {
    title: "Assessment",
    href: "/assessment",
    copy: "We establish where you are and what to do first.",
    produces: [
      "Prioritised opportunities ranked by business value, feasibility and readiness",
      "A roadmap with sequencing, ownership and milestones",
    ],
  },
  {
    title: "Build",
    href: "/build",
    copy: "We implement the priorities that earned their place.",
    produces: [
      "Systems running inside your current stack or a dedicated AI environment",
      "Integration, controls, handover and measurement around it",
    ],
  },
  {
    title: "Delivery",
    href: "/delivery",
    copy: "We measure what works, improve it and expand where it creates value.",
    produces: [
      "Outcome measurement tied to business goals",
      "Team support and expansion of what works",
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const phasesRef = useRef<HTMLDivElement>(null);
  const phasesInView = useInView(phasesRef, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="v8-section v8-section-dark"
      style={{
        background: "var(--v8-bg-dark)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "42rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{ color: "var(--v8-on-dark-primary)" }}
          >
            Human direction.{" "}
            <span style={{ color: "var(--v8-lime)" }}>AI capability.</span>
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{
              marginTop: "1.5rem",
              maxWidth: "38rem",
              color: "var(--v8-on-dark-secondary)",
            }}
          >
            We work inside your teams. Business knowledge and judgement stay
            with you, and we bring the build discipline. We lead the work
            directly or support your existing internal team.
          </p>
        </div>

        <div ref={phasesRef} className="hww-phases">
          {PHASES.map((phase, i) => (
            <motion.a
              key={phase.title}
              href={phase.href}
              className="hww-phase"
              initial={live ? { opacity: 0, y: 18 } : false}
              animate={
                phasesInView || !live
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              transition={{
                duration: live ? 0.6 : 0,
                delay: live ? i * 0.12 : 0,
                ease: EASE,
              }}
            >
              <span className="hww-phase-head">
                <span className="hww-phase-title">{phase.title}</span>
                <span className="hww-phase-arrow" aria-hidden="true">
                  &rarr;
                </span>
              </span>

              <span className="hww-phase-copy">{phase.copy}</span>

              <span className="hww-phase-list">
                {phase.produces.map((item) => (
                  <span key={item} className="hww-phase-item">
                    {item}
                  </span>
                ))}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      <style>{`
        .hww-phases {
          margin-top: clamp(3rem, 6vw, 4.5rem);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.75rem, 4vw, 3rem);
        }
        .hww-phase {
          display: block;
          text-decoration: none;
          padding-top: 1.5rem;
          border-top: 1px solid var(--v8-on-dark-line);
          transition: border-color 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hww-phase:hover {
          border-top-color: var(--v8-lime);
        }
        .hww-phase-head {
          display: flex;
          align-items: baseline;
          gap: 0.55rem;
        }
        .hww-phase-title {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(1.25rem, 2vw, 1.5rem);
          font-weight: 500;
          letter-spacing: -0.02em;
          color: var(--v8-on-dark-primary);
          transition: color 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hww-phase:hover .hww-phase-title {
          color: var(--v8-lime);
        }
        .hww-phase-arrow {
          display: inline-block;
          color: var(--v8-lime);
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .hww-phase:hover .hww-phase-arrow {
          transform: translateX(4px);
        }
        .hww-phase-copy {
          display: block;
          margin-top: 0.6rem;
          font-family: var(--font-v8-sans), system-ui, sans-serif;
          font-size: 0.98rem;
          line-height: 1.6;
          color: var(--v8-on-dark-secondary);
        }
        .hww-phase-list {
          display: grid;
          gap: 0.55rem;
          margin-top: 1.25rem;
        }
        .hww-phase-item {
          position: relative;
          padding-left: 1rem;
          font-family: var(--font-v8-sans), system-ui, sans-serif;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--v8-on-dark-muted);
        }
        .hww-phase-item::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.55em;
          width: 5px;
          height: 5px;
          background: var(--v8-lime);
        }
        @media (max-width: 860px) {
          .hww-phases { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hww-phase,
          .hww-phase-title,
          .hww-phase-arrow {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
