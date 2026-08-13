"use client";

import PhaseSection from "../v8/components/phase/PhaseSection";

const ADOPTION_ITEMS = [
  {
    title: "Outcome measurement",
    copy: "Clear metrics tied to business goals - not vanity dashboards. We track what matters and adjust based on real data.",
  },
  {
    title: "Team support",
    copy: "Ongoing guidance for the teams using new tools and workflows. We help teams identify issues early and resolve them before momentum stalls.",
  },
  {
    title: "Expansion planning",
    copy: "Once a solution works, we identify where the same approach can create value in other teams and processes.",
  },
];

const CULTURE_ITEMS = [
  {
    num: "01",
    title: "AI literacy programmes",
    copy: "Practical training tailored to each role - not generic workshops. Teams learn what AI can do for their specific work.",
  },
  {
    num: "02",
    title: "Hands-on workshops",
    copy: "Interactive sessions where teams apply AI tools to real business problems, building confidence through practice.",
  },
  {
    num: "03",
    title: "Change management",
    copy: "Structured support for the human side of transformation - communication, leadership alignment and feedback loops.",
  },
  {
    num: "04",
    title: "AI-confident teams",
    copy: "Help teams understand where AI improves their work, where human judgement remains essential and how to use AI responsibly and effectively.",
  },
];

const GOVERNANCE_ITEMS = [
  {
    title: "Ownership and accountability",
    copy: "Every AI system has a clear owner, defined responsibilities and an escalation path.",
  },
  {
    title: "Security and compliance",
    copy: "Data handling, access controls and regulatory requirements addressed at every stage - not bolted on later.",
  },
  {
    title: "Performance monitoring",
    copy: "Ongoing monitoring helps detect performance issues, drift and reliability concerns as systems evolve.",
  },
  {
    title: "Continuous improvement",
    copy: "Regular reviews to refine, retrain and expand AI solutions as the business evolves.",
  },
];

export default function DeliveryContent() {
  return (
    <>
      <PhaseSection
        tone="secondary"
        imageSrc="/v8/bg-hive.png"
        imageSide="right"
        imageOpacity={0.4}
      >
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{ maxWidth: "14ch", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Continuous Adoption
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{ marginTop: "1.25rem", maxWidth: "34rem" }}
          >
            We don&apos;t disappear after go-live. Adoption needs measurement,
            support and a clear path to expand.
          </p>
        </div>

        <div className="delivery-list" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)", maxWidth: "40rem" }}>
          {ADOPTION_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`delivery-list-item v8-reveal v8-reveal-${i + 1}`}
            >
              <span className="delivery-bar" aria-hidden="true" />
              <div>
                <h3
                  className="v8-display"
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--v8-text-primary)",
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="v8-body"
                  style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}
                >
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PhaseSection>

      <PhaseSection
        tone="dark"
        imageSrc="/v8/hero-hive-bg.png"
        imageSide="right"
        imageOpacity={0.16}
      >
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{
              color: "var(--v8-on-dark-primary)",
              maxWidth: "14ch",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            People &{" "}
            <span style={{ color: "var(--v8-lime)" }}>AI Culture</span>
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{
              marginTop: "1.25rem",
              maxWidth: "34rem",
              color: "var(--v8-on-dark-secondary)",
            }}
          >
            Technology alone does not create adoption. Teams need the skills,
            confidence and support to use AI effectively in their work.
          </p>
        </div>

        <div className="delivery-culture">
          {CULTURE_ITEMS.map((item, i) => (
            <div
              key={item.num}
              className={`delivery-culture-card v8-reveal v8-reveal-${(i % 4) + 1}`}
            >
              <span
                className="v8-num"
                style={{ color: "var(--v8-lime)", fontSize: "0.75rem" }}
              >
                {item.num}
              </span>
              <h3
                className="v8-display"
                style={{
                  marginTop: "0.7rem",
                  fontSize: "1.2rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v8-on-dark-primary)",
                }}
              >
                {item.title}
              </h3>
              <p
                className="v8-body"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.95rem",
                  color: "var(--v8-on-dark-secondary)",
                }}
              >
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </PhaseSection>

      <PhaseSection tone="contrast">
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{ maxWidth: "16ch", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Governance &amp; Accountability
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{ marginTop: "1.25rem", maxWidth: "34rem" }}
          >
            AI at scale requires clear ownership, security and continuous oversight.
          </p>
        </div>

        <div className="delivery-gov">
          {GOVERNANCE_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`delivery-gov-card v8-reveal v8-reveal-${(i % 4) + 1}`}
            >
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
                style={{ marginTop: "0.5rem", fontSize: "0.95rem" }}
              >
                {item.copy}
              </p>
            </div>
          ))}
        </div>
      </PhaseSection>

      <style>{`
        .delivery-list {
          display: grid;
          gap: 0;
        }
        .delivery-list-item {
          display: grid;
          grid-template-columns: 3px 1fr;
          gap: 1.25rem;
          padding: clamp(1.3rem, 2.2vw, 1.85rem) 0;
          border-top: 1px solid var(--v8-line);
        }
        .delivery-list-item:last-child {
          border-bottom: 1px solid var(--v8-line);
        }
        .delivery-bar {
          display: block;
          width: 3px;
          height: 100%;
          min-height: 3rem;
          background: var(--v8-lime);
          border-radius: 1px;
          align-self: stretch;
        }
        .delivery-culture {
          margin-top: clamp(3rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(1.5rem, 3vw, 2.5rem);
        }
        .delivery-culture-card {
          padding: clamp(1.5rem, 2.5vw, 2rem);
          border: 1px solid var(--v8-on-dark-line);
          border-radius: 2px;
          transition: border-color 250ms var(--v8-ease), background 250ms var(--v8-ease);
        }
        .delivery-culture-card:hover {
          border-color: var(--v8-lime);
          background: rgba(199, 240, 0, 0.04);
        }
        .delivery-gov {
          margin-top: clamp(2.5rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0 clamp(2rem, 4vw, 3.5rem);
        }
        .delivery-gov-card {
          padding: clamp(1.3rem, 2.2vw, 1.85rem) 0;
          border-top: 1px solid var(--v8-line);
          transition: border-color 250ms var(--v8-ease);
        }
        .delivery-gov-card:hover {
          border-top-color: var(--v8-lime);
        }
        @media (max-width: 720px) {
          .delivery-culture { grid-template-columns: 1fr; }
          .delivery-gov { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
