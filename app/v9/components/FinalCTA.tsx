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
      className="ae-section"
      style={{ background: "var(--ae-bg-white)", position: "relative" }}
    >
      {/* single bee following a flight line toward the CTA */}
      <svg
        className="cta-line"
        viewBox="0 0 1200 300"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d="M40 250 C300 230 520 120 760 120 C900 120 980 140 1120 150"
          className="ae-flightline"
          stroke="#C9C5BA"
          strokeWidth="1.4"
          fill="none"
        />
        <path
          d="M760 120 C900 120 980 140 1120 150"
          className="ae-flightline"
          stroke="#3157E3"
          strokeWidth="1.6"
          fill="none"
        />
        {[[300, 205], [520, 120], [760, 120]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.4" fill="#3157E3" opacity="0.7" />
        ))}
        {/* bee near the end of the line */}
        <g transform="translate(1120 150) rotate(6)">
          <path d="M3 -4 C12 -14 24 -12 24 -4 C24 3 12 6 4 1 Z" fill="rgba(231,237,245,0.6)" stroke="#758397" strokeWidth="0.8" />
          <path d="M-3 -4 C-12 -14 -24 -12 -24 -4 C-24 3 -12 6 -4 1 Z" fill="rgba(231,237,245,0.6)" stroke="#758397" strokeWidth="0.8" />
          <ellipse cx="0" cy="4" rx="4.5" ry="11" fill="#162033" />
          <circle cx="0" cy="-7" r="3.5" fill="#162033" />
          <line x1="0" y1="-11" x2="0" y2="16" stroke="#3157E3" strokeWidth="1.4" />
          <circle cx="0" cy="2" r="2" fill="#C66A3D" />
        </g>
      </svg>

      <div className="ae-container" style={{ position: "relative", zIndex: 1 }}>
        <div className="ae-reveal" style={{ maxWidth: "42rem" }}>
          <span className="ae-overline">Contact</span>
          <h2 className="ae-hero-title" style={{ marginTop: "1.5rem", fontSize: "clamp(2.4rem, 5vw, 4.2rem)" }}>
            Find the right place to begin.
          </h2>
          <p className="ae-lead" style={{ marginTop: "1.75rem", maxWidth: "34rem" }}>
            A first conversation helps us understand your priorities, current
            activity and where focused support could create value.
          </p>

          <div
            className="ae-reveal ae-reveal-1"
            style={{ marginTop: "2.5rem", display: "flex", alignItems: "center", gap: "1.75rem", flexWrap: "wrap" }}
          >
            <a href="mailto:hello@beeclaros.com" className="ae-btn-primary ae-btn-night">
              Discuss your business <span className="ae-arrow">&rarr;</span>
            </a>
            <a href="#assessment" className="ae-btn-text">
              Learn about the assessment <span className="ae-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .cta-line {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.9;
          mask-image: radial-gradient(ellipse 60% 90% at 78% 42%, black 0%, transparent 78%);
          -webkit-mask-image: radial-gradient(ellipse 60% 90% at 78% 42%, black 0%, transparent 78%);
        }
        @media (max-width: 760px) { .cta-line { display: none; } }
      `}</style>
    </section>
  );
}
