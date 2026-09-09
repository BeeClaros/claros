"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

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
  "HIPAA-aware",
  "CCPA-ready",
  "NIST AI RMF",
  "SOC 2 aligned",
  "Explainability",
  "Auditability",
  "Fairness monitoring",
  "Data residency",
  "Least-privilege access",
  "Incident response ready",
];

const EASE = [0.22, 1, 0.36, 1] as const;

function ShieldIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="trust2-shield"
    >
      <path
        d="M8 1.5L2.5 4V7.5C2.5 11 5 13.5 8 14.5C11 13.5 13.5 11 13.5 7.5V4L8 1.5Z"
        stroke="var(--v8-lime-deep)"
        strokeWidth="1.4"
        strokeLinejoin="round"
        fill="rgba(199, 240, 0, 0.12)"
      />
      <path
        d="M6 8L7.5 9.5L10.5 6.5"
        stroke="var(--v8-lime-deep)"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HexChip({ label }: { label: string }) {
  return (
    <span className="trust2-chip">
      <svg
        className="trust2-hex-border"
        viewBox="0 0 200 48"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <polygon
          points="14,0 186,0 200,24 186,48 14,48 0,24"
          fill="rgba(247,248,245,0.55)"
          stroke="var(--v8-line)"
          strokeWidth="1.2"
          className="trust2-hex-bg"
        />
      </svg>
      <span className="trust2-chip-content">
        <ShieldIcon />
        <span className="trust2-chip-text">{label}</span>
      </span>
    </span>
  );
}

function ChipStrip({
  items,
  hidden,
}: {
  items: string[];
  hidden?: boolean;
}) {
  return (
    <span className="trust2-strip" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <HexChip key={item} label={item} />
      ))}
    </span>
  );
}

export default function TrustSectionV2() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.2,
    margin: "0px 0px -40px 0px",
  });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const titleWords = "Privacy, security and responsible AI from the start.".split(" ");

  const wordContainer: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: live ? 0.06 : 0 },
    },
  };

  const wordReveal: Variants = {
    hidden: live
      ? { opacity: 0, y: 14, filter: "blur(4px)" }
      : { opacity: 1, y: 0, filter: "blur(0px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: live ? 0.5 : 0, ease: EASE },
    },
  };

  return (
    <section
      ref={ref}
      id="responsible-deployment"
      className="trust2-section"
      style={{
        background: "var(--v8-bg-primary)",
        paddingBlock: "clamp(2.75rem, 5vw, 4.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="v8-container">
        <motion.h2
          className="v8-section-title trust2-title"
          style={{
            maxWidth: "22ch",
            fontSize: "clamp(1.75rem, 3.2vw, 2.5rem)",
          }}
          variants={wordContainer}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className="trust2-word"
              variants={wordReveal}
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      </div>

      <div className="trust2-marquee-mask">
        <div className="trust2-marquee trust2-marquee-ltr">
          <ChipStrip items={ITEMS} />
          <ChipStrip items={ITEMS} hidden />
        </div>
      </div>

      <style>{`
        .trust2-section {
          position: relative;
        }

        /* --- Word-by-word title --- */
        .trust2-title {
          display: flex;
          flex-wrap: wrap;
          gap: 0 0.35em;
        }
        .trust2-word {
          display: inline-block;
        }

        /* --- Marquee mask --- */
        .trust2-marquee-mask {
          margin-top: clamp(1.75rem, 3vw, 2.5rem);
          overflow: hidden;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 12%,
            black 88%,
            transparent 100%
          );
        }

        .trust2-marquee {
          display: flex;
          width: max-content;
        }
        .trust2-marquee:hover {
          animation-play-state: paused;
        }

        .trust2-marquee-ltr {
          animation: trust2-scroll-ltr 44s linear infinite;
        }

        @keyframes trust2-scroll-ltr {
          to { transform: translateX(-50%); }
        }

        .trust2-strip {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: clamp(0.6rem, 1.2vw, 0.9rem);
          padding-inline: clamp(0.3rem, 0.6vw, 0.45rem);
        }

        /* --- Hex chip --- */
        .trust2-chip {
          position: relative;
          display: inline-flex;
          align-items: center;
          cursor: default;
          white-space: nowrap;
          height: 44px;
        }

        .trust2-hex-border {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        .trust2-hex-bg {
          transition: stroke 260ms var(--v8-ease),
                      fill 260ms var(--v8-ease);
        }
        .trust2-chip:hover .trust2-hex-bg {
          stroke: var(--v8-lime);
          fill: rgba(199, 240, 0, 0.08);
        }

        .trust2-chip-content {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0 1.5rem;
        }

        .trust2-shield {
          flex-shrink: 0;
        }

        .trust2-chip-text {
          font-family: var(--font-v8-mono), 'Courier New', monospace;
          font-size: 0.92rem;
          font-weight: 500;
          letter-spacing: 0.03em;
          color: var(--v8-text-primary);
        }

        /* --- Reduced motion --- */
        @media (prefers-reduced-motion: reduce) {
          .trust2-marquee-ltr {
            animation: none;
            flex-wrap: wrap;
            width: auto;
            gap: 0.5rem;
            padding-inline: var(--v8-gutter);
          }
          .trust2-marquee-mask {
            mask-image: none;
            -webkit-mask-image: none;
          }
          .trust2-marquee .trust2-strip:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
