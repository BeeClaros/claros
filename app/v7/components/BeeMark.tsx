"use client";

import Image from "next/image";

/** Small brand mark - same generated mechanical bee, transparent PNG. */
export default function BeeMark({ size = 30 }: { size?: number }) {
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
        width: size,
        height: size,
        flexShrink: 0,
      }}
    >
      <Image
        src="/v7/bee-symbol.png"
        alt="CLAROS"
        fill
        unoptimized
        sizes={`${size}px`}
        style={{ objectFit: "contain", background: "transparent" }}
      />
    </span>
  );
}
