"use client";

import MechBee from "./MechBee";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="ae-footer">
      <div className="ae-container">
        <div className="ftr-top">
          <div className="ftr-brand">
            <div style={{ display: "inline-flex", alignItems: "center", gap: "0.65rem" }}>
              <MechBee variant="icon" tone="white" size={30} />
              <span
                className="ae-display"
                style={{ fontSize: "1.15rem", fontWeight: 600, color: "var(--ae-text-on-dark)" }}
              >
                CLAROS
              </span>
            </div>
            <p
              className="ae-body"
              style={{ marginTop: "1.1rem", color: "var(--ae-text-on-dark-soft)", maxWidth: "26rem", fontSize: "0.95rem" }}
            >
              AI adoption and implementation for organisations that want
              measurable business value.
            </p>
          </div>

          <div className="ftr-links">
            <a className="ae-footer-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a className="ae-footer-link" href="mailto:hello@enxame.ai">
              hello@enxame.ai
            </a>
            <a className="ae-footer-link" href="#">
              Privacy
            </a>
          </div>
        </div>

        <div className="ftr-bottom">
          <span className="ae-label" style={{ color: "var(--ae-text-on-dark-faint)" }}>
            Technology becomes valuable when it moves with purpose.
          </span>
          <span className="ae-label" style={{ color: "var(--ae-text-on-dark-faint)" }}>
            &copy; {year} CLAROS
          </span>
        </div>
      </div>

      <style>{`
        .ftr-top {
          display: flex;
          justify-content: space-between;
          gap: 2.5rem;
          flex-wrap: wrap;
          padding-bottom: 3rem;
          border-bottom: 1px solid var(--ae-line-dark);
        }
        .ftr-links {
          display: flex;
          flex-direction: column;
          gap: 0.9rem;
          align-items: flex-start;
        }
        .ftr-bottom {
          margin-top: 2rem;
          display: flex;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }
      `}</style>
    </footer>
  );
}
