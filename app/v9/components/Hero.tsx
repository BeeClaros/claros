"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import MechBee from "./MechBee";
import FlightMap from "./FlightMap";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const beeY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const beeOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const mapY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      id="top"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "var(--ae-bg-ivory)",
        paddingTop: "var(--ae-nav-h)",
      }}
    >
      {/* very subtle flight map in the background */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          y: mapY,
          opacity: 0.5,
          maskImage:
            "radial-gradient(ellipse 75% 85% at 68% 46%, black 0%, transparent 74%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 75% 85% at 68% 46%, black 0%, transparent 74%)",
        }}
      >
        <FlightMap style={{ width: "100%", height: "100%" }} bees={false} opacity={0.5} />
      </motion.div>

      <div
        className="ae-container ae-grid"
        style={{
          position: "relative",
          zIndex: 2,
          alignItems: "center",
          rowGap: "3rem",
        }}
      >
        {/* Text */}
        <div className="hero-copy">
          <motion.div
            className="ae-overline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            AI adoption and implementation
          </motion.div>

          <motion.h1
            className="ae-hero-title"
            style={{ marginTop: "1.6rem" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            Turn AI activity into{" "}
            <span className="ae-blue-text">business progress.</span>
          </motion.h1>

          <motion.p
            className="ae-lead"
            style={{ marginTop: "1.75rem", maxWidth: "34rem" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            We help organisations identify where AI creates real value,
            implement the right solutions and make them part of daily work.
          </motion.p>

          <motion.div
            style={{
              marginTop: "2.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <a href="#assessment" className="ae-btn-primary">
              Start with an assessment <span className="ae-arrow">&rarr;</span>
            </a>
            <a href="#how-we-work" className="ae-btn-text">
              See how we work <span className="ae-arrow">&rarr;</span>
            </a>
          </motion.div>

          <motion.p
            className="ae-label"
            style={{ marginTop: "2.5rem", maxWidth: "26rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            From initial opportunities to implementation and long-term adoption.
          </motion.p>
        </div>

        {/* Bee - floats gently as if stabilising */}
        <motion.div
          className="hero-bee"
          style={{
            justifySelf: "center",
            y: beeY,
            opacity: beeOpacity,
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
        >
          <div className="ae-bee-hover">
            <MechBee variant="hero" animate size="min(500px, 42vw)" />
          </div>
        </motion.div>
      </div>

      <style>{`
        .hero-copy { grid-column: 1 / 7; max-width: 40rem; }
        .hero-bee { grid-column: 7 / -1; display: flex; }
        @media (max-width: 900px) {
          .hero-copy { grid-column: 1 / -1 !important; }
          .hero-bee { display: none !important; }
        }
      `}</style>
    </section>
  );
}
