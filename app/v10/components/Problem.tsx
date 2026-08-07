"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const IDEAS = [
  {
    num: "01",
    title: "Too many disconnected ideas",
    copy: "Experiments happen, but they do not work as one system.",
  },
  {
    num: "02",
    title: "No clear priority",
    copy: "It is difficult to know what to do first and where value is real.",
  },
  {
    num: "03",
    title: "Limited adoption",
    copy: "Solutions are introduced, but they do not become part of daily work.",
  },
];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="v10-section"
      style={{ background: "var(--v10-bg-contrast)" }}
    >
      <div className="v10-container">
        <div className="v10-grid" style={{ rowGap: "2rem" }}>
          <div style={{ gridColumn: "1 / -1", maxWidth: "58rem" }}>
            <div className="v10-overline v10-reveal">The problem</div>
            <h2
              className="v10-section-title v10-reveal v10-reveal-1"
              style={{ marginTop: "1.4rem", maxWidth: "20ch" }}
            >
              AI activity is growing. Direction is often missing.
            </h2>
            <p
              className="v10-lead v10-reveal v10-reveal-2"
              style={{ marginTop: "1.6rem", maxWidth: "44rem" }}
            >
              Teams are testing tools. New ideas appear every week. But without
              clear priorities, ownership and practical implementation, activity
              does not become business value.
            </p>
          </div>
        </div>

        <div className="problem-row" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          {IDEAS.map((idea, i) => (
            <div
              key={idea.num}
              className={`problem-item v10-reveal v10-reveal-${i + 1}`}
            >
              <span className="v10-num">{idea.num}</span>
              <h3
                className="v10-display"
                style={{
                  marginTop: "1.1rem",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.2,
                  color: "var(--v10-text-primary)",
                }}
              >
                {idea.title}
              </h3>
              <p className="v10-body" style={{ marginTop: "0.75rem" }}>
                {idea.copy}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .problem-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .problem-item {
          padding: 0 clamp(1.25rem, 2.4vw, 2.25rem);
          border-left: 1px solid var(--v10-line);
        }
        .problem-item:first-child { padding-left: 0; border-left: none; }
        @media (max-width: 820px) {
          .problem-row { grid-template-columns: 1fr; }
          .problem-item {
            padding: 1.75rem 0;
            border-left: none;
            border-top: 1px solid var(--v10-line);
          }
          .problem-item:first-child { padding-top: 0; border-top: none; }
        }
      `}</style>
    </section>
  );
}
