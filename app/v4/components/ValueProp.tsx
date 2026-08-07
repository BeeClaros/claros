"use client";

/**
 * Section 2 - Value Proposition
 * "AI should improve the business. Not create another project."
 * Three concise blocks.
 */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const blocks = [
  {
    title: "Discover opportunities",
    body: "Find where AI can save time, reduce costs or improve decisions - without disrupting what already works.",
  },
  {
    title: "Implement what matters",
    body: "Build practical solutions that fit existing operations and deliver measurable results from day one.",
  },
  {
    title: "Scale with confidence",
    body: "Create the processes and governance needed for long-term adoption across the organisation.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

export default function ValueProp() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section ref={ref} className="v4-section" id="value">
      <div className="v4-container">
        <motion.h2
          className="v4-section-title"
          style={{ maxWidth: "680px" }}
          custom={0}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          AI should improve the business.
          <br />
          <span style={{ color: "var(--v4-text-muted)" }}>
            Not create another project.
          </span>
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "3rem",
            marginTop: "5rem",
          }}
        >
          {blocks.map((block, i) => (
            <motion.div
              key={block.title}
              custom={i + 1}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              variants={fadeUp}
            >
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  background: "var(--v4-line)",
                  marginBottom: "2rem",
                }}
              />
              <h3 className="v4-subsection-title">{block.title}</h3>
              <p className="v4-body" style={{ marginTop: "0.875rem", maxWidth: "380px" }}>
                {block.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
