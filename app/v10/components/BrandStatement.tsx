"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="v10-section"
      style={{
        background: "var(--v10-lime)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        className="brand-art-wrap"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.38,
          maskImage: "linear-gradient(to left, black 0%, transparent 62%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, transparent 62%)",
        }}
      >
        <div className="v10-sketch-mask v10-sketch-mask--together v10-sketch-mask--fill v10-sketch-mask--on-lime" />
      </div>

      <div className="v10-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "26ch" }}>
          <h2
            className="v10-hero-title v10-reveal"
            style={{
              color: "var(--v10-text-primary)",
              fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
            }}
          >
            Alone, each part is limited. Together, they create a working system.
          </h2>
          <p
            className="v10-lead v10-reveal v10-reveal-2"
            style={{
              marginTop: "2rem",
              maxWidth: "40rem",
              color: "var(--v10-text-primary)",
              opacity: 0.82,
            }}
          >
            AI creates more value when technology, people and processes move in
            the same direction.
          </p>
        </div>
      </div>
    </section>
  );
}
