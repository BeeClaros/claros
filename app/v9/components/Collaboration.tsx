"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";

const STAGES = [
  {
    n: "01",
    title: "Assessment",
    text: "Understand the current position and decide what to do.",
    shape: "M14 40 L40 12 L92 20 L104 56 L74 84 L28 78 Z",
  },
  {
    n: "02",
    title: "Implementation",
    text: "Build and introduce the highest-value solutions.",
    shape: "M20 22 L84 14 L106 48 L88 84 L34 82 L12 52 Z",
  },
  {
    n: "03",
    title: "Continuous adoption",
    text: "Measure outcomes, support teams and expand what works.",
    shape: "M16 30 L52 10 L98 26 L100 66 L60 88 L22 70 Z",
  },
];

export default function Collaboration() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.5"],
  });

  const link1 = useTransform(scrollYProgress, [0.1, 0.45], ["#C66A3D", "#3157E3"]);
  const link2 = useTransform(scrollYProgress, [0.45, 0.8], ["#C66A3D", "#3157E3"]);
  const dash1 = useTransform(scrollYProgress, [0.1, 0.45], [1, 0]);
  const dash2 = useTransform(scrollYProgress, [0.45, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="ae-section"
      style={{ background: "var(--ae-bg-sand)" }}
    >
      <div className="ae-container">
        <div className="ae-reveal" style={{ maxWidth: "42rem" }}>
          <span className="ae-overline">How we work</span>
          <h2 className="ae-section-title" style={{ marginTop: "1.5rem" }}>
            One direction. Three stages.
          </h2>
        </div>

        <div ref={trackRef} className="col-track">
          {/* connectors behind */}
          <svg className="col-links" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
            <motion.path
              d="M300 30 L500 30"
              fill="none"
              stroke={link1}
              strokeWidth="2"
              strokeDasharray="6 6"
              style={{ pathLength: 1, strokeDashoffset: dash1 }}
            />
            <motion.path
              d="M666 30 L866 30"
              fill="none"
              stroke={link2}
              strokeWidth="2"
              strokeDasharray="6 6"
              style={{ pathLength: 1, strokeDashoffset: dash2 }}
            />
          </svg>

          {STAGES.map((s, i) => (
            <div key={s.n} className={`ae-reveal ae-reveal-${i + 1} col-module`}>
              <svg width="72" height="64" viewBox="0 0 118 96" fill="none" aria-hidden="true">
                <path d={s.shape} fill="#FCFCF8" stroke="#162033" strokeWidth="1.5" />
                <circle cx="59" cy="48" r="3" fill="#3157E3" />
                <circle cx={i === 0 ? 40 : i === 1 ? 84 : 52} cy={i === 0 ? 22 : i === 1 ? 24 : 20} r="2" fill="#C66A3D" />
              </svg>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.6rem", marginTop: "1.1rem" }}>
                <span className="ae-index">{s.n}</span>
                <h3 className="col-title ae-display">{s.title}</h3>
              </div>
              <p className="ae-body" style={{ marginTop: "0.6rem", fontSize: "0.98rem" }}>{s.text}</p>
            </div>
          ))}
        </div>

        <p className="ae-reveal ae-lead col-note">
          We can lead the work directly or support an existing internal AI, data
          or transformation team.
        </p>
      </div>

      <style>{`
        .col-track {
          position: relative;
          margin-top: clamp(2.5rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 3vw, 3rem);
        }
        .col-links {
          position: absolute;
          top: 32px; left: 0;
          width: 100%; height: 60px;
          z-index: 0;
        }
        .col-module { position: relative; z-index: 1; }
        .col-title {
          font-size: clamp(1.2rem, 1.9vw, 1.5rem);
          font-weight: 600; letter-spacing: -0.02em; color: var(--ae-text); margin: 0;
        }
        .col-note {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          padding-top: 2rem;
          border-top: 1px solid var(--ae-line);
          max-width: 40rem;
        }
        @media (max-width: 760px) {
          .col-track { grid-template-columns: 1fr; gap: 2rem; }
          .col-links { display: none; }
          .col-module { padding-left: 1.25rem; border-left: 2px solid var(--ae-blue-line); }
        }
      `}</style>
    </section>
  );
}
