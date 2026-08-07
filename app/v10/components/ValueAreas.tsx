"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type MarkType = "cell" | "trajectory" | "wing" | "link" | "module" | "node";

function Mark({ type }: { type: MarkType }) {
  const s = { width: 34, height: 34 } as const;
  const stroke = "var(--v10-text-primary)";
  switch (type) {
    case "cell":
      return (
        <svg {...s} viewBox="0 0 34 34" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <path d="M17 3 L29 10 L29 24 L17 31 L5 24 L5 10 Z" />
          <circle cx="17" cy="17" r="3.2" fill="var(--v10-lime)" stroke="none" />
        </svg>
      );
    case "trajectory":
      return (
        <svg {...s} viewBox="0 0 34 34" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <path d="M3 27 C 12 22, 16 10, 31 7" />
          <circle cx="31" cy="7" r="2.6" fill="var(--v10-lime)" stroke="none" />
        </svg>
      );
    case "wing":
      return (
        <svg {...s} viewBox="0 0 34 34" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <path d="M17 30 C 5 22, 4 8, 15 6 C 16 14, 17 22, 17 30 Z" />
          <path d="M17 30 C 29 22, 30 8, 19 6 C 18 14, 17 22, 17 30 Z" />
          <circle cx="17" cy="6" r="2.2" fill="var(--v10-lime)" stroke="none" />
        </svg>
      );
    case "link":
      return (
        <svg {...s} viewBox="0 0 34 34" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <circle cx="7" cy="17" r="4" />
          <circle cx="27" cy="7" r="4" />
          <circle cx="27" cy="27" r="4" />
          <path d="M11 15 L23 9 M11 19 L23 25" />
          <circle cx="7" cy="17" r="1.6" fill="var(--v10-lime)" stroke="none" />
        </svg>
      );
    case "module":
      return (
        <svg {...s} viewBox="0 0 34 34" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <rect x="4" y="4" width="11" height="11" />
          <rect x="19" y="4" width="11" height="11" />
          <rect x="11.5" y="19" width="11" height="11" fill="var(--v10-lime)" fillOpacity="0.9" stroke="none" />
          <rect x="11.5" y="19" width="11" height="11" />
        </svg>
      );
    case "node":
    default:
      return (
        <svg {...s} viewBox="0 0 34 34" fill="none" stroke={stroke} strokeWidth="1.5" aria-hidden="true">
          <path d="M17 4 L17 30 M4 17 L30 17" />
          <circle cx="17" cy="17" r="3.4" fill="var(--v10-lime)" stroke="none" />
        </svg>
      );
  }
}

const AREAS: { title: string; copy: string; mark: MarkType }[] = [
  {
    title: "Operations",
    copy: "Reduce repetitive work and improve process visibility.",
    mark: "cell",
  },
  {
    title: "Finance",
    copy: "Accelerate analysis, reporting and internal decision-making.",
    mark: "trajectory",
  },
  {
    title: "Customer service",
    copy: "Improve response quality and reduce handling time.",
    mark: "wing",
  },
  {
    title: "Knowledge work",
    copy: "Help teams find, understand and use company information.",
    mark: "node",
  },
  {
    title: "Sales",
    copy: "Support research, preparation and follow-up.",
    mark: "link",
  },
  {
    title: "Risk and compliance",
    copy: "Create clearer controls, evidence and accountability.",
    mark: "module",
  },
];

export default function ValueAreas() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="where-we-help"
      className="v10-section"
      style={{ background: "var(--v10-bg-primary)" }}
    >
      <div className="v10-container">
        <div className="v10-grid" style={{ rowGap: "2rem" }}>
          <div style={{ gridColumn: "1 / -1", maxWidth: "48rem" }}>
            <div className="v10-overline v10-reveal">Where we help</div>
            <h2
              className="v10-section-title v10-reveal v10-reveal-1"
              style={{ marginTop: "1.4rem", maxWidth: "16ch" }}
            >
              Focused on the work behind the business.
            </h2>
          </div>
        </div>

        <div className="va-grid" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)" }}>
          {AREAS.map((area, i) => (
            <a
              key={area.title}
              href="#contact"
              className={`v10-cell va-item v10-reveal v10-reveal-${(i % 3) + 1}`}
            >
              <div className="v10-cell-mark" style={{ marginBottom: "1.25rem" }}>
                <Mark type={area.mark} />
              </div>
              <h3
                className="v10-display"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v10-text-primary)",
                }}
              >
                {area.title}
              </h3>
              <p className="v10-body" style={{ marginTop: "0.7rem", fontSize: "0.98rem" }}>
                {area.copy}
              </p>
            </a>
          ))}
        </div>
      </div>

      <style>{`
        .va-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          column-gap: clamp(1.5rem, 3vw, 3rem);
        }
        .va-item {
          display: block;
          text-decoration: none;
          padding-bottom: clamp(1.6rem, 2.4vw, 2.25rem);
        }
        @media (max-width: 820px) {
          .va-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 520px) {
          .va-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
