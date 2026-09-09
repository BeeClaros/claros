"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const BUSINESS_NODES = [
  { kicker: "Department", title: "Sales",              type: "department", i: 0 },
  { kicker: "Department", title: "Operations",         type: "department", i: 1 },
  { kicker: "Department", title: "Finance",            type: "department", i: 2 },
  { kicker: "Department", title: "Field / Delivery",   type: "department", i: 3 },
  { kicker: "People",     title: "Teams & managers",   type: "people",     i: 4 },
  { kicker: "Existing system", title: "CRM / ERP",    type: "system",     i: 5 },
  { kicker: "Existing tools",  title: "Industry software", type: "system", i: 6 },
  { kicker: "Inputs",    title: "Email & documents",   type: "system",     i: 7 },
];

const STEPS = [
  { num: "01 / UNDERSTAND", title: "Workflow",        desc: "Map the decisions, handoffs and friction behind how the work actually happens." },
  { num: "02 / CONNECT",    title: "Systems",         desc: "Bring data, tools and teams together without replacing what already works." },
  { num: "03 / BUILD",      title: "Software",        desc: "Create interfaces and internal tools around the operation where dedicated software is needed." },
  { num: "04 / AUTOMATE",   title: "Automation + AI", desc: "Remove repetitive work and use AI where it improves processing, decisions or information flow." },
];

const OUTCOMES = [
  {
    label: "Result", title: "Connected workflows",
    desc: "Less information lost between teams, fewer unclear handoffs and a clearer path from one step to the next.",
    tags: ["HANDOFFS", "FLOW"], j: 0,
  },
  {
    label: "Result", title: "Purpose-built tools",
    desc: "Software shaped around the operation instead of forcing the operation to fit another generic tool.",
    tags: ["INTERNAL APPS", "UX"], j: 1,
  },
  {
    label: "Result", title: "Automated handoffs",
    desc: "Less manual copying, chasing and re-entry between systems, teams and recurring operational steps.",
    tags: ["INTEGRATION", "AUTOMATION"], j: 2,
  },
  {
    label: "Result", title: "Better visibility",
    desc: "The right context reaches the right people earlier, making exceptions and decisions easier to manage.",
    tags: ["CONTEXT", "CONTROL"], j: 3,
  },
];

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: live ? 0.1 : 0 } },
  };
  const fade: Variants = {
    hidden: live ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: live ? 0.65 : 0, ease: EASE },
    },
  };

  return (
    <section
      ref={ref}
      id="what-we-do"
      className="mw-section"
    >
      <div className="mw-dot-grid" aria-hidden="true" />

      <div
        className="v8-container"
        style={{
          paddingTop: "clamp(4.75rem, 9vw, 8.25rem)",
          paddingBottom: "clamp(4.75rem, 9vw, 8.25rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* ── Intro ── */}
        <motion.div
          className="mw-intro"
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p className="v8-overline" variants={fade}>
            What we do
          </motion.p>
          <motion.h2
            className="v8-section-title"
            variants={fade}
            style={{ marginTop: "1rem", maxWidth: "20ch" }}
          >
            Across departments, people and the systems already in place.
          </motion.h2>
          <motion.p
            className="v8-lead"
            variants={fade}
            style={{ marginTop: "1.25rem", maxWidth: "72ch" }}
          >
            We work across workflows, systems, software and automation. We are
            most useful where operational friction, disconnected tools or manual
            processes are slowing the business down, and where AI can add value
            as part of a practical solution.
          </motion.p>
        </motion.div>

        {/* ── Diagram ── */}
        <motion.div
          className={`mw-diagram${inView ? " mw-animated" : ""}`}
          initial={live ? { opacity: 0, y: 20 } : false}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: live ? 0.7 : 0, delay: live ? 0.3 : 0, ease: EASE }}
        >
          {/* Label row */}
          <div className="mw-diagram-label">
            <span className="mw-eyebrow">Your business today</span>
            <span className="mw-hint">Departments · people · existing systems · tools</span>
          </div>

          {/* Business hex grid */}
          <div className="mw-business-grid">
            {BUSINESS_NODES.map((node) => (
              <div
                key={node.i}
                className={`mw-node mw-node--${node.type}`}
                style={{ "--i": node.i } as React.CSSProperties}
              >
                <div className="mw-hex">
                  <div className="mw-hex-content">
                    <span className="mw-hex-kicker">{node.kicker}</span>
                    <span className="mw-hex-title">{node.title}</span>
                  </div>
                </div>
                <div className="mw-stem" />
              </div>
            ))}
          </div>

          {/* Claros layer */}
          <div className="mw-claros-layer">
            <div className="mw-layer-head">
              <span className="mw-brand">CLAROS</span>
              <p className="mw-layer-desc">
                We work across the existing operation, connecting what already
                exists and building only what improves the way work moves
                through the business.
              </p>
            </div>
            <div className="mw-layer-steps">
              {STEPS.map((step, idx) => (
                <div key={step.num} className="mw-step" style={{ "--step-idx": idx } as React.CSSProperties}>
                  <span className="mw-step-num">{step.num}</span>
                  <strong>{step.title}</strong>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Out-stems */}
          <div className="mw-out-stems" aria-hidden="true">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="mw-out-stem" style={{ "--j": j } as React.CSSProperties} />
            ))}
          </div>

          {/* Outcome cards */}
          <div className="mw-outcomes">
            {OUTCOMES.map((o) => (
              <article
                key={o.j}
                className="mw-outcome"
                style={{ "--j": o.j } as React.CSSProperties}
              >
                <div className="mw-outcome-label">{o.label}</div>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
                <div className="mw-micro">
                  {o.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        .mw-section {
          position: relative;
          overflow: hidden;
          background: var(--v8-bg-secondary);
        }

        .mw-dot-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--v8-line) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.34;
          pointer-events: none;
        }

        /* ── Intro ── */
        .mw-intro {
          max-width: 900px;
          margin-bottom: clamp(2.75rem, 5vw, 4.5rem);
        }

        /* ── Diagram box ── */
        .mw-diagram {
          padding: 28px 26px 34px;
          border: 1px solid var(--v8-line);
          background: rgba(255, 255, 255, 0.72);
          box-shadow: 0 18px 60px rgba(17, 19, 17, 0.05);
          backdrop-filter: blur(2px);
        }

        .mw-diagram-label {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 20px;
        }

        .mw-eyebrow {
          font-family: var(--font-v8-mono), monospace;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--v8-text-muted);
        }

        .mw-hint {
          font-family: var(--font-v8-mono), monospace;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.05em;
          color: var(--v8-text-muted);
          text-align: right;
        }

        /* ── Hex grid ── */
        .mw-business-grid {
          display: grid;
          grid-template-columns: repeat(8, minmax(0, 1fr));
          gap: 12px;
          align-items: start;
          position: relative;
          z-index: 2;
        }

        .mw-node {
          min-width: 0;
          text-align: center;
        }

        .mw-animated .mw-node {
          animation: mw-rise 0.7s var(--v8-ease, cubic-bezier(.22,1,.36,1)) both;
          animation-delay: calc(var(--i) * 70ms);
        }

        .mw-hex {
          width: 100%;
          max-width: 132px;
          aspect-ratio: 1.155;
          margin: 0 auto;
          position: relative;
          display: grid;
          place-items: center;
          filter: drop-shadow(0 6px 16px rgba(17, 19, 17, 0.035));
        }

        .mw-hex::before,
        .mw-hex::after {
          content: "";
          position: absolute;
          inset: 0;
          clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%);
        }

        .mw-hex::before { background: var(--v8-line); }
        .mw-hex::after  { inset: 1px; background: rgba(255, 255, 255, 0.9); }

        .mw-node--people .mw-hex::after  { background: var(--v8-lime-pale); }
        .mw-node--system .mw-hex::after  { background: #F3F5F1; }

        .mw-hex-content {
          position: relative;
          z-index: 2;
          padding: 14%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .mw-hex-kicker {
          display: block;
          font-family: var(--font-v8-mono), monospace;
          font-size: 8px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--v8-lime-deep);
          margin-bottom: 5px;
        }

        .mw-hex-title {
          display: block;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(11px, 1.05vw, 14px);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1.15;
          overflow-wrap: anywhere;
          color: var(--v8-text-primary);
        }

        /* ── Stems (input) ── */
        .mw-stem {
          height: 34px;
          width: 1px;
          background: linear-gradient(180deg, var(--v8-line-strong), rgba(201, 206, 200, 0.2));
          margin: 8px auto 0;
          position: relative;
          overflow: hidden;
        }

        .mw-animated .mw-stem::after {
          content: "";
          position: absolute;
          left: 0;
          top: -10px;
          width: 1px;
          height: 10px;
          background: var(--v8-lime-deep);
          animation: mw-flow 2.8s ease-in-out infinite;
          animation-delay: calc(var(--i) * 140ms);
        }

        /* ── Claros layer ── */
        .mw-claros-layer {
          position: relative;
          margin-top: 0;
          background: var(--v8-bg-dark);
          color: #fff;
          border-top: 4px solid var(--v8-lime);
          overflow: hidden;
        }

        .mw-claros-layer::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(90deg, rgba(199,240,0,.06), transparent 20%, transparent 80%, rgba(199,240,0,.06)),
            radial-gradient(circle at 50% 0%, rgba(199,240,0,.11), transparent 30%);
          pointer-events: none;
        }

        .mw-layer-head {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 170px 1fr;
          align-items: center;
          gap: 26px;
          padding: 22px 24px 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.11);
        }

        .mw-brand {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 26px;
          font-weight: 600;
          letter-spacing: 0.18em;
          color: #fff;
        }

        .mw-layer-desc {
          margin: 0;
          color: #C9D0CA;
          font-size: 13px;
          line-height: 1.55;
          max-width: 70ch;
        }

        .mw-layer-steps {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
        }

        .mw-step {
          position: relative;
          padding: 22px 22px 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.11);
          min-height: 134px;
        }

        .mw-step:last-child { border-right: 0; }

        .mw-step-num {
          display: block;
          font-family: var(--font-v8-mono), monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.12em;
          color: var(--v8-lime);
        }

        .mw-step strong {
          display: block;
          margin-top: 11px;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: #fff;
        }

        .mw-step p {
          margin: 8px 0 0;
          max-width: 26ch;
          color: #AEB7B0;
          font-size: 12px;
          line-height: 1.5;
        }

        .mw-step:not(:last-child)::after {
          content: "→";
          position: absolute;
          right: -13px;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          display: grid;
          place-items: center;
          border: 1px solid var(--v8-lime);
          background: var(--v8-bg-dark);
          color: var(--v8-lime);
          font-family: var(--font-v8-mono), monospace;
          font-size: 12px;
          font-weight: 500;
          z-index: 3;
        }

        /* ── Out-stems ── */
        .mw-out-stems {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
          padding: 0 36px;
        }

        .mw-out-stem {
          height: 38px;
          width: 1px;
          background: linear-gradient(180deg, var(--v8-line-strong), rgba(201, 206, 200, 0.2));
          margin: 0 auto;
          position: relative;
          overflow: hidden;
        }

        .mw-animated .mw-out-stem::after {
          content: "";
          position: absolute;
          left: 0;
          top: -10px;
          width: 1px;
          height: 10px;
          background: var(--v8-lime-deep);
          animation: mw-flow 2.8s ease-in-out infinite;
          animation-delay: calc(var(--j) * 180ms + 0.7s);
        }

        /* ── Outcome cards ── */
        .mw-outcomes {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .mw-outcome {
          position: relative;
          min-height: 170px;
          border: 1px solid var(--v8-line);
          background: rgba(255, 255, 255, 0.86);
          padding: 20px 20px 22px;
        }

        .mw-animated .mw-outcome {
          animation: mw-rise 0.7s var(--v8-ease, cubic-bezier(.22,1,.36,1)) both;
          animation-delay: calc(var(--j) * 90ms + 0.3s);
        }

        .mw-outcome::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 3px;
          background: var(--v8-lime);
          transform: scaleX(0.28);
          transform-origin: left;
          transition: transform 0.35s var(--v8-ease);
        }

        .mw-outcome:hover::before { transform: scaleX(1); }

        .mw-outcome-label {
          font-family: var(--font-v8-mono), monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--v8-lime-deep);
        }

        .mw-outcome h3 {
          margin: 14px 0 0;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 21px;
          font-weight: 600;
          letter-spacing: -0.03em;
          line-height: 1.08;
          color: var(--v8-text-primary);
        }

        .mw-outcome p {
          margin: 10px 0 0;
          color: var(--v8-text-secondary);
          font-size: 13px;
          line-height: 1.58;
        }

        .mw-micro {
          margin-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .mw-micro span {
          border: 1px solid var(--v8-line);
          background: #FAFBF8;
          padding: 6px 8px;
          font-family: var(--font-v8-mono), monospace;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.05em;
          color: var(--v8-text-muted);
        }

        /* ── Keyframes ── */
        @keyframes mw-flow {
          0%   { transform: translateY(0);    opacity: 0; }
          20%  { opacity: 1; }
          75%  { opacity: 1; }
          100% { transform: translateY(54px); opacity: 0; }
        }

        @keyframes mw-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 1050px) {
          .mw-business-grid   { grid-template-columns: repeat(4, 1fr); }
          .mw-layer-head      { grid-template-columns: 1fr; }
          .mw-layer-steps     { grid-template-columns: repeat(2, 1fr); }
          .mw-step:nth-child(2)          { border-right: 0; }
          .mw-step:nth-child(-n+2)       { border-bottom: 1px solid rgba(255,255,255,.11); }
          .mw-step::after                { display: none !important; }
          .mw-outcomes, .mw-out-stems    { grid-template-columns: repeat(2, 1fr); }
          .mw-out-stems                  { padding: 0 18px; }
        }

        @media (max-width: 680px) {
          .mw-diagram         { padding: 20px 16px 24px; }
          .mw-diagram-label   { align-items: flex-start; flex-direction: column; }
          .mw-hint            { text-align: left; }
          .mw-business-grid   { grid-template-columns: repeat(2, 1fr); gap: 10px; }
          .mw-hex             { max-width: 150px; }
          .mw-layer-head      { padding: 20px 18px; }
          .mw-layer-steps     { grid-template-columns: 1fr; }
          .mw-step            { border-right: 0 !important; border-bottom: 1px solid rgba(255,255,255,.11) !important; }
          .mw-step:last-child { border-bottom: 0 !important; }
          .mw-outcomes        { grid-template-columns: 1fr; }
          .mw-out-stems       { grid-template-columns: 1fr; padding: 0; }
          .mw-out-stem:nth-child(n+2) { display: none; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .mw-animated .mw-node    { animation: none; }
          .mw-animated .mw-outcome { animation: none; }
          .mw-animated .mw-stem::after    { animation: none; display: none; }
          .mw-animated .mw-out-stem::after { animation: none; display: none; }
          .mw-outcome::before { transition: none; }
        }
      `}</style>
    </section>
  );
}
