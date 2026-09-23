"use client";

import { useEffect, type ReactNode } from "react";
import { track } from "@vercel/analytics/react";

const WEBINAR_EMAIL = "hello@beeclaros.com";

const EMAIL_SUBJECT = "Roofing webinar — send me the link";

const EMAIL_BODY = `Hi,

I'm interested in the roofing webinar. Please send me the invite and recording.

Thanks.`;

const EMAIL_URL = `mailto:${WEBINAR_EMAIL}?subject=${encodeURIComponent(
  EMAIL_SUBJECT,
)}&body=${encodeURIComponent(EMAIL_BODY)}`;

/* ── Analytics ────────────────────────────────────────────────────── */

type CtaSource = "hero" | "workflows" | "final";

/* UTM params only — cid and any person-level data must never reach analytics. */
function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "utm_term",
  ];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = sp.get(k);
    if (v) out[k] = v;
  }
  return out;
}

function analyticsProps(ctaSource?: CtaSource): Record<string, string> {
  return {
    webinar_id: "roofing_oct_2026_v1",
    vertical: "roofing",
    ...getUtmParams(),
    ...(ctaSource ? { cta_source: ctaSource } : {}),
  };
}

/* ── Click log (Google Sheet) ─────────────────────────────────────── */

const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbzquyHxUFZK1Y8OMnfV1E9HBynEpmJoA3bbbW9W-8exS9aSUAgYFxoNYINosnsnnepD/exec";

const WEBINAR_TITLE =
  "How Roofing Companies Can Remove Manual Coordination from Estimate to Production";

/* cid is an opaque outreach contact identifier — Sheet payload only, never analytics. */
function getCid(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("cid") ?? "";
}

let ipPromise: Promise<string> | null = null;

function getIp(): Promise<string> {
  if (!ipPromise) {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 3000);
    ipPromise = fetch("https://api.ipify.org?format=json", {
      signal: controller.signal,
    })
      .then((r) => r.json())
      .then((d: { ip?: string }) => d.ip ?? "")
      .catch(() => "")
      .finally(() => clearTimeout(timeout));
  }
  return ipPromise;
}

function getAnonId(): string {
  const key = "wbn_roofing_anon_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);
    localStorage.setItem(key, id);
  }
  return id;
}

/* The Apps Script only upserts by workEmail and cannot increment, so the
   row key goes in workEmail and the count is kept per browser. */
async function recordClick(source: CtaSource) {
  try {
    const ip = await getIp();
    const cid = getCid();
    const rowKey = cid ? `cid:${cid}` : ip ? `ip:${ip}` : `anon:${getAnonId()}`;

    const countKey = `wbn_roofing_clicks:${rowKey}`;
    const count = Number(localStorage.getItem(countKey) ?? "0") + 1;
    localStorage.setItem(countKey, String(count));

    const payload: Record<string, string> = {
      workEmail: rowKey,
      company: ip,
      workflowInterest: String(count),
      cid,
      cta_source: source,
      webinar_id: "roofing_oct_2026_v1",
      vertical: "roofing",
      webinar_title: WEBINAR_TITLE,
      landing_page: window.location.href,
      landing_version: "roofing_v2_mailto",
      referrer: document.referrer || "",
      status: "partial",
      ...getUtmParams(),
    };

    await fetch(FORM_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      keepalive: true,
      headers: { "Content-Type": "text/plain;charset=UTF-8" },
      body: JSON.stringify(payload),
    });
  } catch {
    // Click logging must never interfere with the mailto CTA.
  }
}

function EmailCta({
  source,
  className = "",
  children,
}: {
  source: CtaSource;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={EMAIL_URL}
      className={`v8-btn-primary wbn-cta ${className}`}
      onClick={() => {
        track("webinar_email_cta_click", analyticsProps(source));
        void recordClick(source);
      }}
    >
      {children}{" "}
      <span className="v8-arrow" aria-hidden="true">
        →
      </span>
    </a>
  );
}

/* ── Data ─────────────────────────────────────────────────────────── */

const FOCUS_ITEMS = [
  "More estimates getting the right follow-up",
  "Faster sold-job handoffs into production",
  "Fewer jobs requiring manual checking",
];

const METRICS = [
  {
    value: "100 estimates / month",
    body: "A 1-point improvement in close rate means 1 additional sold job.",
    label: "Illustrative example",
  },
  {
    value: "5 hours / week",
    body: "Spent checking jobs or chasing information becomes 260 hours a year.",
    label: "Simple time math",
  },
  {
    value: "1 missed next action",
    body: "Can mean an estimate goes cold, a handoff stalls or a production issue gets noticed later than it should.",
    label: "Operational leakage",
  },
];

const WORKFLOWS = [
  {
    num: "01",
    title: "Estimate → Next Sales Action",
    body: "Identify the estimates that actually need attention instead of relying on reps to check every opportunity.",
    measure: "follow-up speed · close rate · opportunities going cold",
  },
  {
    num: "02",
    title: "Sold Job → Production Ready",
    body: "Check whether contracts, selections, deposits, materials and documentation are ready before the job moves forward.",
    measure: "handoff time · missing information · avoidable production delays",
  },
  {
    num: "03",
    title: "Active Jobs → Exceptions",
    body: "Surface the jobs that need attention instead of making managers check every job looking for problems.",
    measure: "management time · production exceptions · margin visibility",
  },
];

/* ── Page ─────────────────────────────────────────────────────────── */

export default function RoofingWebinarLanding() {
  useEffect(() => {
    track("webinar_landing_view", analyticsProps());
    void getIp();
  }, []);

  return (
    <>
      <PageStyles />
      <main>
        <HeroSection />
        <ImpactSection />
        <WorkflowsSection />
        <DemoSection />
        <FinalCtaSection />
        <p className="wbn-disclaimer wbn-container">
          Examples are illustrative, not promised results. Actual impact
          depends on company volume, workflows and current processes.
        </p>
      </main>
    </>
  );
}

function HeroSection() {
  return (
    <section className="wbn-hero">
      <div className="wbn-container wbn-hero-grid">
        <div className="wbn-hero-copy">
          <p className="v8-overline">Live webinar for roofing companies</p>
          <h1 className="wbn-hero-h1">
            Stop losing time — and revenue — between the estimate and the job.
          </h1>
          <p className="wbn-hero-sub">
            See 3 practical AI workflows that help roofing companies follow up
            the right estimates, move sold jobs into production faster, and
            surface problems before someone has to chase them.
          </p>
          <p className="wbn-hero-reassure">
            No new CRM. No rip-and-replace. Built around the systems you
            already use.
          </p>
          <EmailCta source="hero">Email me the webinar link</EmailCta>
          <p className="wbn-meta">Free · Recording included</p>
          <p className="wbn-audience">
            For roofing owners, Presidents, CEOs, COOs, GMs and operations
            leaders.
          </p>
        </div>

        <aside className="wbn-focus">
          <p className="wbn-focus-label">What we&apos;ll focus on</p>
          <ol className="wbn-focus-list">
            {FOCUS_ITEMS.map((item, i) => (
              <li key={item}>
                <span className="wbn-num">0{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
          <p className="wbn-focus-footer">Built around your existing systems</p>
        </aside>
      </div>
    </section>
  );
}

function ImpactSection() {
  return (
    <section className="wbn-section wbn-bg-soft">
      <div className="wbn-container">
        <h2 className="v8-section-title wbn-h2">
          Small operational leaks add up.
        </h2>
        <p className="v8-lead wbn-intro">
          You don&apos;t need a dramatic transformation for better workflows to
          matter. Small improvements compound across every estimate and every
          job.
        </p>
        <div className="wbn-grid-3">
          {METRICS.map((m) => (
            <div key={m.value} className="wbn-card">
              <p className="wbn-metric-value">{m.value}</p>
              <p className="wbn-card-body">{m.body}</p>
              <p className="wbn-card-label">{m.label}</p>
            </div>
          ))}
        </div>
        <p className="wbn-impact-note">
          The webinar is about finding these leaks and making the next action
          easier to see.
        </p>
      </div>
    </section>
  );
}

function WorkflowsSection() {
  return (
    <section className="wbn-section">
      <div className="wbn-container">
        <h2 className="v8-section-title wbn-h2">3 workflows we&apos;ll show</h2>
        <p className="v8-lead wbn-intro">
          Practical examples from the estimate through production — not a list
          of AI tools.
        </p>
        <div className="wbn-grid-3">
          {WORKFLOWS.map((w) => (
            <div key={w.num} className="wbn-card">
              <span className="wbn-num">{w.num}</span>
              <h3 className="wbn-wf-title">{w.title}</h3>
              <p className="wbn-card-body">{w.body}</p>
              <p className="wbn-wf-measure">
                <strong>Measure:</strong> {w.measure}
              </p>
            </div>
          ))}
        </div>
        <div className="wbn-center">
          <EmailCta source="workflows">Send me the webinar link</EmailCta>
        </div>
      </div>
    </section>
  );
}

function DemoSection() {
  return (
    <section className="wbn-section wbn-dark">
      <div className="wbn-container wbn-narrow">
        <h2 className="v8-section-title wbn-h2 wbn-on-dark">
          See a working workflow — not another AI presentation.
        </h2>
        <p className="v8-lead wbn-intro wbn-on-dark-2">
          We&apos;ll show what happens when something changes in a roofing
          system, how the relevant context is pulled together, and how the
          right next action reaches the right person.
        </p>
        <p className="wbn-demo-emph">Your existing systems stay in place.</p>
        <p className="v8-body wbn-on-dark-2">
          The goal is not to replace your CRM, estimating, production or
          accounting software. It is to reduce the manual work happening
          between them.
        </p>
      </div>
    </section>
  );
}

function FinalCtaSection() {
  return (
    <section className="wbn-section wbn-final">
      <div className="wbn-container wbn-narrow wbn-center-text">
        <h2 className="v8-section-title wbn-h2">
          Find the next manual bottleneck worth removing.
        </h2>
        <p className="v8-lead wbn-intro">
          Join the roofing webinar and see how practical workflows can reduce
          chasing, checking and coordination across the jobs your team already
          manages.
        </p>
        <EmailCta source="final">Email me the webinar link</EmailCta>
        <p className="wbn-final-note">
          Can&apos;t attend live? We&apos;ll send the recording.
        </p>
      </div>
    </section>
  );
}

/* ── Styles ───────────────────────────────────────────────────────── */

function PageStyles() {
  return (
    <style>{`
      .wbn-container {
        width: 100%;
        max-width: var(--v8-content-max, 1280px);
        margin-inline: auto;
        padding-inline: var(--v8-gutter, clamp(1.25rem, 5vw, 4.5rem));
        box-sizing: border-box;
      }
      .wbn-narrow { max-width: 820px; }
      .wbn-center { margin-top: 40px; text-align: center; }
      .wbn-center-text { text-align: center; }

      .wbn-section { padding-block: clamp(3.5rem, 7vw, 6rem); }
      .wbn-bg-soft { background: var(--v8-bg-secondary); }

      .wbn-h2 { font-size: clamp(1.9rem, 3.4vw, 2.75rem); }
      .wbn-intro { margin-top: 16px; max-width: 640px; }
      .wbn-center-text .wbn-intro { margin-inline: auto; }

      .wbn-num {
        font-family: var(--font-v8-mono), monospace;
        font-size: 0.8125rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        color: var(--v8-lime-deep);
        flex-shrink: 0;
      }

      .wbn-meta {
        margin: 14px 0 0;
        font-family: var(--font-v8-mono), monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
      }

      .wbn-cta {
        margin-top: 28px;
        height: auto;
        min-height: 54px;
        padding-inline: 32px;
        font-size: 0.875rem;
      }

      /* Hero */
      .wbn-hero {
        padding-block: clamp(2rem, 5vw, 4.5rem);
        border-bottom: 1px solid var(--v8-line);
      }
      .wbn-hero-grid {
        display: grid;
        grid-template-columns: minmax(0, 1fr) 360px;
        gap: clamp(2rem, 5vw, 5rem);
        align-items: center;
      }
      .wbn-hero-copy {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }
      .wbn-hero-h1 {
        font-family: var(--font-v8-display), sans-serif;
        font-size: clamp(2.1rem, 4.4vw, 3.6rem);
        line-height: 1.06;
        letter-spacing: -0.03em;
        font-weight: 500;
        color: var(--v8-text-primary);
        margin: 18px 0 0;
        max-width: 780px;
        text-wrap: balance;
      }
      .wbn-hero-sub {
        font-family: var(--font-v8-sans), sans-serif;
        font-size: clamp(1rem, 1.2vw, 1.1875rem);
        line-height: 1.6;
        color: var(--v8-text-secondary);
        margin: 18px 0 0;
        max-width: 600px;
      }
      .wbn-hero-reassure {
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 0.9375rem;
        font-weight: 500;
        color: var(--v8-text-primary);
        margin: 12px 0 0;
      }
      .wbn-audience {
        margin: 8px 0 0;
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 0.8125rem;
        color: var(--v8-text-muted);
      }

      .wbn-focus {
        border-radius: 6px;
        overflow: hidden;
        background: var(--v8-bg-secondary);
        border: 1px solid var(--v8-line);
      }
      .wbn-focus-label {
        margin: 0;
        padding: 22px 24px 4px;
        font-family: var(--font-v8-mono), monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
      }
      .wbn-focus-list {
        list-style: none;
        margin: 0;
        padding: 4px 24px 12px;
      }
      .wbn-focus-list li {
        display: flex;
        align-items: baseline;
        gap: 14px;
        padding: 14px 0;
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.4;
        color: var(--v8-text-primary);
      }
      .wbn-focus-list li + li { border-top: 1px solid var(--v8-line); }
      .wbn-focus-footer {
        margin: 0;
        padding: 14px 24px;
        background: var(--v8-bg-dark);
        font-family: var(--font-v8-mono), monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--v8-lime);
      }

      /* Cards */
      .wbn-grid-3 {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 20px;
        margin-top: 36px;
      }
      .wbn-card {
        display: flex;
        flex-direction: column;
        background: var(--v8-bg-contrast);
        border: 1px solid var(--v8-line);
        border-radius: 6px;
        padding: 28px;
      }
      .wbn-bg-soft .wbn-card { border-color: transparent; }
      .wbn-card-body {
        margin: 12px 0 0;
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 1rem;
        line-height: 1.6;
        color: var(--v8-text-secondary);
      }
      .wbn-card-label {
        margin: auto 0 0;
        padding-top: 20px;
        font-family: var(--font-v8-mono), monospace;
        font-size: 0.6875rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
      }
      .wbn-metric-value {
        margin: 0;
        font-family: var(--font-v8-display), sans-serif;
        font-size: clamp(1.75rem, 2.6vw, 2.25rem);
        line-height: 1.1;
        letter-spacing: -0.025em;
        font-weight: 500;
        color: var(--v8-text-primary);
      }
      .wbn-impact-note {
        margin: 28px 0 0;
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 1.0625rem;
        font-weight: 500;
        color: var(--v8-text-primary);
      }

      .wbn-wf-title {
        margin: 10px 0 0;
        font-family: var(--font-v8-display), sans-serif;
        font-size: clamp(1.2rem, 1.8vw, 1.4rem);
        font-weight: 500;
        letter-spacing: -0.015em;
        line-height: 1.2;
        color: var(--v8-text-primary);
      }
      .wbn-wf-measure {
        margin: auto 0 0;
        padding-top: 20px;
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 0.8125rem;
        line-height: 1.5;
        color: var(--v8-lime-deep);
      }
      .wbn-wf-measure strong { font-weight: 600; }

      /* Demo (dark) */
      .wbn-dark { background: var(--v8-bg-dark); }
      .wbn-on-dark { color: var(--v8-on-dark-primary); }
      .wbn-on-dark-2 { color: var(--v8-on-dark-secondary); }
      .wbn-demo-emph {
        margin: 28px 0 8px;
        padding-left: 16px;
        border-left: 3px solid var(--v8-lime);
        font-family: var(--font-v8-display), sans-serif;
        font-size: clamp(1.2rem, 2vw, 1.5rem);
        font-weight: 500;
        color: var(--v8-lime);
      }

      /* Final CTA */
      .wbn-final .wbn-cta { margin-top: 28px; }
      .wbn-final-note {
        margin: 16px 0 0;
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 0.9375rem;
        color: var(--v8-text-secondary);
      }
      .wbn-disclaimer {
        margin: 0 auto;
        padding-bottom: 28px;
        text-align: center;
        font-family: var(--font-v8-sans), sans-serif;
        font-size: 0.75rem;
        line-height: 1.5;
        color: var(--v8-text-muted);
      }

      @media (max-width: 900px) {
        .wbn-hero-grid { grid-template-columns: minmax(0, 1fr); }
        .wbn-grid-3 { grid-template-columns: minmax(0, 1fr); gap: 14px; }
      }

      @media (max-width: 560px) {
        .wbn-section { padding-block: 3rem; }
        .wbn-card { padding: 22px; }
        .wbn-cta {
          width: 100%;
          justify-content: center;
          white-space: normal;
          text-align: center;
          padding-inline: 20px;
        }
      }
    `}</style>
  );
}
