"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type Tone = "primary" | "secondary" | "contrast" | "dark";

const BG: Record<Tone, string> = {
  primary: "var(--v8-bg-primary)",
  secondary: "var(--v8-bg-secondary)",
  contrast: "var(--v8-bg-contrast)",
  dark: "var(--v8-bg-dark)",
};

type Props = {
  tone?: Tone;
  children: ReactNode;
  imageSrc?: string;
  imageSide?: "left" | "right";
  imageOpacity?: number;
  className?: string;
  style?: CSSProperties;
};

export default function PhaseSection({
  tone = "primary",
  children,
  imageSrc,
  imageSide = "right",
  imageOpacity = 0.5,
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);
  const isDark = tone === "dark";

  return (
    <section
      ref={ref}
      className={`v8-section ${isDark ? "v8-section-dark" : ""} ${className}`}
      style={{
        background: BG[tone],
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {imageSrc ? (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: imageSide === "right" ? 0 : "auto",
            left: imageSide === "left" ? 0 : "auto",
            width: "min(48%, 560px)",
            height: "100%",
            opacity: imageOpacity,
            maskImage:
              imageSide === "right"
                ? "linear-gradient(to left, black 25%, transparent 100%)"
                : "linear-gradient(to right, black 25%, transparent 100%)",
            WebkitMaskImage:
              imageSide === "right"
                ? "linear-gradient(to left, black 25%, transparent 100%)"
                : "linear-gradient(to right, black 25%, transparent 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="48vw"
            style={{
              objectFit: "cover",
              objectPosition: imageSide === "right" ? "left center" : "right center",
            }}
          />
        </div>
      ) : null}

      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        {children}
      </div>
    </section>
  );
}
