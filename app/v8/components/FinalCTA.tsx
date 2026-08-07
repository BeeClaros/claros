"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="contact"
      className="v8-section"
      style={{ background: "var(--v8-bg-primary)", position: "relative", overflow: "hidden" }}
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
          stroke="var(--v8-lime)"
          strokeWidth="1.5"
          opacity="0.7"
          strokeDasharray="4 6"
        />
      </svg>

      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "50rem" }}>
          <div className="v8-overline v8-reveal">Get started</div>
          <h2
            className="v8-hero-title v8-reveal v8-reveal-1"
            style={{ marginTop: "1.4rem", fontSize: "clamp(2.5rem, 5.4vw, 4.75rem)", maxWidth: "16ch" }}
          >
            Find where AI can make a real difference.
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-2"
            style={{ marginTop: "1.75rem", maxWidth: "38rem" }}
          >
            A first conversation helps us understand your priorities, current
            activity and where focused support could create value.
          </p>

          <div
            className="v8-reveal v8-reveal-3"
            style={{
              marginTop: "2.5rem",
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              flexWrap: "wrap",
            }}
          >
            <a href="mailto:hello@enxame.ai" className="v8-btn-dark">
              Discuss your business <span className="v8-arrow">&rarr;</span>
            </a>
            <a href="#assessment" className="v8-btn-text">
              Learn about the assessment <span className="v8-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
