"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PRINCIPLES = [
  {
    num: "P.01",
    title: "Measurable value",
    desc: "Every initiative should have a clear business reason.",
  },
  {
    num: "P.02",
    title: "Practical delivery",
    desc: "Solutions should fit the way the organisation actually operates.",
  },
  {
    num: "P.03",
    title: "Adoption by design",
    desc: "People, ownership and processes are part of the implementation.",
  },
  {
    num: "P.04",
    title: "Responsible foundations",
    desc: "Security, control and accountability should be built in from the beginning.",
  },
];

export default function HowWeWork() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="ed-section ed-stone" id="how-we-work">
      <div className="ed-container">
        <div className="ed-section-number ed-reveal" style={{ marginBottom: "2rem" }}>
          006
        </div>

        <h2
          className="ed-section-heading ed-reveal ed-reveal-delay-1"
          style={{ maxWidth: "22rem", marginBottom: "4rem" }}
        >
          Business first. Technology second.
        </h2>

        <div className="ed-grid" style={{ alignItems: "start" }}>
          {/* Left - editorial statement */}
          <div
            style={{ gridColumn: "1 / span 5" }}
            className="hww-left"
          >
            <div
              className="ed-reveal ed-reveal-delay-2"
              style={{
                borderLeft: "2px solid var(--ed-accent)",
                paddingLeft: "1.75rem",
              }}
            >
              <p className="ed-statement" style={{ maxWidth: "22rem" }}>
                We do not begin with a&nbsp;tool.
              </p>
              <p
                className="ed-statement"
                style={{ maxWidth: "22rem", marginTop: "0.75rem" }}
              >
                We begin with the work, the decisions and the problems
                that&nbsp;matter.
              </p>
            </div>

            <p className="ed-coord ed-reveal ed-reveal-delay-3" style={{ marginTop: "2rem", paddingLeft: "1.75rem" }}>
              approach.principles [4]
            </p>
          </div>

          {/* Right - principles */}
          <div style={{ gridColumn: "7 / span 6" }} className="hww-right">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "0",
              }}
              className="principles-grid"
            >
              {PRINCIPLES.map((p, i) => (
                <div
                  key={p.title}
                  className={`ed-principle ed-reveal ed-reveal-delay-${i + 2}`}
                  style={{
                    paddingRight: i % 2 === 0 ? "1.5rem" : "0",
                    paddingLeft: i % 2 === 1 ? "1.5rem" : "0",
                    borderRight: i % 2 === 0 ? "1px solid var(--ed-line)" : "none",
                  }}
                >
                  <span className="ed-principle-number">{p.num}</span>
                  <h3 className="ed-principle-title">{p.title}</h3>
                  <p className="ed-principle-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hww-left, .hww-right {
            grid-column: 1 / -1 !important;
          }
          .hww-right {
            margin-top: 3rem;
          }
          .principles-grid {
            grid-template-columns: 1fr !important;
          }
          .principles-grid .ed-principle {
            padding-left: 0 !important;
            padding-right: 0 !important;
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
}
