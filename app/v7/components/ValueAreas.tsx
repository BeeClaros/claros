"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type GlyphName =
  | "modules"
  | "trajectory"
  | "wings"
  | "cell"
  | "path"
  | "connections";

const AREAS: Array<{ title: string; body: string; glyph: GlyphName }> = [
  {
    title: "Operations",
    body: "Reduce repetitive work and improve process visibility.",
    glyph: "modules",
  },
  {
    title: "Finance",
    body: "Accelerate analysis, reporting and internal decision-making.",
    glyph: "trajectory",
  },
  {
    title: "Customer service",
    body: "Improve response quality and reduce handling time.",
    glyph: "wings",
  },
  {
    title: "Knowledge work",
    body: "Help teams find, understand and use company information.",
    glyph: "cell",
  },
  {
    title: "Sales",
    body: "Support research, preparation and follow-up.",
    glyph: "path",
  },
  {
    title: "Risk and compliance",
    body: "Create clearer controls, evidence and accountability.",
    glyph: "connections",
  },
];

function Glyph({ name }: { name: GlyphName }) {
  const common = {
    width: 34,
    height: 34,
    viewBox: "0 0 34 34",
    fill: "none",
    stroke: "var(--hv-accent)",
    strokeWidth: 1.2,
    "aria-hidden": true,
  } as const;

  switch (name) {
    case "modules":
      return (
        <svg {...common}>
          <path d="M9 5 L15 5 L18 10 L15 15 L9 15 L6 10 Z" />
          <path d="M20 18 L26 18 L29 23 L26 28 L20 28 L17 23 Z" />
          <line x1="15" y1="12" x2="20" y2="21" stroke="var(--hv-line-strong)" />
        </svg>
      );
    case "trajectory":
      return (
        <svg {...common}>
          <path d="M5 26 C 13 24, 18 16, 29 7" />
          <circle cx="29" cy="7" r="2.4" fill="var(--hv-accent)" stroke="none" />
          <circle cx="14" cy="21" r="1.6" fill="var(--hv-accent)" stroke="none" />
        </svg>
      );
    case "wings":
      return (
        <svg {...common}>
          <path d="M17 17 C 9 8, 3 9, 5 15 C 6 19, 12 20, 17 17 Z" />
          <path d="M17 17 C 25 8, 31 9, 29 15 C 28 19, 22 20, 17 17 Z" />
          <line x1="17" y1="17" x2="17" y2="27" stroke="var(--hv-line-strong)" />
        </svg>
      );
    case "cell":
      return (
        <svg {...common}>
          <path d="M11 5 L23 5 L29 17 L23 29 L11 29 L5 17 Z" />
          <circle cx="17" cy="17" r="3" fill="var(--hv-accent)" stroke="none" />
        </svg>
      );
    case "path":
      return (
        <svg {...common}>
          <path d="M5 20 C 12 20, 12 10, 19 10 L27 10" />
          <path d="M23 6 L28 10 L23 14" />
          <circle cx="5" cy="20" r="1.8" fill="var(--hv-accent)" stroke="none" />
        </svg>
      );
    case "connections":
      return (
        <svg {...common}>
          <circle cx="8" cy="9" r="2.2" />
          <circle cx="26" cy="9" r="2.2" />
          <circle cx="17" cy="26" r="2.2" />
          <line x1="9.5" y1="10.5" x2="15.5" y2="24" stroke="var(--hv-line-strong)" />
          <line x1="24.5" y1="10.5" x2="18.5" y2="24" stroke="var(--hv-line-strong)" />
          <line x1="10" y1="9" x2="24" y2="9" stroke="var(--hv-line-strong)" />
        </svg>
      );
  }
}

export default function ValueAreas() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="where-we-help" className="hv-section">
      <div className="hv-container">
        <div style={{ maxWidth: "46rem" }}>
          <div className="hv-overline hv-reveal">Where we help</div>
          <h2 className="hv-section-title hv-reveal hv-reveal-1" style={{ marginTop: "1.5rem" }}>
            Focused on the work{" "}
            <span className="hv-accent-text">behind the business.</span>
          </h2>
        </div>

        <div className="hv-grid va-grid" style={{ marginTop: "clamp(3rem, 6vw, 4.5rem)" }}>
          {AREAS.map((area, i) => (
            <div
              key={area.title}
              className={`va-cell hv-reveal hv-reveal-${(i % 3) + 1}`}
            >
              <div style={{ marginBottom: "1.25rem" }}>
                <Glyph name={area.glyph} />
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-hv-display), sans-serif",
                  fontSize: "1.3rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--hv-text-primary)",
                  margin: "0 0 0.6rem",
                }}
              >
                {area.title}
              </h3>
              <p className="hv-body" style={{ fontSize: "0.9375rem" }}>
                {area.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .va-cell {
          grid-column: span 4;
          border-top: 1px solid var(--hv-line-soft);
          padding: clamp(1.75rem, 2.5vw, 2.25rem) 0;
          position: relative;
        }
        .va-cell::before {
          content: ''; position: absolute; top: -1px; left: 0;
          width: 0; height: 1px; background: var(--hv-accent);
          transition: width 480ms var(--hv-ease);
        }
        .va-cell:hover::before { width: 42px; }
        @media (min-width: 641px) {
          .va-cell { padding-right: clamp(1rem, 2.5vw, 2rem); }
        }
        @media (max-width: 900px) { .va-cell { grid-column: span 6; } }
        @media (max-width: 560px) { .va-cell { grid-column: 1 / -1; } }
      `}</style>
    </section>
  );
}
