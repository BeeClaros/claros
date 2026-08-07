"use client";

import { useId } from "react";

interface FlightMapProps {
  /** dark = light lines for night backgrounds */
  dark?: boolean;
  className?: string;
  style?: React.CSSProperties;
  /** show the small top-down bees along the routes */
  bees?: boolean;
  opacity?: number;
}

/**
 * FlightMap - an abstract aeronautical navigation chart. Fine curved
 * trajectories scattered on the left converge into one clear direction
 * on the right. Small blue waypoints, a single copper route, discreet
 * technical marks. No readable coordinates, no dashboard chrome.
 *
 * "Activity becomes direction."
 */
export default function FlightMap({
  dark = false,
  className = "",
  style,
  bees = true,
  opacity = 1,
}: FlightMapProps) {
  const uid = useId().replace(/:/g, "");
  const conv = `conv-${uid}`;

  const line = dark ? "rgba(185,193,204,0.5)" : "#3b4658";
  const lineSoft = dark ? "rgba(185,193,204,0.28)" : "rgba(59,70,88,0.5)";
  const dot = "#3157E3";
  const copper = "#C66A3D";

  // Routes: many dispersed origins on the left flowing to a convergence node.
  const convergeX = 1180;
  const convergeY = 300;

  const routes = [
    "M40 90 C300 120 620 200 1180 300",
    "M20 200 C280 210 640 250 1180 300",
    "M60 330 C320 320 660 300 1180 300",
    "M30 440 C300 420 620 360 1180 300",
    "M80 540 C340 500 660 400 1180 300",
    "M10 300 C260 300 600 300 1180 300",
    "M120 620 C380 540 680 420 1180 300",
  ];

  return (
    <svg
      viewBox="0 0 1280 700"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      style={{ display: "block", ...style }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <marker id={conv} markerWidth="8" markerHeight="8" refX="4" refY="4">
          <circle cx="4" cy="4" r="2.5" fill={dot} />
        </marker>
      </defs>

      <g opacity={opacity}>
        {/* faint reference arcs */}
        <g stroke={lineSoft} strokeWidth="1" fill="none" opacity={0.5}>
          <path d="M1180 300 m-260 0 a260 260 0 1 0 520 0 a260 260 0 1 0 -520 0" />
          <path d="M1180 300 m-150 0 a150 150 0 1 0 300 0 a150 150 0 1 0 -300 0" />
        </g>

        {/* dispersed trajectories converging right */}
        {routes.map((d, i) => (
          <path
            key={i}
            d={d}
            className="ae-flightline"
            stroke={line}
            strokeWidth={i % 3 === 0 ? 1.3 : 1}
            fill="none"
            opacity={0.62}
          />
        ))}

        {/* single copper route */}
        <path
          d="M50 470 C320 440 640 330 1180 300"
          className="ae-flightline"
          stroke={copper}
          strokeWidth="1.8"
          fill="none"
        />

        {/* onward vector out of the convergence node */}
        <path
          d="M1180 300 L1260 300"
          stroke={dot}
          strokeWidth="1.8"
          fill="none"
        />

        {/* waypoints */}
        {[
          [40, 90], [20, 200], [60, 330], [30, 440], [80, 540], [120, 620],
          [360, 250], [420, 380], [520, 300], [700, 320], [860, 305],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r={i % 4 === 0 ? 3 : 2} fill={dot} opacity={0.75} />
        ))}

        {/* convergence node */}
        <circle cx={convergeX} cy={convergeY} r="6" fill="none" stroke={dot} strokeWidth="1.5" />
        <circle cx={convergeX} cy={convergeY} r="2.5" fill={dot} />

        {/* discreet technical tick marks (no numbers) */}
        <g stroke={line} strokeWidth="1" opacity={0.4}>
          <path d="M200 60 l0 10" />
          <path d="M400 60 l0 10" />
          <path d="M600 60 l0 10" />
          <path d="M800 60 l0 10" />
          <path d="M60 640 l10 0" />
          <path d="M60 500 l10 0" />
        </g>

        {/* a few top-down bees riding the routes */}
        {bees && (
          <g fill={dark ? "#B9C1CC" : "#162033"} opacity={0.9}>
            <MiniBee x={340} y={232} r={-8} />
            <MiniBee x={640} y={318} r={-4} scale={0.8} />
            <MiniBee x={920} y={302} r={-2} scale={1.1} copper />
          </g>
        )}
      </g>
    </svg>
  );
}

function MiniBee({
  x,
  y,
  r = 0,
  scale = 1,
  copper = false,
}: {
  x: number;
  y: number;
  r?: number;
  scale?: number;
  copper?: boolean;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${scale})`}>
      {/* wings */}
      <path d="M2 -3 C10 -12 20 -10 20 -3 C20 3 10 5 3 1 Z" fill="rgba(117,131,151,0.4)" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      <path d="M-2 -3 C-10 -12 -20 -10 -20 -3 C-20 3 -10 5 -3 1 Z" fill="rgba(117,131,151,0.4)" stroke="currentColor" strokeWidth="0.6" opacity="0.7" />
      {/* body */}
      <ellipse cx="0" cy="4" rx="4" ry="10" fill="currentColor" />
      <circle cx="0" cy="-6" r="3" fill="currentColor" />
      {copper && <circle cx="0" cy="3" r="1.6" fill="#C66A3D" />}
    </g>
  );
}
