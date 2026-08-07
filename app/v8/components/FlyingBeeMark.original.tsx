"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  bodyBobY,
  wingLeftRotate,
  wingRightRotate,
} from "../lib/flyingBeeKeyframes";

type BeeTone = "light" | "dark";

interface FlyingBeeMarkProps {
  progress?: MotionValue<number>;
  pose?: number;
  laps?: number;
  size?: number | string;
  className?: string;
  tone?: BeeTone;
  title?: string;
}

const PALETTE = {
  light: {
    body: "var(--v8-bee-graphite)",
    accent: "var(--v8-lime)",
    wing: "var(--v8-bee-graphite)",
  },
  dark: {
    body: "#ECEEEA",
    accent: "var(--v8-lime)",
    wing: "#ECEEEA",
  },
} as const;

/**
 * Geometric bee mark - top-down hex modules + hollow angular wings.
 * Graphite body, lime accents; scroll-driven wing flap.
 */
export default function FlyingBeeMark({
  progress,
  pose = 0.3,
  laps = 8,
  size = 52,
  className = "",
  tone = "light",
  title,
}: FlyingBeeMarkProps) {
  const reducedMotion = useReducedMotion();
  const staticPose = reducedMotion ? 0.3 : pose;
  const fallback = useMotionValue(staticPose);
  const source = progress ?? fallback;
  const c = PALETTE[tone];

  const wingL = useTransform(source, (p) => wingLeftRotate(p, laps));
  const wingR = useTransform(source, (p) => wingRightRotate(p, laps));
  const bobY = useTransform(source, (p) => bodyBobY(p, laps));

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 112"
      role="img"
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={`v8-flying-bee ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Left wing - elongated open C, wider than tall */}
      <motion.g className="v8-fbee-wing-l" style={{ rotate: wingL }}>
        {/* Outer: long top → shallow tip → shorter bottom (open toward body) */}
        <path
          d="M34 30 L0 30 L8 46 L30 46"
          fill="none"
          stroke={c.wing}
          strokeWidth="3.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Inner accent: mirrors top + outer, gap from body */}
        <path
          d="M28 35 L8 35 L12 42"
          fill="none"
          stroke={c.wing}
          strokeWidth="3.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.g>

      {/* Right wing */}
      <motion.g className="v8-fbee-wing-r" style={{ rotate: wingR }}>
        <path
          d="M62 30 L96 30 L88 46 L66 46"
          fill="none"
          stroke={c.wing}
          strokeWidth="3.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d="M68 35 L88 35 L84 42"
          fill="none"
          stroke={c.wing}
          strokeWidth="3.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </motion.g>

      <motion.g className="v8-fbee-body" style={{ y: bobY }}>
        {/* Antennae */}
        <g
          stroke={c.body}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M40 24 L34 12" />
          <path d="M56 24 L62 12" />
        </g>

        {/* Head - small flat-top hex */}
        <path
          d="M40 22 L56 22 L62 32 L56 42 L40 42 L34 32 Z"
          fill={c.body}
        />

        {/* Abdomen - large vertical hex */}
        <path
          d="M48 44 L68 56 L68 80 L48 100 L28 80 L28 56 Z"
          fill={c.body}
        />

        {/* Lime markings: triangle + two bars */}
        <path d="M48 54 L56 66 L40 66 Z" fill={c.accent} />
        <rect x="38" y="72" width="20" height="5.5" rx="0.5" fill={c.accent} />
        <rect x="38" y="82" width="20" height="5.5" rx="0.5" fill={c.accent} />
      </motion.g>
    </svg>
  );
}
