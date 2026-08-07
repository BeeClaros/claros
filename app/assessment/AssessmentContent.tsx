"use client";

import PhaseSection from "../v8/components/phase/PhaseSection";

const DELIVERABLES = [
  {
    title: "Current AI activity",
    copy: "A clear map of existing initiatives, tools and experiments across the organisation.",
  },
  {
    title: "High-value opportunities",
    copy: "Ranked by business impact, feasibility and alignment with strategic priorities.",
  },
  {
    title: "Readiness and dependencies",
    copy: "What needs to be in place - data, systems, skills, governance - before each opportunity can move forward.",
  },
  {
    title: "Risks and responsibilities",
    copy: "Security, compliance and ethical considerations addressed upfront, not as an afterthought.",
  },
  {
    title: "Implementation roadmap",
    copy: "A practical plan with clear sequencing, ownership and milestones - ready to execute.",
  },
];

const PROCESS = [
  {
    num: "01",
    title: "Stakeholder interviews",
    copy: "We speak with leadership, operational teams and technical staff to understand priorities, pain points and existing initiatives.",
  },
  {
    num: "02",
    title: "Process mapping",
    copy: "We map key workflows to identify where time is lost, decisions are delayed and AI could have the strongest impact.",
  },
  {
    num: "03",
    title: "Opportunity scoring",
    copy: "Each opportunity is evaluated on business value, technical feasibility and organisational readiness.",
  },
  {
    num: "04",
    title: "Roadmap delivery",
    copy: "You receive a clear assessment report with prioritised recommendations and a practical path forward.",
  },
];

function HexMark() {
  return (
    <svg
      width="18"
      height="20"
      viewBox="0 0 18 20"
      aria-hidden="true"
      style={{ flexShrink: 0, marginTop: 3 }}
    >
      <path
        d="M9 1.5 L16 5.5 L16 13"
        fill="none"
        stroke="var(--v8-lime)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M16 13 L9 18.5 L2 14.5 L2 6"
        fill="none"
        stroke="var(--v8-line-strong)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function AssessmentContent() {
  return (
    <>
      <PhaseSection
        tone="secondary"
        imageSrc="/v8/bg-hive.png"
        imageSide="right"
        imageOpacity={0.42}
      >
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{ maxWidth: "14ch", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            What you leave with
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{ marginTop: "1.25rem", maxWidth: "34rem" }}
          >
            A clear picture of where value is - and a practical path to capture it.
          </p>
        </div>

        <div className="phase-list" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)", maxWidth: "40rem" }}>
          {DELIVERABLES.map((item, i) => (
            <div
              key={item.title}
              className={`phase-list-item v8-reveal v8-reveal-${(i % 5) + 1}`}
            >
              <HexMark />
              <div>
                <h3
                  className="v8-display"
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--v8-text-primary)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="v8-body"
                  style={{ marginTop: "0.45rem", fontSize: "0.95rem" }}
                >
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PhaseSection>

      <PhaseSection tone="dark">
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{
              color: "var(--v8-on-dark-primary)",
              maxWidth: "12ch",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            How it works
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{
              marginTop: "1.25rem",
              maxWidth: "34rem",
              color: "var(--v8-on-dark-secondary)",
            }}
          >
            A focused engagement - typically 2 to 4 weeks - that moves fast
            without cutting corners.
          </p>
        </div>

        <div className="phase-process">
          {PROCESS.map((step, i) => (
            <div
              key={step.num}
              className={`phase-process-card v8-reveal v8-reveal-${(i % 4) + 1}`}
            >
              <span
                className="v8-num"
                style={{ color: "var(--v8-lime)", fontSize: "0.75rem" }}
              >
                {step.num}
              </span>
              <h3
                className="v8-display"
                style={{
                  marginTop: "0.7rem",
                  fontSize: "1.25rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v8-on-dark-primary)",
                }}
              >
                {step.title}
              </h3>
              <p
                className="v8-body"
                style={{
                  marginTop: "0.55rem",
                  fontSize: "0.95rem",
                  color: "var(--v8-on-dark-secondary)",
                }}
              >
                {step.copy}
              </p>
            </div>
          ))}
        </div>
      </PhaseSection>

      <style>{`
        .phase-list {
          display: grid;
          gap: 0;
        }
        .phase-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          padding: clamp(1.15rem, 2vw, 1.6rem) 0;
          border-top: 1px solid var(--v8-line);
        }
        .phase-list-item:last-child {
          border-bottom: 1px solid var(--v8-line);
        }
        .phase-process {
          margin-top: clamp(3rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.5rem, 3vw, 2.5rem);
        }
        .phase-process-card {
          padding: clamp(1.5rem, 2.5vw, 2rem);
          border: 1px solid var(--v8-on-dark-line);
          border-radius: 2px;
          transition: border-color 250ms var(--v8-ease), background 250ms var(--v8-ease);
        }
        .phase-process-card:hover {
          border-color: var(--v8-lime);
          background: rgba(199, 240, 0, 0.04);
        }
        @media (max-width: 720px) {
          .phase-process { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
