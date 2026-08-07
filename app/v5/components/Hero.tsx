"use client";

import { useEffect, useState } from "react";
import StructureCanvas from "./StructureCanvas";

export default function Hero() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const t = Math.min(1, window.scrollY / (window.innerHeight * 1.4));
      setProgress(t);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      className="ed-dotgrid"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--ed-nav-h)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border line */}
      <div
        style={{
          position: "absolute",
          top: "var(--ed-nav-h)",
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--ed-line)",
          opacity: 0.4,
        }}
      />

      <div className="ed-container" style={{ width: "100%", paddingBlock: "4rem 3rem" }}>
        <div className="ed-grid" style={{ alignItems: "center" }}>
          {/* Left - headline */}
          <div
            style={{
              gridColumn: "1 / span 6",
              display: "flex",
              flexDirection: "column",
              gap: "1.75rem",
            }}
            className="hero-text-col"
          >
            {/* Section number */}
            <div
              className="ed-section-number"
              style={{ opacity: 0, animation: "ed-fade-up 600ms var(--ed-ease) 100ms forwards" }}
            >
              001
            </div>

            <h1
              className="ed-hero-heading"
              style={{ opacity: 0, animation: "ed-fade-up 800ms var(--ed-ease) 250ms forwards" }}
            >
              AI is easy to start.
              <br />
              <span style={{ color: "var(--ed-accent)" }}>
                Harder to make&nbsp;useful.
              </span>
            </h1>

            <p
              className="ed-lead"
              style={{
                maxWidth: "30rem",
                opacity: 0,
                animation: "ed-fade-up 800ms var(--ed-ease) 450ms forwards",
              }}
            >
              We help organisations identify where AI can create measurable
              value, implement the right solutions and build the foundations to
              use them across the business.
            </p>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.75rem",
                flexWrap: "wrap",
                opacity: 0,
                animation: "ed-fade-up 800ms var(--ed-ease) 600ms forwards",
              }}
            >
              <a href="#how-we-work" className="ed-btn-primary">
                Explore how we work <span className="ed-arrow">→</span>
              </a>
              <a href="#contact" className="ed-btn-secondary">
                Discuss your business <span className="ed-arrow">→</span>
              </a>
            </div>

            {/* Supporting line with reference bar */}
            <div
              className="ed-refline"
              style={{
                marginTop: "0.75rem",
                opacity: 0,
                animation: "ed-fade-up 800ms var(--ed-ease) 800ms forwards",
              }}
            >
              <span className="ed-refline-bar" />
              <span className="ed-label">
                From initial opportunity assessment to implementation and
                long-term&nbsp;adoption
              </span>
            </div>
          </div>

          {/* Right - structure canvas */}
          <div
            style={{
              gridColumn: "7 / span 6",
              height: "clamp(380px, 48vw, 560px)",
              position: "relative",
              opacity: 0,
              animation: "ed-fade-in 1200ms var(--ed-ease) 400ms forwards",
            }}
            className="hero-canvas-col"
          >
            {/* Coordinate labels around the canvas */}
            <span
              className="ed-coord"
              style={{ position: "absolute", top: -16, left: 0 }}
            >
              ref:system.overview
            </span>
            <span
              className="ed-coord"
              style={{ position: "absolute", bottom: -16, right: 0 }}
            >
              status: mapping
            </span>
            <StructureCanvas progress={progress} />
          </div>
        </div>
      </div>

      {/* Bottom edge marker */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "var(--ed-line)",
        }}
      />

      <style>{`
        @media (max-width: 768px) {
          .hero-text-col {
            grid-column: 1 / -1 !important;
          }
          .hero-canvas-col {
            grid-column: 1 / -1 !important;
            height: 300px !important;
            margin-top: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
