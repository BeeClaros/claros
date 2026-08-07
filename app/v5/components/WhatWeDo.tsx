"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const STAGES = [
  {
    num: "01",
    title: "Understand",
    desc: "We study the business, its priorities, processes, data and current use of AI.",
    coord: "a1→a4",
  },
  {
    num: "02",
    title: "Prioritise",
    desc: "We identify the opportunities with the strongest combination of value, feasibility and business relevance.",
    coord: "b1→b3",
  },
  {
    num: "03",
    title: "Implement",
    desc: "We design and deliver practical solutions that fit existing teams and operations.",
    coord: "c1→c2",
  },
  {
    num: "04",
    title: "Embed",
    desc: "We help create the ownership, skills and controls needed to expand AI responsibly.",
    coord: "d1→d4",
  },
];

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="ed-section ed-stone ed-dotgrid"
      id="what-we-do"
    >
      <div className="ed-container">
        <div className="ed-section-number ed-reveal" style={{ marginBottom: "2rem" }}>
          003
        </div>

        <div className="ed-grid">
          <div style={{ gridColumn: "1 / span 7" }} className="wwd-heading-col">
            <h2
              className="ed-section-heading ed-reveal ed-reveal-delay-1"
              style={{ marginBottom: "1rem" }}
            >
              From scattered ideas to practical&nbsp;adoption.
            </h2>
            <p className="ed-coord ed-reveal ed-reveal-delay-2" style={{ marginBottom: "4rem" }}>
              process.stages [4] - sequential
            </p>
          </div>
        </div>

        {/* Stages as architectural path */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "0",
            position: "relative",
          }}
          className="stages-grid"
        >
          {/* Connecting line across the top */}
          <div
            className="ed-reveal"
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              right: "0",
              height: "2px",
              background: "var(--ed-text-primary)",
            }}
          />

          {STAGES.map((stage, i) => (
            <div
              key={stage.num}
              className={`ed-reveal ed-reveal-delay-${i + 1}`}
              style={{
                paddingTop: "2.5rem",
                paddingRight: i < STAGES.length - 1 ? "2rem" : "0",
                paddingBottom: "1rem",
                paddingLeft: "1.75rem",
                borderLeft: "1px solid var(--ed-line-strong)",
                position: "relative",
              }}
            >
              {/* Top marker - circle on the connecting line */}
              <div
                style={{
                  position: "absolute",
                  top: "-5px",
                  left: "-5px",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: "var(--ed-accent)",
                  border: "2px solid var(--ed-bg-secondary)",
                }}
              />

              {/* Monospace number + coordinate */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                <span className="ed-number" style={{ color: "var(--ed-accent)", fontSize: "0.8125rem" }}>
                  {stage.num}
                </span>
                <span className="ed-coord">{stage.coord}</span>
              </div>

              <h3 className="ed-stage-title" style={{ marginBottom: "0.75rem" }}>
                {stage.title}
              </h3>
              <p className="ed-stage-desc">{stage.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .wwd-heading-col {
            grid-column: 1 / -1 !important;
          }
          .stages-grid {
            grid-template-columns: 1fr !important;
          }
          .stages-grid > div {
            padding-right: 0 !important;
            padding-bottom: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
