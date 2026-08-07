"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useScrollReveal } from "../hooks/useScrollReveal";
import PartnershipMark from "./PartnershipMark";

const STEPS = [
  {
    num: "01",
    title: "Understand",
    copy: "We learn how the business works, where time is lost and where better decisions are needed.",
  },
  {
    num: "02",
    title: "Prioritise",
    copy: "We identify the opportunities with the strongest business value and realistic path to delivery.",
  },
  {
    num: "03",
    title: "Implement",
    copy: "We build practical solutions that fit existing teams, processes and systems.",
  },
  {
    num: "04",
    title: "Embed",
    copy: "We help people adopt the solutions and create the foundations to expand what works.",
  },
];

// Irregular on the left → progressively straighter on the right.
const FLIGHT_PATH =
  "M 48 168 C 200 52, 280 228, 420 132 S 700 88, 900 108 S 1080 96, 1152 104";

const DOTS = [
  { x: 48, y: 168, t: 0 },
  { x: 420, y: 132, t: 0.33 },
  { x: 900, y: 108, t: 0.66 },
  { x: 1152, y: 104, t: 1 },
];

function PathDot({
  x,
  y,
  t,
  progress,
}: {
  x: number;
  y: number;
  t: number;
  progress: MotionValue<number>;
}) {
  const scale = useTransform(progress, [t - 0.02, t + 0.1], [0.35, 1], {
    clamp: true,
  });
  const opacity = useTransform(progress, [t - 0.04, t + 0.08], [0, 1], {
    clamp: true,
  });
  const ringScale = useTransform(progress, [t, t + 0.14], [0.6, 1.35], {
    clamp: true,
  });
  const ringOpacity = useTransform(progress, [t, t + 0.06, t + 0.18], [0, 0.55, 0], {
    clamp: true,
  });

  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.circle
        r={16}
        fill="none"
        stroke="var(--v10-lime)"
        strokeWidth={1}
        style={{ scale: ringScale, opacity: ringOpacity }}
      />
      <motion.circle
        r={10}
        fill="var(--v10-bg-secondary)"
        stroke="var(--v10-line-strong)"
        strokeWidth={1}
        style={{ scale, opacity }}
      />
      <motion.circle
        r={4}
        fill="var(--v10-lime)"
        style={{ scale, opacity }}
      />
    </g>
  );
}

export default function WhatWeDo() {
  const ref = useRef<HTMLElement>(null);
  const pathRef = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);

  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ["start 0.9", "end 0.35"],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 28,
    restDelta: 0.001,
  });

  const pathLength = useTransform(progress, [0, 1], [0, 1]);
  const offsetDistance = useTransform(progress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="what-we-do"
      className="v10-section"
      style={{ background: "var(--v10-bg-secondary)" }}
    >
      <div className="v10-container">
        <div className="v10-grid" style={{ rowGap: "2rem" }}>
          <div style={{ gridColumn: "1 / -1", maxWidth: "58rem" }}>
            <div className="v10-overline v10-reveal">What we do</div>
            <h2
              className="v10-section-title v10-reveal v10-reveal-1"
              style={{ marginTop: "1.4rem", maxWidth: "18ch" }}
            >
              From scattered ideas to practical adoption.
            </h2>
          </div>
        </div>

        <div
          ref={pathRef}
          className="v10-reveal v10-reveal-2 wwd-path"
          style={{
            marginTop: "clamp(3rem, 6vw, 4.5rem)",
            position: "relative",
            width: "100%",
          }}
        >
          <svg
            viewBox="0 0 1200 220"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            className="wwd-path-svg"
          >
            <path
              d={FLIGHT_PATH}
              fill="none"
              stroke="var(--v10-line)"
              strokeWidth="1"
              strokeLinecap="round"
              opacity={0.6}
            />
            <path
              d={FLIGHT_PATH}
              fill="none"
              stroke="var(--v10-line-strong)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <motion.path
              d={FLIGHT_PATH}
              fill="none"
              stroke="var(--v10-lime)"
              strokeWidth="2.5"
              strokeLinecap="round"
              pathLength={1}
              style={{
                pathLength,
                strokeDasharray: "1 1",
              }}
            />
            {DOTS.map((d, i) => (
              <PathDot key={i} x={d.x} y={d.y} t={d.t} progress={progress} />
            ))}
          </svg>

          <motion.div
            className="wwd-mark"
            style={{
              offsetPath: `path('${FLIGHT_PATH}')`,
              offsetDistance,
              offsetRotate: "auto",
            }}
            aria-hidden="true"
          >
            <PartnershipMark height={30} alt="" />
          </motion.div>
        </div>

        <div className="wwd-steps">
          {STEPS.map((step, i) => (
            <StepCard key={step.num} step={step} index={i} progress={progress} />
          ))}
        </div>
      </div>

      <style>{`
        .wwd-path-svg {
          width: 100%;
          height: clamp(140px, 20vw, 220px);
          display: block;
          overflow: visible;
        }
        .wwd-mark {
          position: absolute;
          top: 0;
          left: 0;
          width: 30px;
          height: 30px;
          margin-left: -15px;
          margin-top: -15px;
          pointer-events: none;
        }
        .wwd-steps {
          margin-top: clamp(2rem, 4vw, 3rem);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1.25rem, 2.4vw, 2.25rem);
        }
        @media (max-width: 820px) {
          .wwd-steps { grid-template-columns: repeat(2, 1fr); row-gap: 2.25rem; }
          .wwd-mark { display: none; }
        }
        @media (max-width: 520px) {
          .wwd-steps { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}

function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const t = DOTS[index]?.t ?? index * 0.33;
  const opacity = useTransform(progress, [t - 0.02, t + 0.12], [0.45, 1], {
    clamp: true,
  });
  const y = useTransform(progress, [t - 0.02, t + 0.12], [10, 0], {
    clamp: true,
  });

  return (
    <motion.div className="wwd-step" style={{ opacity, y }}>
      <span className="v10-num">{step.num}</span>
      <h3
        className="v10-display"
        style={{
          marginTop: "0.6rem",
          fontSize: "1.25rem",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          color: "var(--v10-text-primary)",
        }}
      >
        {step.title}
      </h3>
      <p className="v10-body" style={{ marginTop: "0.6rem", fontSize: "0.98rem" }}>
        {step.copy}
      </p>
    </motion.div>
  );
}
