"use client";

import PhaseSection from "@/components/phase/PhaseSection";

const PRODUCT_ITEMS = [
  {
    title: "Product and system integration",
    copy: "AI capabilities embedded directly into existing products, platforms and business systems.",
  },
  {
    title: "Custom solutions",
    copy: "Purpose-built systems designed around your specific business logic and data.",
  },
  {
    title: "Existing system alignment",
    copy: "Solutions that work with your current infrastructure, not against it.",
  },
];

const PROCESS_ITEMS = [
  {
    title: "Operations",
    copy: "Reduce repetitive work and improve process visibility across teams.",
  },
  {
    title: "Finance",
    copy: "Accelerate analysis, reporting and internal decision-making.",
  },
  {
    title: "Customer service",
    copy: "Improve response quality and reduce handling time.",
  },
  {
    title: "Knowledge work",
    copy: "Help teams find, understand and use company information faster.",
  },
  {
    title: "Sales",
    copy: "Support research, preparation and follow-up at every stage.",
  },
  {
    title: "Risk and compliance",
    copy: "Create clearer controls, evidence and accountability.",
  },
];

const PRINCIPLES = [
  {
    num: "01",
    title: "Business first",
    copy: "Every initiative starts with a real business need - not a technology looking for a problem.",
  },
  {
    num: "02",
    title: "Practical delivery",
    copy: "Solutions are designed to work inside existing operations, systems and constraints.",
  },
  {
    num: "03",
    title: "People included",
    copy: "Adoption is designed with the teams who will use the solution, not after the fact.",
  },
  {
    num: "04",
    title: "Safe foundations",
    copy: "Ownership, security and accountability are built in from the start.",
  },
];

export default function BuildContent() {
  return (
    <>
      <PhaseSection
        tone="secondary"
        imageSrc="/images/hero-hive-bg.png"
        imageSide="right"
        imageOpacity={0.38}
      >
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{ maxWidth: "14ch", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Product Transformation
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{ marginTop: "1.25rem", maxWidth: "34rem" }}
          >
            AI built into the products, platforms and systems your customers
            and teams already use - not standalone experiments that never reach
            production.
          </p>
        </div>

        <div className="build-list" style={{ marginTop: "clamp(2.5rem, 5vw, 4rem)", maxWidth: "40rem" }}>
          {PRODUCT_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`build-list-item v8-reveal v8-reveal-${i + 1}`}
            >
              <span
                className="v8-num"
                style={{ color: "var(--v8-lime-deep)", fontSize: "0.75rem" }}
              >
                0{i + 1}
              </span>
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
                  style={{ marginTop: "0.45rem", fontSize: "0.95rem" }}
                >
                  {item.copy}
                </p>
              </div>
            </div>
          ))}
        </div>
      </PhaseSection>

      <PhaseSection tone="contrast">
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{ maxWidth: "14ch", fontSize: "clamp(2rem, 4vw, 3rem)" }}
          >
            Process Transformation
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{ marginTop: "1.25rem", maxWidth: "34rem" }}
          >
            Apply AI where it can reduce repetitive work, improve decisions and
            remove friction across priority business functions.
          </p>
        </div>

        <div className="build-grid">
          {PROCESS_ITEMS.map((item, i) => (
            <div
              key={item.title}
              className={`build-grid-card v8-reveal v8-reveal-${(i % 3) + 1}`}
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

      <PhaseSection
        tone="dark"
        imageSrc="/images/bg-hive.png"
        imageSide="right"
        imageOpacity={0.18}
      >
        <div style={{ maxWidth: "36rem" }}>
          <h2
            className="v8-section-title v8-reveal"
            style={{
              color: "var(--v8-on-dark-primary)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
            }}
          >
            How we build
          </h2>
          <p
            className="v8-lead v8-reveal v8-reveal-1"
            style={{
              marginTop: "1.25rem",
              maxWidth: "34rem",
              color: "var(--v8-on-dark-secondary)",
            }}
          >
            Four principles that keep every engagement grounded in real business
            outcomes.
          </p>
        </div>

        <div className="build-principles">
          {PRINCIPLES.map((p, i) => (
            <div
              key={p.num}
              className={`build-principle v8-reveal v8-reveal-${i + 1}`}
            >
              <span
                className="v8-num"
                style={{ color: "var(--v8-lime)", fontSize: "0.75rem" }}
              >
                {p.num}
              </span>
              <h3
                className="v8-display"
                style={{
                  marginTop: "0.65rem",
                  fontSize: "1.15rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--v8-on-dark-primary)",
                }}
              >
                {p.title}
              </h3>
              <p
                className="v8-body"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.92rem",
                  color: "var(--v8-on-dark-secondary)",
                }}
              >
                {p.copy}
              </p>
            </div>
          ))}
        </div>
      </PhaseSection>

      <style>{`
        .build-list {
          display: grid;
          gap: 0;
        }
        .build-list-item {
          display: grid;
          grid-template-columns: 2.5rem 1fr;
          gap: 1rem;
          padding: clamp(1.2rem, 2vw, 1.75rem) 0;
          border-top: 1px solid var(--v8-line);
        }
        .build-list-item:last-child {
          border-bottom: 1px solid var(--v8-line);
        }
        .build-grid {
          margin-top: clamp(2.5rem, 5vw, 4rem);
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0 clamp(1.5rem, 3vw, 3rem);
        }
        .build-grid-card {
          padding: clamp(1.3rem, 2.2vw, 1.85rem) 0;
          border-top: 1px solid var(--v8-line);
          transition: border-color 250ms var(--v8-ease);
        }
        .build-grid-card:hover {
          border-top-color: var(--v8-lime);
        }
        .build-principles {
          margin-top: clamp(3rem, 6vw, 5rem);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1.5rem, 3vw, 2.5rem);
          border-top: 1px solid var(--v8-on-dark-line);
          padding-top: clamp(2rem, 4vw, 3rem);
        }
        @media (max-width: 900px) {
          .build-grid { grid-template-columns: repeat(2, 1fr); }
          .build-principles { grid-template-columns: repeat(2, 1fr); row-gap: 2rem; }
        }
        @media (max-width: 520px) {
          .build-grid { grid-template-columns: 1fr; }
          .build-principles { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
