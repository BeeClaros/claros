"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PHASES = [
  {
    num: "01",
    title: "Assessment",
    copy: "Understand where you are and what to do first.",
    href: "/assessment",
  },
  {
    num: "02",
    title: "Build",
    copy: "Implement solutions that fit your teams and systems.",
    href: "/build",
  },
  {
    num: "03",
    title: "Continuous Delivery",
    copy: "Measure outcomes, support teams and expand what works.",
    href: "/delivery",
  },
];

const HEX_LEN = 360;
const CONN_LEN = 120;

function hexPath(cx: number, cy: number, r: number) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i + (5 * Math.PI) / 6;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return "M " + pts.map((p) => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" L ") + " Z";
}

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.5", "center 0.45"],
  });

  const hex0Dash = useTransform(scrollYProgress, [0.08, 0.32], [HEX_LEN, 0]);
  const hex1Dash = useTransform(scrollYProgress, [0.40, 0.64], [HEX_LEN, 0]);
  const hex2Dash = useTransform(scrollYProgress, [0.72, 0.96], [HEX_LEN, 0]);
  const hexDashes = [hex0Dash, hex1Dash, hex2Dash];

  const conn0Dash = useTransform(scrollYProgress, [0.30, 0.40], [CONN_LEN, 0]);
  const conn1Dash = useTransform(scrollYProgress, [0.62, 0.72], [CONN_LEN, 0]);
  const connDashes = [conn0Dash, conn1Dash];

  const num0Op = useTransform(scrollYProgress, [0.24, 0.34], [0, 1]);
  const num1Op = useTransform(scrollYProgress, [0.56, 0.66], [0, 1]);
  const num2Op = useTransform(scrollYProgress, [0.88, 0.98], [0, 1]);
  const numOps = [num0Op, num1Op, num2Op];

  const dots0Op = useTransform(scrollYProgress, [0.30, 0.38], [0, 1]);
  const dots1Op = useTransform(scrollYProgress, [0.62, 0.70], [0, 1]);

  const centers = [
    { cx: 100, cy: 90 },
    { cx: 300, cy: 90 },
    { cx: 500, cy: 90 },
  ];
  const r = 58;

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="v8-section v8-section-dark"
      style={{ background: "var(--v8-bg-dark)", position: "relative", overflow: "hidden" }}
    >
      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "42rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{ color: "var(--v8-on-dark-primary)" }}
          >
            Human direction.{" "}
            <span style={{ color: "var(--v8-lime)" }}>AI capability.</span>
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{ marginTop: "1.5rem", maxWidth: "38rem", color: "var(--v8-on-dark-secondary)" }}
          >
            We work with internal teams, combining business knowledge, human
            judgement and AI capability. Assessment sets the priorities. Build
            transforms products and processes. Continuous Delivery supports
            adoption, governance and expansion.
          </p>
        </div>

        {/* Hex diagram */}
        <div
          className="v8-reveal v8-reveal-2"
          style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)", width: "100%" }}
        >
          <svg
            viewBox="0 0 600 180"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            style={{
              width: "100%",
              maxWidth: 680,
              margin: "0 auto",
              display: "block",
              overflow: "visible",
            }}
          >
            <motion.path
              d={`M ${centers[0].cx + r} ${centers[0].cy} L ${centers[1].cx - r} ${centers[1].cy}`}
              stroke="var(--v8-on-dark-line)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={CONN_LEN}
              style={{ strokeDashoffset: connDashes[0] }}
            />
            <motion.path
              d={`M ${centers[1].cx + r} ${centers[1].cy} L ${centers[2].cx - r} ${centers[2].cy}`}
              stroke="var(--v8-on-dark-line)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray={CONN_LEN}
              style={{ strokeDashoffset: connDashes[1] }}
            />

            {centers.map((c, i) => (
              <motion.path
                key={i}
                d={hexPath(c.cx, c.cy, r)}
                fill="none"
                stroke="var(--v8-on-dark-line)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray={HEX_LEN}
                style={{ strokeDashoffset: hexDashes[i] }}
              />
            ))}

            <motion.circle cx={centers[0].cx + r} cy={centers[0].cy} r="4" fill="var(--v8-lime)" style={{ opacity: dots0Op }} />
            <motion.circle cx={centers[1].cx - r} cy={centers[1].cy} r="4" fill="var(--v8-lime)" style={{ opacity: dots0Op }} />
            <motion.circle cx={centers[1].cx + r} cy={centers[1].cy} r="4" fill="var(--v8-lime)" style={{ opacity: dots1Op }} />
            <motion.circle cx={centers[2].cx - r} cy={centers[2].cy} r="4" fill="var(--v8-lime)" style={{ opacity: dots1Op }} />

            {centers.map((c, i) => (
              <motion.text
                key={`t-${i}`}
                x={c.cx}
                y={c.cy + 6}
                textAnchor="middle"
                fill="var(--v8-lime)"
                style={{
                  fontFamily: "var(--font-v8-mono), monospace",
                  fontSize: "16px",
                  letterSpacing: "0.1em",
                  opacity: numOps[i],
                }}
              >
                0{i + 1}
              </motion.text>
            ))}
          </svg>
        </div>

        {/* Phase cards with links */}
        <div className="hww-phases">
          {PHASES.map((p, i) => (
            <a
              key={p.num}
              href={p.href}
              className={`hww-phase-card v8-reveal v8-reveal-${i + 1}`}
            >
              <span
                className="v8-num"
                style={{ color: "var(--v8-lime)", fontSize: "0.75rem" }}
              >
                {p.num}
              </span>
              <h3
                className="v8-display"
                style={{
                  marginTop: "0.6rem",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v8-on-dark-primary)",
                }}
              >
                {p.title}
              </h3>
              <p
                className="v8-body"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.95rem",
                  color: "var(--v8-on-dark-secondary)",
                }}
              >
                {p.copy}
              </p>
              <span
                style={{
                  marginTop: "1rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--v8-lime)",
                }}
              >
                Learn more <span className="v8-arrow">&rarr;</span>
              </span>
            </a>
          ))}
        </div>

        <p
          className="v8-lead v8-reveal"
          style={{
            marginTop: "clamp(2.5rem, 5vw, 3.5rem)",
            maxWidth: "44rem",
            color: "var(--v8-on-dark-secondary)",
          }}
        >
          We lead the work directly or support your existing internal team.
        </p>

        <div className="v8-reveal v8-reveal-1" style={{ marginTop: "2rem" }}>
          <a href="mailto:hello@enxame.ai" className="v8-btn-lime">
            Discuss your business <span className="v8-arrow">&rarr;</span>
          </a>
        </div>
      </div>

      <style>{`
        .hww-phases {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
        }
        .hww-phase-card {
          display: block;
          text-decoration: none;
          padding: clamp(1.5rem, 2.5vw, 2rem);
          border: 1px solid var(--v8-on-dark-line);
          border-radius: 2px;
          transition: border-color 250ms var(--v8-ease), background 250ms var(--v8-ease);
        }
        .hww-phase-card:hover {
          border-color: var(--v8-lime);
          background: rgba(199, 240, 0, 0.04);
        }
        .v8-btn-lime {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.85rem 1.75rem;
          font-size: 0.95rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          background: var(--v8-lime);
          color: var(--v8-bg-dark);
          border-radius: 2px;
          transition: background 200ms var(--v8-ease);
        }
        .v8-btn-lime:hover {
          background: var(--v8-lime-hover);
        }
        @media (max-width: 720px) {
          .hww-phases { grid-template-columns: 1fr; row-gap: 1.5rem; }
        }
      `}</style>
    </section>
  );
}
