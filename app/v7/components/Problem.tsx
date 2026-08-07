"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const IDEAS = [
  {
    n: "01",
    title: "Too many disconnected ideas",
    body: "Experiments happen, but they do not work as one system.",
  },
  {
    n: "02",
    title: "No clear priority",
    body: "It is difficult to know what to do first and where value is real.",
  },
  {
    n: "03",
    title: "Limited adoption",
    body: "Solutions are introduced, but they do not become part of daily work.",
  },
];

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section ref={ref} id="problem" className="hv-section" style={{ position: "relative" }}>
      <div className="hv-container">
        <div className="hv-grid" style={{ alignItems: "end", rowGap: "2rem" }}>
          <div style={{ gridColumn: "1 / -1", maxWidth: "44rem" }} className="prob-head">
            <div className="hv-overline hv-reveal">The problem</div>
            <h2 className="hv-section-title hv-reveal hv-reveal-1" style={{ marginTop: "1.5rem" }}>
              AI activity is growing.{" "}
              <span className="hv-accent-text">Direction is often missing.</span>
            </h2>
            <p className="hv-lead hv-reveal hv-reveal-2" style={{ marginTop: "1.5rem", maxWidth: "40rem" }}>
              Teams are testing tools. New ideas appear every week. But without
              clear priorities, ownership and practical implementation, activity
              does not become business value.
            </p>
          </div>
        </div>

        {/* scattered → coordinated (generated) */}
        <div
          className="hv-reveal hv-reveal-2"
          style={{
            position: "relative",
            height: "clamp(200px, 30vw, 340px)",
            marginTop: "clamp(2.5rem, 5vw, 4rem)",
            marginBottom: "clamp(2rem, 4vw, 3.5rem)",
            borderTop: "1px solid var(--hv-line-soft)",
            borderBottom: "1px solid var(--hv-line-soft)",
            overflow: "hidden",
          }}
        >
          <Image
            src="/v7/bg-movement.png"
            alt="Isolated mechanical bees gradually entering a coordinated formation"
            fill
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <span
            className="hv-label"
            style={{
              position: "absolute",
              left: 0,
              bottom: "0.75rem",
              color: "var(--hv-text-secondary)",
              zIndex: 1,
            }}
          >
            Isolated activity &rarr; coordinated formation
          </span>
        </div>

        {/* three ideas */}
        <div className="hv-grid" style={{ rowGap: 0 }}>
          {IDEAS.map((idea, i) => (
            <div
              key={idea.n}
              className={`hv-cell hv-reveal hv-reveal-${i + 1} prob-cell`}
            >
              <span className="hv-mono" style={{ color: "var(--hv-accent)", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
                {idea.n}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-hv-display), sans-serif",
                  fontSize: "clamp(1.15rem, 1.6vw, 1.375rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--hv-text-primary)",
                  margin: "0.75rem 0 0.6rem",
                }}
              >
                {idea.title}
              </h3>
              <p className="hv-body" style={{ fontSize: "1rem" }}>
                {idea.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .prob-cell { grid-column: span 4; padding-inline: 0; }
        .prob-cell + .prob-cell { }
        @media (min-width: 641px) {
          .prob-cell { padding-right: clamp(1rem, 3vw, 2.5rem); }
        }
        @media (max-width: 640px) {
          .prob-cell { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  );
}
