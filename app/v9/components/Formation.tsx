"use client";

interface FormationProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Formation - 9-15 small mechanical bees flying in a diagonal formation,
 * different scales, one lead bee slightly ahead. Faint motion lines, no
 * scenery, no clouds. Coordinated, not chaotic.
 *
 * "Different roles. One direction."
 *
 * Rendered light for the ultramarine brand-message section.
 */
export default function Formation({ className = "", style }: FormationProps) {
  // Diagonal formation: (x, y, scale, isLead)
  const bees: [number, number, number, boolean][] = [
    [1050, 130, 1.35, true],
    [930, 210, 1.05, false],
    [980, 90, 0.8, false],
    [820, 180, 0.95, false],
    [860, 300, 0.85, false],
    [700, 260, 0.9, false],
    [740, 150, 0.7, false],
    [600, 330, 0.8, false],
    [560, 220, 0.72, false],
    [460, 300, 0.68, false],
    [420, 400, 0.62, false],
    [320, 360, 0.6, false],
    [220, 440, 0.55, false],
  ];

  const body = "#FCFCF8";
  const wing = "rgba(252,252,248,0.22)";
  const wingStroke = "rgba(252,252,248,0.55)";
  const copper = "#DF8A5B";

  return (
    <svg
      viewBox="0 0 1200 560"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      style={{ display: "block", ...style }}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* barely-there motion lines toward the lead */}
      <g stroke="rgba(252,252,248,0.16)" strokeWidth="1" fill="none">
        {bees.slice(1).map(([x, y], i) => (
          <path
            key={i}
            d={`M${x} ${y} C${(x + 1050) / 2 + 30} ${(y + 130) / 2} ${1050 - 60} ${140} ${1050} ${130}`}
            opacity={0.35}
          />
        ))}
      </g>

      {bees.map(([x, y, s, lead], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(-24) scale(${s})`} opacity={lead ? 1 : 0.9}>
          {/* wings */}
          <path d="M3 -4 C13 -15 26 -13 26 -4 C26 4 13 7 4 2 Z" fill={wing} stroke={wingStroke} strokeWidth="0.7" />
          <path d="M-3 -4 C-13 -15 -26 -13 -26 -4 C-26 4 -13 7 -4 2 Z" fill={wing} stroke={wingStroke} strokeWidth="0.7" />
          {/* body */}
          <circle cx="0" cy="-8" r="4" fill={body} />
          <ellipse cx="0" cy="6" rx="5" ry="13" fill={body} />
          {/* direction line + copper on the lead only */}
          {lead && <line x1="0" y1="-12" x2="0" y2="18" stroke={copper} strokeWidth="1.6" />}
          {lead && <circle cx="0" cy="4" r="2.4" fill={copper} />}
        </g>
      ))}
    </svg>
  );
}
