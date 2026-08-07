"use client";

import { useRef } from "react";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

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
        paddingTop: "var(--v10-nav-h)",
        background: "var(--v10-bg-primary)",
      }}
    >
      <div aria-hidden="true" className="v10-hero-partnership-wrap">
        {/* Native img - no Next.js optimizer, no CSS masks */}
        <img
          src="/v10/hero-partnership-hands.png"
          alt=""
          className="v10-hero-partnership-image"
        />
      </div>

      <div
        className="v10-container"
        style={{ position: "relative", zIndex: 2, width: "100%" }}
      >
        <div className="hero-copy" style={{ maxWidth: "40rem" }}>
          <motion.div
            className="v10-overline"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            AI adoption &amp; implementation
          </motion.div>

          <motion.h1
            className="v10-hero-title"
            style={{ marginTop: "1.5rem" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            AI works better when the business{" "}
            <span className="v10-accent-text">works with it.</span>
          </motion.h1>

          <motion.p
            className="v10-lead"
            style={{ marginTop: "1.75rem", maxWidth: "34rem" }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
          >
            We help organisations find where AI creates real value, implement the
            right solutions and build the foundations to use it across the
            business.
          </motion.p>

          <motion.div
            style={{
              marginTop: "2.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <a href="#assessment" className="v10-btn-primary">
              Start with an assessment <span className="v10-arrow">&rarr;</span>
            </a>
            <a href="#how-we-work" className="v10-btn-text">
              See how we work <span className="v10-arrow">&rarr;</span>
            </a>
          </motion.div>

          <motion.p
            className="v10-label"
            style={{ marginTop: "2.5rem" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9, ease: EASE }}
          >
            From opportunity discovery to implementation and long-term adoption.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
