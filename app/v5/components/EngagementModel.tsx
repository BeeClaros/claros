"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PHASES = [
  {
    num: "01",
    title: "Assessment",
    desc: "Understand the current position and decide what to do.",
    status: "entry",
  },
  {
    num: "02",
    title: "Implementation",
    desc: "Build and introduce the highest-value solutions.",
    status: "build",
  },
  {
    num: "03",
    title: "Continuous adoption",
    desc: "Measure outcomes, support teams and expand what works.",
    status: "scale",
  },
];

export default function EngagementModel() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="ed-section ed-dotgrid" id="engagement">
      <div className="ed-container">
        <div className="ed-section-number ed-reveal" style={{ marginBottom: "2rem" }}>
          007
        </div>

        <div className="ed-grid" style={{ marginBottom: "4rem" }}>
          <div style={{ gridColumn: "1 / span 6" }} className="em-heading-col">
            <h2 className="ed-section-heading ed-reveal ed-reveal-delay-1">
              One path. Different entry&nbsp;points.
            </h2>
          </div>
        </div>

        {/* Three phases */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
          }}
          className="engagement-grid"
        >
          {PHASES.map((phase, i) => (
            <div
              key={phase.num}
              className={`ed-reveal ed-reveal-delay-${i + 1}`}
              style={{
                padding: "0",
                position: "relative",
              }}
            >
              {/* Top bar with number */}
              <div
                style={{
                  height: "3px",
                  background: i === 0 ? "var(--ed-accent)" : "var(--ed-text-primary)",
                  marginBottom: "2rem",
                }}
              />
              <div
                style={{
                  paddingRight: i < PHASES.length - 1 ? "2.5rem" : "0",
                  paddingLeft: i > 0 ? "2.5rem" : "0",
                  borderRight:
                    i < PHASES.length - 1 ? "1px solid var(--ed-line)" : "none",
                  paddingBottom: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
                  <span className="ed-number" style={{ fontSize: "0.8125rem" }}>{phase.num}</span>
                  <span className="ed-coord">status: {phase.status}</span>
                </div>
                <h3 className="ed-stage-title" style={{ marginBottom: "0.75rem" }}>
                  {phase.title}
                </h3>
                <p className="ed-stage-desc">{phase.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Supporting statement */}
        <div
          className="ed-reveal ed-reveal-delay-4"
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--ed-line)",
          }}
        >
          <div className="ed-grid">
            <div style={{ gridColumn: "1 / span 7" }} className="em-support-col">
              <p className="ed-body">
                We can lead the work directly or support an existing internal
                AI, data or transformation team.
              </p>
              <p className="ed-body" style={{ marginTop: "1rem" }}>
                This is particularly important for organisations that already
                have - or are hiring - someone responsible for AI enablement.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .em-heading-col,
          .em-support-col {
            grid-column: 1 / -1 !important;
          }
          .engagement-grid {
            grid-template-columns: 1fr !important;
          }
          .engagement-grid > div > div {
            padding-left: 0 !important;
            padding-right: 0 !important;
            border-right: none !important;
            padding-bottom: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
