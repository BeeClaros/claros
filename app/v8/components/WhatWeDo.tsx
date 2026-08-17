"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const PILLARS = [
  {
    title: "AI Strategy",
    copy: "We map where AI earns its place, rank opportunities by impact and feasibility, and define what should happen first.",
    mark: "strategy" as const,
  },
  {
    title: "Product Transformation",
    copy: "We build AI into the products, platforms and systems your customers and teams already use.",
    mark: "product" as const,
  },
  {
    title: "Process Transformation",
    copy: "We redesign high-friction workflows where AI can reduce repetitive work, improve decisions and make operations easier to run.",
    mark: "process" as const,
  },
  {
    title: "People & AI Culture",
    copy: "We train the people who will use it and design the change with them, so adoption is part of delivery.",
    mark: "people" as const,
  },
];

type MarkType = (typeof PILLARS)[number]["mark"];

const EASE = [0.22, 1, 0.36, 1] as const;

function hexPath(cx: number, cy: number, r: number) {
  const pts: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]);
  }
  return (
    "M " +
    pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L ") +
    " Z"
  );
}

const STRATEGY_R = 6;

/** Neighbouring pointy-top cells sit r*sqrt(3) apart, so the ring never collides. */
const STRATEGY_RING = Array.from({ length: 6 }, (_, i) => {
  const a = (Math.PI / 3) * i;
  const d = STRATEGY_R * Math.sqrt(3);
  return [24 + d * Math.cos(a), 24 + d * Math.sin(a)] as const;
});

function PillarMark({ type, animate }: { type: MarkType; animate: boolean }) {
  const stroke = "var(--v8-text-primary)";
  const drawProps = animate
    ? {
        initial: { pathLength: 0, opacity: 0.35 },
        animate: { pathLength: 1, opacity: 1 },
        transition: { duration: 0.75, ease: EASE },
      }
    : { initial: false as const, animate: { pathLength: 1, opacity: 1 } };

  const nodeProps = animate
    ? {
        initial: { opacity: 0, scale: 0.4 },
        animate: { opacity: 1, scale: 1 },
        transition: { duration: 0.35, delay: 0.55, ease: EASE },
      }
    : { initial: false as const, animate: { opacity: 1, scale: 1 } };

  switch (type) {
    case "strategy":
      return (
        <svg width={48} height={48} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          {STRATEGY_RING.map(([cx, cy], i) => (
            <motion.path
              key={i}
              d={hexPath(cx, cy, STRATEGY_R)}
              stroke={stroke}
              strokeWidth="1.5"
              fill="none"
              {...drawProps}
              transition={{
                duration: 0.75,
                delay: animate ? i * 0.05 : 0,
                ease: EASE,
              }}
            />
          ))}
          <motion.path
            d={hexPath(24, 24, STRATEGY_R)}
            fill="var(--v8-lime)"
            stroke="none"
            className="wwd-mark-node"
            {...nodeProps}
          />
        </svg>
      );
    case "product":
      return (
        <svg width={48} height={48} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <motion.path
            d={hexPath(24, 24, 18)}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
          />
          <motion.path
            d={hexPath(24, 24, 9)}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
            transition={{ duration: 0.7, delay: animate ? 0.2 : 0, ease: EASE }}
          />
          <motion.circle
            cx={24}
            cy={24}
            r={2.8}
            fill="var(--v8-lime)"
            stroke="none"
            className="wwd-mark-node"
            {...nodeProps}
          />
        </svg>
      );
    case "process":
      return (
        <svg width={48} height={48} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <motion.path
            d={hexPath(10, 30, 7)}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
          />
          <motion.path
            d={hexPath(24, 18, 7)}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
            transition={{ duration: 0.7, delay: animate ? 0.12 : 0, ease: EASE }}
          />
          <motion.path
            d={hexPath(38, 12, 7)}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
            transition={{ duration: 0.7, delay: animate ? 0.24 : 0, ease: EASE }}
          />
          <motion.line
            x1={16}
            y1={26}
            x2={18.5}
            y2={22}
            stroke={stroke}
            strokeWidth="1.5"
            {...drawProps}
            transition={{ duration: 0.4, delay: animate ? 0.35 : 0, ease: EASE }}
          />
          <motion.line
            x1={30}
            y1={15}
            x2={32.5}
            y2={13}
            stroke={stroke}
            strokeWidth="1.5"
            {...drawProps}
            transition={{ duration: 0.4, delay: animate ? 0.45 : 0, ease: EASE }}
          />
          <motion.circle
            cx={17.2}
            cy={24}
            r={2.2}
            fill="var(--v8-lime)"
            stroke="none"
            className="wwd-mark-node"
            {...nodeProps}
          />
          <motion.circle
            cx={31.2}
            cy={14}
            r={2.2}
            fill="var(--v8-lime)"
            stroke="none"
            className="wwd-mark-node"
            {...nodeProps}
            transition={{ duration: 0.35, delay: animate ? 0.65 : 0, ease: EASE }}
          />
        </svg>
      );
    case "people":
    default:
      return (
        <svg width={48} height={48} viewBox="0 0 48 48" fill="none" aria-hidden="true">
          <motion.path
            d={hexPath(24, 24, 9)}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
          />
          <motion.line
            x1={24}
            y1={15}
            x2={24}
            y2={9}
            stroke={stroke}
            strokeWidth="1.5"
            {...drawProps}
            transition={{ duration: 0.4, delay: animate ? 0.2 : 0, ease: EASE }}
          />
          <motion.line
            x1={31.5}
            y1={28}
            x2={37}
            y2={32}
            stroke={stroke}
            strokeWidth="1.5"
            {...drawProps}
            transition={{ duration: 0.4, delay: animate ? 0.28 : 0, ease: EASE }}
          />
          <motion.line
            x1={16.5}
            y1={28}
            x2={11}
            y2={32}
            stroke={stroke}
            strokeWidth="1.5"
            {...drawProps}
            transition={{ duration: 0.4, delay: animate ? 0.36 : 0, ease: EASE }}
          />
          <motion.circle
            cx={24}
            cy={7}
            r={3}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
            transition={{ duration: 0.5, delay: animate ? 0.3 : 0, ease: EASE }}
          />
          <motion.circle
            cx={38}
            cy={34}
            r={3}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
            transition={{ duration: 0.5, delay: animate ? 0.38 : 0, ease: EASE }}
          />
          <motion.circle
            cx={10}
            cy={34}
            r={3}
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            {...drawProps}
            transition={{ duration: 0.5, delay: animate ? 0.46 : 0, ease: EASE }}
          />
          <motion.circle
            cx={24}
            cy={24}
            r={2.6}
            fill="var(--v8-lime)"
            stroke="none"
            className="wwd-mark-node"
            {...nodeProps}
          />
        </svg>
      );
  }
}

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.1,
    margin: "0px 0px -40px 0px",
  });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const intro: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: live ? 0.1 : 0 } },
  };
  const fade: Variants = {
    hidden: live ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: live ? 0.7 : 0, ease: EASE },
    },
  };

  return (
    <section
      ref={ref}
      id="what-we-do"
      style={{ background: "var(--v8-bg-secondary)" }}
    >
      <div
        className="v8-container"
        style={{
          paddingTop: "clamp(5rem, 11vw, 10rem)",
          paddingBottom: "clamp(5rem, 11vw, 10rem)",
        }}
      >
        <motion.div
          variants={intro}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          style={{ maxWidth: "42rem" }}
        >
          <motion.h2
            className="v8-section-title"
            variants={fade}
            style={{
              maxWidth: "26ch",
              fontSize: "clamp(2.25rem, 4.5vw, 3.5rem)",
            }}
          >
            AI is useful when it solves the{" "}
            <span style={{ color: "var(--v8-lime-deep)" }}>
              right business problems.
            </span>
          </motion.h2>
          <motion.p
            className="v8-lead"
            variants={fade}
            style={{ marginTop: "1.5rem", maxWidth: "38rem" }}
          >
            We work across strategy, products, processes and people. We are
            most useful when AI activity already exists, but priorities are
            unclear or promising experiments need a practical path into the
            business.
          </motion.p>
        </motion.div>

        <motion.div
          className={`wwd-grid${inView ? " wwd-grid-shown" : ""}`}
          variants={intro}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          {PILLARS.map((pillar, i) => (
            <motion.div key={pillar.title} className="wwd-card" variants={fade}>
              <div
                className="wwd-card-line"
                style={{ transitionDelay: live ? `${i * 80}ms` : "0ms" }}
              />
              <div className="wwd-mark" style={{ marginBottom: "1.5rem" }}>
                <PillarMark type={pillar.mark} animate={live && inView} />
              </div>
              <h3
                className="v8-display"
                style={{
                  fontSize: "1.35rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v8-text-primary)",
                }}
              >
                {pillar.title}
              </h3>
              <p
                className="v8-body"
                style={{ marginTop: "0.7rem", fontSize: "0.98rem" }}
              >
                {pillar.copy}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        .wwd-grid {
          margin-top: clamp(3rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(2rem, 4vw, 3.5rem);
        }
        .wwd-card {
          position: relative;
          padding: clamp(1.5rem, 3vw, 2.25rem);
          padding-top: calc(clamp(1.5rem, 3vw, 2.25rem) + 1px);
          border-top: 1px solid transparent;
        }
        .wwd-card-line {
          position: absolute;
          top: 0;
          left: 0;
          height: 1px;
          width: 0;
          background: var(--v8-line);
          transition: width 0.8s cubic-bezier(0.22, 1, 0.36, 1), background 220ms ease;
        }
        .wwd-grid-shown .wwd-card-line {
          width: 100%;
        }
        .wwd-card:hover .wwd-card-line {
          background: var(--v8-lime);
        }
        .wwd-card:hover .wwd-mark-node {
          animation: v8-dot-pulse 1.4s ease-in-out 1;
        }
        @media (max-width: 720px) {
          .wwd-grid { grid-template-columns: 1fr; }
        }
        @media (prefers-reduced-motion: reduce) {
          .wwd-card-line {
            width: 100%;
            transition: none;
          }
          .wwd-card:hover .wwd-mark-node {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
