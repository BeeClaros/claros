"use client";

import { useScroll, useSpring, useTransform } from "framer-motion";
import FlyingBeeMark from "./FlyingBeeMark.original";

interface BeeLogoProps {
  height?: number;
  width?: number | string;
  className?: string;
  alt?: string;
  onDark?: boolean;
  /** Drive wing-flap and body bob from page scroll. */
  scrollDrive?: boolean;
}

/** CLAROS lockup - bee mark forms the O; scroll-driven wing flap. */
export default function BeeLogo({
  height = 36,
  width,
  className = "",
  alt = "CLAROS",
  onDark = false,
  scrollDrive = true,
}: BeeLogoProps) {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });
  const progress = useTransform(smooth, [0, 1], [0, 1]);

  // Bee sized to read as the O - slightly taller than the type so body fills the slot
  const beeSize =
    typeof width === "number"
      ? width
      : typeof width === "string"
        ? width
        : Math.round(height * 1.15);

  return (
    <span
      className={`v8-bee-visual v8-claros-lockup ${onDark ? "v8-claros-lockup--dark" : ""} ${className}`}
      style={{
        display: "inline-flex",
        flexShrink: 0,
        alignItems: "center",
        lineHeight: 1,
        height,
        fontSize: height * 0.72,
      }}
      title={alt}
      role="img"
      aria-label={alt}
    >
      <span className="v8-claros-letters" aria-hidden="true">
        CLAR
      </span>
      <FlyingBeeMark
        size={beeSize}
        progress={scrollDrive ? progress : undefined}
        tone={onDark ? "dark" : "light"}
        laps={10}
      />
      <span className="v8-claros-letters" aria-hidden="true">
        S
      </span>
    </span>
  );
}
