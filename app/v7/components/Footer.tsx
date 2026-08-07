"use client";

import BeeMark from "./BeeMark";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="hv-footer">
      <div className="hv-container">
        <div className="footer-top">
          {/* brand + description */}
          <div style={{ maxWidth: "24rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "1rem" }}>
              <BeeMark size={32} />
              <span className="hv-wordmark">CLAROS</span>
            </div>
            <p className="hv-body" style={{ fontSize: "0.9375rem", color: "var(--hv-text-muted)" }}>
              AI adoption and implementation for organisations that want
              measurable business value.
            </p>
          </div>

          {/* links */}
          <div className="footer-links">
            <a className="hv-footer-link" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
            <a className="hv-footer-link" href="mailto:hello@enxame.ai">
              hello@enxame.ai
            </a>
            <a className="hv-footer-link" href="#">
              Privacy
            </a>
          </div>
        </div>

        <div className="hv-divider" style={{ margin: "2.5rem 0 1.5rem" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span className="hv-label" style={{ color: "var(--hv-text-faint)" }}>
            &copy; {year} CLAROS. All rights reserved.
          </span>
          <span className="hv-label" style={{ color: "var(--hv-text-faint)" }}>
            People · Processes · Intelligence
          </span>
        </div>
      </div>

      <style>{`
        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 2.5rem;
          flex-wrap: wrap;
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          align-items: flex-start;
        }
      `}</style>
    </footer>
  );
}
