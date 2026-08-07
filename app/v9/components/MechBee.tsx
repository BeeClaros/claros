"use client";

import { useId } from "react";

type BeeVariant = "symbol" | "hero" | "icon";
type BeeTone = "color" | "night" | "white" | "line";

interface MechBeeProps {
  variant?: BeeVariant;
  /** color = full palette · night = solid night-blue · white = for dark bg · line = outline only */
  tone?: BeeTone;
  animate?: boolean;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}

/**
 * MechBee - an abstract, aerodynamic mechanical bee: part insect, part
 * navigation instrument. Three main modules, visible articulations,
 * technical wings, night-blue body, titanium plates, one copper detail.
 *
 *  variant="symbol" → top-down, symmetric (logo / marks)
 *  variant="hero"   → three-quarter side view, in controlled flight
 *  variant="icon"   → reduced mark: body + 2 wings + direction line + copper dot
 *
 * Transparent by design. Matte, technical finish. Crisp at any size.
 */
export default function MechBee({
  variant = "symbol",
  tone = "color",
  animate = false,
  size,
  className = "",
  style,
  title,
}: MechBeeProps) {
  const uid = useId().replace(/:/g, "");
  const gBody = `body-${uid}`;
  const gPlate = `plate-${uid}`;
  const gWing = `wing-${uid}`;

  const isIcon = variant === "icon";
  const isHero = variant === "hero";

  const resolvedSize =
    size ?? (isHero ? "min(540px, 84vw)" : isIcon ? 30 : 120);

  // Palette resolution per tone.
  const mono = tone === "night" || tone === "white" || tone === "line";
  const monoColor = tone === "white" ? "#FCFCF8" : "#162033";
  const isLine = tone === "line";

  const c = {
    body: mono ? (isLine ? "none" : monoColor) : `url(#${gBody})`,
    plate: mono ? (isLine ? "none" : monoColor) : `url(#${gPlate})`,
    graphite: mono ? (isLine ? "none" : monoColor) : "#252B33",
    stroke: mono ? monoColor : "#111827",
    plateStroke: mono ? monoColor : "#3a465a",
    line: mono ? monoColor : "#758397",
    blue: mono ? monoColor : "#3157E3",
    copper: mono ? (isLine ? monoColor : monoColor) : "#C66A3D",
    wingFill: mono
      ? (isLine ? "none" : tone === "white" ? "rgba(252,252,248,0.10)" : "rgba(22,32,51,0.06)")
      : "rgba(231,237,245,0.42)",
    wingStroke: mono ? monoColor : "#758397",
    vein: mono ? monoColor : "rgba(117,131,151,0.7)",
  };

  const strokeW = isLine ? 1.6 : 1.4;

  const commonProps = {
    width: resolvedSize,
    height: resolvedSize,
    viewBox: isIcon ? "0 0 120 120" : isHero ? "0 0 460 360" : "0 0 240 260",
    role: "img" as const,
    "aria-label": title,
    "aria-hidden": title ? undefined : true,
    className: `${animate ? "ae-bee ae-bee--live" : "ae-bee"} ${className}`,
    style,
    xmlns: "http://www.w3.org/2000/svg",
  };

  const defs = mono ? null : (
    <defs>
      <linearGradient id={gBody} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1c2942" />
        <stop offset="55%" stopColor="#162033" />
        <stop offset="100%" stopColor="#0f1626" />
      </linearGradient>
      <linearGradient id={gPlate} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#7d8da0" />
        <stop offset="100%" stopColor="#586778" />
      </linearGradient>
      <linearGradient id={gWing} x1="0" y1="0" x2="0.4" y2="1">
        <stop offset="0%" stopColor="#eef3fa" stopOpacity="0.55" />
        <stop offset="100%" stopColor="#dbe4f0" stopOpacity="0.28" />
      </linearGradient>
    </defs>
  );

  /* ── Simplified icon ─────────────────────────────────────────── */
  if (isIcon) {
    return (
      <svg {...commonProps}>
        {defs}
        {/* two wings */}
        <g
          className={animate ? "ae-bee-wing-r" : undefined}
          fill={c.wingFill}
          stroke={c.wingStroke}
          strokeWidth={2}
        >
          <path d="M63 46 C84 30 106 32 112 44 C114 55 92 64 73 60 C65 58 61 52 63 46 Z" />
        </g>
        <g
          className={animate ? "ae-bee-wing-l" : undefined}
          fill={c.wingFill}
          stroke={c.wingStroke}
          strokeWidth={2}
        >
          <path d="M57 46 C36 30 14 32 8 44 C6 55 28 64 47 60 C55 58 59 52 57 46 Z" />
        </g>

        {/* body: head + thorax + tapered abdomen */}
        <circle cx="60" cy="36" r="9" fill={c.plate} stroke={c.stroke} strokeWidth={1.5} />
        <path
          d="M47 50 C43 74 51 96 60 112 C69 96 77 74 73 50 C67 45 53 45 47 50 Z"
          fill={c.body}
          stroke={c.stroke}
          strokeWidth={1.5}
        />
        {/* direction line */}
        <line x1="60" y1="30" x2="60" y2="108" stroke={c.blue} strokeWidth={1.6} opacity={0.85} />
        {/* copper dot */}
        <circle cx="60" cy="62" r="3.4" fill={c.copper} />
      </svg>
    );
  }

  /* ── Three-quarter side view (hero) ──────────────────────────── */
  if (isHero) {
    return (
      <svg {...commonProps}>
        {defs}

        {/* wings (behind, partially open, swept up-back) */}
        <g
          className={animate ? "ae-bee-wing-r" : undefined}
          fill={mono ? c.wingFill : `url(#${gWing})`}
          stroke={c.wingStroke}
          strokeWidth={strokeW}
        >
          <path d="M232 150 C196 92 128 60 96 74 C82 80 96 132 168 158 C202 170 226 168 232 150 Z" />
          <path d="M234 96 C222 84 214 78 210 72" fill="none" stroke={c.vein} strokeWidth={1} opacity={0.7} />
          <path d="M150 118 C168 108 190 104 214 106" fill="none" stroke={c.vein} strokeWidth={0.9} opacity={0.6} />
          <path d="M132 138 C158 132 188 134 214 132" fill="none" stroke={c.vein} strokeWidth={0.9} opacity={0.5} />
        </g>
        <g
          className={animate ? "ae-bee-wing-l" : undefined}
          fill={mono ? c.wingFill : `url(#${gWing})`}
          stroke={c.wingStroke}
          strokeWidth={strokeW}
          opacity={0.82}
        >
          <path d="M236 156 C214 104 166 74 138 84 C122 90 138 140 196 162 C220 170 232 170 236 156 Z" />
        </g>

        {/* legs (fine articulated lines under body) */}
        <g stroke={c.line} strokeWidth={1.4} fill="none" strokeLinecap="round" opacity={0.8}>
          <path d="M196 214 L182 248 L166 258" />
          <path d="M222 218 L216 252 L200 266" />
          <path d="M250 214 L252 250 L240 264" />
        </g>

        {/* abdomen (rear-left, tapered, segmented) */}
        <path
          d="M96 196 C78 190 70 206 74 222 C80 244 120 232 158 224 C192 217 210 210 208 196 C206 182 168 178 140 182 C120 185 108 190 96 196 Z"
          fill={c.body}
          stroke={c.stroke}
          strokeWidth={strokeW}
        />
        {/* abdomen segment lines */}
        <g stroke={c.line} strokeWidth={1} fill="none" opacity={0.55}>
          <path d="M120 186 C118 202 120 214 128 226" />
          <path d="M150 183 C150 200 152 212 160 223" />
          <path d="M180 184 C182 199 184 208 190 216" />
        </g>
        {/* ultramarine dorsal accent */}
        <path d="M118 188 C150 182 180 182 206 194" fill="none" stroke={c.blue} strokeWidth={2} opacity={0.9} />

        {/* thorax (main module) */}
        <path
          d="M198 174 C198 154 214 142 234 142 C258 142 276 156 276 178 C276 200 258 214 236 214 C214 214 198 200 198 174 Z"
          fill={c.plate}
          stroke={c.stroke}
          strokeWidth={strokeW}
        />
        {/* thorax inner plate line */}
        <path d="M212 160 C228 154 248 156 264 168" fill="none" stroke={c.plateStroke} strokeWidth={1.2} opacity={0.8} />
        {/* wing-root joints */}
        <circle cx="230" cy="150" r="4" fill={c.graphite} stroke={c.stroke} strokeWidth={1} />
        <circle cx="230" cy="150" r="1.6" fill={c.copper} />

        {/* neck articulation */}
        <rect x="272" y="164" width="18" height="18" rx="2" fill={c.graphite} stroke={c.stroke} strokeWidth={1} transform="rotate(-14 281 173)" />

        {/* head (front-right module, tilted forward) */}
        <path
          d="M286 158 C286 144 298 136 312 136 C328 136 340 146 340 162 C340 178 328 188 312 188 C297 188 286 176 286 158 Z"
          fill={c.body}
          stroke={c.stroke}
          strokeWidth={strokeW}
        />
        {/* head sensor band */}
        <path d="M300 150 C312 146 326 148 336 158" fill="none" stroke={c.line} strokeWidth={1.4} opacity={0.85} />
        {/* eye - matte, not luminous */}
        <ellipse cx="322" cy="164" rx="6" ry="7.5" fill={c.graphite} stroke={c.stroke} strokeWidth={1} transform="rotate(12 322 164)" />

        {/* antennae */}
        <g stroke={c.line} strokeWidth={1.6} fill="none" strokeLinecap="round">
          <path d="M330 142 C346 126 356 116 366 110" />
          <path d="M322 138 C336 120 344 108 352 100" />
        </g>
        <circle cx="366" cy="109" r="2.6" fill={c.blue} />
        <circle cx="352" cy="99" r="2.6" fill={c.blue} />
      </svg>
    );
  }

  /* ── Top-down symbol (logo) ──────────────────────────────────── */
  return (
    <svg {...commonProps}>
      {defs}

      {/* wings (behind, open, symmetric) */}
      <g
        className={animate ? "ae-bee-wing-r" : undefined}
        fill={mono ? c.wingFill : `url(#${gWing})`}
        stroke={c.wingStroke}
        strokeWidth={strokeW}
      >
        <path d="M128 92 C160 56 212 46 228 62 C234 70 214 110 170 122 C150 128 132 114 128 92 Z" />
        <path d="M128 112 C154 106 192 116 200 136 C204 148 176 158 152 149 C138 144 128 128 128 112 Z" />
        <path d="M132 94 C166 76 196 70 220 68" fill="none" stroke={c.vein} strokeWidth={1} opacity={0.7} />
        <path d="M132 100 C162 96 190 100 208 112" fill="none" stroke={c.vein} strokeWidth={0.8} opacity={0.55} />
      </g>
      <g
        className={animate ? "ae-bee-wing-l" : undefined}
        fill={mono ? c.wingFill : `url(#${gWing})`}
        stroke={c.wingStroke}
        strokeWidth={strokeW}
      >
        <path d="M112 92 C80 56 28 46 12 62 C6 70 26 110 70 122 C90 128 108 114 112 92 Z" />
        <path d="M112 112 C86 106 48 116 40 136 C36 148 64 158 88 149 C102 144 112 128 112 112 Z" />
        <path d="M108 94 C74 76 44 70 20 68" fill="none" stroke={c.vein} strokeWidth={1} opacity={0.7} />
        <path d="M108 100 C78 96 50 100 32 112" fill="none" stroke={c.vein} strokeWidth={0.8} opacity={0.55} />
      </g>

      {/* legs */}
      <g stroke={c.line} strokeWidth={1.3} fill="none" opacity={0.7} strokeLinecap="round">
        <path d="M138 108 L162 122" />
        <path d="M139 116 L160 138" />
        <path d="M102 108 L78 122" />
        <path d="M101 116 L80 138" />
      </g>

      {/* antennae */}
      <g stroke={c.line} strokeWidth={1.5} fill="none" strokeLinecap="round">
        <path d="M112 52 C104 40 100 33 97 27" />
        <path d="M128 52 C136 40 140 33 143 27" />
      </g>
      <circle cx="97" cy="26" r="2.6" fill={c.blue} />
      <circle cx="143" cy="26" r="2.6" fill={c.blue} />

      {/* head (module 1) */}
      <path
        d="M104 54 C104 45 111 40 120 40 C129 40 136 45 136 54 C136 66 129 74 120 74 C111 74 104 66 104 54 Z"
        fill={c.plate}
        stroke={c.stroke}
        strokeWidth={strokeW}
      />
      <line x1="108" y1="58" x2="132" y2="58" stroke={c.line} strokeWidth={1} opacity={0.7} />

      {/* thorax (module 2) */}
      <path
        d="M104 86 L136 86 L146 100 L136 118 L104 118 L94 100 Z"
        fill={c.plate}
        stroke={c.stroke}
        strokeWidth={strokeW}
      />
      <line x1="94" y1="100" x2="146" y2="100" stroke={c.line} strokeWidth={1} opacity={0.6} />
      {/* wing-root joints */}
      <circle cx="126" cy="96" r="3" fill={c.graphite} stroke={c.stroke} strokeWidth={0.8} />
      <circle cx="114" cy="96" r="3" fill={c.graphite} stroke={c.stroke} strokeWidth={0.8} />

      {/* abdomen (module 3, tapered, segmented) */}
      <path
        d="M104 120 C100 150 108 185 120 214 C132 185 140 150 136 120 Z"
        fill={c.body}
        stroke={c.stroke}
        strokeWidth={strokeW}
      />
      {/* segment lines */}
      <g stroke={c.line} strokeWidth={1} fill="none" opacity={0.6}>
        <path d="M107 150 C120 153 120 153 133 150" />
        <path d="M111 174 C120 176 120 176 129 174" />
        <path d="M115 196 C120 197 120 197 125 196" />
      </g>
      {/* dorsal direction line (ultramarine) */}
      <line x1="120" y1="42" x2="120" y2="212" stroke={c.blue} strokeWidth={1.4} opacity={mono ? 0.6 : 0.85} />
      {/* single copper identity point */}
      <circle cx="120" cy="132" r="3.4" fill={c.copper} />
    </svg>
  );
}
