"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type Props = {
  title: string;
  lead: string;
  ctaLabel: string;
  ctaHref?: string;
  imageSrc?: string;
};

export default function PhaseCTA({
  title,
  lead,
  ctaLabel,
  ctaHref = "mailto:hello@beeclaros.com",
  imageSrc = "/v8/bg-swarm.png",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      className="v8-section"
      style={{
        background: "var(--v8-lime)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          opacity: 0.32,
          mixBlendMode: "multiply",
          maskImage:
            "linear-gradient(to left, black 0%, black 22%, transparent 62%)",
          WebkitMaskImage:
            "linear-gradient(to left, black 0%, black 22%, transparent 62%)",
        }}
      >
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
      </div>

      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{
              color: "var(--v8-text-primary)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
            }}
          >
            {title}
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{
              marginTop: "1.25rem",
              color: "var(--v8-text-primary)",
              opacity: 0.82,
            }}
          >
            {lead}
          </p>
          <div className="v8-reveal v8-reveal-2" style={{ marginTop: "2rem" }}>
            <a href={ctaHref} className="v8-btn-dark">
              {ctaLabel} <span className="v8-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
