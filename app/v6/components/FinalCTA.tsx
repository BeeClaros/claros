"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PT_ART_OPACITY } from "../art-tokens";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(contentRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const glowScale = useTransform(scrollYProgress, [0.2, 0.6], [0.5, 1.2]);
  const glowOpacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 0.2, 0.05]);
  const handOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, PT_ART_OPACITY.subtle]);
  const handScale = useTransform(scrollYProgress, [0.2, 0.5], [0.95, 1]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      style={{
        position: "relative",
        background: "var(--pt-bg-deep)",
        paddingBlock: "clamp(6rem, 14vw, 12rem)",
        overflow: "hidden",
      }}
    >
      {/* Hand reach - invitation */}
      <motion.div
        className="pt-sketch-wrap"
        style={{
          opacity: handOpacity,
          scale: handScale,
          zIndex: 0,
        }}
        aria-hidden="true"
      >
        <div className="pt-sketch-mask pt-sketch-mask--section pt-sketch-mask--cta" />
      </motion.div>

      {/* Animated glow */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--pt-accent-glow) 0%, transparent 60%)",
          filter: "blur(100px)",
          pointerEvents: "none",
          x: "-50%",
          y: "-50%",
          scale: glowScale,
          opacity: glowOpacity,
        }}
      />

      {/* Top divider */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(1.25rem, 5vw, 5rem)",
          right: "clamp(1.25rem, 5vw, 5rem)",
        }}
      >
        <div className="pt-divider-accent" />
      </div>

      <div
        ref={contentRef}
        className="pt-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <div
          style={{
            maxWidth: "36rem",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <motion.div
            className="pt-overline"
            style={{ justifyContent: "center" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Ready to move?
          </motion.div>

          <motion.h2
            className="pt-section-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Book an <span style={{ color: "var(--pt-accent)" }}>intro call.</span>
          </motion.h2>

          <motion.p
            className="pt-lead"
            style={{ textAlign: "center" }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            Tell us where you are &mdash; scattered pilots, a clear use case, or
            something in between. We will meet you there.
          </motion.p>

          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "1rem",
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.7,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <a href="mailto:hello@beeclaros.com" className="pt-btn-primary">
              Book an intro call <span className="pt-arrow">&rarr;</span>
            </a>
          </motion.div>

          <motion.p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.8125rem",
              color: "var(--pt-text-muted)",
              letterSpacing: "0.02em",
            }}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Two business days. A considered reply. No automated nurture sequence.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
