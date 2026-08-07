"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const OUTCOMES = [
  "Current AI activity",
  "High-value opportunities",
  "Readiness and dependencies",
  "Risks and responsibilities",
  "Practical implementation roadmap",
];

/** Small incomplete-hexagon marker inspired by the bee / hive. */
function HexMark() {
  return (
    <svg width="18" height="20" viewBox="0 0 18 20" aria-hidden="true" style={{ flexShrink: 0, marginTop: 3 }}>
      <path
        d="M9 1.5 L16 5.5 L16 13"
        fill="none"
        stroke="var(--v8-lime)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 13 L9 18.5 L2 14.5 L2 6"
        fill="none"
        stroke="var(--v8-line-strong)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Assessment() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="assessment"
      className="v8-section"
      style={{ background: "var(--v8-bg-contrast)", position: "relative", overflow: "hidden" }}
    >
      {/* partial hive background */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "44%",
          height: "100%",
          opacity: 0.5,
          maskImage: "linear-gradient(to left, black 30%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to left, black 30%, transparent 100%)",
          pointerEvents: "none",
        }}
      >
        <Image
          src="/v8/bg-hive.png"
          alt=""
          fill
          sizes="44vw"
          style={{ objectFit: "cover", objectPosition: "left center" }}
        />
      </div>

      {/* pale lime side block */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: "18%",
          width: "clamp(60px, 8vw, 130px)",
          height: "46%",
          background: "var(--v8-lime-pale)",
          zIndex: 0,
        }}
      />

      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="v8-grid" style={{ rowGap: "2.5rem" }}>
          <div className="assess-copy">
            <div className="v8-overline v8-reveal">Assessment</div>
            <h2
              className="v8-section-title v8-reveal v8-reveal-1"
              style={{ marginTop: "1.4rem" }}
            >
              Start with clarity.
            </h2>
            <p
              className="v8-lead v8-reveal v8-reveal-2"
              style={{ marginTop: "1.6rem", maxWidth: "34rem" }}
            >
              Before investing in more tools or launching more experiments,
              understand where AI can create the strongest return.
            </p>

            <p
              className="v8-statement v8-reveal v8-reveal-3"
              style={{ marginTop: "2.5rem", maxWidth: "24ch", fontSize: "clamp(1.4rem, 2.4vw, 1.9rem)" }}
            >
              You leave knowing what to do first, what it requires and why it
              matters.
            </p>

            <div className="v8-reveal v8-reveal-4" style={{ marginTop: "2.25rem" }}>
              <a href="#contact" className="v8-btn-primary">
                Discuss an assessment <span className="v8-arrow">&rarr;</span>
              </a>
            </div>
          </div>

          <div className="assess-list">
            <div className="v8-label v8-reveal" style={{ marginBottom: "1.25rem" }}>
              What the assessment delivers
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {OUTCOMES.map((item, i) => (
                <li
                  key={item}
                  className={`v8-reveal v8-reveal-${i + 1}`}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.9rem",
                    padding: "1.05rem 0",
                    borderTop: "1px solid var(--v8-line)",
                  }}
                >
                  <HexMark />
                  <span
                    className="v8-display"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "var(--v8-text-primary)",
                    }}
                  >
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .assess-copy { grid-column: 1 / 7; }
        .assess-list { grid-column: 8 / -1; align-self: start; }
        @media (max-width: 900px) {
          .assess-copy, .assess-list { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  );
}
