"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { V10_ART_OPACITY } from "../art-tokens";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="contact"
      className="v10-section"
      style={{ background: "var(--v10-bg-primary)", position: "relative", overflow: "hidden" }}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", zIndex: 0 }}
      >
        <path
          d="M120 120 C 420 80, 620 300, 940 360 S 1240 420, 1320 470"
          fill="none"
          stroke="var(--v10-lime)"
          strokeWidth="1.5"
          opacity="0.7"
          strokeDasharray="4 6"
        />
      </svg>
      <div
        className="v10-sketch-wrap"
        aria-hidden="true"
        style={{
          top: "8%",
          left: "4%",
          width: "min(42vw, 28rem)",
          height: "min(52vw, 22rem)",
          opacity: V10_ART_OPACITY.subtle,
        }}
      >
        <div className="v10-sketch-mask v10-sketch-mask--cta v10-sketch-mask--on-light v10-cta-hand-mask" />
      </div>

      <div className="v10-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "50rem" }}>
          <div className="v10-overline v10-reveal">Get started</div>
          <h2
            className="v10-hero-title v10-reveal v10-reveal-1"
            style={{ marginTop: "1.4rem", fontSize: "clamp(2.5rem, 5.4vw, 4.75rem)", maxWidth: "16ch" }}
          >
            Find where AI can make a real difference.
          </h2>
          <p
            className="v10-lead v10-reveal v10-reveal-2"
            style={{ marginTop: "1.75rem", maxWidth: "38rem" }}
          >
            A first conversation helps us understand your priorities, current
            activity and where focused support could create value.
          </p>

          <div
            className="v10-reveal v10-reveal-3"
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <a href="mailto:hello@enxame.ai" className="v10-btn-dark">
              Discuss your business <span className="v10-arrow">&rarr;</span>
            </a>
            <a href="#assessment" className="v10-btn-text">
              Learn about the assessment <span className="v10-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .v10-cta-hand-mask {
          position: relative;
          left: auto;
          top: auto;
          transform: none;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </section>
  );
}
