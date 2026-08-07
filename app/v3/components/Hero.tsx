"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      aria-label="Hero"
      style={{
        minHeight: "min(920px, 100svh)",
        display: "flex",
        alignItems: "center",
        paddingTop: "calc(var(--signal-nav-h) + 4rem)",
        paddingBottom: "5rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="signal-container" style={{ width: "100%" }}>
        <div className="signal-grid">
          {/* Main content - columns 1-8 */}
          <div style={{ gridColumn: "1 / 9" }}>
            {/* Scene label */}
            <FadeUp delay={0.05}>
              <span
                className="signal-label"
                style={{ color: "var(--signal-text-faint)", display: "block", marginBottom: "2.5rem" }}
              >
                01 / Signal mapping
              </span>
            </FadeUp>

            {/* Hero headline */}
            <FadeUp delay={0.15}>
              <h1 className="signal-headline-hero">
                Decide where AI
                <br />
                is worth{" "}
                <span className="signal-accent-text">building.</span>
              </h1>
            </FadeUp>

            {/* Supporting line */}
            <FadeUp delay={0.28}>
              <p
                style={{
                  fontFamily: "var(--font-signal-sans), sans-serif",
                  fontSize: "clamp(1.25rem, 2vw, 1.75rem)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.025em",
                  fontWeight: 400,
                  color: "var(--signal-text-secondary)",
                  marginTop: "1.5rem",
                  marginBottom: 0,
                  maxWidth: "36rem",
                }}
              >
                Then turn it into a working
                <br />
                part of the business.
              </p>
            </FadeUp>

            {/* Short description */}
            <FadeUp delay={0.40}>
              <p
                className="signal-lead"
                style={{ marginTop: "2rem", maxWidth: "32rem" }}
              >
                We identify the strongest AI opportunities, validate what is
                practical and help move selected use cases into operation.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.52}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.75rem",
                  flexWrap: "wrap",
                  marginTop: "2.75rem",
                }}
              >
                <a href="#contact" className="signal-btn-primary">
                  Start a conversation
                  <span className="signal-arrow" aria-hidden="true">↗</span>
                </a>
                <a href="#approach" className="signal-btn-secondary">
                  See how we work
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Contextual aside - columns 9-12 */}
          <div
            style={{
              gridColumn: "9 / 13",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              paddingBottom: "0.5rem",
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
            >
              <div
                style={{
                  height: "1px",
                  background: "var(--signal-line-subtle)",
                  marginBottom: "1.25rem",
                  transformOrigin: "left",
                }}
              />
              <p
                className="signal-label"
                style={{ color: "var(--signal-text-faint)", maxWidth: "14rem" }}
              >
                Strategy · Validation · Implementation
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
          aria-hidden="true"
        >
          <span
            className="signal-label"
            style={{ color: "var(--signal-text-faint)" }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: "1px",
              height: "28px",
              background:
                "linear-gradient(to bottom, var(--signal-text-faint), transparent)",
            }}
          />
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          /* Collapse grid to single column on tablet */
          [style*="grid-column: 1 / 9"] {
            grid-column: 1 / -1 !important;
          }
          [style*="grid-column: 9 / 13"] {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
