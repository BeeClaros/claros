"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import PartnershipMark from "./PartnershipMark";

const PRINCIPLES = [
  {
    num: "01",
    title: "Business first",
    copy: "Every initiative starts with a real business need.",
  },
  {
    num: "02",
    title: "Practical delivery",
    copy: "Solutions must work inside existing operations.",
  },
  {
    num: "03",
    title: "People included",
    copy: "Adoption is designed with the teams who will use the solution.",
  },
  {
    num: "04",
    title: "Safe foundations",
    copy: "Ownership, security and accountability are built in from the start.",
  },
];

/** Small ordered formation that reads on the dark background. */
function Formation() {
  const rows = [
    { y: 20, xs: [130] },
    { y: 44, xs: [104, 156] },
    { y: 68, xs: [78, 130, 182] },
    { y: 92, xs: [52, 104, 156, 208] },
  ];
  return (
    <svg width="100%" viewBox="0 0 260 120" aria-hidden="true" style={{ display: "block" }}>
      {rows.map((row, ri) =>
        row.xs.map((x, ci) => (
          <g key={`${ri}-${ci}`} transform={`translate(${x} ${row.y})`}>
            <path
              d="M-6 4 L0 -4 L6 4"
              fill="none"
              stroke={ri === 0 ? "var(--v10-lime)" : "var(--v10-art-metal)"}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))
      )}
    </svg>
  );
}

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="v10-section v10-section-dark"
      style={{ background: "var(--v10-bg-dark)", position: "relative", overflow: "hidden" }}
    >
      {/* second anchor target */}
      <span id="about" style={{ position: "absolute", top: 0 }} aria-hidden="true" />

      <div className="v10-container" style={{ position: "relative", zIndex: 2 }}>
        <div className="v10-grid" style={{ rowGap: "3rem", alignItems: "center" }}>
          <div className="hww-copy">
            <div
              className="v10-overline v10-reveal"
              style={{ color: "var(--v10-on-dark-secondary)" }}
            >
              How we work
            </div>
            <h2
              className="v10-section-title v10-reveal v10-reveal-1"
              style={{ marginTop: "1.4rem", color: "var(--v10-on-dark-primary)" }}
            >
              Human direction. <br />
              <span style={{ color: "var(--v10-lime)" }}>AI capability.</span>
            </h2>
            <p
              className="v10-lead v10-reveal v10-reveal-2"
              style={{ marginTop: "1.6rem", maxWidth: "34rem", color: "var(--v10-on-dark-secondary)" }}
            >
              Technology should extend what people can do, not remove them from
              the process.
            </p>
            <p
              className="v10-body v10-reveal v10-reveal-3"
              style={{ marginTop: "1.1rem", maxWidth: "34rem", color: "var(--v10-on-dark-secondary)" }}
            >
              We work with internal teams to combine business knowledge, human
              judgement and the capabilities of AI.
            </p>
          </div>

          {/* Partnership visual */}
          <div className="hww-visual v10-reveal v10-reveal-2">
            <div className="hww-formation">
              <Formation />
            </div>
            <div
              className="hww-partnership-art"
              aria-hidden="true"
            >
              <div className="v10-sketch-mask v10-sketch-mask--together v10-sketch-mask--on-dark hww-partnership-mask" />
            </div>
          </div>
        </div>

        {/* Principles */}
        <div className="hww-principles">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.num}
              className={`hww-principle v10-reveal v10-reveal-${i + 1}`}
            >
              <span className="v10-num">{p.num}</span>
              <h3
                className="v10-display"
                style={{
                  marginTop: "0.7rem",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v10-on-dark-primary)",
                }}
              >
                {p.title}
              </h3>
              <p
                className="v10-body"
                style={{ marginTop: "0.6rem", fontSize: "0.95rem", color: "var(--v10-on-dark-secondary)" }}
              >
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hww-copy { grid-column: 1 / 7; }
        .hww-visual {
          grid-column: 8 / -1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .hww-formation {
          width: min(220px, 55%);
          margin-bottom: -0.5rem;
        }
        .hww-partnership-art {
          position: relative;
          width: min(400px, 100%);
          max-width: 400px;
          height: clamp(12rem, 28vw, 18rem);
        }
        .hww-partnership-mask {
          position: relative;
          left: auto;
          top: auto;
          transform: none;
          width: 100%;
          height: 100%;
        }
        .hww-principles {
          margin-top: clamp(3.5rem, 7vw, 6rem);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1.5rem, 3vw, 2.5rem);
          border-top: 1px solid var(--v10-on-dark-line);
          padding-top: clamp(2rem, 4vw, 3rem);
        }
        @media (max-width: 900px) {
          .hww-copy { grid-column: 1 / -1; }
          .hww-visual {
            grid-column: 1 / -1;
            max-width: 360px;
            margin-inline: auto;
          }
        }
        @media (max-width: 720px) {
          .hww-principles { grid-template-columns: repeat(2, 1fr); row-gap: 2rem; }
        }
        @media (max-width: 440px) {
          .hww-principles { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
