"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const BENEFITS = [
  {
    title: "Ready in days",
    copy: "A dedicated AI workspace without a long platform project.",
  },
  {
    title: "One secure workspace",
    copy: "Give teams controlled access to AI and company knowledge.",
  },
  {
    title: "Built to grow",
    copy: "Add agents, automations and custom AI solutions as you need them.",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PrivateAIFoundation() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  return (
    <section
      ref={ref}
      id="private-ai-foundation"
      className="paf-section"
      style={{ background: "var(--v8-bg-primary)" }}
    >
      <motion.div
        className="v8-container"
        initial={live ? { opacity: 0, y: 18 } : false}
        animate={inView || !live ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: live ? 0.65 : 0, ease: EASE }}
      >
        <span className="v8-overline">Ready-to-deploy AI</span>

        <h2
          className="v8-section-title"
          style={{ maxWidth: "20ch", marginTop: "1.5rem" }}
        >
          Private AI, ready in days.
        </h2>

        <p className="v8-lead" style={{ maxWidth: "42rem", marginTop: "1.25rem" }}>
          A secure AI workspace for your organisation, deployed in a dedicated
          environment. Give your teams one place to use AI, company knowledge
          and the solutions we build, without starting from scratch.
        </p>

        <div className="paf-benefits">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.title}
              className="paf-benefit"
              initial={live ? { opacity: 0, y: 14 } : false}
              animate={
                inView || !live
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 14 }
              }
              transition={{
                duration: live ? 0.55 : 0,
                delay: live ? 0.2 + i * 0.1 : 0,
                ease: EASE,
              }}
            >
              <h3 className="paf-benefit-title">{b.title}</h3>
              <p className="v8-body" style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}>
                {b.copy}
              </p>
            </motion.div>
          ))}
        </div>

        <p
          className="v8-body"
          style={{ marginTop: "2rem", color: "var(--v8-text-muted)" }}
        >
          Already have the right infrastructure? We build into it instead.
        </p>

        <a className="v8-btn-text" href="mailto:hello@beeclaros.com" style={{ marginTop: "2.5rem" }}>
          Discuss Private AI
          <span className="v8-arrow" aria-hidden="true">&rarr;</span>
        </a>
      </motion.div>

      <style>{`
        .paf-section {
          padding-block: clamp(3rem, 7vw, 6rem);
          position: relative;
        }
        .paf-benefits {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.25rem, 3vw, 2rem);
        }
        .paf-benefit {
          padding-top: 1rem;
          border-top: 1px solid var(--v8-line);
          transition: border-color 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .paf-benefit:hover {
          border-top-color: var(--v8-lime);
        }
        .paf-benefit-title {
          margin: 0;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--v8-text-primary);
        }
        @media (max-width: 640px) {
          .paf-benefits { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .paf-benefit { transition: none; }
        }
      `}</style>
    </section>
  );
}
