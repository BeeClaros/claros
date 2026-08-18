"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const ITEMS = [
  "Privacy by design",
  "GDPR-aware data processing",
  "EU AI Act readiness",
  "Security built in",
  "Data minimisation",
  "Human oversight",
  "Clear ownership",
  "Access controls",
  "Provider transparency",
  "Deployment that fits",
];

function Strip({ hidden }: { hidden?: boolean }) {
  return (
    <span className="trust-strip" aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <span key={item} className="trust-item">
          <span className="trust-dot" aria-hidden="true" />
          {item}
        </span>
      ))}
    </span>
  );
}

export default function TrustSection() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="responsible-deployment"
      style={{
        background: "var(--v8-bg-primary)",
        paddingBlock: "clamp(2.75rem, 5vw, 4.5rem)",
        position: "relative",
      }}
    >
      <div className="v8-container">
        <h2
          className="v8-section-title v8-reveal"
          style={{
            maxWidth: "22ch",
            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
          }}
        >
          Privacy, security and responsible AI from the start.
        </h2>
      </div>

      <div className="trust-marquee-mask">
        <div className="trust-marquee">
          <Strip />
          <Strip hidden />
        </div>
      </div>

      <style>{`
        .trust-marquee-mask {
          margin-top: clamp(1.75rem, 3vw, 2.5rem);
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent,
            black 32%,
            black 68%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 32%,
            black 68%,
            transparent
          );
        }
        .trust-marquee {
          display: flex;
          width: max-content;
          animation: trust-scroll 44s linear infinite;
        }
        .trust-marquee:hover {
          animation-play-state: paused;
        }
        .trust-strip {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .trust-item {
          display: inline-flex;
          align-items: center;
          gap: 0;
          white-space: nowrap;
          padding-inline: clamp(0.75rem, 1.5vw, 1.25rem);
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--v8-text-primary);
        }
        .trust-dot {
          flex-shrink: 0;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--v8-lime);
          margin-right: clamp(0.75rem, 1.5vw, 1.25rem);
        }
        @keyframes trust-scroll {
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .trust-marquee {
            animation: none;
            flex-wrap: wrap;
            width: auto;
            gap: 0.25rem 0;
            padding-inline: var(--v8-gutter);
          }
          .trust-marquee-mask {
            mask-image: none;
            -webkit-mask-image: none;
          }
          .trust-marquee .trust-strip:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
