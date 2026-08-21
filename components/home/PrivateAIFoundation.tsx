"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const BENEFITS = [
  {
    title: "Live in days",
    copy: "From contract to production in under a week. No long integration project, no internal DevOps needed.",
    num: "01",
  },
  {
    title: "Private by design",
    copy: "EU-hosted, dedicated infrastructure with built-in guardrails and automatic PII anonymisation. Your data never leaves your environment.",
    num: "02",
  },
  {
    title: "Scales with you",
    copy: "Start with a ChatGPT-style workspace and API access. Add agents, automations and custom AI solutions as your needs evolve.",
    num: "03",
  },
];

const INCLUDES = [
  "ChatGPT-style app + API access",
  "Built-in guardrails & AI proxy",
  "Automatic personal data anonymisation",
  "EU-hosted dedicated infrastructure",
  "Autoscaling included",
  "Live in under 1 week",
];

const EASE = [0.22, 1, 0.36, 1] as const;
const OVERLINE_TEXT = "Plug & Play Private AI";
const OVERLINE_TYPE_SPEED = 45;
const OVERLINE_PAUSE = 5000;

function useLoopingTypewriter(text: string, speed: number, pause: number, active: boolean) {
  const [displayed, setDisplayed] = useState("");
  const phase = useRef<"typing" | "waiting" | "clearing">("typing");
  const idx = useRef(0);

  const reset = useCallback(() => {
    idx.current = 0;
    setDisplayed("");
    phase.current = "typing";
  }, []);

  useEffect(() => {
    if (!active) { reset(); return; }

    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (phase.current === "typing") {
        idx.current += 1;
        setDisplayed(text.slice(0, idx.current));
        if (idx.current >= text.length) {
          phase.current = "waiting";
          timer = setTimeout(tick, pause);
        } else {
          timer = setTimeout(tick, speed);
        }
      } else if (phase.current === "waiting") {
        phase.current = "clearing";
        timer = setTimeout(tick, 30);
      } else {
        idx.current -= 1;
        setDisplayed(text.slice(0, idx.current));
        if (idx.current <= 0) {
          phase.current = "typing";
          timer = setTimeout(tick, 400);
        } else {
          timer = setTimeout(tick, 20);
        }
      }
    };

    timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [active, text, speed, pause, reset]);

  return displayed;
}

function PipelineConnector({ animate }: { animate: boolean }) {
  return (
    <div className="paf2-connector" aria-hidden="true">
      <div className="paf2-beam" />
      {animate && <div className="paf2-pulse" />}
    </div>
  );
}

function PipelineConnectorVertical({ animate }: { animate: boolean }) {
  return (
    <div className="paf2-connector-v" aria-hidden="true">
      <div className="paf2-beam-v" />
      {animate && <div className="paf2-pulse-v" />}
    </div>
  );
}

export default function PrivateAIFoundationV2() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const overlineText = useLoopingTypewriter(
    OVERLINE_TEXT,
    OVERLINE_TYPE_SPEED,
    OVERLINE_PAUSE,
    live && inView,
  );

  return (
    <section
      ref={ref}
      id="private-ai-foundation"
      className="paf2-section"
      style={{ background: "var(--v8-bg-primary)" }}
    >
      <div className="paf2-scanlines" aria-hidden="true" />

      <motion.div
        className="v8-container"
        style={{ position: "relative", zIndex: 1 }}
        initial={live ? { opacity: 0, y: 18 } : false}
        animate={
          inView || !live
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 18 }
        }
        transition={{ duration: live ? 0.65 : 0, ease: EASE }}
      >
        <span className="v8-overline paf2-overline">
          {live ? (
            <>
              {overlineText}
              <span className="paf2-cursor" aria-hidden="true" />
            </>
          ) : (
            OVERLINE_TEXT
          )}
        </span>

        <h2
          className="v8-section-title"
          style={{ maxWidth: "20ch", marginTop: "1.5rem" }}
        >
          Private AI, ready in days.
        </h2>

        <p
          className="v8-lead"
          style={{ maxWidth: "42rem", marginTop: "1.25rem" }}
        >
          A fully managed AI environment your teams can start using in
          days, not months. ChatGPT-style interface, API access,
          built-in guardrails and automatic personal data anonymisation. Hosted
          in Europe, on dedicated infrastructure you control.
        </p>

        <div className="paf2-pipeline">
          {/* Top row: circles + connectors */}
          <div className="paf2-track">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="paf2-track-item">
                <motion.div
                  className="paf2-node-ring"
                  initial={live ? { opacity: 0, scale: 0.5 } : false}
                  animate={
                    inView || !live
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.5 }
                  }
                  transition={{
                    duration: live ? 0.5 : 0,
                    delay: live ? 0.3 + i * 0.2 : 0,
                    ease: EASE,
                  }}
                >
                  <motion.svg
                    viewBox="0 0 48 48"
                    fill="none"
                    className="paf2-ring-svg"
                    aria-hidden="true"
                  >
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      stroke="var(--v8-line)"
                      strokeWidth="1"
                    />
                    <motion.circle
                      cx="24"
                      cy="24"
                      r="22"
                      stroke="var(--v8-lime)"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={
                        inView || !live
                          ? { pathLength: 1 }
                          : { pathLength: 0 }
                      }
                      transition={{
                        duration: live ? 0.8 : 0,
                        delay: live ? 0.5 + i * 0.25 : 0,
                        ease: EASE,
                      }}
                    />
                  </motion.svg>
                  <span className="paf2-node-num">{b.num}</span>
                </motion.div>
                {i < BENEFITS.length - 1 && (
                  <PipelineConnector animate={live && inView} />
                )}
              </div>
            ))}
          </div>

          {/* Bottom row: content cards aligned under each circle */}
          <div className="paf2-cards">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.title}
                className="paf2-node-content"
                initial={live ? { opacity: 0, y: 12 } : false}
                animate={
                  inView || !live
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 12 }
                }
                transition={{
                  duration: live ? 0.5 : 0,
                  delay: live ? 0.5 + i * 0.2 : 0,
                  ease: EASE,
                }}
              >
                <h3 className="paf2-node-title">{b.title}</h3>
                <p
                  className="v8-body"
                  style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}
                >
                  {b.copy}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Mobile vertical layout */}
          <div className="paf2-pipeline-mobile">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="paf2-mobile-step">
                <div className="paf2-mobile-left">
                  <motion.div
                    className="paf2-node-ring"
                    initial={live ? { opacity: 0, scale: 0.5 } : false}
                    animate={
                      inView || !live
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0.5 }
                    }
                    transition={{
                      duration: live ? 0.5 : 0,
                      delay: live ? 0.3 + i * 0.2 : 0,
                      ease: EASE,
                    }}
                  >
                    <motion.svg
                      viewBox="0 0 48 48"
                      fill="none"
                      className="paf2-ring-svg"
                      aria-hidden="true"
                    >
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        stroke="var(--v8-line)"
                        strokeWidth="1"
                      />
                      <motion.circle
                        cx="24"
                        cy="24"
                        r="22"
                        stroke="var(--v8-lime)"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={
                          inView || !live
                            ? { pathLength: 1 }
                            : { pathLength: 0 }
                        }
                        transition={{
                          duration: live ? 0.8 : 0,
                          delay: live ? 0.5 + i * 0.25 : 0,
                          ease: EASE,
                        }}
                      />
                    </motion.svg>
                    <span className="paf2-node-num">{b.num}</span>
                  </motion.div>
                  {i < BENEFITS.length - 1 && (
                    <PipelineConnectorVertical animate={live && inView} />
                  )}
                </div>
                <motion.div
                  className="paf2-node-content"
                  initial={live ? { opacity: 0, y: 10 } : false}
                  animate={
                    inView || !live
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 10 }
                  }
                  transition={{
                    duration: live ? 0.5 : 0,
                    delay: live ? 0.5 + i * 0.2 : 0,
                    ease: EASE,
                  }}
                >
                  <h3 className="paf2-node-title">{b.title}</h3>
                  <p
                    className="v8-body"
                    style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}
                  >
                    {b.copy}
                  </p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          className="paf2-pricing"
          initial={live ? { opacity: 0, y: 16 } : false}
          animate={
            inView || !live
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 16 }
          }
          transition={{
            duration: live ? 0.55 : 0,
            delay: live ? 0.7 : 0,
            ease: EASE,
          }}
        >
          <span className="paf2-pricing-label">From</span>
          <div className="paf2-pricing-amount">
            <span className="paf2-pricing-currency">EUR</span>
            <span className="paf2-pricing-value">3,000</span>
            <span className="paf2-pricing-period">/month</span>
          </div>

          <ul className="paf2-pricing-list">
            {INCLUDES.map((item) => (
              <li key={item} className="paf2-pricing-item">
                <svg
                  className="paf2-check"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    stroke="var(--v8-lime-deep)"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          <a
            className="v8-btn-primary paf2-pricing-cta"
            href="mailto:hello@beeclaros.com"
          >
            Book a call
            <span className="v8-arrow" aria-hidden="true">
              &rarr;
            </span>
          </a>
        </motion.div>

        <p
          className="v8-body"
          style={{ marginTop: "1.75rem", color: "var(--v8-text-muted)", textAlign: "center" }}
        >
          Already have your own infrastructure? We deploy into it instead.
        </p>
      </motion.div>

      <style>{`
        .paf2-section {
          padding-block: clamp(3rem, 7vw, 6rem);
          position: relative;
          overflow: hidden;
        }

        .paf2-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(0, 0, 0, 0.015) 3px,
            rgba(0, 0, 0, 0.015) 4px
          );
          pointer-events: none;
        }

        .paf2-overline {
          position: relative;
        }
        .paf2-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--v8-lime);
          margin-left: 0.35rem;
          vertical-align: text-bottom;
          animation: paf2-blink 1s step-end infinite;
        }

        @keyframes paf2-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        /* --- Pipeline layout (desktop: two rows) --- */
        .paf2-pipeline {
          margin-top: clamp(3rem, 5vw, 4rem);
        }

        .paf2-pipeline-mobile { display: none; }

        /* Track row: circles + connector beams */
        .paf2-track {
          display: flex;
          align-items: center;
        }

        .paf2-track-item {
          display: flex;
          align-items: center;
          flex: 1;
        }
        .paf2-track-item:last-child {
          flex: 0 0 auto;
        }

        /* Connector fills space between circles */
        .paf2-connector {
          flex: 1;
          height: 48px;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }

        .paf2-beam {
          width: 100%;
          height: 2px;
          background: var(--v8-line-strong);
          border-radius: 1px;
        }

        .paf2-pulse {
          position: absolute;
          top: 50%;
          left: -25%;
          width: 25%;
          height: 3px;
          margin-top: -1.5px;
          border-radius: 2px;
          background: linear-gradient(90deg, transparent, rgba(199,240,0,0.55) 35%, rgba(199,240,0,0.55) 65%, transparent);
          box-shadow: 0 0 8px rgba(199,240,0,0.3);
          animation: paf2-travel 3.5s ease-in-out infinite;
        }

        @keyframes paf2-travel {
          0%   { left: -25%; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }

        /* Cards row: text content aligned under each circle */
        .paf2-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 2rem);
          margin-top: 1.25rem;
        }

        .paf2-node-ring {
          position: relative;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
        }

        .paf2-ring-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
        }

        .paf2-node-num {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-v8-mono), 'Courier New', monospace;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: var(--v8-text-primary);
        }

        .paf2-node-content {
          padding-right: clamp(0.5rem, 2vw, 1.5rem);
        }

        .paf2-node-title {
          margin: 0;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.15rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: var(--v8-text-primary);
        }

        /* --- Vertical connector for mobile --- */
        .paf2-connector-v {
          width: 48px;
          height: 40px;
          display: flex;
          align-items: stretch;
          justify-content: center;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }

        .paf2-beam-v {
          width: 2px;
          height: 100%;
          background: var(--v8-line-strong);
          border-radius: 1px;
        }

        .paf2-pulse-v {
          position: absolute;
          left: 50%;
          top: -30%;
          height: 30%;
          width: 3px;
          margin-left: -1.5px;
          border-radius: 2px;
          background: linear-gradient(180deg, transparent, rgba(199,240,0,0.55) 35%, rgba(199,240,0,0.55) 65%, transparent);
          box-shadow: 0 0 8px rgba(199,240,0,0.3);
          animation: paf2-travel-v 3.5s ease-in-out infinite;
        }

        @keyframes paf2-travel-v {
          0%   { top: -30%; opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }

        /* --- Pricing card --- */
        .paf2-pricing {
          margin-top: clamp(2.5rem, 5vw, 3.5rem);
          max-width: 420px;
          margin-inline: auto;
          background: var(--v8-bg-secondary);
          border: 1px solid var(--v8-line);
          border-radius: var(--v8-radius);
          padding: clamp(1.75rem, 3vw, 2.5rem);
          text-align: center;
        }

        .paf2-pricing-label {
          font-family: var(--font-v8-mono), 'Courier New', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--v8-text-muted);
        }

        .paf2-pricing-amount {
          display: flex;
          align-items: baseline;
          justify-content: center;
          gap: 0.4rem;
          margin-top: 0.5rem;
        }

        .paf2-pricing-currency {
          font-family: var(--font-v8-mono), 'Courier New', monospace;
          font-size: 0.85rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          color: var(--v8-text-secondary);
        }

        .paf2-pricing-value {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(2.2rem, 4vw, 3rem);
          font-weight: 500;
          letter-spacing: -0.03em;
          line-height: 1;
          color: var(--v8-text-primary);
        }

        .paf2-pricing-period {
          font-family: var(--font-v8-sans), sans-serif;
          font-size: 1rem;
          color: var(--v8-text-muted);
        }

        .paf2-pricing-list {
          list-style: none;
          margin: 1.5rem 0 0;
          padding: 0;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 0.65rem;
          border-top: 1px solid var(--v8-line);
          padding-top: 1.5rem;
        }

        .paf2-pricing-item {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-v8-sans), sans-serif;
          font-size: 0.95rem;
          color: var(--v8-text-secondary);
          line-height: 1.4;
        }

        .paf2-check {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        .paf2-pricing-cta {
          margin-top: 1.75rem;
          width: 100%;
          justify-content: center;
        }

        /* --- Mobile: switch to vertical pipeline --- */
        @media (max-width: 720px) {
          .paf2-track,
          .paf2-cards { display: none; }
          .paf2-pipeline-mobile {
            display: flex;
            flex-direction: column;
          }
          .paf2-mobile-step {
            display: flex;
            align-items: flex-start;
            gap: 1rem;
          }
          .paf2-mobile-left {
            display: flex;
            flex-direction: column;
            align-items: center;
            flex-shrink: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .paf2-cursor { animation: none; opacity: 1; }
          .paf2-pulse { animation: none; display: none; }
          .paf2-pulse-v { animation: none; display: none; }
          .paf2-scanlines { display: none; }
        }
      `}</style>
    </section>
  );
}
