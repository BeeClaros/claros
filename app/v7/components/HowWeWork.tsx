"use client";

import { useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "../hooks/useScrollReveal";

const PRINCIPLES = [
  {
    title: "Business first",
    body: "Every initiative starts with a real business need.",
  },
  {
    title: "Practical delivery",
    body: "Solutions must work inside existing operations.",
  },
  {
    title: "People included",
    body: "Adoption is designed with the teams who will use the solution.",
  },
  {
    title: "Safe foundations",
    body: "Ownership, security and accountability are built in from the start.",
  },
];

export default function HowWeWork() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="how-we-work"
      className="hv-section"
      style={{ background: "var(--hv-bg-primary)", position: "relative", overflow: "hidden" }}
    >
      <div className="hv-container">
        <div className="hv-grid" style={{ rowGap: "3.5rem", alignItems: "center" }}>
          {/* Left: message */}
          <div className="hww-left">
            <div className="hv-overline hv-reveal">How we work</div>
            <h2 className="hv-section-title hv-reveal hv-reveal-1" style={{ marginTop: "1.5rem" }}>
              Human direction.{" "}
              <span className="hv-accent-text">AI capability.</span>
            </h2>
            <p className="hv-statement hv-reveal hv-reveal-2" style={{ marginTop: "1.75rem", maxWidth: "30rem", fontSize: "clamp(1.35rem, 2.2vw, 1.75rem)" }}>
              Technology should extend what people can do, not remove them from
              the process.
            </p>
            <p className="hv-lead hv-reveal hv-reveal-3" style={{ marginTop: "1.5rem", maxWidth: "32rem" }}>
              We work with internal teams to combine business knowledge, human
              judgement and the capabilities of AI.
            </p>
          </div>

          {/* Right: large bee leading an ordered formation (generated) */}
          <div className="hww-visual hv-reveal hv-reveal-2" aria-hidden="true">
            <div
              style={{
                position: "absolute",
                inset: 0,
                maskImage:
                  "radial-gradient(ellipse 78% 82% at 55% 50%, black 30%, transparent 82%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 78% 82% at 55% 50%, black 30%, transparent 82%)",
              }}
            >
              <Image
                src="/v7/bg-swarm.png"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
          </div>
        </div>

        {/* Four principles */}
        <div className="hv-grid hww-principles" style={{ marginTop: "clamp(3.5rem, 7vw, 5.5rem)" }}>
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.title}
              className={`hww-principle hv-reveal hv-reveal-${i + 1}`}
            >
              <div
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "var(--hv-accent)",
                  marginBottom: "1.25rem",
                }}
              />
              <h3
                style={{
                  fontFamily: "var(--font-hv-display), sans-serif",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  color: "var(--hv-text-primary)",
                  margin: "0 0 0.6rem",
                }}
              >
                {p.title}
              </h3>
              <p className="hv-body" style={{ fontSize: "0.9375rem" }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hww-left { grid-column: 1 / 7; }
        .hww-visual { grid-column: 7 / -1; position: relative; min-height: clamp(240px, 32vw, 360px); }
        .hww-principle {
          grid-column: span 3;
          border-top: 1px solid var(--hv-line-soft);
          padding-top: 1.5rem;
        }
        @media (max-width: 900px) {
          .hww-left { grid-column: 1 / -1; }
          .hww-visual { grid-column: 1 / -1; min-height: 260px; }
          .hww-principle { grid-column: span 6; }
        }
        @media (max-width: 520px) {
          .hww-principle { grid-column: 1 / -1; }
        }
      `}</style>
    </section>
  );
}
