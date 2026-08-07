interface PartnershipMarkProps {
  height?: number;
  width?: number | string;
  className?: string;
  priority?: boolean;
  alt?: string;
}

/** Shared partnership mark - sketch mask from `/v10/partnership-together.png`. */
export default function PartnershipMark({
  height = 52,
  width,
  className = "",
  alt = "CLAROS",
}: PartnershipMarkProps) {
  const size =
    typeof width === "string"
      ? { width, height: "auto" as const }
      : { width: width ?? height, height: width ? ("auto" as const) : height };

  return (
    <span
      className={`v10-partnership-mark ${className}`}
      style={{
        display: "inline-flex",
        flexShrink: 0,
        lineHeight: 0,
        ...size,
      }}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
      aria-hidden={!alt}
    >
      <div className="v10-sketch-mask v10-sketch-mask--mark v10-sketch-mask--on-light" />
    </span>
  );
}
