"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const DELIVERABLES = [
  "A clear view of current AI activity",
  "A prioritised list of business opportunities",
  "An assessment of data and operational readiness",
  "A view of risks and dependencies",
  "A practical implementation roadmap",
];

export default function StartingPoint() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="ed-section ed-accent-section" id="assessment">
      <div className="ed-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="ed-grid" style={{ alignItems: "start" }}>
          {/* Left column */}
          <div style={{ gridColumn: "1 / span 6" }} className="sp-left">
            <div className="ed-section-number ed-reveal" style={{ marginBottom: "2rem" }}>
              004
            </div>

            <h2
              className="ed-section-heading ed-reveal ed-reveal-delay-1"
              style={{ marginBottom: "1.5rem" }}
            >
              Start with an AI Opportunity Assessment.
            </h2>
            <p className="ed-lead ed-reveal ed-reveal-delay-2" style={{ marginBottom: "3rem" }}>
              Before investing in more tools or launching isolated projects,
              understand where AI can produce the greatest return.
            </p>

            {/* Outcome statement */}
            <div
              className="ed-reveal ed-reveal-delay-4"
              style={{
                borderTop: "1px solid rgba(243,241,235,0.1)",
                paddingTop: "2.5rem",
                marginTop: "1rem",
              }}
            >
              <p className="ed-statement" style={{ maxWidth: "28rem" }}>
                You leave knowing what to do first, what it will require and
                why it matters.
              </p>

              <div style={{ marginTop: "2rem" }}>
                <a href="#contact" className="ed-btn-primary">
                  Discuss an assessment <span className="ed-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right column - deliverables */}
          <div style={{ gridColumn: "8 / span 5" }} className="sp-right">
            <p
              className="ed-label ed-reveal ed-reveal-delay-2"
              style={{ marginBottom: "1.75rem" }}
            >
              Assessment.deliverables
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {DELIVERABLES.map((item, i) => (
                <div
                  key={i}
                  className={`ed-reveal ed-reveal-delay-${i + 2}`}
                  style={{
                    padding: "1.25rem 0",
                    borderBottom: "1px solid rgba(243,241,235,0.08)",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "baseline",
                  }}
                >
                  <span
                    className="ed-number"
                    style={{ flexShrink: 0 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="ed-body">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .sp-left, .sp-right {
            grid-column: 1 / -1 !important;
          }
          .sp-right {
            margin-top: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
