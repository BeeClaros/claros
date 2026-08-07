"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import Formation from "./Formation";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="ae-section"
      style={{ background: "var(--ae-blue)", position: "relative" }}
    >
      {/* coordinated formation */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.9,
          maskImage:
            "radial-gradient(ellipse 80% 90% at 60% 40%, black 0%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 90% at 60% 40%, black 0%, transparent 82%)",
        }}
      >
        <Formation style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} />
      </div>

      <div className="ae-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="ae-reveal" style={{ maxWidth: "44rem" }}>
          <h2
            className="ae-section-title"
            style={{ color: "#FCFCF8", fontSize: "clamp(2.2rem, 4.4vw, 3.6rem)" }}
          >
            Different capabilities.{" "}
            <span style={{ color: "var(--ae-copper-lt)" }}>One direction.</span>
          </h2>
          <p
            className="ae-lead ae-reveal ae-reveal-1"
            style={{ marginTop: "1.75rem", color: "rgba(252,252,248,0.86)", maxWidth: "32rem" }}
          >
            AI creates more value when people, processes and technology move
            together.
          </p>
        </div>
      </div>
    </section>
  );
}
