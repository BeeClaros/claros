"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PHASES = [
  {
    n: "A",
    title: "Assessment",
    body: "Understand the current position and decide what to do.",
  },
  {
    n: "B",
    title: "Implementation",
    body: "Build and introduce the highest-value solutions.",
  },
  {
    n: "C",
    title: "Continuous adoption",
    body: "Measure outcomes, support teams and expand what works.",
  },
];

function HexCell({ label }: { label: string }) {
  return (
    <svg width="72" height="80" viewBox="0 0 72 80" fill="none" aria-hidden="true">
      <path
        d="M36 4 L64 20 L64 60 L36 76 L8 60 L8 20 Z"
        fill="var(--hv-bg-elevated)"
        stroke="var(--hv-line-strong)"
        strokeWidth="1.4"
      />
      <path
        d="M36 16 L54 26 L54 54 L36 64 L18 54 L18 26 Z"
        fill="none"
        stroke="var(--hv-line-soft)"
        strokeWidth="1"
      />
      <text
        x="36"
        y="45"
        textAnchor="middle"
        fill="var(--hv-accent)"
        style={{ font: "500 1.5rem var(--font-hv-display), sans-serif" }}
      >
        {label}
      </text>
    </svg>
  );
}

export default function Collaboration() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="collaboration" className="hv-section">
      <div className="hv-container">
        <div style={{ maxWidth: "46rem" }}>
          <div className="hv-overline hv-reveal">Collaboration model</div>
          <h2 className="hv-section-title hv-reveal hv-reveal-1" style={{ marginTop: "1.5rem" }}>
            One path.{" "}
            <span className="hv-accent-text">Different ways to work together.</span>
          </h2>
        </div>

        {/* three linked cells */}
        <div className="collab-wrap hv-reveal hv-reveal-2" style={{ marginTop: "clamp(3rem, 6vw, 5rem)" }}>
          <div className="collab-connector" aria-hidden="true" />
          {PHASES.map((p) => (
            <div key={p.n} className="collab-cell">
              <HexCell label={p.n} />
              <h3
                style={{
                  fontFamily: "var(--font-hv-display), sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  color: "var(--hv-text-primary)",
                  margin: "1.25rem 0 0.6rem",
                }}
              >
                {p.title}
              </h3>
              <p className="hv-body" style={{ fontSize: "0.9375rem", maxWidth: "18rem" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <p
          className="hv-lead hv-reveal hv-reveal-3"
          style={{
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
            maxWidth: "38rem",
            paddingTop: "1.75rem",
            borderTop: "1px solid var(--hv-line-soft)",
          }}
        >
          We can lead the work directly or support an existing internal AI, data
          or transformation team.
        </p>
      </div>

      <style>{`
        .collab-wrap {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1.5rem, 4vw, 3rem);
        }
        .collab-connector {
          position: absolute;
          top: 40px;
          left: 12%;
          right: 12%;
          height: 1px;
          background: linear-gradient(90deg, var(--hv-accent-line), var(--hv-accent), var(--hv-accent-line));
          z-index: 0;
        }
        .collab-cell { position: relative; z-index: 1; }
        @media (max-width: 760px) {
          .collab-wrap { grid-template-columns: 1fr; gap: 2.5rem; }
          .collab-connector {
            top: 0; bottom: 0; left: 35px; right: auto; width: 1px; height: auto;
            background: linear-gradient(180deg, var(--hv-accent-line), var(--hv-accent), var(--hv-accent-line));
          }
        }
      `}</style>
    </section>
  );
}
