"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import WingMacro from "./WingMacro";

const RESULTS = [
  "Current AI activity",
  "High-value opportunities",
  "Operational readiness",
  "Risks and responsibilities",
  "Implementation priorities",
  "Practical roadmap",
];

export default function Assessment() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="assessment"
      className="ae-section"
      style={{ background: "var(--ae-bg-night)" }}
    >
      <div className="ae-container ae-grid" style={{ alignItems: "center", rowGap: "3.5rem" }}>
        {/* wing macro - side element */}
        <div
          className="ae-reveal asmt-art"
          aria-hidden="true"
          style={{ gridColumn: "1 / 5" }}
        >
          <WingMacro style={{ width: "100%", maxWidth: 360 }} />
        </div>

        {/* copy */}
        <div className="asmt-copy" style={{ gridColumn: "5 / -1" }}>
          <span className="ae-reveal ae-overline" style={{ color: "var(--ae-copper-lt)" }}>
            Assessment
          </span>
          <h2
            className="ae-reveal ae-section-title"
            style={{ marginTop: "1.5rem", color: "var(--ae-text-on-dark)" }}
          >
            Start by knowing what matters.
          </h2>
          <p
            className="ae-reveal ae-lead"
            style={{ marginTop: "1.5rem", color: "var(--ae-text-on-dark-soft)", maxWidth: "36rem" }}
          >
            Before investing in more tools or launching more pilots, understand
            where AI can create the strongest business return.
          </p>

          <ul className="ae-reveal ae-reveal-1 asmt-results">
            {RESULTS.map((r) => (
              <li key={r}>
                <span className="asmt-dot" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>

          <p
            className="ae-reveal ae-reveal-2 ae-statement"
            style={{
              marginTop: "2.5rem",
              color: "var(--ae-text-on-dark)",
              maxWidth: "34rem",
            }}
          >
            You leave with a clear view of what to do first and what it will
            require.
          </p>

          <div className="ae-reveal ae-reveal-3" style={{ marginTop: "2.25rem" }}>
            <a href="#contact" className="ae-btn-primary ae-btn-light">
              Discuss an assessment <span className="ae-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .asmt-results {
          list-style: none;
          padding: 0;
          margin: 2.25rem 0 0;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.9rem 2rem;
          max-width: 34rem;
        }
        .asmt-results li {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          font-size: 0.98rem;
          color: var(--ae-text-on-dark-soft);
          padding-bottom: 0.9rem;
          border-bottom: 1px solid var(--ae-line-dark);
        }
        .asmt-dot {
          width: 6px; height: 6px; flex: none;
          background: var(--ae-blue);
          border-radius: 50%;
        }
        .asmt-results li:nth-child(4) .asmt-dot { background: var(--ae-copper-lt); }
        @media (max-width: 860px) {
          .asmt-art { grid-column: 1 / -1 !important; display: flex; justify-content: center; }
          .asmt-art svg { max-width: 220px !important; }
          .asmt-copy { grid-column: 1 / -1 !important; }
        }
        @media (max-width: 560px) {
          .asmt-results { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
