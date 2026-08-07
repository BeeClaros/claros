"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PT_ART_OPACITY } from "../art-tokens";

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const line1Y = useTransform(scrollYProgress, [0.1, 0.25], [40, 0]);

  const line2Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const line2Y = useTransform(scrollYProgress, [0.2, 0.35], [40, 0]);

  const imageOpacity = useTransform(scrollYProgress, [0.12, 0.32], [0, PT_ART_OPACITY.ambient]);
  const imageY = useTransform(scrollYProgress, [0.1, 0.7], [20, -20]);

  const line3Opacity = useTransform(scrollYProgress, [0.32, 0.47], [0, 1]);
  const line3Y = useTransform(scrollYProgress, [0.32, 0.47], [40, 0]);

  const accentWidth = useTransform(scrollYProgress, [0.15, 0.45], ["0%", "100%"]);

  const supportOpacity = useTransform(scrollYProgress, [0.45, 0.58], [0, 1]);
  const supportY = useTransform(scrollYProgress, [0.45, 0.58], [30, 0]);

  return (
    <section
      ref={ref}
      id="problem"
      style={{
        minHeight: "120vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "var(--pt-bg-deep)",
        overflow: "hidden",
      }}
    >
      {/* Animated grid lines */}
      <div className="pt-gridlines" />

      {/* Scattered hands - chaos without partnership */}
      <motion.div
        className="pt-sketch-wrap"
        style={{
          opacity: imageOpacity,
          y: imageY,
          zIndex: 1,
        }}
        aria-hidden="true"
      >
        <div className="pt-sketch-mask pt-sketch-mask--section pt-sketch-mask--scattered" />
      </motion.div>

      {/* Gradient edge from hero */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "120px",
          background:
            "linear-gradient(180deg, var(--pt-bg-deep) 0%, transparent 100%)",
          zIndex: 2,
        }}
      />

      <div
        className="pt-container"
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          maxWidth: "52rem",
          paddingBlock: "8rem",
        }}
      >
        <motion.p
          style={{
            fontFamily: "var(--font-pt-display), 'Georgia', serif",
            fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            fontWeight: 600,
            color: "var(--pt-text-primary)",
            marginBottom: "0.5rem",
            opacity: line1Opacity,
            y: line1Y,
          }}
        >
          AI everywhere.
        </motion.p>

        <motion.p
          style={{
            fontFamily: "var(--font-pt-display), 'Georgia', serif",
            fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            fontWeight: 600,
            color: "var(--pt-accent)",
            marginBottom: "2.5rem",
            opacity: line2Opacity,
            y: line2Y,
          }}
        >
          Value nowhere.
        </motion.p>

        <motion.div
          style={{
            height: "2px",
            background:
              "linear-gradient(90deg, transparent, var(--pt-accent), transparent)",
            margin: "0 auto 2.5rem",
            maxWidth: "200px",
            width: accentWidth,
          }}
        />

        <motion.p
          style={{
            fontFamily: "var(--font-pt-display), 'Georgia', serif",
            fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
            lineHeight: 1.4,
            letterSpacing: "-0.015em",
            fontWeight: 400,
            color: "var(--pt-text-secondary)",
            maxWidth: "38rem",
            margin: "0 auto 3rem",
            opacity: line3Opacity,
            y: line3Y,
          }}
        >
          Boards want AI on the agenda. Teams run pilots. Vendors promise
          platforms. Twelve months later, nothing has changed in how the
          business actually operates.
        </motion.p>

        <motion.div
          style={{
            opacity: supportOpacity,
            y: supportY,
          }}
        >
          <p
            className="pt-lead"
            style={{
              textAlign: "center",
              maxWidth: "32rem",
              margin: "0 auto",
            }}
          >
            The gap is not technology. It is partnership &mdash; knowing which
            moves matter, who owns them, and how to ship them.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
