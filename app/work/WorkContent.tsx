"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import PhaseSection from "@/components/phase/PhaseSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ─── Data ────────────────────────────────────────────────────────── */

type CaseKey = "professional-services" | "healthcare" | "logistics" | "revenue-operations" | "recruitment";

interface CaseTab {
  key: CaseKey;
  num: string;
  title: string;
  sub: string;
  industry: string;
}

interface ScopeItem {
  num: string;
  title: string;
  text: string;
}

interface ImpactSignal {
  label: string;
  number: string;
  metric: string;
  source: string;
}

interface CaseData {
  chips: string[];
  title: string;
  lead: string;
  summary: { label: string; text: string }[];
  scopeNote: string;
  scope: ScopeItem[];
  impactOverline: string;
  impactTitle: string;
  impactText: string;
  signals: ImpactSignal[];
}

const HASH_ALIASES: Record<string, CaseKey> = {
  "field-operations": "professional-services",
};

const TABS: CaseTab[] = [
  { key: "professional-services", num: "SERVICES", title: "Professional services", sub: "Mobile capture · translation · reporting", industry: "Professional services" },
  { key: "healthcare", num: "SYSTEMS", title: "Healthcare workflows", sub: "Integration · modernisation · automation", industry: "Healthcare" },
  { key: "logistics", num: "OPERATIONS", title: "Warehouse & logistics", sub: "Goods · inventory · operational control", industry: "Logistics" },
  { key: "revenue-operations", num: "FINANCE", title: "Revenue operations", sub: "Receivables · payments · reconciliation", industry: "Finance" },
  { key: "recruitment", num: "GROWTH", title: "Recruitment & staffing", sub: "Intake · candidate flow · placements", industry: "Recruitment" },
];

const CASES: Record<CaseKey, CaseData> = {
  "professional-services": {
    chips: ["Professional services", "Mobile reporting"],
    title: "A simpler link between field and office.",
    lead: "Field employees needed a faster way to report information without turning each update into extra administrative work. Language differences between field and office teams added another manual step.",
    summary: [
      { label: "Environment", text: "Field-based professional services" },
      { label: "Focus", text: "Mobile capture, translation and reporting" },
      { label: "Pattern", text: "Make reporting fit naturally into field work" },
    ],
    scopeNote: "The application was designed around the person doing the work in the field, not around the reporting burden of the office.",
    scope: [
      { num: "01", title: "Mobile capture", text: "Submit voice, written information, photos and job context directly from the field." },
      { num: "02", title: "Translation", text: "Present submitted information in the language required by the office team." },
      { num: "03", title: "Structured reporting", text: "Convert unstructured field input into consistent information linked to the relevant activity." },
      { num: "04", title: "Operational handoff", text: "Move information into the next business step with less manual rewriting and coordination." },
    ],
    impactOverline: "Business outcome",
    impactTitle: "Capture once in the field. Arrive at the office ready for review.",
    impactText: "Voice, written updates, photos and job context could move through translation and structuring as one workflow, removing avoidable transcription, rewriting and language handoffs before the information could be used.",
    signals: [
      { label: "Reporting", number: ">50%", metric: "time saved on daily reports", source: "Field updates no longer rewritten into office-ready reports" },
      { label: "Field capture", number: "50%", metric: "faster field notes", source: "Voice, photos and job context captured in one pass" },
      { label: "Documentation", number: "95%", metric: "less documentation time", source: "Records assembled from work already done on site" },
    ],
  },
  healthcare: {
    chips: ["Healthcare", "Software & integration"],
    title: "Connected healthcare workflows.",
    lead: "The software environment depended on several applications, data sources and operational processes. The opportunity was to make those systems work together as one clearer workflow instead of adding another disconnected interface.",
    summary: [
      { label: "Environment", text: "Healthcare platforms and enterprise systems" },
      { label: "Focus", text: "Integration, modernisation and process reliability" },
      { label: "Pattern", text: "Connect existing systems before replacing them" },
    ],
    scopeNote: "The work centred on reducing friction between systems, information and everyday user actions while keeping the operational environment maintainable.",
    scope: [
      { num: "01", title: "System integration", text: "Connect applications and enterprise systems so information can move without unnecessary duplication." },
      { num: "02", title: "Workflow modernisation", text: "Replace fragmented manual steps with structured digital processes." },
      { num: "03", title: "Process automation", text: "Automate repetitive administrative actions while preserving required review points." },
      { num: "04", title: "Intelligent assistance", text: "Use retrieval, language or content processing selectively where it improves the workflow." },
    ],
    impactOverline: "Business outcome",
    impactTitle: "Less friction between systems and the people using them.",
    impactText: "Connected workflows reduced the need to move information manually between applications and gave teams a clearer, more consistent path from information to action.",
    signals: [
      { label: "Revenue", number: "15%", metric: "of total revenue recovered", source: "Recall and follow-up that used to stall between systems" },
      { label: "Growth", number: "+147%", metric: "new appointments", source: "Demand captured instead of lost across disconnected booking steps" },
      { label: "Volume", number: "+22%", metric: "patient volume", source: "The same clinical capacity used more consistently" },
    ],
  },
  logistics: {
    chips: ["Logistics", "Operational software"],
    title: "Software for complex physical operations.",
    lead: "Goods, inventory, vehicles, documents and operational events had to move through the right sequence while different teams continuously coordinated what should happen next.",
    summary: [
      { label: "Environment", text: "Warehouse and terminal operations" },
      { label: "Focus", text: "Goods, stock, vehicles and exceptions" },
      { label: "Pattern", text: "Turn business rules into usable operational software" },
    ],
    scopeNote: "The system supported non-technical operational users working in a complex physical environment where clarity and sequence matter.",
    scope: [
      { num: "01", title: "Goods management", text: "Support receiving, storage, movement and processing across the operation." },
      { num: "02", title: "Inventory workflows", text: "Make stock position, locations, movements and discrepancies easier to manage." },
      { num: "03", title: "Vehicle & facility operations", text: "Support arrivals, loading, unloading and facility coordination." },
      { num: "04", title: "Integration & automation", text: "Reduce repetitive data entry and unnecessary transfers between processes and systems." },
    ],
    impactOverline: "Business outcome",
    impactTitle: "Complex physical operations became easier to coordinate from one operational flow.",
    impactText: "Goods, stock, vehicle activity and exceptions were brought into a structured software environment, reducing the coordination burden created by fragmented operational steps.",
    signals: [
      { label: "Productivity", number: "60%", metric: "operations time saved", source: "Less time spent coordinating goods, stock and vehicles by hand" },
      { label: "Speed", number: "+35%", metric: "order-processing improvement", source: "Orders move through receiving, location and dispatch with fewer stops" },
      { label: "Margin", number: "+10%", metric: "operating margin", source: "Fewer exception loops and less wasted movement on the floor" },
    ],
  },
  "revenue-operations": {
    chips: ["Finance", "Revenue operations"],
    title: "From invoices to cash, without the manual handoffs.",
    lead: "Receivables work often spreads across invoices, payment methods, follow-ups, reconciliation and finance exceptions. The system design brings those steps into one clearer operating flow so teams spend less time chasing status and more time resolving what actually needs attention.",
    summary: [
      { label: "Environment", text: "Finance, billing and payment operations" },
      { label: "Focus", text: "Receivables, payment status and reconciliation" },
      { label: "Pattern", text: "Connect revenue events from invoice to cash" },
    ],
    scopeNote: "The workflow is designed around the revenue event itself, reducing the fragmentation between billing, payment processing, follow-up and reconciliation.",
    scope: [
      { num: "01", title: "Receivables workflow", text: "Keep balances, customer context and the next required action visible in one operational flow." },
      { num: "02", title: "Payment integration", text: "Connect payment events back to the systems and records finance teams already use." },
      { num: "03", title: "Reconciliation automation", text: "Automate matching where the data is clear and route only ambiguous cases for review." },
      { num: "04", title: "Exception control", text: "Surface overdue, unmatched or unusual cases before they become recurring revenue leakage." },
    ],
    impactOverline: "Business outcome",
    impactTitle: "Shorter time from invoice to cash, with less finance administration around every payment.",
    impactText: "Connecting receivables, payment processing and reconciliation shortens the path from invoice to cash, so the operation can grow without matching that growth in finance administration.",
    signals: [
      { label: "Cash velocity", number: "80%", metric: "decrease in DSO", source: "Invoices reach cash with fewer stalled follow-ups" },
      { label: "Cost", number: "98%", metric: "lower transaction fees", source: "Payment handling no longer spread across disconnected methods" },
      { label: "Growth", number: "+11%", metric: "new customers with no new headcount", source: "Volume grows without adding equivalent finance work" },
    ],
  },
  recruitment: {
    chips: ["Professional services", "Recruitment & staffing"],
    title: "More placements from a clearer recruiting workflow.",
    lead: "Recruitment performance depends on many small handoffs: understanding the client requirement, finding relevant candidates, screening, coordinating feedback and keeping the ATS current. The opportunity is to reduce the operational drag around recruiters without removing the judgement that drives a good placement.",
    summary: [
      { label: "Environment", text: "Recruitment and staffing operations" },
      { label: "Focus", text: "Intake, candidate flow and recruiter productivity" },
      { label: "Pattern", text: "Automate coordination around human judgement" },
    ],
    scopeNote: "The goal is not to automate the recruiter. It is to remove the administrative friction surrounding the moments where recruiter judgement creates value.",
    scope: [
      { num: "01", title: "Requirement intake", text: "Structure client conversations, role requirements and decision criteria before search begins." },
      { num: "02", title: "Candidate workflow", text: "Support sourcing, rediscovery, engagement and screening while preserving recruiter review." },
      { num: "03", title: "ATS & CRM integration", text: "Keep interactions, candidate context and next actions synchronised with existing systems." },
      { num: "04", title: "Placement coordination", text: "Reduce delays between feedback, interview, offer, placement and start readiness." },
    ],
    impactOverline: "Business outcome",
    impactTitle: "Less recruiter administration around the work that actually produces placements.",
    impactText: "Clearer intake, interaction visibility and recruiter workflows raise placement performance, shorten ramp and remove time spent reconstructing client requirements.",
    signals: [
      { label: "Placements", number: "+36%", metric: "lift in fill / placement rate", source: "More roles filled from the same recruiter effort" },
      { label: "Ramp", number: "50%", metric: "faster recruiter ramp", source: "New recruiters reach a productive workflow sooner" },
      { label: "Intake", number: "1–2h", metric: "removed from intake work", source: "Client requirements structured once, not rebuilt later" },
    ],
  },
};

const PRINCIPLES = [
  { num: "01", title: "Start from the process", text: "Map the decisions, bottlenecks and handoffs before choosing technology." },
  { num: "02", title: "Connect before replacing", text: "Use the systems already running the business where they still make sense." },
  { num: "03", title: "Automate repetitive work", text: "Remove manual transfers, rewriting and administration that do not need human judgement." },
  { num: "04", title: "Use AI selectively", text: "Apply it where language, retrieval, interpretation or unstructured information genuinely benefits from it." },
];

/* ─── Inline visuals ──────────────────────────────────────────────── */

function HealthcareVisual() {
  return (
    <div className="work-visual-wrap">
      <div className="work-visual-grid" />
      <div className="health-map">
        <div className="v-node">
          <span className="n-label">Existing systems</span>
          <strong>Clinical, operational and patient-facing software</strong>
        </div>
        <span className="v-arrow">&rarr;</span>
        <div className="v-node primary">
          <span className="n-label">Workflow layer</span>
          <strong>Integration, rules and automation</strong>
        </div>
        <span className="v-arrow">&rarr;</span>
        <div className="v-node">
          <span className="n-label">Users</span>
          <strong>Teams act with the right context</strong>
        </div>
      </div>
    </div>
  );
}

function LogisticsVisual() {
  return (
    <div className="work-visual-wrap">
      <div className="ops-visual">
        <div className="ops-cell">
          <span>01 / RECEIVE</span>
          <strong>Goods arrive</strong>
          <small>Receipt, references and context enter the workflow.</small>
        </div>
        <div className="ops-cell alt">
          <span>02 / LOCATE</span>
          <strong>Inventory moves</strong>
          <small>Location, availability and movement remain visible.</small>
        </div>
        <div className="ops-cell alt">
          <span>03 / COORDINATE</span>
          <strong>Trucks &amp; tasks</strong>
          <small>Loading, unloading and readiness are coordinated.</small>
        </div>
        <div className="ops-cell">
          <span>04 / CONTROL</span>
          <strong>Exceptions surface</strong>
          <small>Blocked actions and discrepancies become visible.</small>
        </div>
      </div>
    </div>
  );
}

function ProfessionalServicesVisual() {
  return (
    <div className="work-visual-wrap field-phone-visual">
      <div className="work-visual-grid" style={{ opacity: 0.38 }} />
      <div className="float-badge">Field update</div>
      <div className="phone-side-note">
        <strong>Workflow</strong>
        Capture once. Translate and structure before the office review.
      </div>
      <div className="phone-wrap">
        <div className="phone" aria-hidden="true">
          <div className="phone-notch" />
          <div className="phone-screen">
            <div>
              <div className="app-title">Site update</div>
              <div className="app-meta">Job 0247 · 14:32</div>
            </div>
            <div className="voice-bar">
              <div className="mic">●</div>
              <div className="wave" />
            </div>
            <div className="translation">
              Translated update ready for review. Original language retained with the submitted record.
            </div>
            <div className="photo-row">
              <div className="photo" />
              <div className="photo" />
              <div className="photo" />
            </div>
            <div className="app-meta">3 photos attached · job context linked</div>
            <div className="submit">Send for review &rarr;</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RevenueOpsVisual() {
  return (
    <div className="work-visual-wrap revenue-visual">
      <div className="work-visual-grid" />
      <div className="business-flow revenue">
        <div className="flow-card">
          <span>01 / Invoice</span>
          <strong>Amount becomes due</strong>
          <small>Customer, terms and billing context enter the flow.</small>
        </div>
        <div className="flow-card">
          <span>02 / Collect</span>
          <strong>Follow-up is prioritised</strong>
          <small>Open balances and actions stay visible.</small>
        </div>
        <div className="flow-card dark">
          <span>03 / Payment</span>
          <strong>Money moves</strong>
          <small>Status and payment context remain connected.</small>
        </div>
        <div className="flow-card">
          <span>04 / Match</span>
          <strong>Cash is reconciled</strong>
          <small>Payments are matched back to the right records.</small>
        </div>
        <div className="flow-card">
          <span>05 / Exception</span>
          <strong>Only issues surface</strong>
          <small>Teams review mismatches instead of every transaction.</small>
        </div>
      </div>
    </div>
  );
}

function RecruitmentVisual() {
  return (
    <div className="work-visual-wrap">
      <div className="work-visual-grid" />
      <div className="recruit-pipeline">
        <div className="pipeline-row">
          <span className="stage">Client intake</span>
          <strong>Turn conversations into a structured requirement</strong>
          <small>CONTEXT</small>
        </div>
        <div className="pipeline-line" />
        <div className="pipeline-row">
          <span className="stage">Search</span>
          <strong>Surface and re-engage relevant candidates</strong>
          <small>MATCH</small>
        </div>
        <div className="pipeline-line" />
        <div className="pipeline-row">
          <span className="stage">Screen</span>
          <strong>Capture qualification and candidate context</strong>
          <small>REVIEW</small>
        </div>
        <div className="pipeline-line" />
        <div className="pipeline-row">
          <span className="stage">Submit</span>
          <strong>Keep client feedback and next actions connected</strong>
          <small>SYNC</small>
        </div>
        <div className="pipeline-line" />
        <div className="pipeline-row highlight">
          <span className="stage">Placement</span>
          <strong>Move the right candidate to start faster</strong>
          <small>REVENUE</small>
        </div>
      </div>
    </div>
  );
}

const VISUALS: Record<CaseKey, () => React.ReactNode> = {
  "professional-services": ProfessionalServicesVisual,
  healthcare: HealthcareVisual,
  logistics: LogisticsVisual,
  "revenue-operations": RevenueOpsVisual,
  recruitment: RecruitmentVisual,
};

/* ─── Exported tab data for navigation ────────────────────────────── */

export { TABS };
export type { CaseKey };

/* ─── Main component ──────────────────────────────────────────────── */

export default function WorkContent() {
  const [active, setActive] = useState<CaseKey>("professional-services");
  const tabsRef = useRef<HTMLDivElement>(null);
  const casesRef = useRef<HTMLElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  useScrollReveal(casesRef);
  useScrollReveal(principlesRef);

  const activeIdx = TABS.findIndex((t) => t.key === active);

  const showCase = useCallback((key: CaseKey, scroll = false) => {
    setActive(key);
    history.replaceState(null, "", "#" + key);
    if (scroll) {
      document.getElementById("cases")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  useEffect(() => {
    const resolveHash = (raw: string): CaseKey | null => {
      if (TABS.some((t) => t.key === raw)) return raw as CaseKey;
      return HASH_ALIASES[raw] ?? null;
    };
    const hash = resolveHash(window.location.hash.replace("#", ""));
    if (hash) showCase(hash);
    const onHash = () => {
      const h = resolveHash(window.location.hash.replace("#", ""));
      if (h) showCase(h);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [showCase]);

  useEffect(() => {
    const btn = tabsRef.current?.querySelector(".case-tab.active");
    btn?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [active]);

  const c = CASES[active];
  const Visual = VISUALS[active];

  return (
    <>
      {/* ── Case studies section ────────────────────────────────────── */}
      <section ref={casesRef} className="v8-section" id="cases" style={{ background: "var(--v8-bg-primary)" }}>
        <div className="v8-container">
          {/* Head */}
          <div className="work-head v8-reveal">
            <div>
              <div className="v8-overline" style={{ color: "var(--v8-lime-deep)" }}>Case studies</div>
              <h2 className="v8-section-title" style={{ marginTop: "1rem" }}>
                Operational problems translated into working systems.
              </h2>
            </div>
            <p className="v8-lead">
              Each case shows the operating context, solution design and capabilities involved.
            </p>
          </div>

          {/* Carousel: arrows + tabs */}
          <div className="case-carousel v8-reveal v8-reveal-1" aria-label="Selected case studies carousel">
            <button
              className="case-arrow"
              type="button"
              aria-label="Previous case"
              disabled={activeIdx === 0}
              onClick={() => { if (activeIdx > 0) showCase(TABS[activeIdx - 1].key); }}
            >
              &larr;
            </button>
            <div ref={tabsRef} className="case-tabs" role="tablist" aria-label="Selected case studies">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={active === tab.key}
                  className={`case-tab${active === tab.key ? " active" : ""}`}
                  onClick={() => showCase(tab.key)}
                >
                  <span className="tab-num">{tab.num}</span>
                  <span className="tab-title">{tab.title}</span>
                  <span className="tab-sub">{tab.sub}</span>
                </button>
              ))}
            </div>
            <button
              className="case-arrow"
              type="button"
              aria-label="Next case"
              disabled={activeIdx === TABS.length - 1}
              onClick={() => { if (activeIdx < TABS.length - 1) showCase(TABS[activeIdx + 1].key); }}
            >
              &rarr;
            </button>
          </div>

          {/* Active panel */}
          <div className="case-stage v8-reveal v8-reveal-2">
            <article className="case-panel" key={active}>
              {/* Top: copy + visual */}
              <div className="case-top">
                <div className="case-copy">
                  <div className="case-meta">
                    {c.chips.map((chip) => (
                      <span key={chip} className="chip">{chip}</span>
                    ))}
                  </div>
                  <h3 className="case-title">{c.title}</h3>
                  <p className="v8-lead" style={{ marginTop: "1.45rem", maxWidth: "35rem" }}>{c.lead}</p>
                  <div className="case-summary">
                    {c.summary.map((s) => (
                      <div key={s.label}>
                        <strong>{s.label}</strong>
                        <span>{s.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="case-visual">
                  <Visual />
                </div>
              </div>

              {/* Bottom: scope */}
              <div className="case-bottom">
                <div className="scope-note">
                  <div className="v8-overline" style={{ color: "var(--v8-lime-deep)" }}>Case scope</div>
                  <p>{c.scopeNote}</p>
                </div>
                <div>
                  <div className="scope-grid">
                    {c.scope.map((s) => (
                      <div key={s.num} className="scope-item">
                        <span className="scope-num">{s.num}</span>
                        <h4>{s.title}</h4>
                        <p>{s.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact panel */}
              <section className="impact-panel" aria-label="Business outcome">
                <div className="impact-main">
                  <div className="impact-overline">{c.impactOverline}</div>
                  <h4>{c.impactTitle}</h4>
                  <p>{c.impactText}</p>
                </div>
                <div className="impact-signals">
                  {c.signals.map((sig) => (
                    <div key={sig.label} className="impact-signal">
                      <span>{sig.label}</span>
                      <strong className="impact-number">{sig.number}</strong>
                      <div className="impact-label">{sig.metric}</div>
                      <small className="impact-source">{sig.source}</small>
                    </div>
                  ))}
                </div>
              </section>
            </article>
          </div>
        </div>
      </section>

      {/* ── Common principles ───────────────────────────────────────── */}
      <PhaseSection tone="dark" imageSrc="/images/bg-hive.png" imageSide="right" imageOpacity={0.18}>
        <div ref={principlesRef}>
          <div className="work-common-head v8-reveal">
            <div>
              <div className="v8-overline" style={{ color: "var(--v8-lime)" }}>Across the work</div>
              <h2
                className="v8-section-title"
                style={{ marginTop: "1rem", color: "var(--v8-on-dark-primary)", maxWidth: "15ch" }}
              >
                Different systems. Common delivery principles.
              </h2>
            </div>
            <p className="v8-lead" style={{ color: "var(--v8-on-dark-secondary)", maxWidth: "38rem" }}>
              The technology changes with the environment. The core approach stays consistent: understand the process, connect what already exists, remove repetitive work and add intelligence only where it earns its place.
            </p>
          </div>

          <div className="work-principles v8-reveal v8-reveal-1">
            {PRINCIPLES.map((p) => (
              <div key={p.num} className="work-principle">
                <span className="v8-mono" style={{ fontSize: "0.65rem", letterSpacing: "0.12em", color: "var(--v8-lime)" }}>
                  {p.num}
                </span>
                <h4 className="v8-display" style={{ margin: "0.65rem 0 0.45rem", fontSize: "1.12rem", fontWeight: 500, color: "var(--v8-on-dark-primary)" }}>
                  {p.title}
                </h4>
                <p style={{ margin: 0, color: "var(--v8-on-dark-secondary)", fontSize: "0.88rem", lineHeight: 1.58 }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PhaseSection>

      {/* ── Scoped styles ───────────────────────────────────────────── */}
      <style>{`
        /* ── Work head ─────────────────────────────────────── */
        .work-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 6rem);
          align-items: end;
          margin-bottom: clamp(2.5rem, 5vw, 4rem);
        }
        .work-head .v8-lead {
          max-width: 38rem;
          justify-self: end;
        }

        /* ── Carousel ─────────────────────────────────────── */
        .case-carousel {
          display: grid;
          grid-template-columns: 52px minmax(0, 1fr) 52px;
          align-items: stretch;
          border-top: 1px solid var(--v8-line);
          border-bottom: 1px solid var(--v8-line);
          background: rgba(255,255,255,.25);
        }
        .case-arrow {
          appearance: none;
          border: 0;
          background: var(--v8-bg-primary);
          cursor: pointer;
          display: grid;
          place-items: center;
          font-family: var(--font-v8-mono), monospace;
          font-size: 1.05rem;
          color: var(--v8-text-primary);
          transition: background 180ms var(--v8-ease), opacity 180ms var(--v8-ease);
          z-index: 2;
        }
        .case-arrow:first-child { border-right: 1px solid var(--v8-line); }
        .case-arrow:last-child  { border-left:  1px solid var(--v8-line); }
        .case-arrow:hover:not(:disabled) { background: var(--v8-lime); }
        .case-arrow:disabled { opacity: .28; cursor: default; }

        /* ── Tabs ──────────────────────────────────────────── */
        .case-tabs {
          display: flex;
          overflow-x: auto;
          scroll-behavior: smooth;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          background: transparent;
        }
        .case-tabs::-webkit-scrollbar { display: none; }
        .case-tab {
          appearance: none;
          border: 0;
          border-right: 1px solid var(--v8-line);
          background: transparent;
          text-align: left;
          padding: 1.35rem 1.4rem;
          cursor: pointer;
          transition: background 220ms var(--v8-ease), color 220ms var(--v8-ease);
          font-family: inherit;
          flex: 0 0 min(31%, 290px);
          min-width: 230px;
          scroll-snap-align: start;
        }
        .case-tab:last-child { border-right: 0; }
        .case-tab:hover { background: rgba(255,255,255,.65); }
        .case-tab.active { background: var(--v8-bg-dark); color: #fff; }
        .tab-num {
          display: block;
          font-family: var(--font-v8-mono), monospace;
          font-size: .66rem;
          letter-spacing: .12em;
          color: var(--v8-text-muted);
          margin-bottom: .45rem;
        }
        .case-tab.active .tab-num { color: var(--v8-lime); }
        .tab-title {
          display: block;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.05rem;
          font-weight: 600;
          letter-spacing: -.015em;
        }
        .tab-sub {
          display: block;
          margin-top: .35rem;
          font-size: .78rem;
          color: var(--v8-text-muted);
        }
        .case-tab.active .tab-sub { color: var(--v8-on-dark-secondary); }

        /* ── Panel ─────────────────────────────────────────── */
        .case-stage { margin-top: clamp(2rem, 4vw, 3rem); }
        .case-panel {
          background: var(--v8-bg-contrast);
          border: 1px solid var(--v8-line);
          animation: fadeCase .38s var(--v8-ease);
        }
        @keyframes fadeCase {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: none; }
        }

        /* Top */
        .case-top {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(340px, .95fr);
          border-bottom: 1px solid var(--v8-line);
        }
        .case-copy { padding: clamp(2.4rem, 5vw, 4.8rem); }
        .case-visual {
          position: relative;
          min-height: 390px;
          border-left: 1px solid var(--v8-line);
          background: var(--v8-bg-secondary);
          overflow: hidden;
        }
        .case-meta { display: flex; flex-wrap: wrap; gap: .45rem; margin-bottom: 1.35rem; }
        .chip {
          display: inline-flex;
          padding: .38rem .55rem;
          border: 1px solid var(--v8-line);
          font-family: var(--font-v8-mono), monospace;
          font-size: .64rem;
          letter-spacing: .11em;
          text-transform: uppercase;
          color: var(--v8-text-muted);
          background: #fff;
        }
        .case-title {
          margin: 0;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          line-height: 1.03;
          letter-spacing: -.035em;
          font-weight: 500;
          max-width: 13ch;
        }
        .case-summary {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          margin-top: 2rem;
          border-top: 1px solid var(--v8-line);
          border-bottom: 1px solid var(--v8-line);
        }
        .case-summary > div {
          padding: 1rem 1rem 1rem 0;
          border-right: 1px solid var(--v8-line);
        }
        .case-summary > div + div { padding-left: 1rem; }
        .case-summary > div:last-child { border-right: 0; }
        .case-summary strong {
          display: block;
          font-family: var(--font-v8-mono), monospace;
          font-size: .63rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: var(--v8-text-muted);
          font-weight: 500;
        }
        .case-summary span {
          display: block;
          margin-top: .35rem;
          font-size: .84rem;
          line-height: 1.45;
          color: var(--v8-text-secondary);
        }

        /* Bottom */
        .case-bottom {
          display: grid;
          grid-template-columns: .72fr 1.28fr;
          gap: clamp(2rem, 5vw, 5rem);
          padding: clamp(2.4rem, 5vw, 4.8rem);
        }
        .scope-note p {
          margin: 1rem 0 0;
          color: var(--v8-text-secondary);
          max-width: 25rem;
        }
        .scope-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          border-top: 1px solid var(--v8-line);
        }
        .scope-item {
          padding: 1.4rem 1.2rem 1.5rem 0;
          border-bottom: 1px solid var(--v8-line);
          min-height: 142px;
        }
        .scope-item:nth-child(odd) { border-right: 1px solid var(--v8-line); padding-right: 1.6rem; }
        .scope-item:nth-child(even) { padding-left: 1.6rem; }
        .scope-num {
          font-family: var(--font-v8-mono), monospace;
          font-size: .65rem;
          letter-spacing: .12em;
          color: var(--v8-lime-deep);
        }
        .scope-item h4 {
          margin: .45rem 0 .35rem;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.06rem;
          letter-spacing: -.015em;
        }
        .scope-item p {
          margin: 0;
          font-size: .88rem;
          line-height: 1.6;
          color: var(--v8-text-secondary);
        }

        /* ── Impact panel ──────────────────────────────────── */
        .impact-panel {
          margin: 0 clamp(1.2rem, 3vw, 2.4rem) clamp(1.2rem, 3vw, 2.4rem);
          background: var(--v8-bg-dark);
          color: var(--v8-on-dark-primary);
          border-top: 3px solid var(--v8-lime);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
          overflow: hidden;
        }
        .impact-main {
          padding: clamp(1.8rem, 4vw, 3.1rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .impact-overline {
          font-family: var(--font-v8-mono), monospace;
          font-size: .68rem;
          line-height: 1.4;
          letter-spacing: .16em;
          text-transform: uppercase;
          color: var(--v8-lime);
        }
        .impact-main h4 {
          margin: .8rem 0 0;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(1.55rem, 2.8vw, 2.35rem);
          line-height: 1.08;
          letter-spacing: -.03em;
          font-weight: 500;
          max-width: 18ch;
        }
        .impact-main p {
          margin: 1.1rem 0 0;
          color: var(--v8-on-dark-secondary);
          font-size: .96rem;
          line-height: 1.68;
          max-width: 38rem;
        }
        .impact-signals {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          border-left: 1px solid var(--v8-on-dark-line);
        }
        .impact-signal {
          container-type: inline-size;
          min-width: 0;
          padding: clamp(1.25rem, 2vw, 1.75rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          min-height: 245px;
          border-right: 1px solid var(--v8-on-dark-line);
          background: linear-gradient(180deg, rgba(255,255,255,.018), rgba(255,255,255,0));
        }
        .impact-signal:last-child { border-right: 0; }
        .impact-signal span {
          font-family: var(--font-v8-mono), monospace;
          font-size: .62rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          color: var(--v8-lime);
        }
        .impact-number {
          margin-top: .85rem;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: clamp(2.25rem, 26cqi, 3.4rem);
          line-height: .9;
          letter-spacing: -.04em;
          font-weight: 500;
          color: #fff;
          white-space: nowrap;
        }
        .impact-label {
          margin-top: .7rem;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1rem;
          line-height: 1.25;
          color: #fff;
          overflow-wrap: break-word;
        }
        .impact-source {
          display: block;
          margin-top: .75rem;
          font-size: .7rem;
          line-height: 1.45;
          color: var(--v8-on-dark-muted);
          overflow-wrap: break-word;
        }

        /* ── Visuals (shared) ──────────────────────────────── */
        .work-visual-wrap {
          position: absolute;
          inset: 0;
        }
        .work-visual-grid {
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--v8-line) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: .55;
        }

        /* Healthcare visual */
        .health-map {
          position: absolute;
          inset: 12% 10%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
        }
        .v-node {
          position: relative;
          z-index: 2;
          width: 31%;
          min-height: 120px;
          padding: 1.2rem;
          border: 1px solid var(--v8-line);
          background: rgba(255,255,255,.9);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .v-node.primary {
          background: var(--v8-bg-dark);
          border-color: var(--v8-bg-dark);
          color: #fff;
        }
        .n-label {
          font-family: var(--font-v8-mono), monospace;
          font-size: .61rem;
          letter-spacing: .12em;
          color: var(--v8-text-muted);
          text-transform: uppercase;
        }
        .v-node.primary .n-label { color: var(--v8-lime); }
        .v-node strong {
          margin-top: .55rem;
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1rem;
          line-height: 1.25;
        }
        .v-arrow { font-size: 1.4rem; color: var(--v8-lime-deep); }

        /* Logistics visual */
        .ops-visual {
          position: absolute;
          inset: 9%;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1px;
          background: var(--v8-line);
          border: 1px solid var(--v8-line);
        }
        .ops-cell {
          background: var(--v8-bg-dark);
          padding: 1.2rem;
          color: #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 125px;
        }
        .ops-cell.alt { background: #1d211e; }
        .ops-cell span {
          font-family: var(--font-v8-mono), monospace;
          font-size: .61rem;
          letter-spacing: .12em;
          color: var(--v8-lime);
        }
        .ops-cell strong {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: 1.05rem;
        }
        .ops-cell small {
          color: var(--v8-on-dark-secondary);
          font-size: .76rem;
          line-height: 1.45;
        }

        /* Professional services - phone visual */
        .field-phone-visual {
          display: grid;
          place-items: center;
          background: var(--v8-bg-primary);
        }
        .phone-wrap {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          min-height: 390px;
          display: grid;
          place-items: center;
        }
        .phone {
          width: min(238px, 58%);
          aspect-ratio: .52;
          border: 2px solid var(--v8-text-primary);
          border-radius: 28px;
          background: #fff;
          padding: 13px;
          box-shadow: 0 20px 60px rgba(17,19,17,.14);
          transform: rotate(2deg);
        }
        .phone-notch {
          width: 38%;
          height: 13px;
          background: var(--v8-text-primary);
          border-radius: 999px;
          margin: 0 auto 18px;
        }
        .phone-screen {
          height: calc(100% - 31px);
          background: var(--v8-bg-secondary);
          padding: 13px;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }
        .app-title {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-weight: 600;
          font-size: .88rem;
        }
        .app-meta {
          font-family: var(--font-v8-mono), monospace;
          color: var(--v8-text-muted);
          font-size: .54rem;
          letter-spacing: .08em;
          text-transform: uppercase;
        }
        .voice-bar {
          margin-top: 4px;
          border: 1px solid var(--v8-line);
          background: #fff;
          padding: 10px;
          display: grid;
          grid-template-columns: 26px 1fr;
          gap: 8px;
          align-items: center;
        }
        .mic {
          width: 26px;
          height: 26px;
          background: var(--v8-lime);
          border: 1px solid var(--v8-text-primary);
          display: grid;
          place-items: center;
          font-size: .7rem;
        }
        .wave {
          height: 18px;
          background: repeating-linear-gradient(90deg, var(--v8-line-strong) 0 2px, transparent 2px 5px);
          mask-image: linear-gradient(to bottom, transparent 10%, #000 35%, #000 65%, transparent 90%);
          -webkit-mask-image: linear-gradient(to bottom, transparent 10%, #000 35%, #000 65%, transparent 90%);
        }
        .translation {
          padding: 9px;
          border-left: 2px solid var(--v8-lime);
          background: #fff;
          font-size: .63rem;
          line-height: 1.45;
          color: var(--v8-text-secondary);
        }
        .photo-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 5px;
        }
        .photo {
          aspect-ratio: 1;
          background: linear-gradient(145deg, #d9ddd8, #f5f7f3);
          border: 1px solid var(--v8-line);
          position: relative;
        }
        .photo::after {
          content: "";
          position: absolute;
          inset: 24% 20%;
          border: 1px solid var(--v8-line-strong);
          transform: skew(-8deg);
        }
        .submit {
          margin-top: auto;
          background: var(--v8-text-primary);
          color: #fff;
          text-align: center;
          padding: 9px;
          font-size: .6rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: .05em;
        }
        .float-badge {
          position: absolute;
          right: 8%;
          top: 13%;
          z-index: 3;
          background: var(--v8-lime);
          border: 1px solid var(--v8-text-primary);
          padding: .55rem .65rem;
          font-family: var(--font-v8-mono), monospace;
          font-size: .58rem;
          letter-spacing: .08em;
          text-transform: uppercase;
          transform: rotate(-2deg);
        }
        .phone-side-note {
          position: absolute;
          left: 7%;
          bottom: 12%;
          z-index: 3;
          max-width: 132px;
          padding: .7rem .75rem;
          background: rgba(255,255,255,.92);
          border: 1px solid var(--v8-line);
          font-size: .68rem;
          line-height: 1.45;
          color: var(--v8-text-secondary);
        }
        .phone-side-note strong {
          display: block;
          font-family: var(--font-v8-mono), monospace;
          font-size: .56rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--v8-lime-deep);
          margin-bottom: .25rem;
        }

        /* ── Revenue operations visual ─────────────────────── */
        .revenue-visual {
          min-height: 450px;
        }
        .business-flow {
          position: absolute;
          inset: 8%;
          display: grid;
          align-content: center;
          gap: .7rem;
        }
        .business-flow.revenue {
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: .75rem;
          inset: 7% 6%;
          align-content: center;
        }
        .flow-card {
          position: relative;
          min-height: 118px;
          padding: 1rem .95rem;
          background: #fff;
          border: 1px solid var(--v8-line);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .business-flow.revenue .flow-card { min-height: 108px; }
        .business-flow.revenue .flow-card:nth-child(1),
        .business-flow.revenue .flow-card:nth-child(2),
        .business-flow.revenue .flow-card:nth-child(3) { grid-column: span 2; }
        .business-flow.revenue .flow-card:nth-child(4),
        .business-flow.revenue .flow-card:nth-child(5) { grid-column: span 3; }
        .flow-card span {
          font-family: var(--font-v8-mono), monospace;
          font-size: .58rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--v8-lime-deep);
        }
        .flow-card strong {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: .98rem;
          line-height: 1.2;
        }
        .flow-card small {
          font-size: .69rem;
          line-height: 1.46;
          color: var(--v8-text-muted);
        }
        .flow-card.dark {
          background: var(--v8-bg-dark);
          border-color: var(--v8-bg-dark);
          color: #fff;
        }
        .flow-card.dark small { color: var(--v8-on-dark-secondary); }

        /* ── Recruitment visual ────────────────────────────── */
        .recruit-pipeline {
          position: absolute;
          inset: 8%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: .65rem;
        }
        .pipeline-row {
          display: grid;
          grid-template-columns: 92px 1fr auto;
          gap: .85rem;
          align-items: center;
          padding: .78rem .9rem;
          background: #fff;
          border: 1px solid var(--v8-line);
        }
        .pipeline-row .stage {
          font-family: var(--font-v8-mono), monospace;
          font-size: .58rem;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--v8-lime-deep);
        }
        .pipeline-row strong {
          font-family: var(--font-v8-display), system-ui, sans-serif;
          font-size: .9rem;
        }
        .pipeline-row small {
          font-family: var(--font-v8-mono), monospace;
          font-size: .56rem;
          color: var(--v8-text-muted);
          white-space: nowrap;
        }
        .pipeline-row.highlight {
          background: var(--v8-bg-dark);
          color: #fff;
          border-color: var(--v8-bg-dark);
        }
        .pipeline-row.highlight .stage { color: var(--v8-lime); }
        .pipeline-row.highlight small  { color: var(--v8-on-dark-secondary); }
        .pipeline-line {
          width: 1px;
          height: 10px;
          background: var(--v8-line-strong);
          margin: -.3rem 0 -.3rem 44px;
        }

        /* ── Common principles ─────────────────────────────── */
        .work-common-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2rem, 6vw, 6rem);
          align-items: end;
        }
        .work-principles {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(1.4rem, 3vw, 2.5rem);
          margin-top: clamp(3rem, 6vw, 4.5rem);
        }
        .work-principle {
          padding-top: 1.25rem;
          border-top: 1px solid var(--v8-on-dark-line);
          transition: border-color 250ms var(--v8-ease);
        }
        .work-principle:hover { border-top-color: var(--v8-lime); }

        /* ── Responsive ────────────────────────────────────── */
        @media (max-width: 980px) {
          .impact-panel { grid-template-columns: 1fr; }
          .impact-signals { border-left: 0; border-top: 1px solid var(--v8-on-dark-line); }
          .impact-signal { min-height: 205px; }
        }

        @media (max-width: 900px) {
          .work-head, .work-common-head { grid-template-columns: 1fr; }
          .work-head .v8-lead { justify-self: start; }
          .case-carousel { grid-template-columns: 46px minmax(0, 1fr) 46px; }
          .case-tab {
            flex: 0 0 46%;
            min-width: 220px;
            border-right: 1px solid var(--v8-line);
            border-bottom: 0;
          }
          .case-tab:last-child { border-right: 0; }
          .case-top { grid-template-columns: 1fr; }
          .case-visual {
            border-left: 0;
            border-top: 1px solid var(--v8-line);
            min-height: 0;
            height: auto;
            overflow: visible;
          }
          .work-visual-wrap {
            position: relative;
            inset: auto;
            padding: 1.75rem 1.35rem;
          }
          .health-map,
          .ops-visual,
          .business-flow,
          .recruit-pipeline {
            position: relative;
            inset: auto;
          }
          .revenue-visual { min-height: 0; }
          .case-bottom { grid-template-columns: 1fr; }
          .work-principles { grid-template-columns: repeat(2, 1fr); }
          .case-summary { grid-template-columns: 1fr; }
          .case-summary > div { border-right: 0; border-bottom: 1px solid var(--v8-line); padding: 1rem 0; }
          .case-summary > div + div { padding-left: 0; }
          .case-summary > div:last-child { border-bottom: 0; }
          .phone-wrap {
            min-height: 0;
            height: auto;
            padding: 1rem 0 .5rem;
          }
          .phone { width: min(230px, 62%); }
          .float-badge,
          .phone-side-note {
            position: static;
            transform: none;
            max-width: none;
          }
          .field-phone-visual {
            display: flex;
            flex-direction: column;
            align-items: stretch;
            gap: .85rem;
          }
        }

        @media (max-width: 680px) {
          .impact-panel { margin: 0 .85rem .85rem; }
          .impact-signals { grid-template-columns: 1fr; }
          .impact-signal {
            min-height: 0;
            border-right: 0;
            border-bottom: 1px solid var(--v8-on-dark-line);
            padding: 1.4rem 1.5rem;
          }
          .impact-signal:last-child { border-bottom: 0; }
          .impact-number { font-size: 3rem !important; }
          .impact-main { padding: 1.65rem 1.5rem; }
        }

        @media (max-width: 640px) {
          .case-carousel { grid-template-columns: 42px minmax(0, 1fr) 42px; }
          .case-tab { flex: 0 0 84%; min-width: 0; padding: 1.05rem .95rem; }
          .case-arrow { font-size: .9rem; }
          .scope-grid { grid-template-columns: 1fr; }
          .scope-item:nth-child(odd) { border-right: 0; padding-right: 0; }
          .scope-item:nth-child(even) { padding-left: 0; }
          .work-principles { grid-template-columns: 1fr; }
          .case-copy, .case-bottom { padding: 2rem 1.3rem; }
          .work-visual-wrap { padding: 1.35rem 1.1rem; }
          .health-map {
            flex-direction: column;
            inset: auto;
            gap: .65rem;
          }
          .v-node { width: 100%; min-height: auto; }
          .v-arrow { transform: rotate(90deg); }
          .ops-visual { inset: auto; grid-template-columns: 1fr; }
          .ops-cell { min-height: 82px; }
          .business-flow.revenue { grid-template-columns: 1fr; }
          .business-flow.revenue .flow-card { grid-column: auto; min-height: 78px; }
          .recruit-pipeline { inset: auto; }
          .pipeline-row { grid-template-columns: 76px 1fr; }
          .pipeline-row small { display: none; }
          .phone {
            transform: none;
            width: min(220px, 70%);
          }
          .phone-wrap { padding: .25rem 0; }
        }
      `}</style>
    </>
  );
}
