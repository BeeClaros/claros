"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import StructureCanvas from "./StructureCanvas";

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  useScrollReveal(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="ed-section"
      id="contact"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Background canvas - fully ordered */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.06,
          pointerEvents: "none",
        }}
      >
        <StructureCanvas progress={1} />
      </div>

      {/* Top and bottom borders */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "clamp(1.25rem, 5vw, 6rem)",
          right: "clamp(1.25rem, 5vw, 6rem)",
          height: "1px",
          background: "var(--ed-line)",
        }}
      />

      <div className="ed-container" style={{ position: "relative" }}>
        <div
          style={{
            maxWidth: "36rem",
            margin: "0 auto",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          <div className="ed-section-number ed-reveal" style={{ justifyContent: "center" }}>
            009
          </div>

          <h2 className="ed-section-heading ed-reveal ed-reveal-delay-1">
            Find where AI can make a real difference.
          </h2>

          <p className="ed-lead ed-reveal ed-reveal-delay-2" style={{ textAlign: "center" }}>
            A first conversation helps us understand your priorities, current
            activity and where focused support could create value.
          </p>

          <div
            className="ed-reveal ed-reveal-delay-3"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
              flexWrap: "wrap",
              justifyContent: "center",
              marginTop: "1rem",
            }}
          >
            <a href="#contact" className="ed-btn-primary">
              Discuss your business <span className="ed-arrow">→</span>
            </a>
            <a href="#assessment" className="ed-btn-secondary">
              Learn about the assessment <span className="ed-arrow">→</span>
            </a>
          </div>

          <p className="ed-coord ed-reveal ed-reveal-delay-4" style={{ marginTop: "1rem" }}>
            status: ready - system.aligned
          </p>
        </div>
      </div>
    </section>
  );
}
