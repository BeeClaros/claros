"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PT_ART_OPACITY } from "../art-tokens";

export default function Partnership() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const leftX = useTransform(scrollYProgress, [0.1, 0.35], [-60, 0]);
  const leftOpacity = useTransform(scrollYProgress, [0.1, 0.35], [0, 1]);
  const rightX = useTransform(scrollYProgress, [0.15, 0.4], [60, 0]);
  const rightOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);
  const lineScale = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0.32, 0.48], [0, PT_ART_OPACITY.ambient]);
  const imageY = useTransform(scrollYProgress, [0.3, 0.7], [24, -24]);

  return (
    <section
      ref={ref}
      id="partnership"
      style={{
        position: "relative",
        background: "var(--pt-bg-primary)",
        overflow: "hidden",
        paddingBlock: "clamp(6rem, 14vw, 12rem)",
      }}
    >
      {/* Drifting aurora background */}
      <div className="pt-aurora" />

      {/* Ambient glow */}
      <div
        className="pt-glow"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "800px",
          height: "600px",
          opacity: 0.08,
        }}
      />

      <div className="pt-container" style={{ position: "relative" }}>
        {/* Section intro */}
        <div style={{ textAlign: "center", maxWidth: "34rem", margin: "0 auto 4rem" }}>
          <div className="pt-overline" style={{ justifyContent: "center", marginBottom: "1.5rem" }}>
            The partnership
          </div>
          <h2 className="pt-section-heading">
            Two hands. <span style={{ color: "var(--pt-accent)" }}>One grip.</span>
          </h2>
        </div>

        {/* Two sides meeting in the middle */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            gap: "0",
            alignItems: "center",
          }}
          className="partnership-halves"
        >
          {/* Left: You */}
          <motion.div
            style={{
              x: leftX,
              opacity: leftOpacity,
              textAlign: "right",
              paddingRight: "clamp(1.5rem, 4vw, 3.5rem)",
            }}
            className="partnership-you"
          >
            <p
              className="pt-label"
              style={{ marginBottom: "1.25rem", justifyContent: "flex-end", display: "flex" }}
            >
              The human hand
            </p>
            <h3
              style={{
                fontFamily: "var(--font-pt-display), serif",
                fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--pt-text-primary)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Judgment.
              <br />
              Context.
              <br />
              <span style={{ color: "var(--pt-steel)" }}>Ownership.</span>
            </h3>
            <p className="pt-body" style={{ marginLeft: "auto", maxWidth: "22rem" }}>
              You know the business, the customers and the constraints. You know
              which problems are worth solving. That judgment cannot be
              automated.
            </p>
          </motion.div>

          {/* Center divider */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0 clamp(0.75rem, 2vw, 1.5rem)",
            }}
            className="partnership-center"
          >
            <motion.div
              style={{
                width: "2px",
                height: "120px",
                background: "linear-gradient(180deg, transparent, var(--pt-accent), transparent)",
                scaleY: lineScale,
                transformOrigin: "top",
              }}
            />
            <div
              className="pt-dot-pulse"
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "var(--pt-accent)",
              }}
            />
            <motion.div
              style={{
                width: "2px",
                height: "120px",
                background: "linear-gradient(180deg, transparent, var(--pt-accent), transparent)",
                scaleY: lineScale,
                transformOrigin: "bottom",
              }}
            />
          </div>

          {/* Right: Us */}
          <motion.div
            style={{
              x: rightX,
              opacity: rightOpacity,
              paddingLeft: "clamp(1.5rem, 4vw, 3.5rem)",
            }}
            className="partnership-us"
          >
            <p className="pt-label" style={{ marginBottom: "1.25rem" }}>
              The machine hand
            </p>
            <h3
              style={{
                fontFamily: "var(--font-pt-display), serif",
                fontSize: "clamp(1.5rem, 2.8vw, 2.25rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--pt-text-primary)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              Capability.
              <br />
              Scale.
              <br />
              <span style={{ color: "var(--pt-accent)" }}>Reach.</span>
            </h3>
            <p className="pt-body" style={{ maxWidth: "22rem" }}>
              We know what is newly possible, how to build it, and how to make it
              hold &mdash; across data and systems no person could keep in their
              head at once.
            </p>
          </motion.div>
        </div>

        {/* Bottom statement - sketch visible only via luminance mask (no black box) */}
        <motion.div
          style={{
            position: "relative",
            textAlign: "center",
            marginTop: "clamp(4rem, 8vw, 6rem)",
            paddingBlock: "clamp(6rem, 12vw, 9rem)",
            opacity: useTransform(scrollYProgress, [0.4, 0.55], [0, 1]),
            y: useTransform(scrollYProgress, [0.4, 0.55], [30, 0]),
          }}
          className="partnership-anchor"
        >
          <motion.div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 0,
              opacity: imageOpacity,
              y: imageY,
              pointerEvents: "none",
            }}
          >
            <div className="pt-sketch-mask pt-sketch-mask--section pt-sketch-mask--together" />
          </motion.div>

          <p
            className="pt-statement"
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: "38rem",
              margin: "0 auto",
            }}
          >
            Alone, each hand is limited.{" "}
            <span style={{ color: "var(--pt-accent)" }}>
              Together, they build what neither could.
            </span>
          </p>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .partnership-halves {
            grid-template-columns: 1fr !important;
            gap: 0 !important;
          }
          .partnership-you {
            text-align: left !important;
            padding-right: 0 !important;
            margin-bottom: 2rem;
          }
          .partnership-you .pt-label {
            justify-content: flex-start !important;
          }
          .partnership-you .pt-body {
            margin-left: 0 !important;
          }
          .partnership-center {
            flex-direction: row !important;
            padding: 1.5rem 0 !important;
          }
          .partnership-center > div:first-child,
          .partnership-center > div:last-child {
            width: 60px !important;
            height: 2px !important;
          }
          .partnership-us {
            padding-left: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
