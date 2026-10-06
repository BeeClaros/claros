import type { Metadata } from "next";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "AI & Software for Commercial Roofing",
  description:
    "CLAROS prepares bid packages, production handoffs, field reports and billing records across the systems commercial roofing teams already use.",
  alternates: { canonical: "/commercial-roofing" },
  openGraph: {
    type: "website",
    url: "/commercial-roofing",
    title: "AI & Software for Commercial Roofing | CLAROS",
    description:
      "From RFQ to cash, CLAROS performs defined work across the systems commercial roofing teams already use while people keep control of consequential decisions.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI & Software for Commercial Roofing | CLAROS",
    description: "More roofing work. Less work between your systems.",
  },
  robots: { index: false, follow: true },
};

const friction = [
  "Re-entering information",
  "Searching for documents",
  "Preparing bid submissions",
  "Rebuilding awarded jobs for production",
  "Chasing confirmations",
  "Rewriting field updates",
  "Gathering billing evidence",
];

const chapters = [
  {
    id: "estimating",
    number: "01",
    eyebrow: "Request to estimating package",
    trigger: "An RFQ or RFP arrives by email with drawings, specifications and addenda.",
    work: "CLAROS reads and organizes the request, identifies requirements and deadlines, retrieves approved inputs, links files and flags missing information.",
    result: "A prepared record appears in the estimating workspace, ready for estimator review.",
    decision: "Scope, takeoff validation, pricing and submission stay with your team.",
    benefit: "Less preparation work before an estimator can make the decisions that matter.",
    warning: "Latest addendum changes the insulation requirement.",
  },
  {
    id: "production",
    number: "02",
    eyebrow: "Award to production handoff",
    trigger: "The proposal is accepted.",
    work: "CLAROS carries approved scope forward, prepares materials and equipment requirements, gathers site information and checks the handoff for gaps.",
    result: "A populated production record appears with linked documents and assigned exceptions.",
    decision: "Scheduling, resource commitments and authorized purchasing stay with your team.",
    benefit: "Cleaner production readiness without rebuilding the job from scattered records.",
    warning: "Dumpster location awaiting site confirmation.",
  },
  {
    id: "field-report",
    number: "03",
    eyebrow: "Field update to report",
    trigger: "A supervisor submits a voice note and photos.",
    work: "CLAROS structures the report, links evidence, updates the job and routes issues to the project manager.",
    result: "The daily report and office update appear inside the existing workflow.",
    decision: "Additional work, customer-sensitive communication and safety actions stay with your team.",
    benefit: "Less PM and coordinator time spent turning field inputs into office-ready reporting.",
    warning: "Weather delay documented. Customer notification requires PM review.",
  },
  {
    id: "billing",
    number: "04",
    eyebrow: "Approved records to billing",
    trigger: "Approved progress or completion records become available.",
    work: "CLAROS checks supporting evidence, flags missing documents and prepares the billing package for finance.",
    result: "Finance receives a draft with supporting records inside its accounting workflow.",
    decision: "Invoice approval and consequential reconciliation decisions stay with your team.",
    benefit: "A shorter path from approved work to invoice-ready documentation.",
    warning: "Signed completion document still missing.",
  },
];

const targets = [
  { value: "40-50%", label: "less estimating preparation and admin time" },
  { value: "50%+", label: "shorter sales-to-production handoff cycle" },
  { value: "75%+", label: "less daily report preparation time" },
];

const delivery = [
  ["01", "Understand the work", "Map tasks, systems, responsibilities and the exceptions that change what should happen next."],
  ["02", "Choose the first workflow", "Agree the scope, baseline, target, access and approval rules for one useful starting point."],
  ["03", "Build and deploy", "Create the integrations, AI tasks and missing software, then test the workflow with the people who use it."],
  ["04", "Measure and improve", "Track completed work, accuracy, adoption, exceptions and the agreed business outcome before expanding."],
];

const faqs = [
  ["Do we need to replace our software?", "No by default. CLAROS is built around the workflows and systems your team already uses. If a useful piece of software is missing, we can build that specific layer rather than forcing a full platform replacement."],
  ["What work can CLAROS perform?", "Defined, repeatable work such as reading requests, organizing documents, preparing estimating inputs, carrying approved information into production, structuring field reports, checking handoffs and preparing billing documentation. The exact scope is agreed workflow by workflow."],
  ["Can our team review before something is sent or committed?", "Yes. Approval points are part of the workflow design. Consequential scope, pricing, scheduling, safety, contractual and financial decisions remain under human control."],
  ["What if information is missing or conflicting?", "The workflow should stop, flag the exception and route it to the right person rather than quietly inventing an answer. The handling rules are agreed during implementation."],
  ["What systems can you connect?", "That depends on the systems, available APIs, permissions and technical constraints. We confirm connections during scoping rather than claiming every tool can be connected instantly."],
  ["How do we choose the first workflow?", "We look for a bounded workflow with visible manual effort, clear inputs and outputs, enough repetition to matter and a result that can be measured against a baseline."],
  ["How are results measured?", "Against the baseline agreed for the first workflow, for example preparation time, handoff cycle time, administrative touches, exception rate or report preparation time."],
  ["Who maintains the solution?", "CLAROS supports the agreed deployment and ongoing improvement. The exact support model, responsibilities and access are defined as part of the engagement."],
];

function ArrowIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.arrowIcon}><path d="M3 10h12M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

function CheckIcon() {
  return <svg viewBox="0 0 20 20" aria-hidden="true" className={styles.checkIcon}><path d="m4 10 3.5 3.5L16 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>;
}

export default function CommercialRoofingPage() {
  const contactHref = "mailto:hello@beeclaros.com?subject=Commercial%20roofing%20workflow";
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Commercial Roofing Workflow Automation",
    serviceType: "AI, software and workflow implementation for commercial roofing",
    url: `${siteConfig.url}/commercial-roofing`,
    description: "CLAROS builds AI, software and integrations that perform defined work across estimating, production, field reporting and billing workflows for commercial roofing companies.",
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url, email: siteConfig.email },
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", audienceType: "Commercial roofing companies" },
  };

  return (
    <div className={`v8-theme ${styles.page}`}>
      <Navigation />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceStructuredData) }} />
      <main>
        <section id="top" className={styles.hero}>
          <div className="v8-container">
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className="v8-overline">AI &amp; software for commercial roofing</p>
                <h1 className={styles.heroTitle}>More roofing work. <span>Less work between your systems.</span></h1>
                <p className={styles.heroLead}>CLAROS prepares bid packages, production handoffs, field reports and billing records inside the tools your team already uses. Your people keep control of the decisions.</p>
                <div className={styles.heroActions}>
                  <a href={contactHref} className="v8-btn-primary">Talk through your workflow <ArrowIcon /></a>
                  <a href="#workflow" className={styles.secondaryCta}>See how the work gets done <span aria-hidden="true">↓</span></a>
                </div>
                <div className={styles.heroPrinciple}>
                  <span className={styles.heroPrincipleMark}>CLAROS</span>
                  <p>Your team makes the decisions. <strong>CLAROS handles the work around them.</strong></p>
                </div>
              </div>

              <div className={styles.heroDemo} aria-label="Illustrative request to estimating workflow">
                <div className={styles.demoTopbar}><span>Illustrative workflow</span><span className={styles.demoStatus}><i /> work in progress</span></div>
                <div className={styles.emailCard}>
                  <div className={styles.emailHeader}>
                    <span className={styles.mailIcon}>M</span>
                    <div><strong>Front Range Distribution Center</strong><span>RFQ - roof replacement</span></div>
                    <span className={styles.time}>9:14 AM</span>
                  </div>
                  <div className={styles.attachmentRow}><span>PDF</span><div><strong>Roof_Set_Rev03.pdf</strong><small>42 pages · drawings</small></div></div>
                  <div className={styles.attachmentRow}><span>DOC</span><div><strong>Specification_07540.docx</strong><small>submission requirements</small></div></div>
                  <div className={styles.deadlineRow}><span>Submission deadline</span><strong>Friday · 2:00 PM MT</strong></div>
                </div>
                <div className={styles.processingRail} aria-hidden="true"><span className={styles.processingDot} /><span className={styles.processingLine} /><span className={styles.processingLabel}>CLAROS prepares the work</span></div>
                <div className={styles.workspaceCard}>
                  <div className={styles.workspaceHeader}><div><span>Estimating workspace</span><strong>Front Range Distribution Center</strong></div><span className={styles.readyBadge}>Ready for estimator review</span></div>
                  <div className={styles.fieldGrid}><div><span>System</span><strong>60 mil TPO</strong></div><div><span>Area</span><strong>126,400 sq ft</strong></div><div><span>Warranty</span><strong>20 years</strong></div><div><span>Bid due</span><strong>Fri · 2:00 PM</strong></div></div>
                  <div className={styles.warningBox}><span>!</span><p><strong>Review required</strong>Latest addendum changes the insulation requirement.</p></div>
                  <div className={styles.reviewLine}><CheckIcon /><span>Files linked · requirements structured · deadline captured</span></div>
                </div>
              </div>
            </div>
            <div className={styles.heroFoot}><span>From RFQ to cash</span><div className={styles.heroFootLine} /><strong>inside the systems you already use.</strong></div>
          </div>
        </section>

        <section className={styles.frictionSection}>
          <div className="v8-container">
            <div className={styles.splitHeading}><div><p className="v8-overline">Operational friction</p><h2 className="v8-section-title">The roof is only part of the job.</h2></div><p className="v8-lead">Skilled people spend time on the work surrounding delivery. Not every company has every problem below, but these are common places where capacity gets absorbed before and after the decisions that require expertise.</p></div>
            <div className={styles.frictionRail}>{friction.map((item, index) => <div className={styles.frictionItem} key={item}><span>{String(index + 1).padStart(2, "0")}</span><strong>{item}</strong></div>)}</div>
            <div className={styles.frictionClose}><span className={styles.limeBar} /><p>CLAROS takes responsibility for selected tasks so information and work can keep moving forward without removing professional judgement from the process.</p></div>
          </div>
        </section>

        <section id="workflow" className={styles.workflowSection}>
          <div className="v8-container">
            <div className={styles.workflowIntro}><div><p className="v8-overline">One connected example</p><h2 className="v8-section-title">Follow one job from request to billing.</h2></div><div className={styles.projectTag}><span>Illustrative project</span><strong>Front Range Distribution Center - Roof Replacement</strong></div></div>
            <div className={styles.workflowLayout}>
              <nav className={styles.chapterNav} aria-label="Workflow chapters"><span className={styles.chapterNavLabel}>Workflow chapters</span>{chapters.map(chapter => <a key={chapter.id} href={`#${chapter.id}`}><span>{chapter.number}</span>{chapter.eyebrow}</a>)}</nav>
              <div className={styles.chapters}>{chapters.map(chapter => (
                <article id={chapter.id} className={styles.chapter} key={chapter.id}>
                  <div className={styles.chapterHeading}><span>{chapter.number}</span><div><p>{chapter.eyebrow}</p><h3>{chapter.benefit}</h3></div></div>
                  <div className={styles.chapterFlow}>
                    <div className={styles.chapterStart}><span>Trigger</span><p>{chapter.trigger}</p></div>
                    <div className={styles.chapterWork}><div className={styles.clarosStamp}>CLAROS</div><span>Work performed</span><p>{chapter.work}</p><div className={styles.exception}><span>Exception surfaced</span><strong>{chapter.warning}</strong></div></div>
                    <div className={styles.chapterResult}><span>Finished output</span><p>{chapter.result}</p><div className={styles.outputState}><CheckIcon /> Ready for the next human decision</div></div>
                  </div>
                  <div className={styles.humanDecision}><span>Human decision</span><p>{chapter.decision}</p></div>
                </article>
              ))}</div>
            </div>
          </div>
        </section>

        <section className={styles.targetsSection}>
          <div className="v8-container">
            <div className={styles.targetsHeading}><div><p className="v8-overline">Business outcomes</p><h2 className="v8-section-title">Targets we can evaluate against your operation.</h2></div><p>These are proposed objectives, not published results or guarantees. Final targets depend on your workflows, systems, baseline and agreed scope.</p></div>
            <div className={styles.targetsGrid}>{targets.map((target, index) => <article className={styles.target} key={target.value}><span>{String(index + 1).padStart(2, "0")}</span><strong>{target.value}</strong><p>{target.label}</p></article>)}</div>
            <details className={styles.moreTargets}><summary>Other objectives we may evaluate</summary><div><span>25-35% more qualified opportunities handled</span><span>50%+ shorter completion-to-invoice-ready time</span><span>Potentially 10-15 hours per week recovered for a defined PM or coordinator workload</span></div></details>
          </div>
        </section>

        <section className={styles.systemsSection}>
          <div className="v8-container">
            <div className={styles.systemsGrid}>
              <div className={styles.systemsCopy}><p className="v8-overline">Built around your operation</p><h2 className="v8-section-title">Keep working in the tools you know.</h2><p className="v8-lead">CLAROS performs defined work across the environments already carrying the job. Connections enable the work, but completed work is the value.</p><p className={styles.systemsNote}>Specific connections are confirmed during scoping based on access, available APIs and technical constraints.</p></div>
              <div className={styles.systemMap} aria-label="Existing systems and CLAROS work layer">
                <div className={styles.systemRow}><div><span>01</span><strong>Email</strong><small>Requests, addenda, approvals</small></div><div><span>02</span><strong>Estimating</strong><small>Prepared inputs and records</small></div><div><span>03</span><strong>Production</strong><small>Handoffs and exceptions</small></div><div><span>04</span><strong>Field records</strong><small>Photos, notes and reports</small></div><div><span>05</span><strong>Accounting</strong><small>Billing packages and evidence</small></div></div>
                <div className={styles.clarosLayer}><div className={styles.clarosLayerLabel}><span>CLAROS work layer</span><strong>Performs selected tasks across the flow</strong></div><div className={styles.clarosLayerTasks}><span>Read</span><span>Prepare</span><span>Check</span><span>Update</span><span>Route</span></div></div>
                <div className={styles.missingSoftware}><span>When a useful interface is missing</span><strong>CLAROS can build the specific software needed for the workflow.</strong></div>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.whySection}>
          <div className="v8-container">
            <div className={styles.splitHeading}><div><p className="v8-overline">Why CLAROS</p><h2 className="v8-section-title">Start with the real workflow. Build what it needs.</h2></div><p className="v8-lead">You work with the people understanding, building and implementing the solution. The engagement stays anchored to the work your team actually needs completed.</p></div>
            <div className={styles.commitments}><div><span>01</span><strong>Start with the workflow and its exceptions.</strong></div><div><span>02</span><strong>Keep the tools that remain useful.</strong></div><div><span>03</span><strong>Build the missing functionality.</strong></div><div><span>04</span><strong>Get the workflow into everyday use.</strong></div><div><span>05</span><strong>Measure what improves.</strong></div><div><span>06</span><strong>Support the agreed deployment.</strong></div></div>
          </div>
        </section>

        <section className={styles.deliverySection}>
          <div className="v8-container">
            <div className={styles.deliveryIntro}><p className="v8-overline">Implementation</p><h2 className="v8-section-title">A focused first workflow, then evidence.</h2><p className="v8-lead">One estimating workflow and one production handoff are a useful starting point to discuss, not a mandatory package or a fixed transformation plan.</p></div>
            <div className={styles.deliveryGrid}>{delivery.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
          </div>
        </section>

        <section className={styles.evidenceSection}>
          <div className="v8-container"><div className={styles.evidencePanel}><div><p className="v8-overline">Evidence, clearly labelled</p><h2>What this page is showing you.</h2></div><div className={styles.evidenceRows}><div><span>Workflow</span><strong>Proposed commercial roofing workflows</strong><small>Illustrative, scoped during discovery</small></div><div><span>Interfaces</span><strong>Original illustrative interface mockups</strong><small>Not screenshots of a customer deployment</small></div><div><span>Outcomes</span><strong>Targets to evaluate against your baseline</strong><small>Not guarantees or published case-study results</small></div><div><span>Implementation</span><strong>AI, software and integrations built around the agreed workflow</strong><small>Technical feasibility confirmed during scoping</small></div></div></div></div>
        </section>

        <section className={styles.faqSection}>
          <div className="v8-container"><div className={styles.faqGrid}><div className={styles.faqIntro}><p className="v8-overline">FAQ</p><h2 className="v8-section-title">Practical questions before we start.</h2></div><div className={styles.faqList}>{faqs.map(([q, a]) => <details key={q}><summary>{q}<span aria-hidden="true">+</span></summary><p>{a}</p></details>)}</div></div></div>
        </section>

        <section className={styles.finalCta}>
          <div className="v8-container"><div className={styles.finalGrid}><div><p className={styles.darkOverline}>A focused next step</p><h2>Start with the work slowing your team down.</h2></div><div className={styles.finalCopy}><p>Show us how a request becomes a bid and how an awarded job reaches production. We&apos;ll identify where CLAROS could take work off your team.</p><a href={contactHref} className={styles.finalButton}>Talk through your workflow <ArrowIcon /></a><span>No platform replacement pitch. Start with one real workflow.</span></div></div></div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
