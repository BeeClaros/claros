"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const OBSERVATIONS = [
  { num: "01", text: "Too many disconnected ideas", coord: "a1" },
  { num: "02", text: "No clear view of value or risk", coord: "b2" },
  { num: "03", text: "Experiments that never reach daily operations", coord: "c3" },
];

export default function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="ed-section" id="the-problem">
      <div className="ed-container">
        {/* Section number */}
        <div className="ed-section-number ed-reveal" style={{ marginBottom: "2rem" }}>
          002
        </div>

        {/* Large editorial statement */}
        <div className="ed-grid">
          <div style={{ gridColumn: "1 / span 8" }} className="problem-heading-col">
            <h2 className="ed-section-heading ed-reveal ed-reveal-delay-1">
              Most organisations already have AI&nbsp;activity.
              <br />
              What they lack is a clear direction.
            </h2>
          </div>
        </div>

        <div className="ed-grid" style={{ marginTop: "2.5rem", marginBottom: "4.5rem" }}>
          <div style={{ gridColumn: "1 / span 6" }} className="problem-body-col">
            <p className="ed-lead ed-reveal ed-reveal-delay-2">
              Teams are testing tools. Leaders are discussing opportunities.
              New use cases appear every week.
            </p>
            <p className="ed-lead ed-reveal ed-reveal-delay-3" style={{ marginTop: "1rem" }}>
              But without clear priorities, ownership and the right
              foundations, activity does not become business value.
            </p>
          </div>
        </div>

        {/* Three observations */}
        <div className="ed-divider ed-reveal ed-reveal-delay-3" />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "0",
          }}
          className="obs-grid"
        >
          {OBSERVATIONS.map((obs, i) => (
            <div
              key={obs.num}
              className={`ed-obs ed-reveal ed-reveal-delay-${i + 3}`}
              style={{
                borderRight: i < OBSERVATIONS.length - 1 ? "1px solid var(--ed-line)" : "none",
                paddingLeft: i > 0 ? "2.5rem" : "0",
                paddingRight: i < OBSERVATIONS.length - 1 ? "2.5rem" : "0",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <span className="ed-number" style={{ fontSize: "0.875rem" }}>{obs.num}</span>
                <span className="ed-coord">[{obs.coord}]</span>
              </div>
              <p className="ed-stage-title" style={{ maxWidth: "16rem" }}>
                {obs.text}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 768px) {
            .problem-heading-col,
            .problem-body-col {
              grid-column: 1 / -1 !important;
            }
            .obs-grid {
              grid-template-columns: 1fr !important;
            }
            .obs-grid > div {
              border-right: none !important;
              border-bottom: 1px solid var(--ed-line);
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .obs-grid > div:last-child {
              border-bottom: none;
            }
          }
        `}</style>
      </div>
    </section>
  );
}
