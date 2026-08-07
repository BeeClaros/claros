"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const DIFFERENTIATORS = [
  { text: "Independent from specific technology vendors", tag: "ind" },
  { text: "Focused on business outcomes", tag: "out" },
  { text: "Able to work with internal teams", tag: "int" },
  { text: "Structured for long-term capability, not isolated pilots", tag: "ltc" },
];

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section ref={sectionRef} className="ed-section ed-stone" id="about">
      <div className="ed-container">
        <div className="ed-grid" style={{ alignItems: "start" }}>
          {/* Left - title and statement */}
          <div style={{ gridColumn: "1 / span 6" }} className="why-left">
            <div className="ed-section-number ed-reveal" style={{ marginBottom: "2rem" }}>
              008
            </div>

            <h2
              className="ed-section-heading ed-reveal ed-reveal-delay-1"
              style={{ marginBottom: "3rem" }}
            >
              Clear thinking. Practical execution.
            </h2>

            <div
              className="ed-reveal ed-reveal-delay-2"
              style={{
                borderLeft: "2px solid var(--ed-accent)",
                paddingLeft: "1.75rem",
                maxWidth: "28rem",
              }}
            >
              <p className="ed-body">
                Strategy without implementation creates documents.
              </p>
              <p className="ed-body" style={{ marginTop: "0.75rem" }}>
                Implementation without direction creates more tools.
              </p>
              <p
                className="ed-body"
                style={{
                  marginTop: "1rem",
                  fontWeight: 600,
                  color: "var(--ed-text-primary)",
                }}
              >
                We connect both.
              </p>
            </div>
          </div>

          {/* Right - differentiators */}
          <div style={{ gridColumn: "8 / span 5" }} className="why-right">
            <p className="ed-label ed-reveal ed-reveal-delay-1" style={{ marginBottom: "1.5rem" }}>
              differentiators
            </p>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {DIFFERENTIATORS.map((item, i) => (
                <div
                  key={i}
                  className={`ed-reveal ed-reveal-delay-${i + 2}`}
                  style={{
                    padding: "1.25rem 0",
                    borderBottom: "1px solid var(--ed-line)",
                    display: "flex",
                    gap: "1.25rem",
                    alignItems: "baseline",
                  }}
                >
                  <span className="ed-coord" style={{ flexShrink: 0, minWidth: "2rem" }}>
                    [{item.tag}]
                  </span>
                  <p className="ed-body" style={{ maxWidth: "none" }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .why-left, .why-right {
            grid-column: 1 / -1 !important;
          }
          .why-right {
            margin-top: 3rem;
          }
        }
      `}</style>
    </section>
  );
}
