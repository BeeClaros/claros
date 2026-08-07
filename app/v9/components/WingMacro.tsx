"use client";

import { useId } from "react";

interface WingMacroProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * WingMacro - an editorial macro study of a single mechanical wing.
 * Translucent membrane, geometric ribs, a technical-paper texture, small
 * metal attachments and one copper joint. Lots of empty space around it.
 *
 * "Lightweight structure. Precise movement."
 */
export default function WingMacro({ className = "", style }: WingMacroProps) {
  const uid = useId().replace(/:/g, "");
  const membrane = `mem-${uid}`;
  const grain = `grain-${uid}`;

  return (
    <svg
      viewBox="0 0 420 520"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: "block", ...style }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={membrane} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E7EDF5" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#E7EDF5" stopOpacity="0.05" />
        </linearGradient>
        <filter id={grain}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer><feFuncA type="linear" slope="0.05" /></feComponentTransfer>
          <feComposite operator="in" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* membrane */}
      <path
        d="M70 380 C60 250 130 130 300 92 C360 80 396 96 392 132 C384 210 300 340 150 402 C104 421 78 414 70 380 Z"
        fill={`url(#${membrane})`}
        stroke="#758397"
        strokeWidth="1.4"
      />
      {/* paper/fibre grain on the membrane */}
      <path
        d="M70 380 C60 250 130 130 300 92 C360 80 396 96 392 132 C384 210 300 340 150 402 C104 421 78 414 70 380 Z"
        fill="#758397"
        filter={`url(#${grain})`}
        opacity="0.6"
      />

      {/* geometric ribs */}
      <g stroke="#758397" strokeWidth="1" fill="none" opacity="0.85">
        <path d="M96 372 C120 250 210 150 372 118" />
        <path d="M120 388 C150 270 250 180 388 150" />
        <path d="M150 396 C190 300 290 220 372 170" strokeWidth="0.8" opacity="0.7" />
        {/* cross ribs */}
        <path d="M300 92 C260 170 190 300 120 388" strokeWidth="0.8" opacity="0.6" />
        <path d="M348 100 C320 190 240 320 150 398" strokeWidth="0.8" opacity="0.5" />
        <path d="M240 110 C210 200 160 300 100 380" strokeWidth="0.7" opacity="0.5" />
      </g>

      {/* main leading-edge spar (blue) */}
      <path d="M78 384 C70 250 138 138 300 100" fill="none" stroke="#3157E3" strokeWidth="1.6" opacity="0.9" />

      {/* small metal attachments along the root */}
      <g fill="#69788A" stroke="#111827" strokeWidth="0.8">
        <rect x="72" y="366" width="12" height="10" rx="1.5" />
        <rect x="86" y="392" width="12" height="10" rx="1.5" transform="rotate(20 92 397)" />
        <rect x="118" y="402" width="12" height="10" rx="1.5" transform="rotate(28 124 407)" />
      </g>

      {/* copper joint at the root articulation */}
      <circle cx="82" cy="384" r="6" fill="#252B33" stroke="#111827" strokeWidth="1" />
      <circle cx="82" cy="384" r="2.6" fill="#C66A3D" />

      {/* faint tip waypoints */}
      <circle cx="372" cy="118" r="2.4" fill="#3157E3" opacity="0.8" />
      <circle cx="388" cy="150" r="2" fill="#3157E3" opacity="0.6" />
    </svg>
  );
}
