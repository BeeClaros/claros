"use client";

interface BeeLogoProps {
  height?: number;
  width?: number | string;
  className?: string;
  alt?: string;
  onDark?: boolean;
  /** Kept for API compat; unused. */
  scrollDrive?: boolean;
}

/** CLAROS — hex sits on a ghost O so metrics match the typeface. */
export default function BeeLogo({
  height = 28,
  className = "",
  alt = "CLAROS",
  onDark = false,
}: BeeLogoProps) {
  const fontSize = height * 0.82;

  return (
    <span
      className={`v8-logo-mark ${onDark ? "v8-logo-mark--on-dark" : ""} ${className}`}
      style={{
        display: "inline-flex",
        flexShrink: 0,
        alignItems: "center",
        lineHeight: 1,
        height,
        fontSize,
      }}
      title={alt}
      role="img"
      aria-label={alt}
    >
      <span className="v8-logo-word" aria-hidden="true">
        CLAR
        <span className="v8-logo-o">
          <span className="v8-logo-o-ghost">O</span>
          <svg
            className="v8-logo-hex"
            viewBox="4.2 2.2 27.6 31.6"
            fill="none"
          >
            <path
              d="M18 3 L31 10.5 L31 25.5 L18 33 L5 25.5 L5 10.5 Z"
              stroke="currentColor"
              strokeWidth="5.35"
              strokeLinejoin="round"
            />
            <circle cx="18" cy="18" r="3.4" fill="var(--v8-lime)" />
          </svg>
        </span>
        S
      </span>
    </span>
  );
}
