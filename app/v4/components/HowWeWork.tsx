"use client";

/**
 * Section 3 - How We Work
 * Three horizontal numbered steps, clean and minimal.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Assessment",
    body: "Understand the business, processes and opportunities. Map where AI creates real value.",
  },
  {
    number: "02",
    title: "Implementation",
    body: "Build the highest-value solutions first. Integrate with existing workflows and teams.",
  },
  {
    number: "03",
    title: "Continuous Enablement",
    body: "Support adoption, measure impact and expand capability over time.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="v4-section" id="approach">
      <div className="v4-container">
        <motion.h2
          className="v4-section-title"
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          How we work
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "0",
            marginTop: "5rem",
          }}
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              style={{
                padding: "2.5rem 2rem",
                borderLeft: i === 0 ? "none" : "1px solid var(--v4-line)",
                borderTop: "1px solid var(--v4-line)",
              }}
            >
              <span className="v4-step-number">{step.number}</span>
              <h3
                className="v4-subsection-title"
                style={{ marginTop: "1.5rem" }}
              >
                {step.title}
              </h3>
              <p
                className="v4-body-small"
                style={{ marginTop: "1rem", maxWidth: "320px" }}
              >
                {step.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
