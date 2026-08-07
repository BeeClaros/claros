"use client";

import { useId } from "react";

interface ModularStructureProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ModularStructure - an abstract, partially-built modular structure.
 * Irregular cells (never repeated perfect hexagons), some open, links
 * between pieces, ivory + titanium surfaces, blue lines, small copper
 * points, subtle depth. One or two bees carry small modules.
 *
 * "Systems are built piece by piece."
 */
export default function ModularStructure({
  className = "",
  style,
}: ModularStructureProps) {
  const uid = useId().replace(/:/g, "");
  const face = `face-${uid}`;
  const faceOpen = `faceOpen-${uid}`;

  // Irregular quad cells (built), and open cells (outline only).
  const built: string[] = [
    "M120 210 L200 190 L232 258 L156 286 Z",
    "M232 258 L200 190 L286 168 L318 232 Z",
    "M156 286 L232 258 L268 330 L188 360 Z",
    "M318 232 L286 168 L372 156 L398 220 Z",
    "M268 330 L232 258 L318 232 L352 300 Z",
  ];
  const open: string[] = [
    "M352 300 L318 232 L398 220 L430 290 Z",
    "M398 220 L372 156 L452 150 L478 214 Z",
    "M188 360 L268 330 L300 398 L224 424 Z",
    "M352 300 L268 330 L300 398 L384 372 Z",
  ];

  return (
    <svg
      viewBox="0 0 560 480"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: "block", ...style }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={face} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#EFECE3" />
          <stop offset="100%" stopColor="#DAD5C8" />
        </linearGradient>
        <linearGradient id={faceOpen} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b98a8" />
          <stop offset="100%" stopColor="#69788A" />
        </linearGradient>
      </defs>

      {/* built cells (filled ivory) */}
      <g stroke="#111827" strokeWidth="1.2">
        {built.map((d, i) => (
          <path key={i} d={d} fill={`url(#${face})`} />
        ))}
      </g>

      {/* one titanium module, being set in place */}
      <path d="M318 232 L286 168 L372 156 L398 220 Z" fill={`url(#${faceOpen})`} stroke="#111827" strokeWidth="1.2" opacity="0.92" />

      {/* open / unbuilt cells (outline only, dashed links) */}
      <g fill="none" stroke="#5E6875" strokeWidth="1.1" opacity="0.7">
        {open.map((d, i) => (
          <path key={i} d={d} strokeDasharray={i % 2 === 0 ? "5 5" : undefined} />
        ))}
      </g>

      {/* blue connection lines (completed links) */}
      <g stroke="#3157E3" strokeWidth="1.4" fill="none" opacity="0.85">
        <path d="M232 258 L318 232" />
        <path d="M200 190 L286 168" />
        <path d="M232 258 L268 330" />
      </g>

      {/* copper points at active joints */}
      <g fill="#C66A3D">
        <circle cx="232" cy="258" r="3.4" />
        <circle cx="318" cy="232" r="3" />
        <circle cx="268" cy="330" r="2.6" />
      </g>

      {/* a bee carrying a small module */}
      <g transform="translate(430 120) rotate(18)">
        <rect x="-8" y="16" width="18" height="16" rx="2" fill={`url(#${faceOpen})`} stroke="#111827" strokeWidth="1" />
        <line x1="0" y1="10" x2="0" y2="16" stroke="#5E6875" strokeWidth="1" />
        <path d="M4 -3 C14 -14 28 -12 28 -3 C28 5 14 8 5 3 Z" fill="rgba(231,237,245,0.4)" stroke="#758397" strokeWidth="0.8" />
        <path d="M-4 -3 C-14 -14 -28 -12 -28 -3 C-28 5 -14 8 -5 3 Z" fill="rgba(231,237,245,0.4)" stroke="#758397" strokeWidth="0.8" />
        <ellipse cx="0" cy="4" rx="5" ry="12" fill="#162033" />
        <circle cx="0" cy="-8" r="4" fill="#162033" />
        <circle cx="0" cy="2" r="2" fill="#C66A3D" />
      </g>

      {/* faint depth cell behind */}
      <path d="M120 210 L200 190 L232 258 L156 286 Z" fill="none" stroke="#C9C5BA" strokeWidth="1" opacity="0.5" transform="translate(-18 -22)" />
    </svg>
  );
}
