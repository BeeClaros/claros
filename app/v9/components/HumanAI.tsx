"use client";

import { useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import ModularStructure from "./ModularStructure";

const PRINCIPLES = [
  { title: "Business first", text: "Every initiative starts with a real need." },
  { title: "People involved", text: "Solutions are shaped with the teams who use them." },
  { title: "Practical delivery", text: "The work must fit existing operations." },
  { title: "Clear responsibility", text: "Ownership and control are built in from the start." },
];

export default function HumanAI() {
  const ref = useRef<HTMLElement>(null);
  useScrollReveal(ref);

  return (
    <section
      ref={ref}
      id="about"
      className="ae-section"
      style={{ background: "var(--ae-bg-white)" }}
    >
      <div className="ae-container ae-grid" style={{ alignItems: "center", rowGap: "3.5rem" }}>
        {/* copy */}
        <div className="hai-copy" style={{ gridColumn: "1 / 7" }}>
          <span className="ae-reveal ae-overline">Human and AI collaboration</span>
          <h2 className="ae-reveal ae-section-title" style={{ marginTop: "1.5rem" }}>
            Human judgement gives technology direction.
          </h2>
          <p className="ae-reveal ae-lead" style={{ marginTop: "1.5rem", maxWidth: "34rem" }}>
            AI should extend what people can do, while people remain responsible
            for the decisions that matter.
          </p>

          <div className="hai-principles">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} className={`ae-reveal ae-reveal-${i + 1} hai-principle`}>
                <span
                  aria-hidden="true"
                  style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ae-copper)", marginTop: 8, flex: "none" }}
                />
                <div>
                  <h3 className="hai-title ae-display">{p.title}</h3>
                  <p className="ae-body" style={{ marginTop: "0.3rem", fontSize: "0.95rem" }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* modular structure */}
        <div className="ae-reveal ae-reveal-2 hai-art" aria-hidden="true" style={{ gridColumn: "7 / -1" }}>
          <ModularStructure style={{ width: "100%" }} />
        </div>
      </div>

      <div className="ae-container">
        <p className="ae-reveal ae-statement hai-statement">
          Technology adds capacity. People decide where it goes.
        </p>
      </div>

      <style>{`
        .hai-principles {
          margin-top: 2.25rem;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem 2rem;
          max-width: 34rem;
        }
        .hai-principle { display: flex; gap: 0.7rem; }
        .hai-title {
          font-size: 1.1rem; font-weight: 600; letter-spacing: -0.02em; color: var(--ae-text); margin: 0;
        }
        .hai-statement {
          margin-top: clamp(3rem, 6vw, 5rem);
          padding-top: clamp(2rem, 4vw, 3rem);
          border-top: 1px solid var(--ae-line);
          max-width: 40rem;
          color: var(--ae-text);
        }
        @media (max-width: 860px) {
          .hai-copy { grid-column: 1 / -1 !important; }
          .hai-art { grid-column: 1 / -1 !important; max-width: 460px; }
        }
        @media (max-width: 480px) {
          .hai-principles { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
