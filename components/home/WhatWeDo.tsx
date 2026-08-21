"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
  AnimatePresence,
} from "framer-motion";

const PILLARS = [
  {
    title: "AI Strategy",
    copy: "We map where AI earns its place, rank opportunities by impact and feasibility, and define what should happen first.",
    num: "01",
  },
  {
    title: "Product Transformation",
    copy: "We build AI into the products, platforms and systems your customers and teams already use.",
    num: "02",
  },
  {
    title: "Process Transformation",
    copy: "We redesign high-friction workflows where AI can reduce repetitive work, improve decisions and make operations easier to run.",
    num: "03",
  },
  {
    title: "People & AI Culture",
    copy: "We train the people who will use it and design the change with them, so adoption is part of delivery.",
    num: "04",
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/*
  Flat-top regular hexagon: W=200, H=173.2 (H = W × √3/2)
  Vertices: top-left, top-right, right-point, bottom-right, bottom-left, left-point
*/
const HEX_PTS = "50,0 150,0 200,86.6 150,173.2 50,173.2 0,86.6";

/*
  Diamond layout (flat-top hexes):
       [02]
  [01]      [04]
       [03]

  Positions as multiples of --hex-w (left, top):
  01 left:    0,      0.433
  02 top:     0.75,   0
  03 bottom:  0.75,   0.866
  04 right:   1.5,    0.433

  Container: 2.5 × --hex-w  wide,  1.732 × --hex-w  tall
*/
const POS: [number, number][] = [
  [0, 0.433],
  [0.75, 0],
  [0.75, 0.866],
  [1.5, 0.433],
];

function HexCell({
  pillar,
  index,
  animate,
  active,
  onEnter,
  onLeave,
  style,
}: {
  pillar: (typeof PILLARS)[number];
  index: number;
  animate: boolean;
  active: boolean;
  onEnter: () => void;
  onLeave: () => void;
  style: React.CSSProperties;
}) {
  return (
    <motion.div
      className={`wwd2-cell${active ? " wwd2-active" : ""}`}
      style={style}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      initial={animate ? { opacity: 0, scale: 0.82 } : false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: animate ? 0.5 : 0,
        delay: animate ? 0.18 + index * 0.11 : 0,
        ease: EASE,
      }}
    >
      <svg
        viewBox="0 0 200 173.2"
        preserveAspectRatio="xMidYMid meet"
        overflow="visible"
        className="wwd2-hex-svg"
        aria-hidden="true"
      >
        <polygon points={HEX_PTS} className="wwd2-hex-poly" />
      </svg>

      <div className="wwd2-cell-content">
        <span className="wwd2-cell-num">{pillar.num}</span>
        <h3 className="wwd2-cell-title">{pillar.title}</h3>
        <AnimatePresence>
          {active && (
            <motion.p
              className="wwd2-cell-copy"
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 6 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {pillar.copy}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function WhatWeDoV2() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: live ? 0.12 : 0 } },
  };
  const fade: Variants = {
    hidden: live ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 },
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
      className="wwd2-section"
      style={{ background: "var(--v8-bg-secondary)" }}
    >
      <div className="wwd2-dot-grid" aria-hidden="true" />

      <div
        className="v8-container"
        style={{
          paddingTop: "clamp(5rem, 11vw, 10rem)",
          paddingBottom: "clamp(5rem, 11vw, 10rem)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <motion.div
          variants={container}
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

        {/* Diamond hive */}
        <div className="wwd2-hive">
          {PILLARS.map((p, i) => {
            const [l, t] = POS[i];
            return (
              <HexCell
                key={p.title}
                pillar={p}
                index={i}
                animate={live && inView}
                active={activeIdx === i}
                onEnter={() => setActiveIdx(i)}
                onLeave={() => setActiveIdx(null)}
                style={{
                  left: `calc(var(--hex-w) * ${l})`,
                  top: `calc(var(--hex-w) * ${t})`,
                }}
              />
            );
          })}
        </div>
      </div>

      <style>{`
        .wwd2-section { position: relative; overflow: hidden; }

        .wwd2-dot-grid {
          position: absolute; inset: 0;
          background-image: radial-gradient(circle, var(--v8-line) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.3;
          pointer-events: none;
        }

        /* ---- Diamond honeycomb ---- */
        .wwd2-hive {
          --hex-w: clamp(200px, 22vw, 290px);
          position: relative;
          width: calc(var(--hex-w) * 2.5);
          height: calc(var(--hex-w) * 1.732);
          margin: clamp(3rem, 6vw, 5rem) auto 0;
        }

        /* ---- Hex cell (absolutely positioned) ---- */
        .wwd2-cell {
          position: absolute;
          width: var(--hex-w);
          z-index: 1;
          cursor: pointer;
        }
        .wwd2-active { z-index: 10; }

        /* SVG shape */
        .wwd2-hex-svg {
          display: block;
          width: 100%;
          height: auto;
          transition: filter 320ms var(--v8-ease);
        }
        .wwd2-active .wwd2-hex-svg {
          filter: drop-shadow(0 4px 20px rgba(0,0,0,0.08));
        }

        .wwd2-hex-poly {
          fill: rgba(255, 255, 255, 0.55);
          stroke: var(--v8-line);
          stroke-width: 2;
          stroke-linejoin: round;
          transition: fill 280ms var(--v8-ease), stroke 280ms var(--v8-ease);
        }
        .wwd2-active .wwd2-hex-poly {
          fill: rgba(255, 255, 255, 0.94);
          stroke: var(--v8-lime);
          stroke-width: 2.5;
        }

        /* Content overlay */
        .wwd2-cell-content {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 14% 16%;
          pointer-events: none;
        }

        .wwd2-cell-num {
          font-family: var(--font-v8-mono), 'Courier New', monospace;
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          color: var(--v8-text-muted);
          margin-bottom: 0.2rem;
        }

        .wwd2-cell-title {
          margin: 0;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(0.85rem, 1.15vw, 1.08rem);
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--v8-text-primary);
          line-height: 1.25;
        }

        .wwd2-cell-copy {
          margin: 0;
          font-family: var(--font-v8-sans), sans-serif;
          font-size: clamp(0.64rem, 0.74vw, 0.74rem);
          line-height: 1.45;
          color: var(--v8-text-secondary);
          overflow: hidden;
        }

        /* ---- Mobile: vertical stack ---- */
        @media (max-width: 720px) {
          .wwd2-hive {
            --hex-w: clamp(180px, 55vw, 240px);
            width: var(--hex-w);
            height: auto;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .wwd2-cell {
            position: relative !important;
            left: 0 !important;
            top: 0 !important;
            margin-top: calc(var(--hex-w) * -0.12);
          }
          .wwd2-cell:first-child { margin-top: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wwd2-hex-svg { transition: none; }
          .wwd2-hex-poly { transition: none; }
        }
      `}</style>
    </section>
  );
}
