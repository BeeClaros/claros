"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const OBSERVATIONS = [
  {
    n: "01",
    title: "Activity without direction",
    text: "Different teams experiment independently.",
  },
  {
    n: "02",
    title: "Ideas without priority",
    text: "It is unclear which opportunities matter most.",
  },
  {
    n: "03",
    title: "Tools without adoption",
    text: "Solutions are introduced but do not become part of the work.",
  },
];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="problem"
      className="ae-section"
      style={{ background: "var(--ae-bg-white)" }}
    >
      <div className="ae-container">
        <div className="ae-grid" style={{ rowGap: "clamp(2.5rem, 5vw, 4rem)" }}>
          <div className="ae-reveal" style={{ gridColumn: "1 / -1", maxWidth: "44rem" }}>
            <span className="ae-overline">The problem</span>
            <h2 className="ae-section-title" style={{ marginTop: "1.5rem" }}>
              More AI does not always mean more value.
            </h2>
            <p className="ae-lead" style={{ marginTop: "1.5rem" }}>
              Teams test new tools. Ideas appear across the business. But without
              clear priorities and ownership, activity remains disconnected.
            </p>
          </div>
        </div>

        {/* three observations with the converging trajectory behind */}
        <div style={{ position: "relative", marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              opacity: 0.7,
            }}
          >
            {/* scattered at the start, progressively direct */}
            <path d="M40 30 C220 90 300 20 400 60" fill="none" stroke="#C66A3D" strokeWidth="1.4" />
            <path d="M60 90 C240 30 320 100 400 60" fill="none" stroke="#C9C5BA" strokeWidth="1.2" />
            <path d="M400 60 C540 40 660 80 800 60" fill="none" stroke="#3157E3" strokeWidth="1.4" opacity="0.7" />
            <path d="M800 60 C960 60 1040 60 1180 60" fill="none" stroke="#3157E3" strokeWidth="1.6" />
            <circle cx="400" cy="60" r="3.5" fill="#3157E3" />
            <circle cx="800" cy="60" r="3.5" fill="#3157E3" />
            <circle cx="1180" cy="60" r="4" fill="#3157E3" />
          </svg>

          <div className="prob-grid">
            {OBSERVATIONS.map((o, i) => (
              <div
                key={o.n}
                className={`ae-reveal ae-reveal-${i + 1} prob-col`}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <span className="ae-index">{o.n}</span>
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--ae-copper)",
                    }}
                  />
                </div>
                <h3
                  className="ae-display"
                  style={{
                    marginTop: "1.1rem",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    color: "var(--ae-text)",
                  }}
                >
                  {o.title}
                </h3>
                <p className="ae-body" style={{ marginTop: "0.75rem" }}>
                  {o.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .prob-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }
        .prob-col {
          padding: clamp(1.5rem, 3vw, 2.5rem) clamp(1.25rem, 2.5vw, 2.25rem);
          border-left: 1px solid var(--ae-line);
        }
        .prob-col:first-child { padding-left: 0; border-left: none; }
        @media (max-width: 760px) {
          .prob-grid { grid-template-columns: 1fr; }
          .prob-col { border-left: none; border-top: 1px solid var(--ae-line); padding-left: 0; }
          .prob-col:first-child { border-top: none; }
        }
      `}</style>
    </section>
  );
}
