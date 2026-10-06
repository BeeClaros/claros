import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Commercial Roofing Estimating Automation",
  description:
    "Commercial roofing estimating automation that reduces manual work around bid intake, estimating preparation, document handling and production handoffs, built around the systems already in place.",
  alternates: {
    canonical: "/roofing",
  },
  openGraph: {
    type: "website",
    url: "/roofing",
    title: "Commercial Roofing Estimating Automation | CLAROS",
    description:
      "Handle more bids with the estimating team you already have. CLAROS builds workflow automation around the systems commercial roofing teams already use.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Commercial Roofing Estimating Automation | CLAROS",
    description:
      "Reduce manual work around bid intake, estimating preparation and handoffs without replacing the systems already in place.",
  },
};

const frictionPoints = [
  {
    number: "01",
    title: "Bid intake and documents",
    body: "RFPs, RFQs, drawings, emails and job files arrive through different routes. Time gets spent organising inputs before estimating can properly start.",
  },
  {
    number: "02",
    title: "Missing information",
    body: "Requirements, scope gaps and unanswered questions are often discovered manually and at different points in the process.",
  },
  {
    number: "03",
    title: "Status and next actions",
    body: "People chase bid status, answers, approvals and files across inboxes, spreadsheets and operational systems.",
  },
  {
    number: "04",
    title: "Estimator to production handoff",
    body: "Once work moves forward, scope, documentation, materials and customer commitments need to reach the next team cleanly.",
  },
];

const workflow = [
  "RFP / RFQ",
  "Documents",
  "Requirements",
  "Estimate",
  "Review",
  "Production handoff",
];

const systems = [
  "Estimating",
  "CRM / job management",
  "Email",
  "Documents",
  "Accounting",
  "Field / photos",
];

const steps = [
  {
    number: "01",
    title: "Map the workflow",
    body: "Follow one real bid from intake to the next operational handoff and identify where people are moving information manually.",
  },
  {
    number: "02",
    title: "Establish the baseline",
    body: "Agree what matters: turnaround time, administrative touches, blocked bids, estimator hours or another measurable operating signal.",
  },
  {
    number: "03",
    title: "Build around the current stack",
    body: "Connect the relevant systems and add the smallest useful layer that removes repetitive work and surfaces the right next action.",
  },
  {
    number: "04",
    title: "Measure what changed",
    body: "Compare the workflow against the baseline before expanding into adjacent estimating, production, finance or reporting processes.",
  },
];

export default function RoofingPage() {
  const contactHref =
    "mailto:hello@beeclaros.com?subject=Commercial%20roofing%20estimating%20workflow";

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Commercial Roofing Estimating Automation",
    serviceType: "Commercial roofing workflow automation",
    url: `${siteConfig.url}/roofing`,
    description:
      "Workflow automation for commercial roofing teams that reduces manual work around bid intake, estimating preparation, document handling and production handoffs while working with the systems already in place.",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      email: siteConfig.email,
    },
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Commercial roofing companies",
    },
  };

  return (
    <div
      className="v8-theme"
      style={{ minHeight: "100vh", backgroundColor: "var(--v8-bg-primary)" }}
    >
      <Navigation />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceStructuredData),
        }}
      />

      <main>
        <section id="top" className={styles.hero}>
          <div className="v8-container">
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className="v8-overline">Commercial roofing · estimating capacity</p>
                <h1 className="v8-hero-title">
                  Handle more bids with the estimating team{" "}
                  <span className="v8-accent-text">you already have.</span>
                </h1>
                <p className={"v8-lead " + styles.heroLead}>
                  CLAROS helps commercial roofing teams reduce manual work around
                  bid intake, estimating preparation, document handling and
                  handoffs. We build around the systems already in place,
                  starting with one measurable workflow.
                </p>

                <div className={styles.heroActions}>
                  <a href={contactHref} className="v8-btn-primary">
                    Discuss your estimating workflow{" "}
                    <span className="v8-arrow">&rarr;</span>
                  </a>
                  <a href="#workflow" className="v8-btn-text">
                    See the workflow <span className="v8-arrow">&darr;</span>
                  </a>
                </div>
              </div>

              <div
                className={styles.heroDiagram}
                aria-label="Roofing estimating workflow diagram"
              >
                <div className={styles.diagramHeader}>
                  <span className="v8-label">One workflow, connected</span>
                  <span className={styles.liveDot}>Operational layer</span>
                </div>
                <div className={styles.diagramFlow}>
                  {workflow.slice(0, 5).map((item, index) => (
                    <div className={styles.diagramRow} key={item}>
                      <span className={styles.diagramIndex}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={styles.diagramNode}>{item}</span>
                      {index < 4 && <span className={styles.diagramLine} />}
                    </div>
                  ))}
                </div>
                <div className={styles.diagramLayer}>
                  <span>CLAROS</span>
                  <strong>
                    Structure inputs · surface gaps · route next actions
                  </strong>
                </div>
              </div>
            </div>

            <div className={styles.principles}>
              <div>
                <span className="v8-label">01</span>
                <strong>Existing systems stay in place</strong>
              </div>
              <div>
                <span className="v8-label">02</span>
                <strong>One workflow first</strong>
              </div>
              <div>
                <span className="v8-label">03</span>
                <strong>Measured before and after</strong>
              </div>
            </div>
          </div>
        </section>

        <section className={"v8-section " + styles.lightSection}>
          <div className="v8-container">
            <div className={styles.sectionIntro}>
              <p className="v8-overline">Where capacity gets lost</p>
              <h2 className="v8-section-title">
                The estimator bottleneck is often everything around the estimate.
              </h2>
              <p className="v8-lead">
                The goal is not to automate professional judgement. It is to
                remove avoidable coordination and administrative work so
                estimators can spend more time estimating.
              </p>
            </div>

            <div className={styles.frictionGrid}>
              {frictionPoints.map((point) => (
                <article className={styles.frictionCard} key={point.number}>
                  <span className="v8-num">{point.number}</span>
                  <h3>{point.title}</h3>
                  <p>{point.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="workflow"
          className={"v8-section " + styles.workflowSection}
        >
          <div className="v8-container">
            <div className={styles.workflowHeading}>
              <div>
                <p className="v8-overline">Example estimating flow</p>
                <h2 className="v8-section-title">
                  Keep the judgement human. Improve the movement around it.
                </h2>
              </div>
              <p className="v8-lead">
                Scope, pricing and customer commitments remain under human
                control. The workflow layer handles structure, routing,
                reminders and exceptions around those decisions.
              </p>
            </div>

            <div className={styles.workflowTrack}>
              {workflow.map((item, index) => (
                <div className={styles.workflowStep} key={item}>
                  <span className={styles.workflowNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{item}</strong>
                  {index < workflow.length - 1 && (
                    <span className={styles.workflowArrow}>&rarr;</span>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.workflowLayer}>
              <div className={styles.layerName}>
                <span className="v8-label">CLAROS workflow layer</span>
                <strong>
                  One clear next action from the information already moving
                  through the business.
                </strong>
              </div>
              <div className={styles.layerCapabilities}>
                <span>Collect &amp; structure inputs</span>
                <span>Surface missing information</span>
                <span>Route approvals &amp; next actions</span>
                <span>Expose exceptions before they block work</span>
              </div>
            </div>
          </div>
        </section>

        <section className={"v8-section " + styles.stackSection}>
          <div className="v8-container">
            <div className={styles.stackGrid}>
              <div className={styles.stackCopy}>
                <p className="v8-overline">Built around your stack</p>
                <h2 className="v8-section-title">Not another roofing platform.</h2>
                <p className="v8-lead">
                  We do not ask the team to rip and replace estimating, CRM,
                  accounting or field tools. We connect the handoffs and
                  decision points between them so the right work reaches the
                  right person at the right time.
                </p>
              </div>

              <div className={styles.systemMap}>
                {systems.map((system) => (
                  <div className={styles.systemNode} key={system}>
                    {system}
                  </div>
                ))}
                <div className={styles.systemCenter}>
                  <span>CLAROS</span>
                  <strong>Workflow layer</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={"v8-section " + styles.engagementSection}>
          <div className="v8-container">
            <div className={styles.sectionIntro}>
              <p className="v8-overline">How we start</p>
              <h2 className="v8-section-title">
                One measurable workflow before a bigger transformation.
              </h2>
              <p className="v8-lead">
                Start where capacity or margin is most visible. Prove the
                workflow, measure the result, then expand only where it makes
                operational sense.
              </p>
            </div>

            <div className={styles.steps}>
              {steps.map((step) => (
                <article className={styles.step} key={step.number}>
                  <span className="v8-num">{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.secondaryWedge}>
          <div className="v8-container">
            <div className={styles.secondaryInner}>
              <div>
                <p className="v8-overline">If estimating is not the constraint</p>
                <h2 className="v8-section-title">
                  Start with the operational seam closest to capacity or margin.
                </h2>
              </div>
              <p className="v8-lead">
                For some commercial roofing teams that is sold-to-production
                readiness, PM administration, daily reporting or exception
                management. The principle stays the same: one bounded workflow,
                built around the current systems, with a measurable outcome.
              </p>
            </div>
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className="v8-container">
            <div className={styles.finalCtaInner}>
              <p className={styles.darkOverline}>
                Commercial roofing · one workflow first
              </p>
              <h2>Have an estimating workflow worth pressure-testing?</h2>
              <p>
                Send us the workflow that is consuming estimator or PM time.
                We will start by understanding how it runs today and where the
                first useful intervention could sit.
              </p>
              <a href={contactHref} className={styles.darkButton}>
                Talk to CLAROS <span>&rarr;</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
