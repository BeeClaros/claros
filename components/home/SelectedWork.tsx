"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const CASES = [
  {
    label: "SERVICES",
    title: "Professional services",
    description:
      "Mobile reporting that connects field work with the office through structured capture and translation.",
    tags: ["Mobile", "Translation", "Reporting"],
    href: "/work#professional-services",
  },
  {
    label: "SYSTEMS",
    title: "Healthcare workflows",
    description:
      "Connecting applications, data and operational processes into clearer workflows.",
    tags: ["Integration", "Modernisation", "Automation"],
    href: "/work#healthcare",
  },
  {
    label: "OPERATIONS",
    title: "Warehouse & logistics",
    description:
      "Operational software for goods, inventory, vehicles and the teams coordinating them.",
    tags: ["Operational software", "Integration", "Workflow automation"],
    href: "/work#logistics",
  },
];

export default function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.08 });
  const reducedMotion = useReducedMotion();
  const live = reducedMotion !== true;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: live ? 0.1 : 0 } },
  };

  const fade: Variants = {
    hidden: live ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: live ? 0.65 : 0, ease: EASE },
    },
  };

  return (
    <section ref={ref} className="sw-section">
      <div
        className="v8-container"
        style={{
          paddingTop: "clamp(4.5rem, 9vw, 8rem)",
          paddingBottom: "clamp(4.5rem, 9vw, 8rem)",
        }}
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
        >
          <motion.p className="v8-overline" variants={fade}>
            SELECTED WORK
          </motion.p>

          <motion.h2
            className="v8-section-title"
            variants={fade}
            style={{ marginTop: "1rem", maxWidth: "28ch" }}
          >
            Systems built around how work actually happens.
          </motion.h2>

          <motion.p
            className="v8-lead"
            variants={fade}
            style={{ marginTop: "1.25rem", maxWidth: "38rem" }}
          >
            Software, integration and automation across complex operational
            environments.
          </motion.p>

          <motion.div className="sw-grid" variants={container}>
            {CASES.map((c) => (
              <motion.a
                key={c.href}
                href={c.href}
                className="sw-card"
                variants={fade}
              >
                <span className="sw-card-label">{c.label}</span>
                <h3 className="sw-card-title">{c.title}</h3>
                <p className="sw-card-desc">{c.description}</p>
                <ul className="sw-card-tags" aria-label="Tags">
                  {c.tags.map((tag) => (
                    <li key={tag} className="sw-card-tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="sw-footer"
            variants={fade}
          >
            <a href="/work" className="v8-btn-text">
              Explore selected work <span className="v8-arrow">&rarr;</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .sw-section {
          background: var(--v8-bg-secondary);
          border-top: 1px solid var(--v8-line);
        }

        .sw-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
          margin-top: clamp(2.5rem, 5vw, 4rem);
        }

        .sw-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: clamp(1.5rem, 2.5vw, 2rem);
          background: var(--v8-bg-contrast);
          border: 1px solid var(--v8-line);
          border-left: 3px solid var(--v8-line);
          border-radius: var(--v8-radius);
          text-decoration: none;
          color: inherit;
          transition: border-left-color 240ms var(--v8-ease),
                      box-shadow 240ms var(--v8-ease),
                      transform 240ms var(--v8-ease);
        }

        .sw-card:hover {
          border-left-color: var(--v8-lime);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          transform: translateY(-2px);
        }

        .sw-card-label {
          font-family: var(--font-v8-mono), 'Courier New', monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 400;
          color: var(--v8-text-muted);
        }

        .sw-card-title {
          margin: 0;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(1.0625rem, 1.4vw, 1.25rem);
          font-weight: 500;
          letter-spacing: -0.015em;
          line-height: 1.2;
          color: var(--v8-text-primary);
        }

        .sw-card-desc {
          margin: 0;
          font-family: var(--font-v8-sans), sans-serif;
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--v8-text-secondary);
          flex: 1;
        }

        .sw-card-tags {
          list-style: none;
          margin: 0.25rem 0 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 0.375rem;
        }

        .sw-card-tag {
          font-family: var(--font-v8-mono), 'Courier New', monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          color: var(--v8-text-muted);
          border: 1px solid var(--v8-line);
          border-radius: 2px;
          padding: 0.2rem 0.5rem;
          white-space: nowrap;
        }

        .sw-footer {
          margin-top: clamp(2rem, 4vw, 3rem);
        }

        @media (max-width: 900px) {
          .sw-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .sw-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sw-card {
            transition: none;
          }
          .sw-card:hover {
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}
