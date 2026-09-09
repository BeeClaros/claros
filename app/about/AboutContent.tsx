"use client";

import Image from "next/image";

export default function AboutContent() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="v8-container about-hero-inner">
          <span className="v8-overline">About CLAROS</span>
          <h1 className="about-hero-title v8-display">
            Technology should fit the business.{" "}
            <span className="v8-accent-text">Not the other way around.</span>
          </h1>
          <p className="v8-lead" style={{ marginTop: "2rem", maxWidth: "540px" }}>
            We started CLAROS around a simple idea: better technology should make
            a business easier to run, not add another layer of complexity. We work
            across workflows, existing systems, software and automation, using AI
            where it creates practical value.
          </p>
        </div>
      </section>

      {/* ── Manifesto ─────────────────────────────────────────── */}
      <section className="about-manifesto">
        <div className="v8-container">
          <span className="v8-overline">Why we exist</span>

          <div className="about-mission-grid">
            <article className="about-mission-card">
              <span className="v8-num">Our mission</span>
              <h2 className="v8-section-title" style={{ marginTop: "2.5rem", maxWidth: "13ch" }}>
                Turn operational friction into systems that make work run better.
              </h2>
              <p className="v8-lead" style={{ marginTop: "1.4rem", maxWidth: "54ch" }}>
                We help companies understand where work is slowing down, connect
                what already exists, and build software, automation and AI around
                the way the business actually operates.
              </p>
            </article>

            <article className="about-mission-card">
              <span className="v8-num">Our vision</span>
              <h2 className="v8-section-title" style={{ marginTop: "2.5rem", maxWidth: "13ch" }}>
                A future where companies use AI without rebuilding themselves
                around it.
              </h2>
              <p className="v8-lead" style={{ marginTop: "1.4rem", maxWidth: "54ch" }}>
                Technology should adapt to the people, processes and systems
                already creating value, then improve them where it matters.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="about-values">
        <div className="v8-container">
          <div className="about-section-head">
            <div>
              <span className="v8-overline">Our values</span>
              <h2 className="v8-section-title" style={{ marginTop: "0.875rem", maxWidth: "11ch" }}>
                How we choose what matters.
              </h2>
            </div>
            <p className="v8-lead">
              Our values are practical. They shape how we decide what to build,
              what not to build, and how technology should fit inside a real
              operating business.
            </p>
          </div>

          <div className="about-values-grid">
            <article className="about-value">
              <span className="v8-num">01 / Business first</span>
              <h3 className="v8-statement" style={{ marginTop: "3rem", maxWidth: "8ch" }}>
                Start with the problem.
              </h3>
              <strong style={{ display: "block", marginTop: "1.25rem", fontSize: "0.9375rem", lineHeight: 1.4 }}>
                Technology comes after the operating context.
              </strong>
              <p className="about-value-body">
                We look at the workflow, economics and people involved before
                deciding what should be built, connected or automated.
              </p>
            </article>

            <article className="about-value">
              <span className="v8-num">02 / Build for reality</span>
              <h3 className="v8-statement" style={{ marginTop: "3rem", maxWidth: "8ch" }}>
                Fit the operation.
              </h3>
              <strong style={{ display: "block", marginTop: "1.25rem", fontSize: "0.9375rem", lineHeight: 1.4 }}>
                Work with what is already creating value.
              </strong>
              <p className="about-value-body">
                Good systems respect the tools, constraints and teams already
                inside the business. We replace complexity only when there is a
                reason to.
              </p>
            </article>

            <article className="about-value">
              <span className="v8-num">03 / Useful over impressive</span>
              <h3 className="v8-statement" style={{ marginTop: "3rem", maxWidth: "8ch" }}>
                Value over novelty.
              </h3>
              <strong style={{ display: "block", marginTop: "1.25rem", fontSize: "0.9375rem", lineHeight: 1.4 }}>
                Useful beats fashionable.
              </strong>
              <p className="about-value-body">
                We would rather improve one workflow that matters than deploy AI
                everywhere without a clear reason.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ── How we think ──────────────────────────────────────── */}
      <section className="about-thinking">
        <div className="v8-container" style={{ position: "relative", zIndex: 1 }}>
          <span className="v8-overline" style={{ color: "var(--v8-lime)" }}>
            How we think
          </span>
          <h2
            className="v8-section-title"
            style={{ marginTop: "1rem", maxWidth: "11ch", color: "#fff" }}
          >
            What we believe.
          </h2>

          <div className="about-beliefs">
            {[
              {
                num: "01",
                title: "Software should reduce friction.",
                text: "Not create another system people have to manage around.",
              },
              {
                num: "02",
                title: "AI should earn its place.",
                text: "It belongs where it improves the workflow, not everywhere it can technically be added.",
              },
              {
                num: "03",
                title: "Internal teams should become stronger.",
                text: "Delivery should leave people with better systems and clearer capability, not permanent dependency.",
              },
              {
                num: "04",
                title: "Delivery matters.",
                text: "A strategy only becomes valuable when something meaningfully changes in the business.",
              },
            ].map((b) => (
              <div key={b.num} className="about-belief">
                <span className="about-belief-num">{b.num}</span>
                <h3 className="about-belief-title v8-display">{b.title}</h3>
                <p className="about-belief-text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founders ──────────────────────────────────────────── */}
      <section className="about-founders">
        <div className="v8-container">
          <div className="about-founder-head">
            <div>
              <span className="v8-overline">Meet the founders</span>
              <h2 className="v8-section-title" style={{ marginTop: "0.875rem", maxWidth: "10ch" }}>
                Two perspectives. One approach.
              </h2>
            </div>
            <p className="v8-lead" style={{ maxWidth: "55ch" }}>
              CLAROS combines business context with technical implementation.
              Strategy and delivery stay close together from the first workflow
              discussion through to what gets built.
            </p>
          </div>

          <div className="about-founders-grid">
            {/* Francisco */}
            <article className="about-founder-card">
              <div className="about-portrait">
                <Image
                  src="/images/francisco-magro.jpg"
                  alt="Francisco Magro"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="about-founder-body">
                <div className="about-founder-meta">
                  <div>
                    <div className="about-founder-name v8-display">Francisco Magro</div>
                    <div className="about-founder-role v8-mono">
                      Co-Founder &middot; Technology &amp; Implementation
                    </div>
                  </div>
                </div>
                <blockquote className="about-quote v8-display">
                  &ldquo;The best technology tends to disappear into the way
                  people already work. That is what I want us to build: systems
                  that solve real problems, connect properly with the business and
                  are useful long after the initial project ends.&rdquo;
                </blockquote>
              </div>
            </article>

            {/* Pedro */}
            <article className="about-founder-card">
              <div className="about-portrait">
                <Image
                  src="/images/pedro-oliveira.jpg"
                  alt="Pedro Oliveira"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center 20%" }}
                  sizes="(max-width: 900px) 100vw, 50vw"
                />
              </div>
              <div className="about-founder-body">
                <div className="about-founder-meta">
                  <div>
                    <div className="about-founder-name v8-display">Pedro Oliveira</div>
                    <div className="about-founder-role v8-mono">
                      Co-Founder &middot; Strategy &amp; Growth
                    </div>
                  </div>
                </div>
                <blockquote className="about-quote v8-display">
                  &ldquo;Companies do not need more AI ideas. They need clarity on
                  where technology can actually improve revenue, operations or the
                  customer experience, and a practical way to make it happen. That
                  is the gap we built CLAROS to close.&rdquo;
                </blockquote>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────── */}
      <section className="about-closing">
        <div className="v8-container about-closing-inner">
          <h2 className="v8-section-title" style={{ maxWidth: "12ch" }}>
            Better systems start with a real business problem.
          </h2>
          <a href="/#contact" className="v8-btn-dark">
            Discuss your priorities
            <span className="v8-arrow" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </section>

      <style>{`
        /* ── Hero ─────────────────────────────────────────────── */
        .about-hero {
          position: relative;
          display: flex;
          align-items: center;
          min-height: 70vh;
          background: var(--v8-bg-secondary);
          border-bottom: 1px solid var(--v8-line);
        }
        .about-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, var(--v8-line) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.28;
          pointer-events: none;
        }
        .about-hero-inner {
          position: relative;
          z-index: 1;
          padding: 7rem 0 5.5rem;
        }
        .about-hero-title {
          margin: 1.125rem 0 0;
          font-size: clamp(2.4rem, 5vw, 4.5rem);
          line-height: 0.95;
          letter-spacing: -0.045em;
          font-weight: 600;
          max-width: 14ch;
        }

        /* ── Manifesto ────────────────────────────────────────── */
        .about-manifesto {
          padding: 6.875rem 0;
          background: var(--v8-bg-contrast);
          border-bottom: 1px solid var(--v8-line);
        }
        .about-mission-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1px;
          background: var(--v8-line);
          border: 1px solid var(--v8-line);
          margin-top: 2.25rem;
        }
        .about-mission-card {
          background: var(--v8-bg-contrast);
          min-height: 320px;
          padding: 2.375rem;
          position: relative;
          overflow: hidden;
        }
        .about-mission-card::after {
          content: "";
          position: absolute;
          width: 170px;
          height: 170px;
          right: -78px;
          bottom: -82px;
          border: 1px solid var(--v8-line);
          transform: rotate(30deg);
        }

        /* ── Values ───────────────────────────────────────────── */
        .about-values {
          padding: 6.875rem 0;
          background: var(--v8-bg-primary);
          border-bottom: 1px solid var(--v8-line);
        }
        .about-section-head {
          display: grid;
          grid-template-columns: 1fr minmax(320px, 550px);
          gap: 3.25rem;
          align-items: end;
        }
        .about-values-grid {
          margin-top: 3.625rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          border: 1px solid var(--v8-line);
          background: var(--v8-line);
        }
        .about-value {
          background: var(--v8-bg-secondary);
          min-height: 330px;
          padding: 1.875rem;
          position: relative;
          transition: background 0.35s var(--v8-ease), transform 0.35s var(--v8-ease);
        }
        .about-value:hover {
          background: #fff;
          transform: translateY(-4px);
          z-index: 2;
        }
        .about-value-body {
          margin: 0.625rem 0 0;
          color: var(--v8-text-secondary);
          font-size: 0.875rem;
          line-height: 1.68;
          max-width: 34ch;
        }

        /* ── How we think ─────────────────────────────────────── */
        .about-thinking {
          background: var(--v8-bg-dark);
          color: #fff;
          padding: 6.875rem 0;
          position: relative;
          overflow: hidden;
        }
        .about-thinking::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 78% 25%, rgba(199, 240, 0, 0.09), transparent 24%),
            repeating-linear-gradient(
              90deg,
              transparent 0,
              transparent 39px,
              rgba(255, 255, 255, 0.025) 39px,
              rgba(255, 255, 255, 0.025) 40px
            );
          pointer-events: none;
        }
        .about-beliefs {
          margin-top: 3.375rem;
          border-top: 1px solid rgba(255, 255, 255, 0.15);
        }
        .about-belief {
          display: grid;
          grid-template-columns: 44px minmax(200px, 380px) 1fr;
          gap: 1.75rem;
          padding: 1.75rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.15);
          align-items: start;
        }
        .about-belief-num {
          font-family: var(--font-v8-mono), monospace;
          font-size: 0.625rem;
          font-weight: 500;
          line-height: 1.5;
          letter-spacing: 0.12em;
          color: var(--v8-lime);
        }
        .about-belief-title {
          margin: 0;
          font-size: 1.5rem;
          line-height: 1.1;
          letter-spacing: -0.03em;
          font-weight: 600;
        }
        .about-belief-text {
          margin: 0;
          color: #AEB7B0;
          font-size: 0.9375rem;
          line-height: 1.65;
          max-width: 62ch;
        }

        /* ── Founders ─────────────────────────────────────────── */
        .about-founders {
          padding: 6.875rem 0 7.875rem;
          background: var(--v8-bg-secondary);
        }
        .about-founder-head {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.75rem;
          align-items: end;
          margin-bottom: 3.375rem;
        }
        .about-founders-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3.75rem;
        }
        .about-founder-card {
          border: 1px solid var(--v8-line);
          background: var(--v8-bg-contrast);
          overflow: hidden;
        }
        .about-portrait {
          position: relative;
          aspect-ratio: 16 / 9;
          border-bottom: 1px solid var(--v8-line);
          background: var(--v8-bg-primary);
        }
        .about-founder-body {
          padding: 1.35rem 1.5rem 1.5rem;
        }
        .about-founder-meta {
          display: flex;
          justify-content: space-between;
          gap: 1.25rem;
          align-items: flex-start;
          border-bottom: 1px solid var(--v8-line);
          padding-bottom: 1.25rem;
        }
        .about-founder-name {
          font-size: 1.625rem;
          line-height: 1.05;
          letter-spacing: -0.035em;
          font-weight: 600;
        }
        .about-founder-role {
          margin-top: 0.375rem;
          color: var(--v8-text-muted);
          font-size: 0.625rem;
          line-height: 1.5;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .about-quote {
          margin: 1.25rem 0 0;
          font-size: clamp(1.125rem, 1.7vw, 1.4375rem);
          line-height: 1.42;
          letter-spacing: -0.025em;
          font-weight: 500;
          max-width: 30ch;
        }

        /* ── Closing CTA ──────────────────────────────────────── */
        .about-closing {
          background: var(--v8-lime);
          padding: 4.375rem 0 4.625rem;
          color: var(--v8-text-primary);
        }
        .about-closing-inner {
          display: grid;
          grid-template-columns: 1.2fr auto;
          gap: 2.75rem;
          align-items: end;
        }

        /* ── Responsive ───────────────────────────────────────── */
        @media (max-width: 900px) {
          .about-hero { min-height: auto; }
          .about-hero-inner { padding: 5.5rem 0 4.5rem; }
          .about-mission-grid,
          .about-values-grid,
          .about-founders-grid { grid-template-columns: 1fr; }
          .about-section-head,
          .about-founder-head { grid-template-columns: 1fr; align-items: start; }
          .about-belief { grid-template-columns: 32px 1fr; }
          .about-belief-text { grid-column: 2; }
          .about-closing-inner { grid-template-columns: 1fr; align-items: start; }
        }

        @media (max-width: 640px) {
          .about-manifesto,
          .about-values,
          .about-thinking,
          .about-founders { padding: 5.125rem 0; }
          .about-mission-card { min-height: auto; padding: 1.75rem; }
          .about-value { min-height: auto; }
          .about-founder-body { padding: 1.25rem 1.2rem 1.4rem; }
          .about-portrait { aspect-ratio: 4 / 3; }
          .about-quote { max-width: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .about-value { transition: none; }
        }
      `}</style>
    </>
  );
}
