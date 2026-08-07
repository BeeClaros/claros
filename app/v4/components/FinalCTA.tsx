"use client";

/**
 * Final CTA - large centered section.
 * "Start with clarity."
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="v4-section"
      id="contact"
      style={{ textAlign: "center" }}
    >
      <div
        className="v4-container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.h2
          className="v4-section-title"
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          Start with clarity.
        </motion.h2>

        <motion.p
          className="v4-body"
          style={{ maxWidth: "460px", marginTop: "1.5rem", textAlign: "center" }}
          custom={1}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          The first step isn&rsquo;t buying technology.
          <br />
          It&rsquo;s understanding where it creates value.
        </motion.p>

        <motion.div
          style={{ marginTop: "3rem" }}
          custom={2}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <a href="#contact" className="v4-btn-primary">
            Book an Assessment
          </a>
        </motion.div>
      </div>
    </section>
  );
}
