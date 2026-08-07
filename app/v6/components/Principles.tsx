"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const PRINCIPLES = [
  {
    title: "Understand before you build",
    text: "We never recommend a build before we understand your business. Strategy is knowing what not to do - then doing what earns its place.",
  },
  {
    title: "Evidence over enthusiasm",
    text: "Every initiative is scored on value, feasibility, readiness and risk before a single euro is committed.",
  },
  {
    title: "Ownership is the product",
    text: "A capability nobody owns is a liability. We design accountability into every engagement.",
  },
  {
    title: "Governance as an enabler",
    text: "Responsible AI is not a compliance checkbox. It is how you scale delivery without breaking trust.",
  },
];

export default function Principles() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <section
      ref={sectionRef}
      id="principles"
      style={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed elevated background with subtle parallax */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-5% 0",
          background: "var(--pt-bg-elevated)",
          y: bgY,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 30% 40%, rgba(212,168,83,0.04) 0%, transparent 60%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      <div
        className="pt-container"
        style={{
          position: "relative",
          zIndex: 2,
          paddingBlock: "clamp(6rem, 14vw, 12rem)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "5fr 7fr",
            gap: "clamp(3rem, 6vw, 6rem)",
            alignItems: "start",
          }}
          className="prin-layout"
        >
          {/* Left: sticky statement */}
          <StickyStatement />

          {/* Right: principles as flowing text (no numbers) */}
          <div>
            {PRINCIPLES.map((p, i) => (
              <PrincipleBlock
                key={p.title}
                title={p.title}
                text={p.text}
                isLast={i === PRINCIPLES.length - 1}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .prin-layout {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .prin-sticky {
            position: relative !important;
            top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

function StickyStatement() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className="prin-sticky"
      style={{ position: "sticky", top: "calc(var(--pt-nav-h) + 3rem)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="pt-overline" style={{ marginBottom: "2rem" }}>
          What we won&rsquo;t compromise
        </div>

        <h2 className="pt-section-heading" style={{ marginBottom: "1.5rem" }}>
          We don&rsquo;t sell AI theatre.
          <br />
          <span style={{ color: "var(--pt-accent)" }}>We build what works.</span>
        </h2>

        <p className="pt-lead" style={{ marginBottom: "2.5rem" }}>
          An organisation that knows which moves create value &mdash; and can
          ship them &mdash; will outperform one with twice the tooling and half
          the alignment.
        </p>

        <a href="#contact" className="pt-btn-primary">
          Talk to us <span className="pt-arrow">&rarr;</span>
        </a>
      </motion.div>
    </div>
  );
}

function PrincipleBlock({
  title,
  text,
  isLast,
}: {
  title: string;
  text: string;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      style={{
        paddingBlock: "2.25rem",
        borderBottom: isLast ? "none" : "1px solid var(--pt-line)",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <h3
        style={{
          fontFamily: "var(--font-pt-display), serif",
          fontSize: "clamp(1.25rem, 1.9vw, 1.5rem)",
          fontWeight: 600,
          color: "var(--pt-text-primary)",
          marginBottom: "0.6rem",
          letterSpacing: "-0.015em",
        }}
      >
        {title}
      </h3>
      <p className="pt-body" style={{ maxWidth: "32rem" }}>
        {text}
      </p>
    </motion.div>
  );
}
