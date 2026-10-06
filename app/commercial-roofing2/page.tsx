
import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Commercial Roofing Operations",
  description:
    "CLAROS prepares estimating, production handoff, field reporting and billing work across the systems commercial roofing teams already use.",
  alternates: { canonical: "/commercial-roofing2" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/commercial-roofing2",
    title: "Put AI to work across your roofing business | CLAROS",
    description:
      "Defined operational work across existing systems, with people retaining control of the decisions.",
  },
};

const project = "Front Range Distribution Center — Roof Replacement";

const workflows = [
  {
    n: "01",
    title: "Request → estimating package",
    trigger: "RFQ email, drawings, specifications and addendum received.",
    work: "Requirements checked, files organized, approved inputs gathered and document conflicts surfaced.",
    output: "Bid package ready for estimator review.",
    human: "Estimator validates takeoff, scope, pricing and submission.",
  },
  {
    n: "02",
    title: "Award → production handoff",
    trigger: "Accepted proposal and approved scope.",
    work: "Approved scope, exclusions, materials, equipment, site access, delivery requirements and customer commitments are assembled.",
    output: "Handoff prepared for production review.",
    human: "Production confirms schedule, resources and commitments.",
  },
  {
    n: "03",
    title: "Field update → daily report",
    trigger: "Supervisor voice note and site photos.",
    work: "The update is structured, evidence linked, report prepared and PM exceptions routed.",
    output: "Daily report prepared with linked evidence.",
    human: "PM decides additional work, safety and customer actions.",
  },
  {
    n: "04",
    title: "Approved records → billing package",
    trigger: "Approved progress and completion records.",
    work: "Required evidence is checked, billing basis matched and missing support flagged before finance review.",
    output: "Checked billing package delivered to finance.",
    human: "Finance approves the invoice and receivables action.",
  },
];

const systems = [
  ["Email", "RFQs, approvals and customer updates"],
  ["Estimating", "Bid records, takeoff and pricing"],
  ["Project records", "Scope, commitments and status"],
  ["Field inputs", "Voice notes, photos and exceptions"],
  ["Document storage", "Drawings, specs, addenda and evidence"],
  ["Accounting", "Billing records and finance review"],
];

const metrics = [
  ["40–50%", "less estimate preparation/admin time", "Measures request intake, document preparation and setup work before estimator review."],
  ["50%+", "shorter sales-to-production handoff cycle", "Measures elapsed time from approved award information to a review-ready handoff."],
  ["75%+", "less daily report preparation time", "Measures preparation of the structured report from field inputs, not total PM workload."],
];

const implementation = [
  ["01", "Problem identified", "Awarded jobs require repeated manual preparation before production can act."],
  ["02", "What CLAROS builds", "Connections, approved-field mapping, readiness checks, document assembly and exception routing."],
  ["03", "What the team receives", "A prepared production record inside the workspace the team already uses."],
  ["04", "What is measured", "Preparation time, missing information, corrections, adoption and completed handoffs."],
];

const startSteps = [
  ["01", "Understand", "Map the work, systems, responsibilities and exceptions."],
  ["02", "Agree", "Choose the workflow, baseline, scope, permissions and target."],
  ["03", "Deploy", "Build and test with the team, then put the defined work into use."],
  ["04", "Improve", "Measure completion, quality, adoption and agreed outcomes."],
];

const faqs = [
  ["Do we have to replace our current roofing software?", "No. The starting point is the systems already doing useful work. CLAROS connects and works across them where access and technical feasibility allow. Missing interfaces can be agreed and built where required."],
  ["Is this an AI estimator?", "Not in the sense of handing professional judgement to a black box. CLAROS prepares the work around estimating. The estimator retains takeoff validation, scope, pricing and submission decisions."],
  ["Can we start with production instead of estimating?", "Yes. The first workflow should be a bounded piece of work where capacity, delay or coordination cost is visible enough to baseline and measure."],
  ["Are the percentages on this page customer results?", "No. They are proposed targets for a scoped workflow and must be measured against your baseline. Actual results depend on workflow, data, systems, access, adoption and scope."],
  ["What happens when the workflow finds an exception?", "The exception is surfaced with its source and routed to the responsible person. The next step can be held until that person makes the decision."],
];

export default function CommercialRoofingV2Page() {
  const contactHref =
    "mailto:hello@beeclaros.com?subject=Commercial%20roofing%20workflow";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Commercial Roofing Operations Automation",
    serviceType: "Commercial roofing workflow automation",
    url: siteConfig.url + "/commercial-roofing2",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
    },
  };

  return (
    <div className={"v8-theme " + styles.page}>
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <main id="top">
        <section className={styles.hero}>
          <div className="v8-container">
            <div className={styles.heroGrid}>
              <div>
                <p className="v8-overline">Commercial roofing operations</p>
                <h1>Put AI to work across your roofing business.</h1>
                <p className={styles.heroLead}>
                  CLAROS prepares bid packages, production handoffs, field reports and billing records in the systems your team already uses. Your people keep control of the decisions.
                </p>
                <p className={styles.outcome}>
                  More capacity. Less preparation and coordination work.
                </p>
                <div className={styles.actions}>
                  <a href={contactHref} className="v8-btn-primary">
                    Talk through your workflow <span className="v8-arrow">→</span>
                  </a>
                  <a href="#work-in-action" className="v8-btn-text">
                    See the work in action <span>↓</span>
                  </a>
                </div>
              </div>
              <aside className={styles.heroAside}>
                <span>The operating principle</span>
                <strong>Your team makes the decisions. CLAROS handles the work around them.</strong>
                <p>
                  Connections enable the service. The service is the defined work completed across those systems.
                </p>
              </aside>
            </div>

            <div id="work-in-action" className={styles.demo}>
              <div className={styles.demoTop}>
                <span className={styles.label}>Illustrative workflow</span>
                <strong>{project}</strong>
              </div>
              <div className={styles.demoGrid}>
                <article className={styles.panel}>
                  <div className={styles.panelTop}>
                    <span>Inbox</span><span>10:14 AM</span>
                  </div>
                  <h3>RFQ: Front Range Distribution Center</h3>
                  <p>Bids due Thu, Oct 15 at 2:00 PM MT.</p>
                  <div className={styles.files}>
                    <span>FRDC_Roof_Drawings_IFB.pdf</span>
                    <span>Div_07_Roofing_Specs.pdf</span>
                    <span>Addendum_03_2026-10-06.pdf</span>
                  </div>
                </article>

                <div className={styles.work}>
                  <div className={styles.workBrand}>CLAROS</div>
                  <div className={styles.workStep}>01 · Requirements checked</div>
                  <div className={styles.workStep}>02 · Documents linked</div>
                  <div className={styles.workStep}>03 · Approved inputs gathered</div>
                  <div className={styles.workStep}>04 · Discrepancy identified</div>
                </div>

                <article className={styles.panel}>
                  <div className={styles.panelTop}>
                    <span>Estimating record</span><span>Review required</span>
                  </div>
                  <h3>Estimator-ready bid package</h3>
                  <div className={styles.fields}>
                    <div><span>Customer</span><strong>Apex General Contractors</strong></div>
                    <div><span>Deadline</span><strong>Oct 15 · 2:00 PM MT</strong></div>
                    <div><span>Draft scope</span><strong>TPO replacement · insulation · flashings</strong></div>
                    <div><span>Documents</span><strong>3 linked · current set</strong></div>
                    <div><span>Assumptions</span><strong>2 for estimator validation</strong></div>
                    <div><span>Open questions</span><strong>1 source discrepancy</strong></div>
                  </div>
                  <div className={styles.warn}>
                    <span>Attention</span>
                    <strong>Latest addendum changes the insulation requirement.</strong>
                    <span className={styles.source}>Source: Addendum 03 · page 4</span>
                  </div>
                  <div className={styles.human}>
                    <span>Human decision</span>
                    <strong>Estimator validates takeoff, scope, pricing and submission.</strong>
                  </div>
                </article>
              </div>
              <p className={styles.note}>
                Illustrative workflow; configured around your systems.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="v8-container">
            <div className={styles.heading}>
              <div>
                <span className={styles.chapterNo}>02</span>
                <p className="v8-overline">What work comes off our team?</p>
                <h2>One project. Four workflows. The same people stay in control.</h2>
              </div>
              <p>
                CLAROS takes responsibility for defined preparation, coordination and checking work. Outputs land where the next person can use them, with exceptions visible before they become hidden handoff problems.
              </p>
            </div>

            <div className={styles.workflowList}>
              {workflows.map((workflow, index) => (
                <details className={styles.workflow} key={workflow.n} open={index === 0}>
                  <summary>
                    <span>{workflow.n}</span>
                    <h3>{workflow.title}</h3>
                    <b>+</b>
                  </summary>
                  <div className={styles.workflowBody}>
                    <div><span>Trigger</span><p>{workflow.trigger}</p></div>
                    <div><span>Work performed</span><p>{workflow.work}</p></div>
                    <div><span>Usable output</span><strong>{workflow.output}</strong></div>
                    <div><span>Human decision</span><p>{workflow.human}</p></div>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section + " " + styles.sectionAlt}>
          <div className="v8-container">
            <div className={styles.heading}>
              <div>
                <span className={styles.chapterNo}>03</span>
                <p className="v8-overline">How does this fit our systems?</p>
                <h2>The work crosses systems. Your business does not need another place to live.</h2>
              </div>
              <p>
                Existing systems remain recognizable. CLAROS works across the operating environment. Integrations depend on access and technical feasibility; missing functionality can be built where required.
              </p>
            </div>
            <div className={styles.systems}>
              <div className={styles.systemCol}>
                {systems.slice(0, 3).map(([name, detail]) => (
                  <div className={styles.systemCard} key={name}>
                    <strong>{name}</strong><span>{detail}</span>
                  </div>
                ))}
              </div>
              <div className={styles.core}>
                <span>CLAROS work layer</span>
                <strong>Read → prepare → check → route → write back</strong>
                <p>Built around the workflow, permissions and systems agreed for the implementation.</p>
              </div>
              <div className={styles.systemCol}>
                {systems.slice(3).map(([name, detail]) => (
                  <div className={styles.systemCard} key={name}>
                    <strong>{name}</strong><span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="v8-container">
            <div className={styles.heading}>
              <div>
                <span className={styles.chapterNo}>04</span>
                <p className="v8-overline">What improves for the business?</p>
                <h2>Measure the task that changed, not a vague promise of AI efficiency.</h2>
              </div>
              <p>
                Tie the outcome to the exact preparation or coordination work being changed so the result can be compared against a real baseline.
              </p>
            </div>
            <div className={styles.metrics}>
              {metrics.map(([value, title, body]) => (
                <article className={styles.metric} key={value}>
                  <strong>{value}</strong>
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
            <div className={styles.qualifier}>
              <strong>Proposed targets. Measured against your operation.</strong>{" "}
              The agreed targets depend on your baseline, workflows, data, systems and scope. These are objectives, not customer results.
            </div>
          </div>
        </section>

        <section className={styles.section + " " + styles.sectionAlt}>
          <div className="v8-container">
            <div className={styles.heading}>
              <div>
                <span className={styles.chapterNo}>05</span>
                <p className="v8-overline">Why CLAROS?</p>
                <h2>Understand the work. Build the missing pieces. Get it operating. Improve what is measured.</h2>
              </div>
              <p>
                The practical difference is accountable delivery around a real workflow, not a generic bot that expects the operation to adapt around it.
              </p>
            </div>
            <div className={styles.implementation}>
              {implementation.map(([n, title, body]) => (
                <article key={n}>
                  <span>{n}</span><h3>{title}</h3><p>{body}</p>
                </article>
              ))}
            </div>
            <div className={styles.loop}>
              <span>Monitor exceptions</span><b>→</b>
              <span>Review performance</span><b>→</b>
              <span>Make agreed improvements</span><b>→</b>
              <span>Re-measure</span>
            </div>
          </div>
        </section>

        <section className={styles.section + " " + styles.sectionDark}>
          <div className="v8-container">
            <div className={styles.heading}>
              <div>
                <span className={styles.chapterNo}>06</span>
                <p className="v8-overline">What evidence can we assess?</p>
                <h2>Separate what is demonstrated from what still needs to be proven.</h2>
              </div>
              <p>
                This test page intentionally does not present invented roofing customer outcomes, logos or partnerships. The demonstrations are illustrative; a pilot should produce the real before-and-after evidence.
              </p>
            </div>
            <div className={styles.evidence}>
              <article>
                <span>Illustrative demonstration</span>
                <h3>What can be assessed now</h3>
                <ul>
                  <li>Whether the prepared artifact is useful to the next role</li>
                  <li>Whether source links and exceptions are clear enough to review</li>
                  <li>Whether the human decision boundary matches the operation</li>
                </ul>
              </article>
              <article>
                <span>Pilot measurement plan</span>
                <h3>What a scoped pilot should establish</h3>
                <ul>
                  <li>Baseline preparation time and manual touches</li>
                  <li>Missing-information and correction rate before and after</li>
                  <li>Completion quality, adoption and exception handling</li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className="v8-container">
            <div className={styles.heading}>
              <div>
                <span className={styles.chapterNo}>07</span>
                <p className="v8-overline">How do we start?</p>
                <h2>Start with one workflow that is visible enough to baseline and useful enough to matter.</h2>
              </div>
              <p>
                A strong first conversation follows one real request into estimating and one awarded job into production.
              </p>
            </div>
            <div className={styles.start}>
              {startSteps.map(([n, title, body]) => (
                <article className={styles.step} key={n}>
                  <span>{n}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section + " " + styles.sectionAlt}>
          <div className="v8-container">
            <div className={styles.heading}>
              <div>
                <p className="v8-overline">FAQ</p>
                <h2>Questions operators usually ask first.</h2>
              </div>
              <p>
                The first implementation is scoped around the operation you actually have, not an assumed standard roofing stack.
              </p>
            </div>
            <div className={styles.faq}>
              {faqs.map(([q, a]) => (
                <details key={q}>
                  <summary>{q}<span>+</span></summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.final}>
          <div className="v8-container">
            <span>Commercial roofing · one workflow first</span>
            <h2>Start with estimating and production handoffs.</h2>
            <p>
              Show us how a request becomes a bid and how an awarded job reaches production. We’ll identify where CLAROS could take work off your team.
            </p>
            <a href={contactHref} className="v8-btn-primary">
              Talk through your workflow <span className="v8-arrow">→</span>
            </a>
            <span className={styles.small}>No platform replacement pitch. Start with one real workflow.</span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
