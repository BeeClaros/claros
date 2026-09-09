"use client";

import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useGeoRegion } from "@/hooks/useGeoRegion";

const WHY_CARDS = [
  {
    num: "01",
    title: "Live in days",
    copy: "Start with a usable workspace and API without a long internal platform build or additional DevOps burden.",
  },
  {
    num: "02",
    title: "Private by design",
    copyEU:
      "Dedicated EU-hosted infrastructure, controlled access, guardrails and personal-data anonymisation built into the environment.",
    copyUS:
      "Dedicated US-hosted infrastructure, controlled access, guardrails and personal-data anonymisation built into the environment.",
  },
  {
    num: "03",
    title: "Built to extend",
    copy: "Use the same environment for company knowledge, APIs, automations and custom operational workflows.",
  },
];

const CAPABILITIES = [
  {
    tag: "WORKSPACE",
    title: "ChatGPT-style experience",
    copy: "A familiar interface for internal users inside a controlled company environment.",
  },
  {
    tag: "INTEGRATION",
    title: "API access",
    copy: "Use the same private environment from internal software, custom applications and automations.",
  },
  {
    tag: "CONTROL",
    title: "Guardrails & data handling",
    copy: "Apply policies, anonymisation and controlled model access before information reaches model endpoints.",
  },
  {
    tag: "SCALE",
    title: "From workspace to workflows",
    copy: "Extend into agents or workflow automation only where the business case justifies it.",
  },
];

const USE_CASES = [
  {
    title: "Company knowledge",
    copy: "Controlled access to internal information and operational context.",
  },
  {
    title: "Internal assistants",
    copy: "Role-specific tools for repeated information work.",
  },
  {
    title: "Workflow automation",
    copy: "Connect documents, email and business systems.",
  },
  {
    title: "Custom products",
    copy: "Use the API as a governed AI layer inside software.",
  },
];

const FAQS = [
  {
    q: "Is this another standalone chatbot?",
    a: "No. The workspace is one interface on top of the environment. The same controlled layer can also support APIs, integrations, automations and custom applications.",
  },
  {
    q: "Do we need to replace our existing systems?",
    a: "No. The environment is designed to sit around the systems you already use. Existing operational platforms remain authoritative where they should.",
  },
  {
    q: "Can it run inside our own infrastructure?",
    a: "Yes. The architecture can be deployed into your environment instead of using the managed option.",
  },
  {
    q: "What happens after the initial setup?",
    a: "You can keep it as a secure AI workspace or extend it into specific workflows, integrations and applications where there is a clear operational case.",
  },
];

const PRICING_INCLUDES = [
  "ChatGPT-style workspace",
  "API access",
  "Built-in guardrails",
  "PII anonymisation",
  { eu: "EU-hosted dedicated infrastructure", us: "US-hosted dedicated infrastructure" },
  "Autoscaling included",
];

export default function PrivateAIContent() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollReveal(ref);
  const { region } = useGeoRegion();
  const isUS = region === "americas";
  const hosted = isUS ? "US-hosted" : "EU-hosted";
  const currency = isUS ? "USD" : "EUR";
  const price = isUS ? "3,499" : "3,000";

  return (
    <div ref={ref}>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="pai-hero">
        <div className="v8-container pai-hero-grid">
          <div className="pai-hero-copy">
            <span className="v8-overline">Private AI infrastructure</span>
            <h1 className="pai-hero-title v8-reveal">
              Your AI. Your environment.
            </h1>
            <p className="v8-lead v8-reveal v8-reveal-1" style={{ maxWidth: "620px", marginTop: "1.25rem" }}>
              A managed private AI workspace and API for teams that need the
              speed of modern AI without giving up control over data, access or
              deployment.
            </p>
            <div className="pai-actions v8-reveal v8-reveal-2">
              <a className="v8-btn-primary" href="mailto:hello@beeclaros.com">
                Discuss your environment <span className="v8-arrow" aria-hidden="true">&rarr;</span>
              </a>
              <a className="pai-btn-ghost" href="#pricing">
                See pricing
              </a>
            </div>
            <div className="pai-note v8-reveal v8-reveal-3">
              {hosted} · Dedicated infrastructure · Guardrails · API access · Human-controlled deployment
            </div>
          </div>

          <div className="pai-visual v8-reveal v8-reveal-2" aria-label="Private AI architecture diagram">
            <div className="pai-arch">
              <div className="pai-arch-col">
                <div className="pai-arch-label">Your environment</div>
                <div className="pai-arch-card">
                  <strong>Company data</strong>
                  <span>Knowledge, documents and internal context</span>
                </div>
                <div className="pai-arch-card">
                  <strong>Existing systems</strong>
                  <span>Business apps, workflows and APIs</span>
                </div>
              </div>

              <div className="pai-arch-arrow" aria-hidden="true" />

              <div className="pai-arch-core">
                <div className="pai-arch-label">Control layer</div>
                <h3>Private AI</h3>
                <div className="pai-arch-core-list">
                  <div className="pai-arch-core-item">Access &amp; permissions</div>
                  <div className="pai-arch-core-item">Guardrails &amp; policies</div>
                  <div className="pai-arch-core-item">PII anonymisation</div>
                  <div className="pai-arch-core-item">Routing &amp; audit</div>
                </div>
              </div>

              <div className="pai-arch-arrow" aria-hidden="true" />

              <div className="pai-arch-col">
                <div className="pai-arch-label">AI layer</div>
                <div className="pai-arch-card">
                  <strong>Model access</strong>
                  <span>Controlled access to selected AI models</span>
                </div>
                <div className="pai-arch-card">
                  <strong>Applications</strong>
                  <span>Workspace, API, agents and custom software</span>
                </div>
              </div>

              <div className="pai-arch-output">
                <strong>One governed foundation</strong>
                <span>DATA &rarr; CONTROL &rarr; AI &rarr; WORKFLOWS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Private AI ───────────────────────────────────── */}
      <section className="pai-section" style={{ background: "var(--v8-bg-contrast)" }}>
        <div className="v8-container">
          <div className="pai-head">
            <span className="v8-overline v8-reveal">Why private AI</span>
            <div>
              <h2 className="v8-section-title v8-reveal" style={{ maxWidth: "18ch" }}>
                Production-ready without becoming an infrastructure project.
              </h2>
              <p className="v8-lead v8-reveal v8-reveal-1" style={{ maxWidth: "720px", marginTop: "1rem" }}>
                A controlled AI layer that can support real internal work,
                connect to existing systems and expand as useful workflows are
                proven.
              </p>
            </div>
          </div>
          <div className="pai-grid3">
            {WHY_CARDS.map((c) => (
              <div key={c.num} className="pai-card v8-reveal">
                <small className="pai-card-num">{c.num}</small>
                <h3 className="pai-card-title">{c.title}</h3>
                <p className="pai-card-copy">
                  {c.copyEU ? (isUS ? c.copyUS : c.copyEU) : c.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Foundation (dark) ────────────────────────────── */}
      <section className="pai-section pai-dark">
        <div className="v8-container">
          <div className="pai-head">
            <span className="v8-overline v8-reveal" style={{ color: "var(--v8-lime)" }}>
              The foundation
            </span>
            <div>
              <h2
                className="v8-section-title v8-reveal"
                style={{ maxWidth: "18ch", color: "var(--v8-on-dark-primary)" }}
              >
                One controlled layer between your teams, data and AI.
              </h2>
              <p className="v8-lead v8-reveal v8-reveal-1" style={{ maxWidth: "720px", marginTop: "1rem", color: "var(--v8-on-dark-secondary)" }}>
                Instead of deploying isolated AI tools across the business, the
                environment provides one place to control access, models, data
                handling and the applications built on top.
              </p>
            </div>
          </div>

          <div className="pai-capgrid">
            {CAPABILITIES.map((c) => (
              <div key={c.tag} className="pai-cap v8-reveal">
                <small>{c.tag}</small>
                <h3>{c.title}</h3>
                <p>{c.copy}</p>
              </div>
            ))}
          </div>

          <div className="pai-cases">
            {USE_CASES.map((c) => (
              <div key={c.title} className="pai-case v8-reveal">
                <strong>{c.title}</strong>
                <span>{c.copy}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Deployment ───────────────────────────────────────── */}
      <section className="pai-section" style={{ background: "var(--v8-bg-contrast)" }}>
        <div className="v8-container">
          <div className="pai-head">
            <span className="v8-overline v8-reveal">Deployment</span>
            <div>
              <h2 className="v8-section-title v8-reveal" style={{ maxWidth: "18ch" }}>
                Managed by us, or deployed into your infrastructure.
              </h2>
              <p className="v8-lead v8-reveal v8-reveal-1" style={{ maxWidth: "720px", marginTop: "1rem" }}>
                Choose the operating model that fits your security and ownership
                requirements.
              </p>
            </div>
          </div>

          <div className="pai-deploy">
            <div className="pai-option pai-option-featured v8-reveal">
              <span className="v8-overline">Managed environment</span>
              <h3 className="pai-option-title">
                Dedicated {isUS ? "US" : "EU"} infrastructure
              </h3>
              <p className="pai-option-copy">
                We operate the environment so your team can focus on adoption and
                useful workflows instead of platform maintenance.
              </p>
              <ul className="pai-checks">
                <li>Dedicated infrastructure</li>
                <li>Autoscaling included</li>
                <li>Managed platform operation</li>
                <li>Fastest route to launch</li>
              </ul>
            </div>
            <div className="pai-option v8-reveal v8-reveal-1">
              <span className="v8-overline">Your environment</span>
              <h3 className="pai-option-title">Deploy into your stack</h3>
              <p className="pai-option-copy">
                For companies with established infrastructure requirements,
                the architecture can be deployed inside the environment you
                already control.
              </p>
              <ul className="pai-checks">
                <li>Infrastructure remains under your control</li>
                <li>Fits existing cloud policies</li>
                <li>Integration with internal services</li>
                <li>Architecture adapted to requirements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section id="pricing" className="pai-section">
        <div className="v8-container pai-pricing-layout">
          <div className="v8-reveal">
            <span className="v8-overline">Pricing</span>
            <h2 className="v8-section-title" style={{ marginTop: "1.125rem" }}>
              A clear starting point.
            </h2>
            <p className="v8-lead" style={{ maxWidth: "540px", marginTop: "1rem" }}>
              Start with the private AI foundation. Additional integrations,
              agents and custom workflows are scoped separately when they solve a
              defined business problem.
            </p>
          </div>

          <div className="pai-pricecard v8-reveal v8-reveal-1">
            <div className="pai-pricecard-label">Managed Private AI · From</div>
            <div className="pai-price">
              <span className="pai-currency">{currency}</span>
              <span className="pai-value">{price}</span>
              <span className="pai-period">/ month</span>
            </div>
            <p className="pai-pricecard-desc">
              A managed private environment for teams that want controlled AI
              access without building and operating the platform themselves.
            </p>
            <div className="pai-plist">
              {PRICING_INCLUDES.map((item) => {
                const text = typeof item === "string" ? item : isUS ? item.us : item.eu;
                return <span key={text}>{text}</span>;
              })}
            </div>
            <a className="v8-btn-primary pai-pricecard-cta" href="mailto:hello@beeclaros.com">
              Discuss your setup <span className="v8-arrow" aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="pai-section" style={{ background: "var(--v8-bg-contrast)" }}>
        <div className="v8-container">
          <div className="pai-head">
            <span className="v8-overline v8-reveal">Common questions</span>
            <div>
              <h2 className="v8-section-title v8-reveal">
                What teams usually want to know first.
              </h2>
            </div>
          </div>
          <div className="pai-faq v8-reveal">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="pai-cta">
        <div className="v8-container pai-cta-inner">
          <div>
            <span className="v8-overline" style={{ color: "#4b5c00" }}>
              Private AI
            </span>
            <h2 className="v8-section-title" style={{ marginTop: "1rem", maxWidth: "16ch" }}>
              Give your teams AI without giving up control.
            </h2>
            <p className="v8-lead" style={{ maxWidth: "600px", marginTop: "1rem", color: "var(--v8-text-secondary)" }}>
              Start with the environment, your security requirements and the
              first workflows it needs to support.
            </p>
          </div>
          <a className="v8-btn-primary" href="mailto:hello@beeclaros.com" style={{ whiteSpace: "nowrap" }}>
            Discuss your environment <span className="v8-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      <style>{`
        /* ── Hero ─────────────────────────────────────────── */
        .pai-hero {
          padding: calc(var(--v8-nav-h) + 4rem) 0 5rem;
          background: var(--v8-bg-secondary);
          position: relative;
          overflow: hidden;
        }
        .pai-hero::before {
          content: "";
          position: absolute;
          left: 0;
          top: 25%;
          width: 82px;
          height: 38%;
          background: var(--v8-lime-pale);
        }
        .pai-hero-grid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 70px;
          align-items: center;
          position: relative;
        }
        .pai-hero-title {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(3.25rem, 7vw, 5.75rem);
          line-height: 0.94;
          letter-spacing: -0.045em;
          font-weight: 500;
          max-width: 9.5ch;
          margin: 1.125rem 0 0;
          color: var(--v8-text-primary);
        }
        .pai-actions {
          display: flex;
          gap: 12px;
          margin-top: 2.125rem;
          flex-wrap: wrap;
        }
        .pai-btn-ghost {
          min-height: 50px;
          padding: 0 20px;
          border: 1px solid var(--v8-text-primary);
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          text-decoration: none;
          color: var(--v8-text-primary);
          transition: background 200ms var(--v8-ease);
        }
        .pai-btn-ghost:hover {
          background: rgba(0, 0, 0, 0.04);
        }
        .pai-note {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.6875rem;
          line-height: 1.7;
          color: var(--v8-text-muted);
          margin-top: 1.125rem;
          letter-spacing: 0.02em;
        }

        /* ── Architecture diagram ────────────────────────── */
        .pai-visual {
          min-height: 470px;
          position: relative;
          border: 1px solid var(--v8-line);
          background:
            linear-gradient(180deg, rgba(255,255,255,0.72), rgba(248,249,246,0.92)),
            repeating-linear-gradient(0deg, transparent, transparent 9px, rgba(0,0,0,0.02) 9px, rgba(0,0,0,0.02) 10px);
          padding: 26px;
          display: flex;
          align-items: center;
        }
        .pai-arch {
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 52px 1.15fr 52px 1fr;
          gap: 0;
          align-items: center;
        }
        .pai-arch-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .pai-arch-label {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.625rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--v8-text-muted);
          margin-bottom: 2px;
        }
        .pai-arch-card {
          border: 1px solid var(--v8-line);
          background: rgba(255,255,255,0.78);
          padding: 15px 16px;
          min-height: 68px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .pai-arch-card strong {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 0.875rem;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
        .pai-arch-card span {
          font-size: 0.6875rem;
          line-height: 1.45;
          color: var(--v8-text-muted);
          margin-top: 4px;
        }
        .pai-arch-core {
          position: relative;
          background: var(--v8-bg-dark);
          color: #fff;
          border: 1px solid var(--v8-bg-dark);
          padding: 18px 18px 16px;
          min-height: 236px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .pai-arch-core::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          background: var(--v8-lime);
        }
        .pai-arch-core .pai-arch-label {
          color: var(--v8-lime);
        }
        .pai-arch-core h3 {
          margin: 12px 0 18px;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.625rem;
          line-height: 1.05;
          font-weight: 600;
          letter-spacing: -0.04em;
        }
        .pai-arch-core-list {
          display: grid;
          gap: 8px;
        }
        .pai-arch-core-item {
          border-top: 1px solid rgba(255,255,255,0.14);
          padding-top: 8px;
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.6875rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #D8DDD9;
        }
        .pai-arch-arrow {
          position: relative;
          height: 1px;
          background: var(--v8-lime-deep);
          margin: 0 8px;
        }
        .pai-arch-arrow::after {
          content: "";
          position: absolute;
          right: -1px;
          top: 50%;
          width: 7px;
          height: 7px;
          border-top: 1px solid var(--v8-lime-deep);
          border-right: 1px solid var(--v8-lime-deep);
          transform: translateY(-50%) rotate(45deg);
        }
        .pai-arch-output {
          grid-column: 1 / -1;
          margin-top: 18px;
          border: 1px solid var(--v8-line);
          background: var(--v8-lime-pale);
          padding: 13px 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
        }
        .pai-arch-output strong {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 0.8125rem;
          font-weight: 600;
        }
        .pai-arch-output span {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.6875rem;
          color: #586A00;
          letter-spacing: 0.04em;
        }

        /* ── Sections ────────────────────────────────────── */
        .pai-section {
          padding: clamp(4rem, 9vw, 6.5rem) 0;
        }
        .pai-dark {
          background: var(--v8-bg-dark);
          color: #fff;
        }
        .pai-head {
          display: grid;
          grid-template-columns: 0.55fr 1.45fr;
          gap: 80px;
        }

        /* ── Why Private AI cards ────────────────────────── */
        .pai-grid3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: var(--v8-line);
          border: 1px solid var(--v8-line);
          margin-top: 3.625rem;
        }
        .pai-card {
          background: var(--v8-bg-secondary);
          padding: 32px;
          min-height: 265px;
          display: flex;
          flex-direction: column;
        }
        .pai-card-num {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.6875rem;
          color: var(--v8-lime-deep);
        }
        .pai-card-title {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.5625rem;
          font-weight: 600;
          margin: auto 0 10px;
          letter-spacing: -0.02em;
        }
        .pai-card-copy {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--v8-text-secondary);
          margin: 0;
        }

        /* ── Foundation capabilities grid ────────────────── */
        .pai-capgrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: #2c302d;
          margin-top: 3.625rem;
        }
        .pai-cap {
          padding: 38px;
          background: #111412;
          min-height: 220px;
        }
        .pai-cap small {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.6875rem;
          color: var(--v8-lime);
          letter-spacing: 0.1em;
        }
        .pai-cap h3 {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.75rem;
          font-weight: 600;
          margin: 50px 0 12px;
          letter-spacing: -0.02em;
        }
        .pai-cap p {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: #ADB5AE;
          max-width: 48ch;
          margin: 0;
        }

        /* ── Use cases ───────────────────────────────────── */
        .pai-cases {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
          margin-top: 18px;
        }
        .pai-case {
          border: 1px solid #303431;
          padding: 20px;
          min-height: 132px;
        }
        .pai-case strong {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 600;
        }
        .pai-case span {
          display: block;
          color: #9FA79F;
          font-size: 0.8125rem;
          line-height: 1.55;
          margin-top: 8px;
        }

        /* ── Deployment options ──────────────────────────── */
        .pai-deploy {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-top: 3.625rem;
        }
        .pai-option {
          padding: 38px;
          border: 1px solid var(--v8-line);
          background: var(--v8-bg-secondary);
          min-height: 330px;
        }
        .pai-option-featured {
          background: var(--v8-lime-pale);
        }
        .pai-option-title {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.9375rem;
          font-weight: 600;
          margin: 1.75rem 0 0.75rem;
          letter-spacing: -0.02em;
        }
        .pai-option-copy {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--v8-text-secondary);
          margin: 0;
        }
        .pai-checks {
          list-style: none;
          padding: 0;
          margin: 1.75rem 0 0;
          display: grid;
          gap: 12px;
        }
        .pai-checks li {
          font-size: 0.875rem;
        }
        .pai-checks li::before {
          content: "\\2713";
          color: var(--v8-lime-deep);
          margin-right: 10px;
        }

        /* ── Pricing ─────────────────────────────────────── */
        .pai-pricing-layout {
          display: grid;
          grid-template-columns: 0.8fr 1.2fr;
          gap: 70px;
          align-items: center;
        }
        .pai-pricecard {
          background: var(--v8-bg-secondary);
          border: 1px solid var(--v8-line);
          padding: 42px;
          position: relative;
        }
        .pai-pricecard::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 8px;
          background: var(--v8-lime);
        }
        .pai-pricecard-label {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.6875rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--v8-text-muted);
        }
        .pai-price {
          display: flex;
          align-items: flex-end;
          gap: 11px;
          margin-top: 0.875rem;
        }
        .pai-currency {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.8125rem;
          padding-bottom: 11px;
        }
        .pai-value {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 4.5rem;
          line-height: 1;
          font-weight: 600;
          letter-spacing: -0.065em;
        }
        .pai-period {
          font-size: 0.875rem;
          color: var(--v8-text-muted);
          padding-bottom: 10px;
        }
        .pai-pricecard-desc {
          font-size: 0.875rem;
          line-height: 1.65;
          color: var(--v8-text-secondary);
          margin: 0.75rem 0 0;
        }
        .pai-plist {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px 20px;
          border-top: 1px solid var(--v8-line);
          padding-top: 1.625rem;
          margin-top: 1.625rem;
        }
        .pai-plist span {
          font-size: 0.8125rem;
        }
        .pai-plist span::before {
          content: "\\2713";
          color: var(--v8-lime-deep);
          margin-right: 8px;
        }
        .pai-pricecard-cta {
          width: 100%;
          justify-content: center;
          margin-top: 1.875rem;
        }

        /* ── FAQ ─────────────────────────────────────────── */
        .pai-faq {
          margin-top: 3.4375rem;
          border-top: 1px solid var(--v8-line);
        }
        .pai-faq details {
          border-bottom: 1px solid var(--v8-line);
        }
        .pai-faq summary {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.25rem;
          font-weight: 500;
          padding: 1.4375rem 0;
          cursor: pointer;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .pai-faq summary::-webkit-details-marker {
          display: none;
        }
        .pai-faq summary::after {
          content: "+";
          font-family: var(--font-v8-mono), monospace;
          font-size: 1.25rem;
          flex-shrink: 0;
          margin-left: 1rem;
        }
        .pai-faq details[open] summary::after {
          content: "\\2212";
        }
        .pai-faq details p {
          max-width: 760px;
          color: var(--v8-text-secondary);
          font-size: 0.9375rem;
          line-height: 1.7;
          margin: 0 0 1.375rem;
        }

        /* ── CTA ─────────────────────────────────────────── */
        .pai-cta {
          padding: 5.125rem 0;
          background: var(--v8-lime);
        }
        .pai-cta-inner {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 2.1875rem;
        }
        .pai-cta .v8-overline::before {
          background: #4b5c00;
        }

        /* ── Responsive ──────────────────────────────────── */
        @media (max-width: 900px) {
          .pai-hero-grid,
          .pai-head,
          .pai-pricing-layout {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .pai-hero {
            padding-top: calc(var(--v8-nav-h-sm) + 3rem);
          }
          .pai-visual {
            min-height: auto;
          }
          .pai-arch {
            grid-template-columns: 1fr 38px 1.1fr 38px 1fr;
          }
          .pai-arch-core {
            min-height: 220px;
          }
          .pai-grid3,
          .pai-capgrid {
            grid-template-columns: 1fr;
          }
          .pai-cases {
            grid-template-columns: 1fr 1fr;
          }
          .pai-deploy {
            grid-template-columns: 1fr;
          }
          .pai-cta-inner {
            align-items: flex-start;
            flex-direction: column;
          }
          .pai-head {
            gap: 1.5rem;
          }
        }

        @media (max-width: 600px) {
          .pai-hero-title {
            font-size: 3.25rem;
          }
          .pai-visual {
            padding: 18px;
          }
          .pai-arch {
            grid-template-columns: 1fr;
          }
          .pai-arch-arrow {
            width: 1px;
            height: 28px;
            margin: 0 auto;
          }
          .pai-arch-arrow::after {
            right: 50%;
            top: auto;
            bottom: -1px;
            transform: translateX(50%) rotate(135deg);
          }
          .pai-arch-core {
            min-height: auto;
            margin: 4px 0;
          }
          .pai-arch-output {
            grid-column: 1;
            margin-top: 14px;
            align-items: flex-start;
            flex-direction: column;
          }
          .pai-section {
            padding: 4.6875rem 0;
          }
          .pai-cases {
            grid-template-columns: 1fr;
          }
          .pai-value {
            font-size: 3.625rem;
          }
          .pai-plist {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
