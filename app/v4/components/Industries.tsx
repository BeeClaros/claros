"use client";

/**
 * Section 4 - Where We Create Value
 * Industry cards with practical business impact examples.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const industries = [
  {
    name: "Financial Services",
    impact: "Reduce manual compliance work. Accelerate risk assessment cycles.",
  },
  {
    name: "Healthcare",
    impact: "Simplify patient administration. Improve diagnostic support workflows.",
  },
  {
    name: "Manufacturing",
    impact: "Predict maintenance needs earlier. Reduce unplanned downtime.",
  },
  {
    name: "Construction",
    impact: "Improve project estimation accuracy. Reduce repetitive documentation.",
  },
  {
    name: "Energy",
    impact: "Increase operational visibility. Optimise resource allocation.",
  },
  {
    name: "Professional Services",
    impact: "Reduce repetitive administrative work. Accelerate proposal generation.",
  },
  {
    name: "Logistics",
    impact: "Improve response times. Increase route and schedule efficiency.",
  },
  {
    name: "Retail",
    impact: "Improve demand forecasting. Reduce inventory holding costs.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Industries() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="v4-section" id="industries">
      <div className="v4-container">
        <motion.h2
          className="v4-section-title"
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          Where we create value
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "0",
            marginTop: "4rem",
          }}
        >
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              className="v4-industry-card"
              custom={i + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <div className="v4-industry-card-title">{industry.name}</div>
              <div className="v4-industry-card-desc">{industry.impact}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
