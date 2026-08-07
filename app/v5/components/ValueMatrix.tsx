"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const AREAS = [
  {
    num: "01",
    title: "Operations",
    desc: "Reduce repetitive work and improve process visibility.",
  },
  {
    num: "02",
    title: "Finance",
    desc: "Accelerate analysis, reporting and internal decision-making.",
  },
  {
    num: "03",
    title: "Customer service",
    desc: "Improve response quality and reduce handling time.",
  },
  {
    num: "04",
    title: "Knowledge work",
    desc: "Help teams find, understand and use company information.",
  },
  {
    num: "05",
    title: "Sales",
    desc: "Support research, preparation and follow-up.",
  },
  {
    num: "06",
    title: "Risk and compliance",
    desc: "Create clearer controls, evidence and accountability.",
  },
];

export default function ValueMatrix() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="ed-section ed-dotgrid" id="who-we-help">
      <div className="ed-container">
        <div className="ed-section-number ed-reveal" style={{ marginBottom: "2rem" }}>
          005
        </div>

        <div className="ed-grid" style={{ marginBottom: "4rem" }}>
          <div style={{ gridColumn: "1 / span 6" }} className="vm-heading-col">
            <h2 className="ed-section-heading ed-reveal ed-reveal-delay-1">
              Focused on the work behind the business.
            </h2>
          </div>
          <div style={{ gridColumn: "8 / span 4" }} className="vm-coord-col">
            <p className="ed-coord ed-reveal ed-reveal-delay-2" style={{ marginTop: "1rem" }}>
              matrix.areas [6]
              <br />
              type: business_function
            </p>
          </div>
        </div>

        {/* Matrix grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
          }}
          className="matrix-grid"
        >
          {AREAS.map((area, i) => (
            <div
              key={area.title}
              className={`ed-matrix-cell ed-reveal ed-reveal-delay-${(i % 3) + 1}`}
              style={{
                marginTop: i >= 3 ? "-1px" : "0",
                marginLeft: i % 3 > 0 ? "-1px" : "0",
              }}
            >
              <span className="ed-matrix-cell-number">{area.num}</span>
              <p className="ed-matrix-cell-title">{area.title}</p>
              <p className="ed-matrix-cell-desc">{area.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .matrix-grid {
            grid-template-columns: 1fr !important;
          }
          .matrix-grid .ed-matrix-cell {
            margin-left: 0 !important;
          }
          .vm-heading-col,
          .vm-coord-col {
            grid-column: 1 / -1 !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .matrix-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
