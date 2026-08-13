"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

export default function BrandStatement() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="contact"
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
          opacity: 0.52,
          mixBlendMode: "multiply",
          maskImage: "linear-gradient(to left, black 0%, black 18%, transparent 58%)",
          WebkitMaskImage: "linear-gradient(to left, black 0%, black 18%, transparent 58%)",
        }}
      >
        <Image
          src="/v8/bg-swarm.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "right center" }}
        />
      </div>

      <div className="v8-container" style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: "38ch", marginLeft: "clamp(0rem, 6vw, 4.5rem)" }}>
          <h2
            className="v8-hero-title v8-reveal"
            style={{
              color: "var(--v8-text-primary)",
              fontSize: "clamp(2.25rem, 5vw, 4.25rem)",
            }}
          >
            Real value starts when the whole business moves together.
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-2"
            style={{
              marginTop: "2rem",
              maxWidth: "40rem",
              color: "var(--v8-text-primary)",
              opacity: 0.82,
            }}
          >
            AI creates more value when technology, people and processes move in
            the same direction.
          </p>

          <div className="v8-reveal v8-reveal-3" style={{ marginTop: "2.5rem" }}>
            <a
              href="mailto:hello@beeclaros.com"
              className="v8-btn-dark"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              Talk to us <span className="v8-arrow">&rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
