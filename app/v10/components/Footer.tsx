"use client";

import PartnershipMark from "./PartnershipMark";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="v10-footer">
      <div className="v10-container">
        <div className="footer-top">
          <div style={{ maxWidth: "26rem" }}>
            <a
              href="#top"
              className="v10-brand"
              style={{ color: "var(--v10-on-dark-primary)" }}
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <PartnershipMark height={44} className="v10-footer-logo" alt="" />
              <span
                className="v10-wordmark"
                style={{ color: "var(--v10-on-dark-primary)" }}
              >
                CLAROS
              </span>
            </a>
            <p
              className="v10-body"
              style={{ marginTop: "1.25rem", color: "var(--v10-on-dark-secondary)", fontSize: "0.95rem" }}
            >
              AI adoption and implementation for organisations that want
              measurable business value.
            </p>
          </div>

          <div className="footer-links">
            <div>
              <div className="v10-label" style={{ marginBottom: "1rem" }}>
                Connect
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.65rem" }}>
                <li>
                  <a
                    href="https://www.linkedin.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="v10-footer-link"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="mailto:hello@enxame.ai" className="v10-footer-link">
                    hello@enxame.ai
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="v10-label" style={{ marginBottom: "1rem" }}>
                Legal
              </div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "0.65rem" }}>
                <li>
                  <a href="/privacy" className="v10-footer-link">
                    Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span style={{ color: "var(--v10-on-dark-muted)", fontSize: "0.8125rem" }}>
            &copy; {year} CLAROS. All rights reserved.
          </span>
          <span
            className="v10-label"
            style={{ color: "var(--v10-on-dark-muted)" }}
          >
            Coordinated AI adoption
          </span>
        </div>
      </div>

      <style>{`
        .footer-top {
          display: flex;
          justify-content: space-between;
          gap: 3rem;
          flex-wrap: wrap;
        }
        .footer-links {
          display: flex;
          gap: clamp(2.5rem, 6vw, 5rem);
        }
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 1.75rem;
          border-top: 1px solid var(--v10-on-dark-line);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
          flex-wrap: wrap;
        }
      `}</style>
    </footer>
  );
}
