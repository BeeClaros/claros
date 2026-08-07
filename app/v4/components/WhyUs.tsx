"use client";

/**
 * Section 6 - Why Companies Work With Us
 * Short, direct statements. No marketing fluff.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const statements = [
  "We start with the business, not the technology.",
  "We focus on measurable outcomes.",
  "We work alongside internal teams.",
  "We design solutions people actually adopt.",
  "We help build long-term capability.",
];

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function WhyUs() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="v4-section" id="why">
      <div className="v4-container">
        <motion.h2
          className="v4-section-title"
          style={{ marginBottom: "4rem" }}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          Why companies work with&nbsp;us
        </motion.h2>

        <div style={{ maxWidth: "640px" }}>
          {statements.map((statement, i) => (
            <motion.div
              key={i}
              className="v4-statement"
              custom={i + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              {statement}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
