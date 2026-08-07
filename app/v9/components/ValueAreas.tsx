"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Glyph = "route" | "converge" | "signal" | "search" | "track" | "shield";

const AREAS: { title: string; text: string; glyph: Glyph }[] = [
  {
    title: "Operations",
    text: "Reduce repetitive work and improve visibility.",
    glyph: "route",
  },
  {
    title: "Finance",
    text: "Speed up analysis, reporting and preparation.",
    glyph: "converge",
  },
  {
    title: "Customer service",
    text: "Improve response quality and handling time.",
    glyph: "signal",
  },
  {
    title: "Knowledge work",
    text: "Help teams find and use internal information.",
    glyph: "search",
  },
  {
    title: "Sales",
    text: "Support preparation, research and follow-up.",
    glyph: "track",
  },
  {
    title: "Risk and compliance",
    text: "Create clearer evidence, ownership and control.",
    glyph: "shield",
  },
];

function AreaGlyph({ type }: { type: Glyph }) {
  const common = {
    width: 44,
    height: 44,
    viewBox: "0 0 44 44",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };
  const blue = "#3157E3";
  const ink = "#162033";
  const copper = "#C66A3D";

  switch (type) {
    case "route":
      return (
        <svg {...common}>
          <path d="M4 34 C14 30 16 12 26 10 C34 8 38 14 40 18" stroke={ink} strokeWidth="1.4" />
          <circle cx="4" cy="34" r="2.4" fill={blue} />
          <circle cx="40" cy="18" r="2.4" fill={copper} />
        </svg>
      );
    case "converge":
      return (
        <svg {...common}>
          <path d="M4 8 C18 14 26 20 38 22" stroke={ink} strokeWidth="1.2" />
          <path d="M4 22 L38 22" stroke={ink} strokeWidth="1.2" />
          <path d="M4 36 C18 30 26 24 38 22" stroke={ink} strokeWidth="1.2" />
          <circle cx="38" cy="22" r="2.6" fill={blue} />
          <circle cx="4" cy="22" r="1.8" fill={copper} />
        </svg>
      );
    case "signal":
      return (
        <svg {...common}>
          <path d="M22 22 C10 18 6 30 14 36" stroke={ink} strokeWidth="1.4" />
          <path d="M22 22 C34 26 38 14 30 8" stroke={ink} strokeWidth="1.4" />
          <circle cx="22" cy="22" r="3" fill={blue} />
          <circle cx="30" cy="8" r="2" fill={copper} />
        </svg>
      );
    case "search":
      return (
        <svg {...common}>
          <circle cx="19" cy="19" r="11" stroke={ink} strokeWidth="1.4" />
          <path d="M27 27 L38 38" stroke={ink} strokeWidth="1.4" />
          <circle cx="19" cy="19" r="3" fill={blue} />
          <circle cx="38" cy="38" r="2" fill={copper} />
        </svg>
      );
    case "track":
      return (
        <svg {...common}>
          <path d="M4 30 L16 30 L24 14 L32 24 L40 8" stroke={ink} strokeWidth="1.4" strokeLinejoin="round" />
          <circle cx="40" cy="8" r="2.4" fill={copper} />
          <circle cx="4" cy="30" r="2" fill={blue} />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M22 5 L37 11 C37 26 30 35 22 39 C14 35 7 26 7 11 Z" stroke={ink} strokeWidth="1.4" />
          <path d="M15 21 L20 27 L30 15" stroke={blue} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="22" cy="5" r="1.8" fill={copper} />
        </svg>
      );
  }
}

export default function ValueAreas() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="where-we-help"
      className="ae-section"
      style={{ background: "var(--ae-bg-ivory)" }}
    >
      <div className="ae-container">
        <div className="ae-reveal" style={{ maxWidth: "46rem" }}>
          <span className="ae-overline">Where we help</span>
          <h2 className="ae-section-title" style={{ marginTop: "1.5rem" }}>
            Focused on the work that keeps the business moving.
          </h2>
        </div>

        <div className="va-grid">
          {AREAS.map((a, i) => (
            <div key={a.title} className={`ae-reveal ae-reveal-${(i % 3) + 1} ae-cell va-cell`}>
              <AreaGlyph type={a.glyph} />
              <h3 className="va-title ae-display">{a.title}</h3>
              <p className="ae-body" style={{ marginTop: "0.6rem", fontSize: "0.98rem" }}>
                {a.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .va-grid {
          margin-top: clamp(2.5rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: clamp(1.5rem, 3vw, 3rem);
        }
        .va-cell { padding-left: 0; padding-right: clamp(1rem, 2vw, 2rem); }
        .va-title {
          margin-top: 1.1rem;
          font-size: clamp(1.2rem, 1.8vw, 1.45rem);
          font-weight: 600;
          letter-spacing: -0.02em;
          color: var(--ae-text);
        }
        @media (max-width: 860px) {
          .va-grid { grid-template-columns: repeat(2, 1fr); column-gap: 2rem; }
        }
        @media (max-width: 560px) {
          .va-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
