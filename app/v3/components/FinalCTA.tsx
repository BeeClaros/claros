"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export default function FinalCTA() {
  const ref    = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      className="signal-section signal-bg-elevated"
      aria-label="Start a conversation"
      style={{ borderTop: "1px solid var(--signal-line-subtle)" }}
    >
      <div className="signal-container">
        <div className="signal-grid">
          {/* Content spans columns 2-11 for breathing room */}
          <div
            style={{
              gridColumn: "2 / 11",
              display: "flex",
              flexDirection: "column",
              gap: "clamp(2rem, 3.5vw, 3.5rem)",
            }}
          >
            {/* Label */}
            <motion.span
              className="signal-label"
              style={{ color: "var(--signal-text-faint)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.45, delay: 0.05 }}
            >
              04 / Start
            </motion.span>

            {/* Headline */}
            <motion.h2
              className="signal-headline-section"
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.14, ease: EASE_OUT }}
            >
              Choose what{" "}
              <span className="signal-accent-text">matters.</span>
              <br />
              Build what works.
            </motion.h2>

            {/* Supporting copy */}
            <motion.p
              className="signal-lead"
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.26, ease: EASE_OUT }}
            >
              Start with a focused conversation about your processes, priorities
              and current AI initiatives.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.38, ease: EASE_OUT }}
              style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            >
              <a href="mailto:hello@signal.ai" className="signal-btn-primary">
                Start a conversation
                <span className="signal-arrow" aria-hidden="true">↗</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact [style*="grid-column: 2 / 11"] {
            grid-column: 1 / -1 !important;
          }
        }
      `}</style>
    </section>
  );
}
