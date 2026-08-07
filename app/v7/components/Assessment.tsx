"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const RESULTS = [
  "Current AI activity",
  "High-value opportunities",
  "Readiness and dependencies",
  "Risks and responsibilities",
  "Practical implementation roadmap",
];

export default function Assessment() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="assessment"
      className="hv-section"
      style={{ background: "var(--hv-bg-secondary)", position: "relative", overflow: "hidden" }}
    >
      {/* partial hive-architecture background, right side (generated) */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.6,
          maskImage:
            "linear-gradient(90deg, transparent 0%, transparent 40%, black 92%)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent 0%, transparent 40%, black 92%)",
        }}
      >
        <Image
          src="/v7/bg-hive.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
      </div>

      <div className="hv-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hv-grid" style={{ rowGap: "3rem" }}>
          {/* Left: heading + text + impact + CTA */}
          <div className="asmt-left">
            <div className="hv-overline hv-reveal">Assessment</div>
            <h2 className="hv-section-title hv-reveal hv-reveal-1" style={{ marginTop: "1.5rem" }}>
              Start with <span className="hv-accent-text">clarity.</span>
            </h2>
            <p className="hv-lead hv-reveal hv-reveal-2" style={{ marginTop: "1.5rem", maxWidth: "34rem" }}>
              Before investing in more tools or launching more experiments,
              understand where AI can create the strongest return.
            </p>

            <p
              className="hv-statement hv-reveal hv-reveal-3"
              style={{
                marginTop: "2.5rem",
                maxWidth: "30rem",
                fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)",
                borderLeft: "2px solid var(--hv-accent)",
                paddingLeft: "1.25rem",
              }}
            >
              You leave knowing what to do first, what it requires and why it
              matters.
            </p>

            <div className="hv-reveal hv-reveal-4" style={{ marginTop: "2.25rem" }}>
              <a href="#contact" className="hv-btn-primary">
                Discuss an assessment <span className="hv-arrow">&rarr;</span>
              </a>
            </div>
          </div>

          {/* Right: what the assessment delivers */}
          <div className="asmt-right hv-reveal hv-reveal-2">
            <div className="hv-label" style={{ marginBottom: "1.5rem" }}>
              What you receive
            </div>
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {RESULTS.map((r, i) => (
                <li
                  key={r}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                    padding: "1.1rem 0",
                    borderTop: i === 0 ? "1px solid var(--hv-line-soft)" : "none",
                    borderBottom: "1px solid var(--hv-line-soft)",
                  }}
                >
                  <span
                    className="hv-mono"
                    style={{ color: "var(--hv-accent)", fontSize: "0.75rem", width: "1.5rem" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-hv-sans), sans-serif",
                      fontSize: "1.0625rem",
                      color: "var(--hv-text-primary)",
                    }}
                  >
                    {r}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .asmt-left { grid-column: 1 / 7; }
        .asmt-right { grid-column: 8 / -1; }
        @media (max-width: 900px) {
          .asmt-left, .asmt-right { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  );
}
