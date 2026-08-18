"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PRINCIPLES = [
  "Privacy by design",
  "Security built in",
  "Clear ownership",
  "Deployment that fits",
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const principlesRef = useRef<HTMLDivElement>(null);
  const principlesInView = useInView(principlesRef, { once: true, amount: 0.2 });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  return (
    <section
      ref={ref}
      id="responsible-deployment"
      style={{
        background: "var(--v8-bg-primary)",
        paddingBlock: "clamp(2.75rem, 5vw, 4.5rem)",
        position: "relative",
      }}
    >
      <div className="v8-container">
        <h2
          className="v8-section-title v8-reveal"
          style={{
            maxWidth: "18ch",
            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
          }}
        >
          Security, privacy and control from the start.
        </h2>

        <div ref={principlesRef} className="trust-row">
          {PRINCIPLES.map((title, i) => (
            <motion.p
              key={title}
              className="trust-label"
              initial={live ? { opacity: 0, y: 18 } : false}
              animate={
                principlesInView || !live
                  ? { opacity: 1, y: 0 }
                  : { opacity: 0, y: 18 }
              }
              transition={{
                duration: live ? 0.6 : 0,
                delay: live ? i * 0.1 : 0,
                ease: EASE,
              }}
            >
              {title}
            </motion.p>
          ))}
        </div>
      </div>

      <style>{`
        .trust-row {
          margin-top: clamp(2rem, 4vw, 3rem);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1.25rem, 3vw, 2rem);
        }
        .trust-label {
          margin: 0;
          padding-top: 1rem;
          border-top: 1px solid var(--v8-line);
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--v8-text-primary);
          transition: border-color 260ms cubic-bezier(0.22, 1, 0.36, 1);
        }
        .trust-label:hover {
          border-top-color: var(--v8-lime);
        }
        @media (max-width: 900px) {
          .trust-row { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .trust-row { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-label { transition: none; }
        }
      `}</style>
    </section>
  );
}
