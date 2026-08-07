"use client";

/**
 * Section 5 - Impact
 * Large metrics displayed in a premium layout.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const metrics = [
  { value: "12,000+", label: "Hours returned to employees annually" },
  { value: "40+", label: "Processes simplified across client organisations" },
  { value: "3×", label: "Faster decision cycles in core operations" },
  { value: "68%", label: "Reduction in operational risk exposure" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function Impact() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="v4-section-sm" id="impact">
      <div className="v4-container">
        <motion.div
          className="v4-label"
          style={{ marginBottom: "4rem" }}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          Impact
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "3rem",
          }}
        >
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
              style={{ paddingTop: "2rem", borderTop: "1px solid var(--v4-line)" }}
            >
              <div className="v4-metric-number">{metric.value}</div>
              <div className="v4-metric-label">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
