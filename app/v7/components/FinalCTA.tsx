"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const EASE = [0.22, 1, 0.36, 1] as const;

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="contact"
      className="hv-section"
      style={{ background: "var(--hv-bg-primary)", position: "relative", overflow: "hidden" }}
    >
      <div className="hv-glow" style={{ bottom: "-10%", right: "6%", width: 420, height: 420 }} />

      {/* single bee flying toward the CTA */}
      <motion.div
        aria-hidden="true"
        style={{ position: "absolute", top: "clamp(2rem, 6vw, 5rem)", left: 0, zIndex: 1 }}
        initial={{ opacity: 0, x: "-8vw", y: -30 }}
        animate={inView ? { opacity: 1, x: "52vw", y: 0 } : {}}
        transition={{ duration: 2.4, ease: EASE }}
      >
        <div
          className="hv-bee-float"
          style={{ position: "relative", width: 84, height: 84 }}
        >
          <Image
            src="/v7/bee-symbol.png"
            alt=""
            fill
            sizes="84px"
            style={{ objectFit: "contain" }}
          />
        </div>
      </motion.div>

      <div className="hv-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "40rem" }}>
          <motion.div
            className="hv-overline"
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            Contact
          </motion.div>

          <motion.h2
            className="hv-section-title"
            style={{ marginTop: "1.5rem" }}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          >
            Find where AI can make a{" "}
            <span className="hv-accent-text">real difference.</span>
          </motion.h2>

          <motion.p
            className="hv-lead"
            style={{ marginTop: "1.5rem", maxWidth: "34rem" }}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          >
            A first conversation helps us understand your priorities, current
            activity and where focused support could create value.
          </motion.p>

          <motion.div
            style={{ marginTop: "2.25rem", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <a href="mailto:hello@enxame.ai" className="hv-btn-primary">
              Discuss your business <span className="hv-arrow">&rarr;</span>
            </a>
            <a href="#assessment" className="hv-btn-text">
              Learn about the assessment <span className="hv-arrow">&rarr;</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
