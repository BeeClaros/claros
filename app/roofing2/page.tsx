import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Roofing AI Workflows | CLAROS",
  description:
    "CLAROS builds and runs AI workflows for commercial and residential roofing teams, from estimating and production handoffs to field reporting and billing.",
  alternates: { canonical: "/roofing2" },
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    url: "/roofing2",
    title: "AI that gets work done across your roofing business | CLAROS",
    description:
      "Defined work completed across the systems your roofing team already uses, with people retaining control of the decisions.",
  },
};

const lifecycle = [
  {
    number: "01",
    title: "Customer development",
    copy: "Research suitable accounts, prepare relevant outreach, coordinate permitted follow-up, and carry qualified requirements into estimating.",
    output: "Qualified opportunity + context",
  },
  {
    number: "02",
    title: "Estimating & quotes",
    copy: "Read requests, organize files, extract requirements, gather approved inputs, prepare records, and surface conflicts before review.",
    output: "Review-ready estimating package",
  },
  {
    number: "03",
    title: "Production handoff",
    copy: "Carry approved scope, exclusions, materials, equipment, documents, responsibilities, and unresolved confirmations into execution.",
    output: "Prepared production record",
  },
  {
    number: "04",
    title: "Field reporting",
    copy: "Turn voice notes, photos, written updates, and context into structured reports, project records, and routed exceptions.",
    output: "Structured field update",
  },
  {
    number: "05",
    title: "Billing & receivables",
    copy: "Check approved evidence, prepare billing packages, support invoice records, route finance approval, and track unresolved discrepancies.",
    output: "Finance-ready billing package",
  },
];

const systems = [
  "Email & inboxes",
  "Estimating software",
  "CRM",
  "Project management",
  "Document storage",
  "Field inputs",
  "Accounting",
];

const commercial = [
  "Bid invitation and RFQ intake",
  "Specification and addendum checks",
  "Estimate and proposal preparation",
  "Award-to-production handoffs",
  "Materials, equipment, and site constraints",
  "Daily reports and exception routing",
  "Billing package preparation",
  "Receivables follow-up under agreed rules",
];

const residential = [
  "Inquiry and customer intake",
  "Inspection coordination",
  "Property and job information capture",
  "Estimate preparation",
  "Customer communication",
  "Materials and crew coordination",
  "Completion records",
  "Billing preparation and follow-up",
];

const targets = [
  {
    value: "40–50%",
    label: "less estimate preparation / admin time",
    note: "Objective to validate against your current intake and preparation baseline.",
  },
  {
    value: "50%+",
    label: "shorter sales-to-production handoff cycle",
    note: "Objective to validate from award information to a production-ready record.",
  },
  {
    value: "75%+",
    label: "less daily report preparation time",
    note: "Objective to validate for report preparation from approved field inputs.",
  },
];

const implementation = [
  ["01", "Observe", "Follow the real work, handoffs, systems, documents, and recurring exceptions."],
  ["02", "Agree", "Choose one workflow, baseline it, and define permissions, rules, outputs, and human decisions."],
  ["03", "Build", "Connect the relevant systems and build the AI, software, checks, and exception handling required."],
  ["04", "Deploy", "Test with the team and put the defined work into production without forcing a new operating system."],
  ["05", "Improve", "Measure completion, quality, exceptions, adoption, and agreed outcomes before changing the workflow."],
];

const faqs = [
  {
    q: "Do we have to replace our roofing software?",
    a: "No. The starting point is the systems that already do useful work. CLAROS connects and works across them where access and technical feasibility allow, and can build missing interfaces where required.",
  },
  {
    q: "Is CLAROS an autonomous estimator?",
    a: "No. CLAROS can prepare the work around estimating, including intake, requirement extraction, document organization, approved input retrieval, and draft records. Estimators retain takeoff validation, scope, pricing, and submission decisions.",
  },
  {
    q: "Can we start with only one workflow?",
    a: "Yes. That is usually the clearest starting point. A bounded workflow makes it easier to measure the current baseline, implement safely, and prove whether the change is useful before expanding.",
  },
  {
    q: "What happens when something is missing or contradictory?",
    a: "The workflow surfaces the exception with its source, routes it to the responsible person, and can hold the next consequential step until that person decides what to do.",
  },
  {
    q: "Are the percentages on this page customer results?",
    a: "No. They are proposed roofing objectives to validate. Actual results depend on the baseline, workflow, data, systems, access, adoption, and agreed implementation scope.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4.5 10.2 8.2 14 15.8 6.3" />
    </svg>
  );
}

export default function Roofing2Page() {
  const contactHref =
    "mailto:hello@beeclaros.com?subject=Roofing%20workflow%20conversation";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="CLAROS roofing page">
          CLAROS
        </a>
        <nav className={styles.nav} aria-label="Roofing page">
          <a href="#work">Work</a>
          <a href="#commercial">Commercial</a>
          <a href="#residential">Residential</a>
          <a href="#how">How it works</a>
        </nav>
        <a className={styles.headerCta} href={contactHref}>
          Book a Demo <Arrow />
        </a>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroBackdrop} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className={styles.container}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <div className={styles.eyebrow}>
                  <span className={styles.pulse} />
                  AI workflows for roofing operations
                </div>
                <h1>
                  AI that gets work done
                  <span> across your roofing business.</span>
                </h1>
                <p className={styles.lead}>
                  CLAROS builds and runs workflows that prepare estimates, move
                  awarded jobs into production, structure field reporting, and
                  get billing work ready — inside the systems your team already
                  uses.
                </p>
                <p className={styles.principle}>
                  Your team makes the decisions. CLAROS handles the work around
                  them.
                </p>
                <div className={styles.actions}>
                  <a className={styles.primaryButton} href={contactHref}>
                    Talk through your workflow <Arrow />
                  </a>
                  <a className={styles.secondaryButton} href="#demo">
                    See the workflow <span aria-hidden="true">↓</span>
                  </a>
                </div>
              </div>

              <div className={styles.heroVisual} aria-label="Illustrative roofing workflow">
                <div className={styles.visualHeader}>
                  <div>
                    <span>Workflow</span>
                    <strong>RFQ → estimator review</strong>
                  </div>
                  <span className={styles.liveBadge}>Illustrative</span>
                </div>

                <div className={styles.visualBody}>
                  <div className={styles.inputCard}>
                    <div className={styles.cardMeta}>
                      <span>INCOMING REQUEST</span>
                      <span>10:14 AM</span>
                    </div>
                    <strong>Riverside Commerce Center — Roof Replacement</strong>
                    <p>Bid due Oct 15 · drawings + specifications + addendum</p>
                    <div className={styles.files}>
                      <span>Roof_Drawings.pdf</span>
                      <span>Division_07.pdf</span>
                      <span>Addendum_03.pdf</span>
                    </div>
                  </div>

                  <div className={styles.processLine}>
                    <span className={styles.processDot}>C</span>
                    <div>
                      <strong>CLAROS prepares the work</strong>
                      <span>Read · organize · check · prepare · route</span>
                    </div>
                  </div>

                  <div className={styles.outputCard}>
                    <div className={styles.cardMeta}>
                      <span>ESTIMATING RECORD</span>
                      <span className={styles.review}>REVIEW REQUIRED</span>
                    </div>
                    <div className={styles.fieldRow}>
                      <span>Deadline</span>
                      <strong>Oct 15 · 2:00 PM MT</strong>
                    </div>
                    <div className={styles.fieldRow}>
                      <span>Documents</span>
                      <strong>3 linked · latest set</strong>
                    </div>
                    <div className={styles.fieldRow}>
                      <span>Scope draft</span>
                      <strong>TPO replacement · insulation · flashings</strong>
                    </div>

                    <div className={styles.exception}>
                      <span>EXCEPTION</span>
                      <strong>
                        Latest addendum changes the insulation requirement.
                      </strong>
                      <small>Source: Addendum 03 · page 4</small>
                    </div>

                    <div className={styles.humanDecision}>
                      <span>HUMAN DECISION</span>
                      <p>
                        Estimator validates takeoff, scope, pricing, and
                        submission.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroFoot}>
              <span>Commercial roofing</span>
              <span>Residential roofing</span>
              <span>Existing systems stay central</span>
              <span>Human authority stays explicit</span>
            </div>
          </div>
        </section>

        <section className={styles.intro} id="work">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>01 — THE WORK</span>
                <h2>
                  One operating lifecycle.
                  <span> Five places where work can move faster.</span>
                </h2>
              </div>
              <p>
                Start with one workflow and expand only where it makes sense.
                CLAROS connects the work between people and systems rather than
                asking the whole company to adopt another platform.
              </p>
            </div>

            <div className={styles.lifecycle}>
              {lifecycle.map((item) => (
                <article key={item.number} className={styles.lifecycleCard}>
                  <div className={styles.lifecycleTop}>
                    <span>{item.number}</span>
                    <span className={styles.smallArrow}>↘</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p>{item.copy}</p>
                  <div className={styles.output}>
                    <span>OUTPUT</span>
                    <strong>{item.output}</strong>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.demoSection} id="demo">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>02 — WORK IN ACTION</span>
                <h2>
                  The useful part is not the AI.
                  <span> It is the finished work.</span>
                </h2>
              </div>
              <p>
                Each workflow should have a clear trigger, information source,
                action, exception path, human authority, and usable output.
              </p>
            </div>

            <div className={styles.storyGrid}>
              <article className={styles.storyPrimary}>
                <div className={styles.storyLabel}>
                  <span>COMMERCIAL EXAMPLE</span>
                  <span>Award → production</span>
                </div>
                <h3>
                  An awarded proposal becomes a production-ready record without
                  re-keying the job from scratch.
                </h3>

                <div className={styles.handoff}>
                  <div className={styles.handoffSource}>
                    <span>APPROVED COMMERCIAL RECORD</span>
                    <strong>Riverside Commerce Center</strong>
                    <ul>
                      <li>Scope + exclusions</li>
                      <li>Materials + quantities</li>
                      <li>Equipment requirements</li>
                      <li>Site and delivery constraints</li>
                      <li>Customer commitments</li>
                    </ul>
                  </div>

                  <div className={styles.handoffMiddle}>
                    <div className={styles.clarosNode}>CLAROS</div>
                    <span>maps approved fields</span>
                    <span>checks readiness</span>
                    <span>routes exceptions</span>
                    <span>writes approved output</span>
                  </div>

                  <div className={styles.handoffOutput}>
                    <span>PRODUCTION RECORD</span>
                    <strong>Readiness: HOLD</strong>
                    <div className={styles.statusList}>
                      <div>
                        <span>Scope approved</span>
                        <b>Ready</b>
                      </div>
                      <div>
                        <span>Material package</span>
                        <b>Ready</b>
                      </div>
                      <div>
                        <span>Equipment</span>
                        <b>Ready</b>
                      </div>
                      <div className={styles.statusHold}>
                        <span>Dumpster location</span>
                        <b>Needs confirmation</b>
                      </div>
                    </div>
                    <div className={styles.humanDecision}>
                      <span>PRODUCTION DECISION</span>
                      <p>Production approves scheduling and resource commitments.</p>
                    </div>
                  </div>
                </div>

                <div className={styles.resolution}>
                  <span className={styles.resolutionNumber}>01</span>
                  <div>
                    <strong>Exception routed</strong>
                    <p>Site confirmation requested from the responsible owner.</p>
                  </div>
                  <span className={styles.resolutionArrow}>→</span>
                  <span className={styles.resolutionNumber}>02</span>
                  <div>
                    <strong>Confirmation received</strong>
                    <p>Approved location added to the project record.</p>
                  </div>
                  <span className={styles.resolutionArrow}>→</span>
                  <span className={styles.readyBadge}>READY FOR REVIEW</span>
                </div>
              </article>

              <aside className={styles.storySide}>
                <div>
                  <span className={styles.storySideLabel}>The boundary matters</span>
                  <h3>Routine work can move. Consequential decisions stay with people.</h3>
                </div>
                <ul>
                  <li><CheckIcon /> CLAROS can gather, prepare, check, update, and route.</li>
                  <li><CheckIcon /> Approved rules can move routine work forward.</li>
                  <li><CheckIcon /> Exceptions can pause and escalate with context.</li>
                  <li><CheckIcon /> Estimating, scheduling, safety, contractual, and finance decisions remain authorized human responsibilities.</li>
                </ul>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.segmentSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>03 — ROOFING, NOT GENERIC SOFTWARE</span>
                <h2>
                  Commercial and residential teams share a lifecycle.
                  <span> The work inside it is different.</span>
                </h2>
              </div>
              <p>
                The configuration follows the type of roofing business, the
                information it receives, and the decisions its people own.
              </p>
            </div>

            <div className={styles.segmentGrid}>
              <article className={styles.segment} id="commercial">
                <div className={styles.segmentHead}>
                  <span>01</span>
                  <div>
                    <p>COMMERCIAL ROOFING</p>
                    <h3>Move bid and project information cleanly from opportunity to cash.</h3>
                  </div>
                </div>
                <div className={styles.segmentBody}>
                  <ul>
                    {commercial.map((item) => (
                      <li key={item}><CheckIcon />{item}</li>
                    ))}
                  </ul>
                  <div className={styles.segmentExample}>
                    <span>Example starting workflow</span>
                    <strong>RFQ intake → estimator-ready package</strong>
                    <p>
                      Especially useful when drawings, specs, addenda, bid
                      dates, and repeated setup work create avoidable estimator
                      admin.
                    </p>
                  </div>
                </div>
              </article>

              <article className={styles.segment} id="residential">
                <div className={styles.segmentHead}>
                  <span>02</span>
                  <div>
                    <p>RESIDENTIAL ROOFING</p>
                    <h3>Keep customer, inspection, estimate, crew, and completion work connected.</h3>
                  </div>
                </div>
                <div className={styles.segmentBody}>
                  <ul>
                    {residential.map((item) => (
                      <li key={item}><CheckIcon />{item}</li>
                    ))}
                  </ul>
                  <div className={styles.segmentExample}>
                    <span>Example starting workflow</span>
                    <strong>Inquiry → prepared inspection / estimate record</strong>
                    <p>
                      Built around the company’s actual sales and production
                      model — without assuming every residential roofer is
                      insurance-restoration focused.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.systemSection}>
          <div className={styles.container}>
            <div className={styles.systemLayout}>
              <div className={styles.systemCopy}>
                <span className={styles.kicker}>04 — EXISTING SYSTEMS</span>
                <h2>
                  Your software keeps doing what it is good at.
                  <span> CLAROS handles the work between it.</span>
                </h2>
                <p>
                  We assess access and technical feasibility before promising
                  an integration. Where existing tools leave a real gap, custom
                  software can be part of the implementation.
                </p>
                <div className={styles.systemTags}>
                  {systems.map((system) => (
                    <span key={system}>{system}</span>
                  ))}
                </div>
              </div>

              <div className={styles.systemDiagram} aria-label="Systems connected through CLAROS">
                <div className={styles.diagramRail}>
                  <span>INPUTS</span>
                  <div>Email</div>
                  <div>Docs</div>
                  <div>Field</div>
                </div>
                <div className={styles.diagramCore}>
                  <span>CLAROS WORK LAYER</span>
                  <strong>Interpret</strong>
                  <strong>Gather</strong>
                  <strong>Apply rules</strong>
                  <strong>Prepare</strong>
                  <strong>Route</strong>
                  <strong>Update</strong>
                  <small>Permissions + monitoring + human decisions</small>
                </div>
                <div className={styles.diagramRail}>
                  <span>DESTINATIONS</span>
                  <div>Estimating</div>
                  <div>Projects</div>
                  <div>Accounting</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.targetsSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>05 — WHAT TO MEASURE</span>
                <h2>
                  Put a number on the workflow.
                  <span> Then prove it against the baseline.</span>
                </h2>
              </div>
              <p>
                These are proposed roofing objectives for a scoped
                implementation. They are not presented as measured customer
                results.
              </p>
            </div>

            <div className={styles.targets}>
              {targets.map((target) => (
                <article key={target.value}>
                  <span className={styles.targetFlag}>PROPOSED OBJECTIVE</span>
                  <strong>{target.value}</strong>
                  <h3>{target.label}</h3>
                  <p>{target.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.howSection} id="how">
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>06 — HOW CLAROS WORKS</span>
                <h2>
                  We build the solution.
                  <span> Then we stay accountable for how the workflow runs.</span>
                </h2>
              </div>
              <p>
                The implementation is defined around the work, not around a
                generic AI feature list.
              </p>
            </div>

            <div className={styles.implementation}>
              {implementation.map(([number, title, copy]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className={styles.runLoop}>
              <div>
                <span>RUNNING THE WORK</span>
                <strong>Trigger</strong>
              </div>
              <span>→</span>
              <div><strong>Interpret & gather</strong></div>
              <span>→</span>
              <div><strong>Perform authorized tasks</strong></div>
              <span>→</span>
              <div><strong>Route exceptions</strong></div>
              <span>→</span>
              <div><strong>Deliver & record</strong></div>
            </div>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.container}>
            <div className={styles.sectionHeading}>
              <div>
                <span className={styles.kicker}>07 — FAQ</span>
                <h2>
                  Questions that matter
                  <span> before automating roofing work.</span>
                </h2>
              </div>
            </div>

            <div className={styles.faq}>
              {faqs.map((item) => (
                <details key={item.q}>
                  <summary>
                    {item.q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <div className={styles.ctaPanel}>
              <div>
                <span>START WITH ONE REAL WORKFLOW</span>
                <h2>
                  Show us where work slows down between estimating, production,
                  the field, and finance.
                </h2>
                <p>
                  We’ll map the workflow, identify what can safely move off the
                  team, and define what a measurable first implementation would
                  look like.
                </p>
              </div>
              <div className={styles.ctaActions}>
                <a className={styles.primaryButtonLight} href={contactHref}>
                  Book a Demo <Arrow />
                </a>
                <a className={styles.textLinkLight} href="#demo">
                  Review the example workflow <span>↑</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <div>
            <strong>CLAROS</strong>
            <span>AI workflows that get defined work done.</span>
          </div>
          <div>
            <a href={contactHref}>hello@beeclaros.com</a>
            <span>Roofing page concept · isolated route</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
