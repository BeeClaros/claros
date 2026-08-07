"use client";

/**
 * V4 Hero - large statement, no AI mention in the first sentence.
 * No hero image, only the animated dot field behind.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div className="v4-container" style={{ paddingBlock: "8rem 6rem" }}>
        <motion.h1
          className="v4-hero-title"
          style={{ maxWidth: "820px" }}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          Most companies don&rsquo;t have an AI&nbsp;problem.
        </motion.h1>

        <motion.h1
          className="v4-hero-title"
          style={{ maxWidth: "820px", marginTop: "0.25em", color: "var(--v4-text-muted)" }}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          They have an execution&nbsp;problem.
        </motion.h1>

        <motion.p
          className="v4-body"
          style={{ maxWidth: "540px", marginTop: "2.5rem" }}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          We help organisations identify where AI creates measurable value,
          implement it safely, and make it part of everyday operations.
        </motion.p>

        <motion.div
          style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "3rem" }}
          custom={3}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <a href="#contact" className="v4-btn-primary">
            Start with an Assessment
          </a>
          <a href="#approach" className="v4-btn-secondary">
            See how we work <span className="v4-arrow">&rarr;</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
