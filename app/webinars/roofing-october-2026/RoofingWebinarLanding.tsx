"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { track } from "@vercel/analytics/react";

/* ── Replace with your Google Apps Script deployment URL ────────── */
// TODO: replace with actual Google Apps Script / Google Sheets endpoint
const FORM_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyzv4BTnwxsOUpimWiG5DpyGhCaITpVxH0Mg9APgpRbnpdCov8BTukLv83Mbw4cecEU/exec";

const WEBINAR_TITLE =
  "How Roofing Companies Can Remove Manual Coordination from Estimate to Production";

const EXISTING_SYSTEM_GROUPS: { label?: string; options: string[] }[] = [
  {
    label: "CRM & operations",
    options: [
      "AccuLynx",
      "JobNimbus",
      "Leap",
      "Roofr",
      "ServiceTitan",
      "JobProgress",
      "Improveit 360",
      "Buildertrend",
    ],
  },
  {
    label: "Sales, photos & measurements",
    options: [
      "SalesRabbit",
      "CompanyCam",
      "EagleView",
      "Hover",
      "RoofSnap",
    ],
  },
  {
    label: "Estimating & accounting",
    options: ["Xactimate", "SumoQuote", "QuickBooks", "Sage"],
  },
  {
    options: ["Other", "Not sure"],
  },
];

const WORKFLOW_GROUPS: { label?: string; options: string[] }[] = [
  {
    options: [
      "Estimate follow-up",
      "Sold-to-production handoff",
      "Production exceptions",
      "Job costing / margin visibility",
      "Customer communication",
      "Other",
    ],
  },
];

/* ── Helpers ──────────────────────────────────────────────────────── */

function scrollToRegister() {
  document
    .getElementById("register")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function getUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_content",
    "cid",
  ];
  const out: Record<string, string> = {};
  for (const k of keys) {
    const v = sp.get(k);
    if (v) out[k] = v;
  }
  return out;
}

function trackingBase(utms: Record<string, string>) {
  return { webinar_id: "roofing_oct_2026_v1", vertical: "roofing", ...utms };
}

function handleCtaClick() {
  track("webinar_register_cta_click", trackingBase(getUtmParams()));
  scrollToRegister();
}

/* ── Data ─────────────────────────────────────────────────────────── */

const WORKFLOWS: {
  num: string;
  title: string;
  description: string;
  examples?: string;
  outcome: string;
}[] = [
  {
    num: "01",
    title: "Estimate → Next Sales Action",
    description:
      "See how estimate status, customer activity and context can identify which opportunities actually need attention and what should happen next.",
    outcome: "Focus sales effort where action is actually required.",
  },
  {
    num: "02",
    title: "Sold Job → Production Ready",
    description:
      "See how a sold job can be checked for the information and dependencies required before production begins.",
    examples:
      "scope, contract, selections, deposit, materials, crew and documentation",
    outcome: "Make blocked jobs visible before they turn into coordination work.",
  },
  {
    num: "03",
    title: "Active Job → Exception Visibility",
    description:
      "See how operational or financial changes can surface only the jobs that need human attention.",
    outcome: "Manage exceptions instead of manually checking every job.",
  },
];

const DEMO_STEPS = [
  "An estimate is sent",
  "Business context changes",
  "The workflow detects what needs attention",
  "A next action is recommended",
  "A human reviews it and the workflow advances",
];

const PIPELINE_NODES = [
  "Existing Systems",
  "Operational Context",
  "Decision",
  "Next Action",
  "Human Review",
];

/* ── Main component ───────────────────────────────────────────────── */

export default function RoofingWebinarLanding() {
  useEffect(() => {
    track("webinar_landing_view", trackingBase(getUtmParams()));
  }, []);

  return (
    <>
      <PageStyles />
      <main>
        <HeroSection />
        <WhatYouWillSeeSection />
        <RecordingCallout />
        <RegistrationSection />
        <FaqSection />
        <FinalCtaSection />
      </main>
    </>
  );
}

/* ================================================================
   SECTION 1 — HERO
   ================================================================ */

function HeroSection() {
  return (
    <section className="wbn-hero">
      <div className="wbn-container">
        <div className="wbn-hero-grid">
          <div className="wbn-hero-copy">
            <div className="wbn-hero-badge">
              <span className="wbn-hero-badge-dot" />
              Live webinar for roofing companies
            </div>
            <h1 className="wbn-hero-h1">{WEBINAR_TITLE}</h1>
            <p className="wbn-hero-sub">
              See how estimate follow-up, sold-job handoff and production
              exceptions can become coordinated workflows around the systems you
              already use.
            </p>
            <button
              type="button"
              className="v8-btn-primary wbn-hero-cta"
              onClick={handleCtaClick}
            >
              Reserve my spot{" "}
              <span className="v8-arrow" aria-hidden="true">
                →
              </span>
            </button>
            <div className="wbn-info-row">
              <span>Live webinar</span>
              <span className="wbn-info-sep" aria-hidden="true">
                ·
              </span>
              <span>Early October</span>
              <span className="wbn-info-sep" aria-hidden="true">
                ·
              </span>
              <span>Exact date TBC</span>
              <span className="wbn-info-sep" aria-hidden="true">
                ·
              </span>
              <span>Recording available</span>
            </div>
            <p className="wbn-qualify">
              Built for roofing owners, Presidents, CEOs, COOs, GMs and
              operations leaders.
            </p>
          </div>
          <div className="wbn-hero-aside">
            <div className="wbn-hero-card">
              <p className="wbn-hero-card-label">What the webinar covers</p>
              <div className="wbn-hero-card-items">
                <div className="wbn-hero-card-item">
                  <span className="wbn-hero-card-num">01</span>
                  <span>Estimate follow-up that knows what needs attention</span>
                </div>
                <div className="wbn-hero-card-item">
                  <span className="wbn-hero-card-num">02</span>
                  <span>Sold jobs checked for production readiness</span>
                </div>
                <div className="wbn-hero-card-item">
                  <span className="wbn-hero-card-num">03</span>
                  <span>Exceptions surfaced before they become manual chasing</span>
                </div>
              </div>
              <div className="wbn-hero-card-footer">
                <span>Live demonstration + practical framework</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 2 — WHAT YOU WILL SEE (workflows + demo merged)
   ================================================================ */

function WhatYouWillSeeSection() {
  return (
    <section className="wbn-combined">
      {/* Top: intro + workflow cards */}
      <div className="wbn-combined-top">
        <div className="wbn-container">
          <h2 className="v8-section-title">
            Three roofing workflows where better coordination can create
            immediate operational leverage
          </h2>
          <p className="v8-lead" style={{ marginTop: 20, maxWidth: 700 }}>
            Most roofing companies already have capable CRM, estimating,
            production and accounting systems. The opportunity is often in what
            happens between them: deciding what needs attention, what is ready
            to move forward and where a human needs to step in.
          </p>
          <div className="wbn-workflows">
            {WORKFLOWS.map((w) => (
              <div key={w.num} className="wbn-wf-card">
                <div className="wbn-wf-head">
                  <span className="wbn-wf-num">{w.num}</span>
                  <h3 className="wbn-wf-title">{w.title}</h3>
                </div>
                <p className="v8-body" style={{ marginTop: 16 }}>
                  {w.description}
                </p>
                {w.examples && (
                  <p className="wbn-wf-examples">{w.examples}</p>
                )}
                <p className="wbn-wf-outcome">{w.outcome}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom: pipeline diagram + demo steps (dark) */}
      <div className="wbn-combined-bottom">
        <div className="wbn-container">
          <h3 className="wbn-combined-bottom-title">
            See the workflow, not another slide&nbsp;deck
          </h3>
          <p className="wbn-combined-bottom-sub">
            The webinar includes a practical working example, from start to
            finish, showing how a single roofing workflow moves through its
            lifecycle.
          </p>

          <div className="wbn-pipeline">
            {PIPELINE_NODES.map((label, i) => (
              <div key={i} className="wbn-pipe-node-wrap">
                {i > 0 && (
                  <span className="wbn-pipe-arrow" aria-hidden="true">
                    <svg
                      width="20"
                      height="10"
                      viewBox="0 0 20 10"
                      fill="none"
                    >
                      <path
                        d="M0 5h16m0 0l-4-4m4 4l-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
                <span className="wbn-pipe-node">{label}</span>
              </div>
            ))}
          </div>
          <p className="wbn-pipe-note">Your existing systems stay in place.</p>

          <ol className="wbn-demo-steps">
            {DEMO_STEPS.map((s, i) => (
              <li key={i} className="wbn-demo-step">
                <span className="wbn-demo-step-num">{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>

          <p className="wbn-demo-followup">
            When the job is sold, the same workflow context shifts from sales
            follow-up to production readiness.
          </p>

          <div className="wbn-takeaway">
            <p className="wbn-takeaway-title">
              Leave with a simple way to identify which workflow in your roofing
              operation is worth improving first.
            </p>
            <p className="wbn-takeaway-sub">
              Not a list of AI tools. A framework for choosing one operational
              workflow with a clear business reason to fix it.
            </p>
          </div>

          <div style={{ marginTop: 40, textAlign: "center" }}>
            <button
              type="button"
              className="v8-btn-primary"
              onClick={handleCtaClick}
            >
              Reserve my spot{" "}
              <span className="v8-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 3 — RECORDING REASSURANCE
   ================================================================ */

function RecordingCallout() {
  return (
    <section className="wbn-callout">
      <div className="wbn-container">
        <div className="wbn-callout-box">
          <h3 className="wbn-callout-title">
            Can&apos;t make the live session?
          </h3>
          <p className="v8-body">
            Register anyway. We&apos;ll send the recording to everyone who signs
            up, so you can watch it when it suits you.
          </p>
          <button
            type="button"
            className="v8-btn-primary"
            onClick={handleCtaClick}
            style={{ marginTop: 20 }}
          >
            Reserve my spot{" "}
            <span className="v8-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 4 — REGISTRATION FORM
   ================================================================ */

interface FormData {
  firstName: string;
  lastName: string;
  workEmail: string;
  company: string;
  existingSystems: string[];
  workflowInterest: string[];
}

const INITIAL_FORM: FormData = {
  firstName: "",
  lastName: "",
  workEmail: "",
  company: "",
  existingSystems: [],
  workflowInterest: [],
};

function toggleMultiValue(current: string[], value: string): string[] {
  const isOn = current.includes(value);
  if (isOn) return current.filter((v) => v !== value);
  if (value === "Not sure") return ["Not sure"];
  return [...current.filter((v) => v !== "Not sure"), value];
}

function joinForSheets(values: string[]): string {
  return values.join(", ");
}

function MultiSelectDropdown({
  groups,
  selected,
  onToggle,
  placeholder = "Select...",
}: {
  groups: { label?: string; options: string[] }[];
  selected: string[];
  onToggle: (value: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const summary = selected.length === 0 ? placeholder : selected.join(", ");

  return (
    <div className={`wbn-ms${open ? " wbn-ms-open" : ""}`} ref={wrapRef}>
      <button
        type="button"
        className="wbn-input wbn-ms-trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={selected.length === 0 ? "wbn-ms-placeholder" : undefined}>
          {summary}
        </span>
      </button>
      {open && (
        <div className="wbn-ms-panel" role="listbox" aria-multiselectable="true">
          {groups.map((group, i) => (
            <div key={group.label ?? `group-${i}`} className="wbn-ms-group">
              {group.label && (
                <div className="wbn-ms-group-label">{group.label}</div>
              )}
              {group.options.map((o) => {
                const checked = selected.includes(o);
                return (
                  <label
                    key={o}
                    className={`wbn-ms-option${checked ? " wbn-ms-option-on" : ""}`}
                    role="option"
                    aria-selected={checked}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => onToggle(o)}
                    />
                    <span className="wbn-ms-box" aria-hidden="true">
                      {checked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path
                            d="M1 4l2.8 2.8L9 1.6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </span>
                    <span>{o}</span>
                  </label>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function RegistrationSection() {
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [honeypot, setHoneypot] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const formLoadTimeRef = useRef<number>(Date.now());
  const hasStarted = useRef(false);

  const handleFormFocus = useCallback(() => {
    if (!hasStarted.current) {
      hasStarted.current = true;
      track("webinar_form_start", trackingBase(getUtmParams()));
    }
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        setTouched((prev) => ({ ...prev, [name]: true }));
      }
    },
    [touched],
  );

  const handleToggle = useCallback(
    (field: "existingSystems" | "workflowInterest", value: string) => {
      setForm((prev) => ({
        ...prev,
        [field]: toggleMultiValue(prev[field], value),
      }));
    },
    [],
  );

  const fieldError = useCallback(
    (name: keyof FormData) => {
      if (!touched[name]) return false;
      if (name === "firstName" || name === "lastName") return !form[name].trim();
      if (name === "workEmail") {
        if (!form.workEmail.trim()) return true;
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail);
      }
      return false;
    },
    [form, touched],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError("");

      // Silent bot checks — no feedback given
      if (honeypot) return;
      if (Date.now() - formLoadTimeRef.current < 3000) return;

      track("webinar_registration_submit_attempt", trackingBase(getUtmParams()));

      const required: (keyof FormData)[] = ["firstName", "lastName", "workEmail"];
      const newTouched: Record<string, boolean> = {};
      for (const k of required) newTouched[k] = true;
      setTouched((prev) => ({ ...prev, ...newTouched }));

      if (
        !form.firstName.trim() ||
        !form.lastName.trim() ||
        !form.workEmail.trim()
      ) {
        setError("Please fill in all required fields.");
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.workEmail)) {
        setError("Please enter a valid work email address.");
        return;
      }

      const existingSystems = joinForSheets(form.existingSystems);
      const workflowInterest = joinForSheets(form.workflowInterest);
      const utms = getUtmParams();

      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        workEmail: form.workEmail,
        company: form.company,
        existingSystems,
        primaryRoofingSystem: existingSystems,
        workflowInterest,
        webinar_id: "roofing_oct_2026_v1",
        vertical: "roofing",
        webinar_title: WEBINAR_TITLE,
        landing_page:
          typeof window !== "undefined" ? window.location.href : "",
        ...utms,
      };

      setSubmitting(true);

      try {
        // Google Apps Script does not include CORS headers on preflight
        // responses. Using text/plain avoids the preflight and no-cors lets
        // the browser send the request without one. The response is opaque
        // so we cannot read it — assume success on resolve.
        await fetch(FORM_ENDPOINT, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=UTF-8" },
          body: JSON.stringify(payload),
        });
        track("webinar_registration_success", trackingBase(utms));
        window.location.href = "/webinars/roofing-october-2026/thank-you/";
      } catch {
        track("webinar_registration_error", trackingBase(utms));
        setError(
          "Something went wrong. Please try again or email hello@beeclaros.com.",
        );
        setSubmitting(false);
      }
    },
    [form, honeypot],
  );

  return (
    <section className="wbn-section wbn-register" id="register">
      <div className="wbn-container">
        <div className="wbn-form-layout">
          <div className="wbn-form-header">
            <p className="v8-overline">Register</p>
            <h2 className="v8-section-title" style={{ marginTop: 16 }}>
              Reserve your spot
            </h2>
            <p className="v8-lead" style={{ marginTop: 16, maxWidth: 480 }}>
              Register now to attend live or receive the recording afterwards.
            </p>
            <div className="wbn-form-trust">
              <div className="wbn-form-trust-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="7" stroke="var(--v8-lime-deep)" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="var(--v8-lime-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Free to attend</span>
              </div>
              <div className="wbn-form-trust-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="7" stroke="var(--v8-lime-deep)" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="var(--v8-lime-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Recording included</span>
              </div>
              <div className="wbn-form-trust-item">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="7" stroke="var(--v8-lime-deep)" strokeWidth="1.5" />
                  <path d="M5 8l2 2 4-4" stroke="var(--v8-lime-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>Practical, workflow-first session</span>
              </div>
            </div>
          </div>

          <div className="wbn-form-card">
            <form
              onSubmit={handleSubmit}
              onFocus={handleFormFocus}
              className="wbn-form"
              noValidate
            >
              {/* Honeypot — hidden from users, readable by screen readers as decorative */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  opacity: 0,
                  pointerEvents: "none",
                  height: 0,
                  overflow: "hidden",
                }}
              >
                <label htmlFor="wbn-hp-website">Website</label>
                <input
                  id="wbn-hp-website"
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="wbn-field-grid">
                <label className="wbn-field">
                  <span className="wbn-field-label">
                    First name <span className="wbn-req">*</span>
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                    autoComplete="given-name"
                    className={`wbn-input${fieldError("firstName") ? " wbn-input-error" : ""}`}
                    placeholder="First name"
                  />
                </label>

                <label className="wbn-field">
                  <span className="wbn-field-label">
                    Last name <span className="wbn-req">*</span>
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                    autoComplete="family-name"
                    className={`wbn-input${fieldError("lastName") ? " wbn-input-error" : ""}`}
                    placeholder="Last name"
                  />
                </label>

                <label className="wbn-field wbn-field-full">
                  <span className="wbn-field-label">
                    Work email <span className="wbn-req">*</span>
                  </span>
                  <input
                    type="email"
                    name="workEmail"
                    value={form.workEmail}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    className={`wbn-input${fieldError("workEmail") ? " wbn-input-error" : ""}`}
                    placeholder="you@company.com"
                  />
                </label>

                <label className="wbn-field wbn-field-full">
                  <span className="wbn-field-label">
                    Company <span className="wbn-optional">(optional)</span>
                  </span>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    autoComplete="organization"
                    className="wbn-input"
                    placeholder="Company name"
                  />
                </label>

                <div className="wbn-field wbn-field-full">
                  <span className="wbn-field-label">
                    Existing systems{" "}
                    <span className="wbn-optional">(optional)</span>
                  </span>
                  <MultiSelectDropdown
                    groups={EXISTING_SYSTEM_GROUPS}
                    selected={form.existingSystems}
                    onToggle={(value) => handleToggle("existingSystems", value)}
                    placeholder="Select all that apply..."
                  />
                </div>

                <div className="wbn-field wbn-field-full">
                  <span className="wbn-field-label">
                    Workflow of interest{" "}
                    <span className="wbn-optional">(optional)</span>
                  </span>
                  <MultiSelectDropdown
                    groups={WORKFLOW_GROUPS}
                    selected={form.workflowInterest}
                    onToggle={(value) => handleToggle("workflowInterest", value)}
                    placeholder="Select all that apply..."
                  />
                </div>
              </div>

              {error && <p className="wbn-form-error">{error}</p>}

              <button
                type="submit"
                className="v8-btn-primary wbn-submit-btn"
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Reserve my spot"}{" "}
                {!submitting && (
                  <span className="v8-arrow" aria-hidden="true">
                    →
                  </span>
                )}
              </button>

              {/* TODO: add href to privacy policy route when /privacy or equivalent route is available */}
              <p className="wbn-privacy-note">
                We&apos;ll use your details to manage your webinar registration
                and send the recording.{" "}
                <a href="#" aria-label="Privacy policy">
                  Privacy policy
                </a>
              </p>

              <p className="wbn-form-note">
                Early October · Exact date to be confirmed · Recording included
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 5 — FAQ
   ================================================================ */

const FAQS = [
  {
    q: "When is the webinar?",
    a: "Early October. The exact date and time will be confirmed shortly. Registered attendees will be notified as soon as details are finalized.",
  },
  {
    q: "Will there be a recording?",
    a: "Yes. Registered attendees will receive the recording afterwards.",
  },
  {
    q: "Is this an AI webinar?",
    a: "The webinar will show where intelligent automation can help, but the focus is practical roofing workflows, existing systems and measurable operational outcomes.",
  },
  {
    q: "Do I need a specific roofing CRM?",
    a: "No. The concepts are designed around workflows and can be applied across different technology stacks.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="wbn-section wbn-bg-warm">
      <div className="wbn-container" style={{ maxWidth: 720 }}>
        <h2 className="v8-section-title">Frequently asked questions</h2>
        <div className="wbn-faq-list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="wbn-faq-item">
                <button
                  type="button"
                  className="wbn-faq-q"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <span
                    className="wbn-faq-icon"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="wbn-faq-a"
                  style={{
                    maxHeight: isOpen ? 200 : 0,
                    opacity: isOpen ? 1 : 0,
                    paddingBottom: isOpen ? 20 : 0,
                  }}
                >
                  <p className="v8-body">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SECTION 6 — FINAL CTA
   ================================================================ */

function FinalCtaSection() {
  return (
    <section className="wbn-final-cta">
      <div className="wbn-container" style={{ textAlign: "center" }}>
        <h2
          className="v8-section-title"
          style={{ color: "var(--v8-on-dark-primary)" }}
        >
          See what this could look like inside a roofing operation
        </h2>
        <p
          className="v8-lead"
          style={{
            marginTop: 16,
            color: "var(--v8-on-dark-secondary)",
            maxWidth: 480,
            marginInline: "auto",
          }}
        >
          Join the live session or register to receive the recording afterwards.
        </p>
        <button
          type="button"
          className="v8-btn-primary wbn-final-cta-btn"
          onClick={handleCtaClick}
          style={{ marginTop: 28 }}
        >
          Reserve my spot{" "}
          <span className="v8-arrow" aria-hidden="true">
            →
          </span>
        </button>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE STYLES
   ================================================================ */

function PageStyles() {
  return (
    <style>{`
      /* ── Layout ──────────────────────────────────────────────── */
      .wbn-container {
        width: 100%;
        max-width: var(--v8-content-max, 1280px);
        margin-inline: auto;
        padding-inline: var(--v8-gutter, clamp(1.25rem, 5vw, 4.5rem));
      }

      .wbn-section {
        padding-block: clamp(4.5rem, 9vw, 8rem);
      }

      .wbn-bg-warm {
        background: var(--v8-bg-secondary);
      }

      /* ── Hero ────────────────────────────────────────────────── */
      .wbn-hero {
        padding-top: clamp(3rem, 6vw, 5rem);
        padding-bottom: clamp(3.5rem, 7vw, 6rem);
        background: var(--v8-bg-contrast);
        border-bottom: 1px solid var(--v8-line);
      }

      .wbn-hero-grid {
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: clamp(2rem, 4vw, 4rem);
        align-items: start;
      }

      .wbn-hero-copy {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      }

      .wbn-hero-badge {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.75rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--v8-lime-deep);
        background: var(--v8-lime-pale);
        padding: 6px 14px;
        border-radius: 100px;
        font-weight: 500;
      }

      .wbn-hero-badge-dot {
        width: 7px;
        height: 7px;
        border-radius: 50%;
        background: var(--v8-lime-deep);
        animation: wbn-pulse 2s ease-in-out infinite;
      }

      @keyframes wbn-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }

      .wbn-hero-h1 {
        font-family: var(--font-v8-display, sans-serif);
        font-size: clamp(2.2rem, 4.5vw, 3.5rem);
        line-height: 1.08;
        letter-spacing: -0.03em;
        font-weight: 500;
        color: var(--v8-text-primary);
        margin: 20px 0 0;
      }

      .wbn-hero-sub {
        font-family: var(--font-v8-sans, sans-serif);
        font-size: clamp(1rem, 1.15vw, 1.125rem);
        line-height: 1.65;
        color: var(--v8-text-secondary);
        margin: 20px 0 0;
        max-width: 540px;
      }

      .wbn-hero-cta {
        margin-top: 28px;
        min-height: 54px;
        padding-inline: 36px;
        font-size: 0.875rem;
      }

      .wbn-info-row {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px 10px;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
      }

      .wbn-info-sep {
        color: var(--v8-line-strong);
      }

      .wbn-qualify {
        margin-top: 12px;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
        line-height: 1.5;
      }

      /* Hero aside card */
      .wbn-hero-aside {
        padding-top: 8px;
      }

      .wbn-hero-card {
        border: 1px solid var(--v8-line);
        border-radius: 6px;
        overflow: hidden;
        background: var(--v8-bg-secondary);
      }

      .wbn-hero-card-label {
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.6875rem;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
        padding: 20px 24px 0;
        margin: 0;
      }

      .wbn-hero-card-items {
        padding: 16px 24px 20px;
        display: flex;
        flex-direction: column;
        gap: 0;
      }

      .wbn-hero-card-item {
        display: flex;
        align-items: baseline;
        gap: 14px;
        padding: 12px 0;
        border-bottom: 1px solid var(--v8-line);
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.9375rem;
        line-height: 1.45;
        color: var(--v8-text-primary);
      }

      .wbn-hero-card-item:last-child {
        border-bottom: none;
      }

      .wbn-hero-card-num {
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.75rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        color: var(--v8-lime-deep);
        flex-shrink: 0;
      }

      .wbn-hero-card-footer {
        background: var(--v8-bg-dark);
        padding: 14px 24px;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--v8-lime);
      }

      @media (max-width: 900px) {
        .wbn-hero-grid {
          grid-template-columns: 1fr;
        }
        .wbn-hero-aside {
          padding-top: 0;
        }
      }

      @media (max-width: 480px) {
        .wbn-hero {
          padding-top: clamp(2rem, 6vw, 3rem);
        }
        .wbn-hero-cta {
          width: 100%;
          justify-content: center;
        }
      }

      /* ── Combined section (workflows + demo) ─────────────────── */
      .wbn-combined-top {
        padding-top: clamp(4.5rem, 9vw, 8rem);
        padding-bottom: clamp(3rem, 6vw, 5rem);
        background: var(--v8-bg-secondary);
      }

      .wbn-combined-bottom {
        padding-block: clamp(3.5rem, 7vw, 5.5rem);
        background: var(--v8-bg-dark);
      }

      .wbn-combined-bottom-title {
        font-family: var(--font-v8-display, sans-serif);
        font-size: clamp(1.5rem, 2.8vw, 2rem);
        font-weight: 500;
        letter-spacing: -0.02em;
        line-height: 1.15;
        color: var(--v8-on-dark-primary);
        margin: 0;
      }

      .wbn-combined-bottom-sub {
        font-family: var(--font-v8-sans, sans-serif);
        font-size: clamp(0.9375rem, 1.1vw, 1.0625rem);
        line-height: 1.65;
        color: var(--v8-on-dark-secondary);
        margin: 16px 0 0;
        max-width: 600px;
      }

      /* ── Workflows ───────────────────────────────────────────── */
      .wbn-workflows {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        margin-top: 40px;
      }

      .wbn-wf-card {
        background: var(--v8-bg-contrast);
        border: 1px solid var(--v8-line);
        border-radius: 6px;
        padding: 32px 28px;
        display: flex;
        flex-direction: column;
        transition: border-color 200ms ease;
      }

      .wbn-wf-card:hover {
        border-color: var(--v8-lime);
      }

      .wbn-wf-head {
        display: flex;
        align-items: baseline;
        gap: 12px;
      }

      .wbn-wf-num {
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.8125rem;
        font-weight: 500;
        letter-spacing: 0.08em;
        color: var(--v8-lime-deep);
        flex-shrink: 0;
      }

      .wbn-wf-title {
        font-family: var(--font-v8-display, sans-serif);
        font-size: clamp(1.15rem, 1.8vw, 1.35rem);
        font-weight: 500;
        letter-spacing: -0.015em;
        line-height: 1.2;
        color: var(--v8-text-primary);
        margin: 0;
      }

      .wbn-wf-examples {
        margin-top: 10px;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.6875rem;
        letter-spacing: 0.05em;
        color: var(--v8-text-muted);
        line-height: 1.6;
      }

      .wbn-wf-outcome {
        margin-top: auto;
        padding-top: 20px;
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.875rem;
        font-weight: 500;
        color: var(--v8-lime-deep);
        line-height: 1.5;
      }

      @media (max-width: 900px) {
        .wbn-workflows {
          grid-template-columns: 1fr;
        }
      }

      /* ── Pipeline + demo steps (dark) ────────────────────────── */
      .wbn-pipeline {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px 0;
        margin-top: 32px;
      }

      .wbn-pipe-node-wrap {
        display: flex;
        align-items: center;
      }

      .wbn-pipe-arrow {
        color: var(--v8-on-dark-muted);
        padding: 0 10px;
        display: flex;
        align-items: center;
      }

      .wbn-pipe-node {
        display: inline-flex;
        align-items: center;
        padding: 10px 18px;
        border: 1px solid var(--v8-on-dark-line);
        border-radius: var(--v8-radius);
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.75rem;
        letter-spacing: 0.04em;
        color: var(--v8-on-dark-secondary);
        white-space: nowrap;
      }

      .wbn-pipe-node-wrap:first-child .wbn-pipe-node {
        border-color: var(--v8-lime);
        color: var(--v8-lime);
      }

      .wbn-pipe-node-wrap:last-child .wbn-pipe-node {
        border-color: var(--v8-lime);
        color: var(--v8-lime);
      }

      .wbn-pipe-note {
        margin-top: 12px;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.6875rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--v8-lime-deep);
      }

      /* Vertical pipeline on narrow mobile */
      @media (max-width: 480px) {
        .wbn-pipeline {
          flex-direction: column;
          align-items: flex-start;
          gap: 0;
          flex-wrap: nowrap;
        }
        .wbn-pipe-node-wrap {
          flex-direction: column;
          align-items: flex-start;
        }
        .wbn-pipe-arrow {
          padding: 4px 0 4px 20px;
          transform: rotate(90deg);
          transform-origin: 10px center;
          height: 24px;
        }
        .wbn-pipe-node {
          white-space: normal;
          width: 100%;
          font-size: 0.75rem;
          padding: 10px 16px;
        }
      }

      .wbn-demo-steps {
        list-style: none;
        padding: 0;
        margin: 40px 0 0;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0 32px;
      }

      .wbn-demo-step {
        display: flex;
        align-items: baseline;
        gap: 14px;
        padding: 14px 0;
        border-bottom: 1px solid var(--v8-on-dark-line);
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.9375rem;
        line-height: 1.55;
        color: var(--v8-on-dark-secondary);
      }

      .wbn-demo-step-num {
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.75rem;
        font-weight: 500;
        color: var(--v8-lime);
        flex-shrink: 0;
        width: 20px;
        text-align: right;
      }

      .wbn-demo-followup {
        margin-top: 24px;
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.9375rem;
        line-height: 1.6;
        color: var(--v8-on-dark-muted);
        max-width: 600px;
      }

      /* ── Takeaway block ───────────────────────────────────────── */
      .wbn-takeaway {
        margin-top: 40px;
        padding: 24px 28px;
        border-left: 3px solid var(--v8-lime);
        background: rgba(255, 255, 255, 0.04);
        border-radius: 0 4px 4px 0;
      }

      .wbn-takeaway-title {
        font-family: var(--font-v8-display, sans-serif);
        font-size: clamp(1rem, 1.5vw, 1.125rem);
        font-weight: 500;
        color: var(--v8-on-dark-primary);
        margin: 0 0 8px;
        line-height: 1.35;
      }

      .wbn-takeaway-sub {
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.9375rem;
        line-height: 1.6;
        color: var(--v8-on-dark-secondary);
        margin: 0;
      }

      @media (max-width: 640px) {
        .wbn-demo-steps {
          grid-template-columns: 1fr;
        }
        .wbn-takeaway {
          padding: 20px 20px;
        }
      }

      /* ── Recording callout ───────────────────────────────────── */
      .wbn-callout {
        padding-block: clamp(2rem, 4vw, 3rem);
        background: var(--v8-bg-contrast);
      }

      .wbn-callout-box {
        background: var(--v8-lime-pale);
        border-radius: 6px;
        padding: clamp(28px, 4vw, 44px) clamp(24px, 4vw, 40px);
        max-width: 600px;
        margin-inline: auto;
        text-align: center;
      }

      .wbn-callout-title {
        font-family: var(--font-v8-display, sans-serif);
        font-size: clamp(1.2rem, 2.2vw, 1.5rem);
        font-weight: 500;
        color: var(--v8-text-primary);
        margin: 0 0 8px;
      }

      /* ── Registration form ───────────────────────────────────── */
      .wbn-register {
        background: var(--v8-bg-contrast);
        border-top: 1px solid var(--v8-line);
      }

      .wbn-form-layout {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: clamp(2rem, 5vw, 5rem);
        align-items: start;
      }

      .wbn-form-header {
        position: sticky;
        top: 96px;
      }

      .wbn-form-trust {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 28px;
      }

      .wbn-form-trust-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.875rem;
        color: var(--v8-text-secondary);
      }

      .wbn-form-trust-item svg {
        flex-shrink: 0;
      }

      .wbn-form-card {
        background: var(--v8-bg-secondary);
        border: 1px solid var(--v8-line);
        border-radius: 6px;
        padding: clamp(24px, 3vw, 36px);
        overflow: visible;
        position: relative;
      }

      .wbn-form {
        display: flex;
        flex-direction: column;
        position: relative;
      }

      .wbn-field-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 18px;
      }

      .wbn-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .wbn-field-label {
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.8125rem;
        font-weight: 500;
        color: var(--v8-text-primary);
      }

      .wbn-req {
        color: var(--v8-lime-deep);
      }

      .wbn-optional {
        font-weight: 400;
        color: var(--v8-text-muted);
      }

      .wbn-ms {
        position: relative;
      }

      .wbn-ms-trigger {
        display: flex;
        align-items: center;
        text-align: left;
        cursor: pointer;
        padding-right: 36px;
        appearance: none;
        background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m1 1 5 5 5-5' stroke='%237A817B' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
        background-repeat: no-repeat;
        background-position: right 14px center;
      }

      .wbn-ms-open .wbn-ms-trigger {
        border-color: var(--v8-lime);
        box-shadow: 0 0 0 3px var(--v8-lime-soft);
      }

      .wbn-ms-trigger span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .wbn-ms-placeholder {
        color: var(--v8-text-muted);
      }

      .wbn-ms-panel {
        position: absolute;
        z-index: 20;
        top: calc(100% + 6px);
        left: 0;
        right: 0;
        max-height: 280px;
        overflow: auto;
        background: var(--v8-bg-contrast);
        border: 1px solid var(--v8-line);
        border-radius: var(--v8-radius);
        box-shadow: 0 12px 32px rgba(20, 24, 20, 0.12);
        padding: 6px 0;
      }

      .wbn-ms-group + .wbn-ms-group {
        border-top: 1px solid var(--v8-line);
        margin-top: 4px;
        padding-top: 4px;
      }

      .wbn-ms-group-label {
        padding: 8px 14px 4px;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.625rem;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
      }

      .wbn-ms-option {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 14px;
        cursor: pointer;
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.875rem;
        color: var(--v8-text-primary);
        user-select: none;
        min-height: 44px;
      }

      .wbn-ms-option:hover,
      .wbn-ms-option-on {
        background: var(--v8-lime-pale);
      }

      .wbn-ms-option input {
        position: absolute;
        opacity: 0;
        width: 1px;
        height: 1px;
        pointer-events: none;
      }

      .wbn-ms-box {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        border: 1.5px solid var(--v8-line-strong, var(--v8-line));
        border-radius: 3px;
        display: grid;
        place-items: center;
        color: var(--v8-text-primary);
        background: var(--v8-bg-contrast);
      }

      .wbn-ms-option-on .wbn-ms-box {
        border-color: var(--v8-lime-deep);
        background: var(--v8-lime);
      }

      .wbn-input {
        height: 46px;
        padding: 0 14px;
        border: 1px solid var(--v8-line);
        border-radius: var(--v8-radius);
        background: var(--v8-bg-contrast);
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.9375rem;
        color: var(--v8-text-primary);
        transition: border-color 200ms ease, box-shadow 200ms ease;
        outline: none;
        width: 100%;
        box-sizing: border-box;
      }

      .wbn-input::placeholder {
        color: var(--v8-text-muted);
      }

      .wbn-input:focus {
        border-color: var(--v8-lime);
        box-shadow: 0 0 0 3px var(--v8-lime-soft);
      }

      .wbn-input-error {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
      }

      .wbn-input-error:focus {
        border-color: #dc2626;
        box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
      }

      .wbn-field-full {
        grid-column: 1 / -1;
      }

      .wbn-form-error {
        margin-top: 16px;
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.875rem;
        color: #b91c1c;
        background: #fef2f2;
        padding: 10px 14px;
        border-radius: var(--v8-radius);
        border: 1px solid #fecaca;
      }

      .wbn-submit-btn {
        margin-top: 24px;
        width: 100%;
        justify-content: center;
        min-height: 52px;
        font-size: 0.875rem;
      }

      .wbn-submit-btn:disabled {
        opacity: 0.6;
        pointer-events: none;
      }

      .wbn-privacy-note {
        margin-top: 12px;
        text-align: center;
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 0.75rem;
        line-height: 1.5;
        color: var(--v8-text-muted);
      }

      .wbn-privacy-note a {
        color: var(--v8-text-muted);
        text-decoration: underline;
        text-underline-offset: 2px;
      }

      .wbn-form-note {
        margin-top: 10px;
        text-align: center;
        font-family: var(--font-v8-mono, monospace);
        font-size: 0.6875rem;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--v8-text-muted);
      }

      @media (max-width: 800px) {
        .wbn-form-layout {
          grid-template-columns: 1fr;
        }
        .wbn-form-header {
          position: static;
        }
        .wbn-field-grid {
          grid-template-columns: 1fr;
        }
      }

      @media (max-width: 480px) {
        .wbn-form-card {
          overflow-x: clip;
        }
      }

      /* ── FAQ ──────────────────────────────────────────────────── */
      .wbn-faq-list {
        margin-top: 36px;
      }

      .wbn-faq-item {
        border-bottom: 1px solid var(--v8-line);
      }

      .wbn-faq-q {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 16px;
        padding: 20px 0;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        font-family: var(--font-v8-sans, sans-serif);
        font-size: 1rem;
        font-weight: 500;
        color: var(--v8-text-primary);
        line-height: 1.4;
        min-height: 44px;
      }

      .wbn-faq-icon {
        font-size: 1.4rem;
        font-weight: 300;
        color: var(--v8-text-muted);
        transition: transform 200ms ease;
        flex-shrink: 0;
        line-height: 1;
      }

      .wbn-faq-a {
        overflow: hidden;
        transition: max-height 300ms ease, opacity 300ms ease, padding-bottom 300ms ease;
      }

      /* ── Final CTA ───────────────────────────────────────────── */
      .wbn-final-cta {
        background: var(--v8-bg-dark);
        padding-block: clamp(4rem, 8vw, 6rem);
      }

      .wbn-final-cta-btn {
        min-height: 52px;
      }

      @media (max-width: 480px) {
        .wbn-final-cta-btn {
          width: 100%;
          justify-content: center;
        }
      }
    `}</style>
  );
}
